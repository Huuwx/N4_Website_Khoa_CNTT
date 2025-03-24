import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { Category, CategoryGroup } from '../../../../services/categoryService';
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
  categoryGroups = [], // Provide default empty array
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (mode === 'edit' && record) {
        form.setFieldsValue({
          name: record.name,
          categoryGroupIds: record.categoryGroups.map(group => group.id),
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, mode, record, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const request = {
        name: values.name,
        categoryGroupIds: values.categoryGroupIds,
      };

      if (mode === 'create') {
        await categoryService.createCategory(request);
        message.success('Category created successfully');
      } else {
        await categoryService.updateCategory(record!.id!, request);
        message.success('Category updated successfully');
      }

      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error('Failed to save category:', error);
      message.error('Failed to save category');
    }
  };

  return (
    <Modal
      title={`${mode === 'create' ? 'Tạo mới' : 'Chỉnh sửa'} danh mục`}
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
        initialValues={{ name: '', categoryGroupIds: [] }}
      >
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true, message: 'Please input the category name!' }]}
        >
          <Input placeholder="Enter category name" />
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