import { useEffect, useState, useCallback } from 'react';
import { Button, Input, Select, Table, message, Tag } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import articleService from '../../services/articleService';
import categoryService from '../../services/categoryService';
import ArticleModal from './components/ArticleModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import type { Article } from '../../services/articleService';
import { CategoryResponse } from '../../services/categoryService';

const { Search } = Input;

const ArticleManagement = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<'DRAFT' | 'PUBLISHED' | undefined>();
  const [sortField, setSortField] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend' | undefined>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await articleService.getArticles({
        page: currentPage - 1,
        size: pageSize,
        categoryId: selectedCategory,
        search: searchText,
        status: selectedStatus,
        sort: sortField ? `${sortField},${sortOrder === 'ascend' ? 'asc' : 'desc'}` : undefined
      });
      if (response.status === "SUCCESS") {
        setArticles(response.data.content);
        setTotalElements(response.data.totalElements);
      } else {
        throw new Error(response.message);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch articles';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback((value: string) => {
    const timer = setTimeout(() => {
      setSearchText(value);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
      message.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [currentPage, pageSize, searchText, selectedCategory, selectedStatus, sortField, sortOrder]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (record: Article) => {
    setSelectedArticle(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record: Article) => {
    setSelectedArticle(record);
    setIsDeleteModalVisible(true);
  };

  const handleModalClose = (refresh?: boolean) => {
    setIsModalVisible(false);
    setSelectedArticle(null);
    if (refresh) {
      fetchArticles();
    }
  };

  const handleDeleteModalClose = (refresh?: boolean) => {
    setIsDeleteModalVisible(false);
    setSelectedArticle(null);
    if (refresh) {
      fetchArticles();
    }
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Article> | SorterResult<Article>[]
  ) => {
    const { field, order } = Array.isArray(sorter) ? sorter[0] : sorter;
    setSortField(field?.toString());
    setSortOrder(order as 'ascend' | 'descend' | undefined);
  };

  const columns: ColumnsType<Article> = [
    {
      title: 'STT',
      key: 'index',
      width: 60,
      render: (_text: unknown, _record: Article, index: number) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Ảnh',
      dataIndex: 'thumbnailUrl',
      key: 'thumbnailUrl',
      width: 120,
      render: (url: string) => (
        <img src={url} alt="thumbnail" style={{ width: '100px', height: '60px', objectFit: 'cover' }} />
      ),
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      sorter: true,
    },
    {
      title: 'Danh mục',
      dataIndex: ['category', 'name'],
      key: 'category',
      sorter: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'DRAFT' | 'PUBLISHED') => (
        <Tag color={status === 'PUBLISHED' ? 'green' : 'gold'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Thời gian đăng',
      dataIndex: 'publishDate',
      key: 'publishDate',
      sorter: true,
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-4xl font-bold">Quản lý bài viết</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Thêm bài viết
        </Button>
      </div>

      <div className="mb-4 flex gap-4">
        <Search
          placeholder="Tìm bài viết..."
          allowClear
          onChange={(e) => debouncedSearch(e.target.value)}
          style={{ width: 300 }}
        />
        <Select
          placeholder="Lọc theo danh mục"
          allowClear
          style={{ width: 200 }}
          onChange={(value) => setSelectedCategory(value)}
          options={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
        />
        <Select
          placeholder="Lọc theo trạng thái"
          allowClear
          style={{ width: 200 }}
          onChange={(value) => setSelectedStatus(value)}
          options={[
            { value: 'DRAFT', label: 'Draft' },
            { value: 'PUBLISHED', label: 'Published' },
          ]}
        />
      </div>

      <Table
        columns={columns}
        dataSource={articles}
        rowKey="id"
        loading={loading}
        onChange={handleTableChange}
        pagination={{
          current: currentPage,
          pageSize,
          total: totalElements,
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
        }}
      />

      <ArticleModal
        visible={isModalVisible}
        article={selectedArticle}
        categories={categories}
        onClose={handleModalClose}
      />

      <DeleteConfirmModal
        visible={isDeleteModalVisible}
        article={selectedArticle}
        onClose={handleDeleteModalClose}
      />
    </div>
  );
};

export default ArticleManagement;
