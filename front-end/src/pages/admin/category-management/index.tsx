import React, { useEffect, useState } from 'react';
import { Space, Table, Button, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import categoryService, { Category, CategoryGroup } from '../../../services/categoryService';
import CategoryModal from './components/CategoryModal.tsx';
import CategoryGroupModal from './components/CategoryGroupModal.tsx';

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [categoryGroupModalVisible, setCategoryGroupModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState<CategoryGroup | null>(null);
  const [mode, setMode] = useState<'create' | 'edit'>('create');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [categoriesData, groupsData] = await Promise.all([
        categoryService.getAllCategories(),
        categoryService.getAllCategoryGroups()
      ]);
      
      setCategories(categoriesData);
      setCategoryGroups(groupsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      message.error('Failed to fetch data');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const categoryColumns: ColumnsType<Category> = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Nhóm danh mục',
      dataIndex: 'categoryGroups',
      key: 'categoryGroups',
      render: (groups: CategoryGroup[]) => groups.map(g => g.name).join(', '),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => {
            setSelectedCategory(record);
            setMode('edit');
            setCategoryModalVisible(true);
          }}>Chỉnh sửa</Button>
          <Button type="link" danger onClick={async () => {
            try {
              await categoryService.deleteCategory(record.id!);
              message.success('Category deleted successfully');
              fetchData();
            } catch (error) {
              console.error('Failed to delete category:', error);
              message.error('Failed to delete category');
            }
          }}>Xóa</Button>
        </Space>
      ),
    },
  ];

  const categoryGroupColumns: ColumnsType<CategoryGroup> = [
    {
      title: 'Tên nhóm danh mục',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => {
            setSelectedCategoryGroup(record);
            setMode('edit');
            setCategoryGroupModalVisible(true);
          }}>Chỉnh sửa</Button>
          <Button type="link" danger onClick={async () => {
            try {
              await categoryService.deleteCategoryGroup(record.id!);
              message.success('Category group deleted successfully');
              fetchData();
            } catch (error) {
              console.error('Failed to delete category group:', error);
              message.error('Failed to delete category group');
            }
          }}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Nhóm danh mục</h2>
          <Button type="primary" onClick={() => {
            setMode('create');
            setSelectedCategoryGroup(null);
            setCategoryGroupModalVisible(true);
          }}>
            Thêm nhóm danh mục
          </Button>
        </div>
        <Table
          columns={categoryGroupColumns}
          dataSource={categoryGroups}
          loading={loading}
          rowKey="id"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Danh mục</h2>
          <Button type="primary" onClick={() => {
            setMode('create');
            setSelectedCategory(null);
            setCategoryModalVisible(true);
          }}>
            Thêm danh mục
          </Button>
        </div>
        <Table
          columns={categoryColumns}
          dataSource={categories}
          loading={loading}
          rowKey="id"
        />
      </div>

      <CategoryModal
        visible={categoryModalVisible}
        onClose={() => {
          setCategoryModalVisible(false);
          setSelectedCategory(null);
        }}
        onSuccess={() => {
          setCategoryModalVisible(false);
          setSelectedCategory(null);
          fetchData();
        }}
        mode={mode}
        record={selectedCategory || undefined}
        categoryGroups={categoryGroups}
      />

      <CategoryGroupModal
        visible={categoryGroupModalVisible}
        onClose={() => {
          setCategoryGroupModalVisible(false);
          setSelectedCategoryGroup(null);
        }}
        onSuccess={() => {
          setCategoryGroupModalVisible(false);
          setSelectedCategoryGroup(null);
          fetchData();
        }}
        mode={mode}
        record={selectedCategoryGroup || undefined}
      />
    </div>
  );
};

export default CategoryManagement;