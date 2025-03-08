import { useEffect, useState } from "react";
import { Table, Button, Modal, Select, Tag } from "antd";
import api from "../services/api";
import HeaderNav from "./HeaderNav";

export default function LienHeTable() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api.get("/lien-he");
      setData(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  // Hiển thị modal để chỉnh sửa trạng thái yêu cầu
  const showModal = (record) => {
    setSelectedRequest(record);
    setStatus(record.trangThai);
    setIsModalOpen(true);
  };

  // Cập nhật trạng thái yêu cầu
  const handleUpdateStatus = async () => {
    try {
      await api.put(`/lien-he/${selectedRequest.id}`, { trangThai: status });
      setIsModalOpen(false);
      fetchRequests();
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };

  // Cấu hình cột cho bảng
  const columns = [
    { title: "STT", dataIndex: "stt", key: "stt", render: (_, __, index) => index + 1 },
    { title: "Mã yêu cầu", dataIndex: "maYeuCau", key: "maYeuCau" },
    { title: "Ngày liên hệ", dataIndex: "ngayLienHe", key: "ngayLienHe" },
    { title: "Họ tên", dataIndex: "hoTen", key: "hoTen" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Nội dung", dataIndex: "noiDung", key: "noiDung" },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (text) => (
        <Tag color={text === "Chưa đọc" ? "red" : text === "Đang xử lý" ? "orange" : "green"}>{text}</Tag>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Button type="primary" onClick={() => showModal(record)}>Chỉnh sửa</Button>
      ),
    },
  ];

  return (
    <div className="container">
      <HeaderNav />
      <h1 className="text-xl font-bold mb-4">QUẢN LÝ YÊU CẦU LIÊN HỆ</h1>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 5, position: ["bottomCenter"] }}
        className="contact-table"
      />

      {/* Modal chỉnh sửa trạng thái */}
      <Modal title="Chỉnh sửa trạng thái" open={isModalOpen} onOk={handleUpdateStatus} onCancel={() => setIsModalOpen(false)}>
        <Select value={status} onChange={(value) => setStatus(value)} className="w-full">
          <Select.Option value="Chưa đọc">Chưa đọc</Select.Option>
          <Select.Option value="Đang xử lý">Đang xử lý</Select.Option>
          <Select.Option value="Đã xử lý">Đã xử lý</Select.Option>
        </Select>
      </Modal>
    </div>
  );
}
