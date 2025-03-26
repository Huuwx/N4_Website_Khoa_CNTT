import { useEffect, useState } from "react";
import { Table, Button, Tag, Input, Select, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import yeuCauLienHeService from "@/services/yeucaulienheService"; // ✅ Import đúng
import type { Dayjs } from 'dayjs';

// Định nghĩa interface cho dữ liệu yêu cầu liên hệ
interface ContactRequest {
  id: number;
  ngayLienHe: string;
  name: string;
  email: string;
  message: string;
  status: "Chưa đọc" | "Đang xử lý" | "Đã xử lý";
}

export default function LienHeTable() {
  const [data, setData] = useState<ContactRequest[]>([]);
  const [filteredData, setFilteredData] = useState<ContactRequest[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [searchStatus, setSearchStatus] = useState<string>("");
  const [searchDate, setSearchDate] = useState<Dayjs | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await yeuCauLienHeService.getAllYeuCauLienHe(); // ✅ Gọi API đúng

      const contactData: ContactRequest[] = response.map((item) => ({
        id: Number(item.id), 
        ngayLienHe: item.ngayLienHe, 
        name: item.name,
        email: item.email,
        message: item.message,
        status: item.status, 
      }));

      setData(contactData);
      setFilteredData(contactData);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách yêu cầu liên hệ:", error);
    }
  };

  const handleEdit = (record: ContactRequest) => {
    navigate(`/quan-ly-yeu-cau-lien-he/${record.id}`, { state: { request: record } });
  };

  const handleSearch = () => {
    let filtered = [...data];

    if (searchName) {
      filtered = filtered.filter((item) =>
        item.name?.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchStatus) {
      filtered = filtered.filter((item) => item.status === searchStatus);
    }

    if (searchDate) {
      const formattedSearchDate = searchDate.format("D/M/YYYY");
      filtered = filtered.filter((item) => item.ngayLienHe === formattedSearchDate);
    }

    setFilteredData(filtered);
  };

  const columns = [
    { 
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (_: unknown, __: unknown, index: number) => index + 1 
    },
    { title: "Ngày liên hệ", dataIndex: "ngayLienHe", key: "ngayLienHe" },
    { title: "Họ tên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Nội dung", dataIndex: "message", key: "message" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <Tag color={text === "Chưa đọc" ? "red" : text === "Đang xử lý" ? "orange" : "green"}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: unknown, record: ContactRequest) => (
        <Button type="primary" onClick={() => handleEdit(record)}>
          Chỉnh sửa
        </Button>
      ),
    },
  ];

  return (
    <div className="container">
      <h1 className="text-xl font-bold mb-4">QUẢN LÝ YÊU CẦU LIÊN HỆ</h1>

      <div className="flex gap-4 mb-4">
        <DatePicker
          format="DD/MM/YYYY"
          placeholder="Chọn ngày"
          value={searchDate}
          onChange={(date) => setSearchDate(date)}
        />
        <Select
          placeholder="Chọn trạng thái"
          allowClear
          onChange={(value) => setSearchStatus(value || "")}
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
        <Button type="primary" onClick={handleSearch}>
          Tìm kiếm
        </Button>
      </div>

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
