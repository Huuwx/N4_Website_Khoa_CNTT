import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import { apiService } from "@/services/api";

interface NhomDanhMuc {
  id: number;
  tenNhom: string;
}

interface DanhMuc {
  id: number;
  tenDanhMuc: string;
  nhomDanhMuc?: NhomDanhMuc;
}

export default function DanhMucTable() {
  const [danhMucs, setDanhMucs] = useState<DanhMuc[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<DanhMuc | null>(null);
  const [form] = Form.useForm();
  const [groupForm] = Form.useForm();
  const [isGroupModalOpen, setIsGroupModalOpen] = useState<boolean>(false);
  const [nhomDanhMucList, setNhomDanhMucList] = useState<NhomDanhMuc[]>([]);

  useEffect(() => {
    fetchDanhMucs();
    fetchNhomDanhMucs();
  }, []);

  const fetchDanhMucs = async (): Promise<void> => {
    try {
      const response = await apiService.get("/danh-muc");
      setDanhMucs(response.data as DanhMuc[]);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  const fetchNhomDanhMucs = async (): Promise<void> => {
    try {
      const nhomResponse = await apiService.get("/nhom-danh-muc");
      setNhomDanhMucList(nhomResponse.data as NhomDanhMuc[]);
    } catch (error) {
      console.error("Lỗi khi lấy nhóm danh mục:", error);
    }
  };

  const showModal = (item: DanhMuc | null = null): void => {
    setEditingItem(item);
    form.setFieldsValue(item 
      ? { name: item.tenDanhMuc, group: item.nhomDanhMuc?.id } 
      : { name: "", group: undefined });
    setIsModalOpen(true);
  };

  const handleOk = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      const payload = {
        tenDanhMuc: values.name,
        nhomDanhMuc: { id: values.group }
      };

      if (editingItem) {
        // Cập nhật danh mục
        await apiService.put(`/danh-muc/${editingItem.id}`, payload);
        message.success("Cập nhật danh mục thành công!");
      } else {
        // Thêm danh mục
        await apiService.post("/danh-muc", payload);
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

  const handleDelete = (id: number): void => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa danh mục này không?",
      okText: "Xác Nhận",
      okType: "danger",
      cancelText: "Hủy Bỏ",
      onOk: async () => {
        try {
          await apiService.delete(`/danh-muc/${id}`);
          message.success("Xóa danh mục thành công!");
          fetchDanhMucs();
        } catch (error) {
          console.error("Lỗi khi xóa danh mục:", error);
          message.error("Xóa danh mục thất bại!");
        }
      },
    });
  };

  const showGroupModal = (): void => {
    setIsGroupModalOpen(true);
    groupForm.resetFields();
  };

  const handleDeleteGroup = async (groupId: number): Promise<void> => {
    Modal.confirm({
      title: "Bạn có chắc muốn xóa nhóm danh mục này không?",
      okText: "Xác Nhận",
      okType: "danger",
      cancelText: "Hủy Bỏ",
      onOk: async () => {
        try {
          await apiService.delete(`/nhom-danh-muc/${groupId}`);
          message.success("Xóa nhóm danh mục thành công!");
          fetchNhomDanhMucs();
        } catch (error) {
          console.error("Lỗi khi xóa nhóm danh mục:", error);
          message.error("Xóa nhóm danh mục thất bại!");
        }
      },
    });
  };

  const handleAddGroup = async (): Promise<void> => {
    try {
      const values = await groupForm.validateFields();
      const newGroupName = values.newGroup.trim();
  
      // Kiểm tra xem nhóm danh mục đã tồn tại chưa (đảm bảo `tenNhom` không null)
      const isExisting = nhomDanhMucList.some(group => 
        (group.tenNhom || "").toLowerCase() === newGroupName.toLowerCase()
      );
  
      if (isExisting) {
        message.error("Nhóm danh mục đã tồn tại!");
        return;
      }
  
      await apiService.post("/nhom-danh-muc/create", { tenNhom: newGroupName });
      message.success("Thêm nhóm danh mục thành công!");
      fetchNhomDanhMucs();
      setIsGroupModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi thêm nhóm danh mục:", error);
      message.error("Thêm nhóm danh mục thất bại!");
    }
  };
  
  const columns = [
    { 
      title: "STT", 
      dataIndex: "stt", 
      key: "stt", 
      render: (_: unknown, record: DanhMuc, index: number) => index + 1
    },
    { 
      title: "Nhóm Danh Mục", 
      dataIndex: ["nhomDanhMuc", "tenNhom"], 
      key: "group" 
    },
    { 
      title: "Tên Danh Mục", 
      dataIndex: "tenDanhMuc", 
      key: "name" 
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: unknown, record: DanhMuc) => (
        <>
          <Button onClick={() => showModal(record)} className="mr-2">📝</Button>
          <Button onClick={() => handleDelete(record.id)} danger>🗑️</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      {/* <HeaderNav danhMucs={danhMucs} /> */}
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
