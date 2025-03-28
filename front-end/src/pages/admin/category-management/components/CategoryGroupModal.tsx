import React from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { CategoryGroup, CategoryType } from '../../../../services/categoryService';
import categoryService from '../../../../services/categoryService';

interface CategoryGroupModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode: 'create' | 'edit';
  record?: CategoryGroup;
}

const CategoryGroupModal: React.FC<CategoryGroupModalProps> = ({
  visible,
  onClose,
  onSuccess,
  mode,
  record,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (visible && mode === 'edit' && record) {
      form.setFieldsValue({
        name: record.name,
        slug: record.slug,
        type: record.type,
        pageUrl: record.pageUrl,
      });
    } else {
      form.resetFields();
    }
  }, [visible, mode, record, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (mode === 'create') {
        await categoryService.createCategoryGroup(values);
        message.success('Category group created successfully');
      } else {
        await categoryService.updateCategoryGroup(record!.id!, values);
        message.success('Category group updated successfully');
      }

      onSuccess();
    } catch (error) {
      console.error('Failed to save category group:', error);
      message.error('Failed to save category group');
    }
  };

  return (
    <Modal
      title={mode === 'create' ? 'Tạo mới nhóm danh mục' : 'Cập nhật nhóm danh mục'}
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
        }}
      >
        <Form.Item
          name="name"
          label="Tên nhóm danh mục"
          rules={[{ required: true, message: 'Please input the category group name!' }]}
        >
          <Input placeholder="Enter category group name" />
        </Form.Item>

        <Form.Item
          name="slug"
          label="Slug"
          rules={[{ required: true, message: 'Please input the category group slug!' }]}
        >
          <Input placeholder="Enter category group slug" />
        </Form.Item>

        <Form.Item
          name="type"
          label="Loại nhóm danh mục"
          rules={[{ required: true, message: 'Please select the category group type!' }]}
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
      </Form>
    </Modal>
  );
};

export default CategoryGroupModal;