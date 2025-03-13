import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import api from "../services/api";
import HeaderNav from "./HeaderNav";

export default function DanhMucTable() {
  const [danhMucs, setDanhMucs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm(); // Form instance

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
    form.setFieldsValue(
      item || { tenDanhMuc: "", nhomDanhMuc: undefined } // Đặt giá trị mặc định
    );
    setIsModalOpen(true);
  };

  // Xử lý thêm hoặc cập nhật danh mục
  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Kiểm tra validation
      if (editingItem) {
        await api.put(`/danh-muc/${editingItem.id}`, values);
        message.success("Cập nhật danh mục thành công!");
      } else {
        await api.post("/danh-muc", values);
        message.success("Thêm danh mục mới thành công!");
      }
      setIsModalOpen(false);
      fetchDanhMucs();
    } catch (error) {
      console.error("Lỗi khi lưu danh mục:", error);
      message.error("Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  // Xử lý xóa danh mục
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa danh mục này không?",
      okText: "Xác Nhận",
      okType: "danger",
      cancelText: "Hủy Bỏ",
      onOk: async () => {
        try {
          await api.delete(`/danh-muc/${id}`);
          message.success("Xóa danh mục thành công!");
          fetchDanhMucs();
        } catch (error) {
          console.error("Lỗi khi xóa danh mục:", error);
          message.error("Xóa danh mục thất bại!");
        }
      },
    });
  };

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (_, __, index) => index + 1,
    },
    { title: "Nhóm Danh Mục", dataIndex: "nhomDanhMuc", key: "nhomDanhMuc" },
    { title: "Tên Danh Mục", dataIndex: "tenDanhMuc", key: "tenDanhMuc" },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)} className="mr-2">
            Sửa
          </Button>
          <Button onClick={() => handleDelete(record.id)} danger>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <HeaderNav danhMucs={danhMucs} />
      <h1 className="text-xl font-bold mb-4">Quản Lý Danh Mục</h1>
      <Button type="primary" onClick={() => showModal()}>
        Thêm Danh Mục
      </Button>
      <Table
        columns={columns}
        dataSource={danhMucs}
        rowKey="id"
        className="mt-4"
        pagination={{ pageSize: 5, showSizeChanger: false, position: ["bottomCenter"] }}
      />

      {/* Modal Form */}
      <Modal
        title={editingItem ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Hủy Bỏ
          </Button>,
          <Button type="primary" onClick={handleOk} key="submit" style={{ backgroundColor: "red", borderColor: "red" }}>
            Xác Nhận
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên danh mục"
            name="tenDanhMuc"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>
          <Form.Item
            label="Nhóm danh mục"
            name="nhomDanhMuc"
            rules={[{ required: true, message: "Vui lòng chọn nhóm danh mục!" }]}
          >
            <Select placeholder="Chọn nhóm danh mục">
              <Select.Option value="Tuyển sinh">Tuyển sinh</Select.Option>
              <Select.Option value="Giới thiệu">Giới thiệu</Select.Option>
              <Select.Option value="Doanh nghiệp">Doanh nghiệp</Select.Option>
              <Select.Option value="Đào tạo">Đào tạo</Select.Option>
              <Select.Option value="Khoa Công Nghệ">Khoa Công Nghệ</Select.Option>
              <Select.Option value="Hợp Tác">Hợp Tác</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
