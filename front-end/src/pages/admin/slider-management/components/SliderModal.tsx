import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Switch, message, Upload, Button } from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload/interface";
import type { SliderRequest } from "../../../../services/sliderService";
import { sliderService } from "../../../../services/sliderService";
import uploadFile from "../../../../services/uploadService";

interface SliderModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SliderModal: React.FC<SliderModalProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [useImageUrl, setUseImageUrl] = useState(false);

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setThumbnailPreview(url);
    setUseImageUrl(!!url);
  };

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
      form.setFieldsValue({ imageUrl: imageUrl });
      setUseImageUrl(false);
      onSuccess?.(response);
      message.success('Tải ảnh lên thành công');
    } catch (error: unknown) {
      onError?.(error as Error);
      message.error('Không thể tải ảnh lên');
    } finally {
      setUploading(false);
    }
  };
  
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const sliderData: SliderRequest = {
        imageUrl: values.imageUrl,
        displayOrder: values.displayOrder,
        title: values.title,
        description: values.description,
        active: values.active,
      };
  
      await sliderService.createSlider(sliderData);
      message.success("Thêm ảnh thành công");
      handleReset();
      onSuccess();
    } catch {
      message.error("Không thể thêm ảnh");
    }
  };

  const handleReset = () => {
    form.resetFields();
    setThumbnailPreview('');
    setUseImageUrl(false);
  };

  React.useEffect(() => {
    if (!visible) {
      handleReset();
    }
  }, [visible]);

  return (
    <Modal
      title="Thêm ảnh mới"
      open={visible}
      onOk={handleSubmit}
      onCancel={onClose}
      confirmLoading={uploading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="imageUrl"
          label="Ảnh"
          rules={[{ required: true, message: "Vui lòng nhập link ảnh hoặc tải ảnh lên" }]}
        >
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Nhập link ảnh"
              onChange={handleImageUrlChange}
              disabled={uploading || (!useImageUrl && thumbnailPreview !== '')}
            />
            <Upload
              name="file"
              customRequest={handleUpload}
              beforeUpload={beforeUpload}
              maxCount={1}
              showUploadList={false}
              disabled={useImageUrl}
            >
              <Button
                icon={uploading ? <LoadingOutlined /> : <UploadOutlined />}
                disabled={uploading || useImageUrl}
              >
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
          label="Thứ tự hiển thị"
          name="displayOrder"
          rules={[{ required: true, message: "Vui lòng nhập thứ tự hiển thị" }]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>

        <Form.Item label="Tiêu đề" name="title">
          <Input />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Hiển thị" name="active" valuePropName="checked" initialValue={true}>
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SliderModal;