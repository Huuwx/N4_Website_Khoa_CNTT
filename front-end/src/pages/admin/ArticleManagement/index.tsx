import { useEffect, useState, useCallback } from 'react';
import { Button, Input, Select, Table, message, Tag } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import articleService from '../../../services/articleService';
import categoryService from '../../../services/categoryService';
import ArticleModal from './components/ArticleModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import type { Article } from '../../../services/articleService';
import { CategoryGroup } from '../../../services/categoryService';

const { Search } = Input;

const ArticleManagement = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState<number | undefined>();
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
        categoryGroupId: selectedCategoryGroup,
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

  const fetchCategoryGroups = async () => {
    try {
      const groupsResponse = await categoryService.getAllCategoryGroups();
      setCategoryGroups(groupsResponse);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch category groups';
      message.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [currentPage, pageSize, searchText, selectedCategoryGroup, selectedStatus, sortField, sortOrder]);

  useEffect(() => {
    fetchCategoryGroups();
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
      title: 'Nhóm danh mục',
      dataIndex: ['categoryGroup', 'name'],
      key: 'categoryGroup',
      render: (_, record) => (
        <Tag color="blue">{record.categoryGroup.name}</Tag>
      ),
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
          placeholder="Lọc theo nhóm danh mục"
          allowClear
          style={{ width: 200 }}
          onChange={(value) => setSelectedCategoryGroup(value)}
          options={categoryGroups.map((group) => ({
            value: group.id,
            label: group.name,
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
        categoryGroups={categoryGroups}
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
