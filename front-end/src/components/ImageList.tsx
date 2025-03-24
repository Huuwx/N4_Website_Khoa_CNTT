import { useState } from "react";
import { Table, Button, message, Modal } from "antd";
import { imageService } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";
import ImageUpload from "./ImageUpload";

interface ImageData {
  idAnh: string | number;
  anh: string;
  stt?: number;
}

interface ImageListProps {
  images: ImageData[];
  fetchImages: () => void;
}

const ImageList = ({ images, fetchImages }: ImageListProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | number | null>(null);
  const navigate = useNavigate();

  const handleDeleteConfirm = (id: string | number) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) {
      message.error("Lỗi: ID ảnh không hợp lệ!");
      return;
    }
    try {
      await imageService.deleteImage(deleteId);
      message.success("Xóa ảnh thành công!");
      fetchImages();
    } catch (error) {
      console.error("Lỗi khi xóa ảnh:", error);
      message.error("Lỗi khi xóa ảnh. Vui lòng thử lại!");
    }
    setConfirmOpen(false);
  };

  const handleViewImage = (url: string) => {
    setSelectedImage(url);
    setOpen(true);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (_: unknown, __: unknown, index: number) => index + 1,
    },
    { title: "ID Ảnh", dataIndex: "idAnh", key: "idAnh" },
    {
      title: "Ảnh",
      dataIndex: "anh",
      key: "anh",
      render: (url: string) => <img src={url} alt="Ảnh" width={50} />,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: unknown, record: ImageData) => (
        <>
          <Button className="mr-10" onClick={() => handleViewImage(record.anh)}>
            🔍
          </Button>
          <Button danger onClick={() => handleDeleteConfirm(record.idAnh)}>
            🗑
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between mt-4">
        <ImageUpload fetchImages={fetchImages} />
        <Button type="primary" onClick={() => navigate("/config")}>
          ⚙ Cấu hình
        </Button>
      </div>
      <Table
        dataSource={images}
        columns={columns}
        rowKey="idAnh"
        className="mt-4"
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          position: ["bottomCenter"],
        }}
      />

      {/* Modal to view image */}
      <Modal
        title="Xem Ảnh"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width="auto"
        style={{ textAlign: "center" }}
      >
        {selectedImage && (
          <Image
            src={selectedImage}
            alt="Selected Image"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "80vh",
            }}
          />
        )}
      </Modal>

      {/* Modal to confirm delete */}
      <Modal
        title="BẠN CÓ CHẮC CHẮN MUỐN XÓA ẢNH NÀY KHÔNG!!!"
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        footer={[
          <Button key="ok" type="primary" danger onClick={handleDelete}>
            XÁC NHẬN
          </Button>,
          <Button key="cancel" onClick={() => setConfirmOpen(false)}>
            HỦY BỎ
          </Button>,
        ]}
      />
    </>
  );
};

export default ImageList;
