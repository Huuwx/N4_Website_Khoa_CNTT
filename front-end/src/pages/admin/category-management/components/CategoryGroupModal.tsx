import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { CategoryGroup } from '../../../../services/categoryService';
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

  useEffect(() => {
    if (visible && mode === 'edit' && record) {
      form.setFieldsValue({
        name: record.name,
      });
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
      
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error('Failed to save category group:', error);
      message.error('Failed to save category group');
    }
  };

  return (
    <Modal
      title={`${mode === 'create' ? 'Tạo mới' : 'Chỉnh sửa'} Nhóm danh mục`}
      open={visible}
      onOk={handleSubmit}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ name: '' }}
      >
        <Form.Item
          name="name"
          label="Tên nhóm danh mục"
          rules={[{ required: true, message: 'Please input the category group name!' }]}
        >
          <Input placeholder="Enter category group name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryGroupModal;