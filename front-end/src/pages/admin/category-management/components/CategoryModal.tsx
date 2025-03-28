import React from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { Category, CategoryGroup, CategoryType } from '../../../../services/categoryService';
import categoryService from '../../../../services/categoryService';

interface CategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode: 'create' | 'edit';
  record?: Category;
  categoryGroups: CategoryGroup[];
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  visible,
  onClose,
  onSuccess,
  mode,
  record,
  categoryGroups = [],
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (visible && mode === 'edit' && record) {
      form.setFieldsValue({
        name: record.name,
        slug: record.slug,
        type: record.type,
        pageUrl: record.pageUrl,
        categoryGroupIds: record.categoryGroups.map(group => group.id),
      });
    } else {
      form.resetFields();
    }
  }, [visible, mode, record, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      const request = {
        name: values.name,
        slug: values.slug,
        type: values.type,
        pageUrl: values.pageUrl,
        categoryGroupIds: values.categoryGroupIds,
      };

      if (mode === 'create') {
        await categoryService.createCategory(request);
        message.success('Category created successfully');
      } else {
        await categoryService.updateCategory(record!.id!, request);
        message.success('Category updated successfully');
      }

      onSuccess();
    } catch (error) {
      console.error('Failed to save category:', error);
      message.error('Failed to save category');
    }
  };

  return (
    <Modal
      title={mode === 'create' ? 'Tạo mới danh mục' : 'Cập nhật danh mục'}
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ 
          name: '', 
          slug: '', 
          type: CategoryType.ARTICLES,
          pageUrl: '',
          categoryGroupIds: [] 
        }}
      >
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true, message: 'Please input the category name!' }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item
          name="slug"
          label="Slug"
          rules={[{ required: true, message: 'Please input the category slug!' }]}
        >
          <Input placeholder="Enter category slug" />
        </Form.Item>

        <Form.Item
          name="type"
          label="Loại danh mục"
          rules={[{ required: true, message: 'Please select the category type!' }]}
        >
          <Select>
            <Select.Option value={CategoryType.ARTICLES}>Articles</Select.Option>
            <Select.Option value={CategoryType.STATIC_PAGE}>Static Page</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="pageUrl"
          label="URL trang"
          rules={[{ required: true, message: 'Please input the page URL!' }]}
        >
          <Input placeholder="Enter page URL" />
        </Form.Item>

        <Form.Item
          name="categoryGroupIds"
          label="Nhóm danh mục"
          rules={[{ required: true, message: 'Please select at least one category group!' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select category groups"
            optionFilterProp="children"
          >
            {(categoryGroups || []).map(group => (
              <Select.Option key={group.id} value={group.id!}>
                {group.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;