import { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Select } from "antd";
import api from "../services/api";
import HeaderNav from "./HeaderNav";
export default function DanhMucTable() {
  const [danhMucs, setDanhMucs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ tenDanhMuc: "", nhomDanhMuc: "" });

  useEffect(() => {
    fetchDanhMucs();
  }, []);

  const fetchDanhMucs = async () => {
    try {
      const response = await api.get("/danh-muc");
      setDanhMucs(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  // Hiển thị modal
  const showModal = (item = null) => {
    setEditingItem(item);
    setFormData(item ? { tenDanhMuc: item.tenDanhMuc, nhomDanhMuc: item.nhomDanhMuc } : { tenDanhMuc: "", nhomDanhMuc: "" });
    setIsModalOpen(true);
  };

  // Xử lý thêm hoặc cập nhật danh mục
  const handleOk = async () => {
    try {
      if (editingItem) {
        await api.put(`/danh-muc/${editingItem.id}`, formData);
      } else {
        await api.post("/danh-muc", formData);
      }
      setIsModalOpen(false);
      fetchDanhMucs();
    } catch (error) {
      console.error("Lỗi khi lưu danh mục:", error);
    }
  };

  // Xử lý xóa danh mục
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa danh mục này?")) {
      try {
        await api.delete(`/danh-muc/${id}`);
        fetchDanhMucs();
      } catch (error) {
        console.error("Lỗi khi xóa danh mục:", error);
      }
    }
  };

  // Cấu hình cột cho bảng
  const columns = [
    { title: "STT", dataIndex: "stt", key: "stt", render: (_, __, index) => index + 1 },
    { title: "Tên Danh Mục", dataIndex: "tenDanhMuc", key: "tenDanhMuc" },
    { title: "Nhóm Danh Mục", dataIndex: "nhomDanhMuc", key: "nhomDanhMuc" },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)} className="mr-2">Sửa</Button>
          <Button onClick={() => handleDelete(record.id)} danger>Xóa</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <HeaderNav />
      <h1 className="text-xl font-bold mb-4">Quản Lý Danh Mục</h1>
      <Button type="primary" onClick={() => showModal()}>Thêm Danh Mục</Button>
      <Table
  columns={columns}
  dataSource={danhMucs}
  rowKey="id"
  className="mt-4"
  pagination={{
    pageSize: 5, // Hiển thị 5 danh mục mỗi trang
    showSizeChanger: false, // Không cho phép thay đổi số bản ghi mỗi trang
    
    position: ["bottomCenter"], // Đặt phân trang ở giữa phía dưới bảng
    itemRender: (page, type, originalElement) => {
      if (type === "prev") {
        return <span className="px-2 py-1 cursor-pointer">◄</span>;
      }
      if (type === "next") {
        return <span className="px-2 py-1 cursor-pointer">►</span>;
      }
      return originalElement;
    },
  }}
/>
      
      {/* Modal Form */}
      <Modal title={editingItem ? "Chỉnh sửa danh mục" : "Thêm danh mục"} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Input placeholder="Tên danh mục" value={formData.tenDanhMuc} onChange={(e) => setFormData({ ...formData, tenDanhMuc: e.target.value })} className="mb-2" />
        <Select value={formData.nhomDanhMuc} onChange={(value) => setFormData({ ...formData, nhomDanhMuc: value })} className="w-full">
          <Select.Option value="Tuyển sinh">Tuyển sinh</Select.Option>
          <Select.Option value="Giới thiệu">Giới thiệu</Select.Option>
          <Select.Option value="Doanh nghiệp">Doanh nghiệp</Select.Option>
          <Select.Option value="Đào tạo">Đào tạo</Select.Option>
        </Select>
      </Modal>
    </div>
  );
}
