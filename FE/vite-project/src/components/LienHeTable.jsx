import { useEffect, useState } from "react";
import { Table, Button, Tag, Input, Select, DatePicker } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import api from "../services/api";
import HeaderNav from "./HeaderNav";

export default function LienHeTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchDate, setSearchDate] = useState(null);
  const navigate = useNavigate(); // Hook để chuyển trang

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api.get("/yeu-cau-lien-he");
      setData(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  // Chuyển sang trang LienHeDetail khi nhấn chỉnh sửa
  const handleEdit = (record) => {
    navigate(`/lienhe/${record.id}`, { state: { request: record } });
  };

  // Xử lý tìm kiếm
  const handleSearch = () => {
    let filtered = data;

    if (searchName) {
      filtered = filtered.filter((item) =>
        item.hoTen.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchStatus) {
      filtered = filtered.filter((item) => item.trangThai === searchStatus);
    }

    if (searchDate) {
      const formattedSearchDate = searchDate.format("D/M/YYYY");
      filtered = filtered.filter((item) => item.ngayLienHe === formattedSearchDate);
    }

    setFilteredData(filtered);
  };

  // Cấu hình cột cho bảng
  const columns = [
    { title: "STT", dataIndex: "stt", key: "stt", render: (_, __, index) => index + 1 },
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
        <Button type="primary" onClick={() => handleEdit(record)}>Chỉnh sửa</Button>
      ),
    },
  ];

  return (
    <div className="container">
      <HeaderNav />
      <h1 className="text-xl font-bold mb-4">QUẢN LÝ YÊU CẦU LIÊN HỆ</h1>

      {/* Thanh tìm kiếm */}
      <div className="flex gap-4 mb-4">
        <DatePicker
          format="DD/MM/YYYY"
          placeholder="Chọn ngày"
          value={searchDate}
          onChange={setSearchDate}
        />
        <Select
          placeholder="Chọn trạng thái"
          allowClear
          onChange={setSearchStatus}
          style={{ width: 150 }}
        >
          <Select.Option value="Đang xử lý">Đang xử lý</Select.Option>
          <Select.Option value="Đã xử lý">Đã xử lý</Select.Option>
        </Select>
        <Input
          placeholder="Nhập họ tên"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={handleSearch}>Tìm kiếm</Button>
      </div>

      {/* Bảng dữ liệu */}
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 5, position: ["bottomCenter"] }}
        className="contact-table"
      />
    </div>
  );
}
