import { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, message, Upload, Button } from 'antd';
import { Article, ArticleRequest } from '../../../../services/articleService';
import articleService from '../../../../services/articleService';
import type { CategoryGroup } from '../../../../services/categoryService';
import dayjs from 'dayjs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload';
import type { UploadProps } from 'antd/es/upload';
import uploadFile from '../../../../services/uploadService';

interface ArticleModalProps {
  visible: boolean;
  article: Article | null;
  categoryGroups: CategoryGroup[];
  onClose: (refresh?: boolean) => void;
}

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['link', 'image'],
    [{ 'color': [] }, { 'background': [] }],
    ['clean']
  ]
};

const ArticleModal = ({ visible, article, categoryGroups, onClose }: ArticleModalProps) => {
  const [form] = Form.useForm();
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (visible && article) {
      form.setFieldsValue({
        ...article,
        categoryGroupId: article.categoryGroup.id,
        publishDate: dayjs(article.publishDate),
        status: article.status
      });
      setThumbnailPreview(article.thumbnailUrl);
    } else {
      form.resetFields();
      setThumbnailPreview('');
    }
  }, [visible, article, form]);

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
      return false;
    }
    return true;
  };

  const handleUpload: UploadProps['customRequest'] = async (options) => {
    const { onSuccess, onError, file } = options;

    try {
      setUploading(true);
      const response = await uploadFile(file as File);
      
      const imageUrl = response.data.url;
      setThumbnailPreview(imageUrl);
      form.setFieldsValue({ thumbnailUrl: imageUrl });
      onSuccess?.(response);
      message.success('Image uploaded successfully');
    } catch (error: unknown) {
      onError?.(error as Error);
      message.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const articleData: ArticleRequest = {
        title: values.title,
        thumbnailUrl: values.thumbnailUrl,
        categoryGroupId: values.categoryGroupId,
        publishDate: values.publishDate.format(),
        content: values.content,
        status: values.status
      };

      if (article) {
        await articleService.updateArticle(article.id, articleData);
        message.success('Article updated successfully');
      } else {
        await articleService.createArticle(articleData);
        message.success('Article created successfully');
      }
      onClose(true);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save article';
      message.error(errorMessage);
    }
  };

  const handlePreview = () => {
    const content = form.getFieldValue('content');
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(`
        <html>
          <head>
            <title>Article Preview</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
              img { max-width: 100%; height: auto; }
            </style>
          </head>
          <body>
            ${content}
          </body>
        </html>
      `);
      previewWindow.document.close();
    }
  };

  return (
    <Modal
      title={article ? 'Sửa bài viết' : 'Tạo bài viết mới'}
      open={visible}
      onOk={handleSubmit}
      onCancel={() => onClose()}
      width={800}
      okText={article ? 'Cập nhật' : 'Tạo mới'}
      footer={[
        <Button key="preview" onClick={handlePreview}>
          Xem trước
        </Button>,
        <Button key="cancel" onClick={() => onClose()}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {article ? 'Cập nhật' : 'Tạo mới'}
        </Button>
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          publishDate: dayjs(),
          status: 'DRAFT'
        }}
      >
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="thumbnailUrl"
          label="Thumbnail"
          rules={[{ required: true, message: 'Please upload a thumbnail!' }]}
        >
          <div className="flex flex-col gap-2">
            <Upload
              name="file"
              customRequest={handleUpload}
              beforeUpload={beforeUpload}
              maxCount={1}
              showUploadList={false}
            >
              <Button icon={uploading ? <LoadingOutlined /> : <UploadOutlined />} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload Thumbnail'}
              </Button>
            </Upload>
            {thumbnailPreview && (
              <div className="mt-2">
                <img
                  src={thumbnailPreview}
                  alt="thumbnail preview"
                  style={{ maxWidth: '200px', maxHeight: '120px', objectFit: 'cover' }}
                />
              </div>
            )}
          </div>
        </Form.Item>

        <Form.Item
          name="categoryGroupId"
          label="Nhóm danh mục"
          rules={[{ required: true, message: 'Please select a category group!' }]}
        >
          <Select>
            {categoryGroups.map((group) => (
              <Select.Option key={group.id} value={group.id}>
                {group.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="DRAFT">Draft</Select.Option>
            <Select.Option value="PUBLISHED">Published</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="publishDate"
          label="Ngày xuất bản"
          rules={[{ required: true, message: 'Please select a publish date!' }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>

        <Form.Item
          name="content"
          label="Nội dung"
          rules={[{ required: true, message: 'Please input the content!' }]}
        >
          <ReactQuill
            theme="snow"
            modules={modules}
            style={{ height: '300px' }}
          />
        </Form.Item>
        <div style={{ height: '50px' }}></div>
      </Form>
    </Modal>
  );
};

export default ArticleModal;
