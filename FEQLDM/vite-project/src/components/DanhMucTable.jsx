import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import api from "../services/api";
import HeaderNav from "./HeaderNav";

export default function DanhMucTable() {
  const [danhMucs, setDanhMucs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [groupForm] = Form.useForm();
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [nhomDanhMucList, setNhomDanhMucList] = useState([]);

  useEffect(() => {
    fetchDanhMucs();
    fetchNhomDanhMucs();
  }, []);

  const fetchDanhMucs = async () => {
    try {
      const response = await api.get("/danh-muc");
      setDanhMucs(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  const fetchNhomDanhMucs = async () => {
    try {
      const nhomResponse = await api.get("/nhom-danh-muc");
      setNhomDanhMucList(nhomResponse.data);
    } catch (error) {
      console.error("Lỗi khi lấy nhóm danh mục:", error);
    }
  };

  const showModal = (item = null) => {
    setEditingItem(item);
    form.setFieldsValue(item ? { name: item.tenDanhMuc, group: item.nhomDanhMuc?.id } : { name: "", group: undefined });
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        tenDanhMuc: values.name,
        nhomDanhMuc: { id: values.group }
      };

      if (editingItem) {
        // Cập nhật danh mục
        await api.put(`/danh-muc/${editingItem.id}`, payload);
        message.success("Cập nhật danh mục thành công!");
      } else {
        // Thêm danh mục
        await api.post("/danh-muc", payload);
        message.success("Thêm danh mục thành công!");
      }

      fetchDanhMucs();
      setIsModalOpen(false);
      setEditingItem(null);
      form.resetFields();
    } catch (error) {
      console.error("Lỗi khi thêm/cập nhật danh mục:", error);
      message.error("Thao tác thất bại!");
    }
  };

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

  const showGroupModal = () => {
    setIsGroupModalOpen(true);
    groupForm.resetFields();
  };

  const handleDeleteGroup = async (groupId) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xóa nhóm danh mục này không?",
      okText: "Xác Nhận",
      okType: "danger",
      cancelText: "Hủy Bỏ",
      onOk: async () => {
        try {
          await api.delete(`/nhom-danh-muc/${groupId}`);
          message.success("Xóa nhóm danh mục thành công!");
          fetchNhomDanhMucs();
        } catch (error) {
          console.error("Lỗi khi xóa nhóm danh mục:", error);
          message.error("Xóa nhóm danh mục thất bại!");
        }
      },
    });
  };

  const handleAddGroup = async () => {
    try {
      const values = await groupForm.validateFields();
      const newGroupName = values.newGroup.trim();
  
      // Kiểm tra xem nhóm danh mục đã tồn tại chưa (đảm bảo `tenNhom` không null)
      const isExisting = nhomDanhMucList.some(group => (group.tenNhom || "").toLowerCase() === newGroupName.toLowerCase());
  
      if (isExisting) {
        message.error("Nhóm danh mục đã tồn tại!");
        return;
      }
  
      await api.post("/nhom-danh-muc/create", { tenNhom: newGroupName });
      message.success("Thêm nhóm danh mục thành công!");
      fetchNhomDanhMucs();
      setIsGroupModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi thêm nhóm danh mục:", error);
      message.error("Thêm nhóm danh mục thất bại!");
    }
  };
  

  const columns = [
    { title: "STT", dataIndex: "stt", key: "stt", render: (_, __, index) => index + 1 },
    { title: "Nhóm Danh Mục", dataIndex: ["nhomDanhMuc", "tenNhom"], key: "group" },
    { title: "Tên Danh Mục", dataIndex: "tenDanhMuc", key: "name" },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)} className="mr-2">📝</Button>
          <Button onClick={() => handleDelete(record.id)} danger>🗑️</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <HeaderNav danhMucs={danhMucs} />
      <h1 className="text-xl font-bold mb-4">Quản Lý Danh Mục</h1>
      <Button type="primary" onClick={() => showModal()}>Thêm Danh Mục</Button>
      <Button type="dashed" onClick={showGroupModal} className="ml-2">Thêm Nhóm Danh Mục</Button>

      <Table
        columns={columns}
        dataSource={danhMucs.map(item => ({ ...item, key: item.id }))}
        rowKey="id"
        className="mt-4"
        pagination={{ pageSize: 5 }}
      />

      {/* Modal thêm/sửa danh mục */}
      <Modal 
        title={editingItem ? "Chỉnh sửa danh mục" : "Thêm danh mục"} 
        open={isModalOpen} 
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>Hủy Bỏ</Button>, 
          <Button type="primary" onClick={handleOk} key="submit">Xác Nhận</Button>
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Tên danh mục" name="name" rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}>
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>
          <Form.Item label="Nhóm danh mục" name="group" rules={[{ required: true, message: "Vui lòng chọn nhóm danh mục!" }]}>
            <Select placeholder="Chọn nhóm danh mục">
              {nhomDanhMucList.map((group) => (
                <Select.Option key={group.id} value={group.id}>
                  <div className="flex justify-between items-center">
                    <span>{group.tenNhom}</span>
                    <Button
                      type="link"
                      danger
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteGroup(group.id);
                      }}
                    >
                      ❌
                    </Button>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal thêm nhóm danh mục */}
      <Modal 
        title="Thêm Nhóm Danh Mục" 
        open={isGroupModalOpen} 
        onCancel={() => setIsGroupModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsGroupModalOpen(false)}>Hủy Bỏ</Button>, 
          <Button type="primary" onClick={handleAddGroup} key="submit">Xác Nhận</Button>
        ]}
      >
        <Form form={groupForm} layout="vertical">
          <Form.Item label="Tên nhóm danh mục" name="newGroup" rules={[{ required: true, message: "Vui lòng nhập tên nhóm danh mục!" }]}>
            <Input placeholder="Nhập tên nhóm danh mục" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
