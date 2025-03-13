import React, { useState } from "react";
import { Modal, Row, Col } from "antd";

const ImageListModal = ({ visible, onCancel, onAddImages, images = [] }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleSelectImage = (image) => {
    setSelectedImages((prev) =>
      prev.find((item) => item.idAnh === image.idAnh)
        ? prev.filter((item) => item.idAnh !== image.idAnh)
        : [...prev, image]
    );
  };

  const handleAdd = () => {
    onAddImages(selectedImages);
    setSelectedImages([]); // 🔥 Reset danh sách chọn sau khi thêm
  };

  return (
    <Modal
      title="Chọn Ảnh"
      open={visible}
      onCancel={onCancel}
      onOk={handleAdd}
      okText="Thêm Ảnh"
      cancelText="Hủy Bỏ"
    >
      <Row gutter={[16, 16]}>
        {images.length > 0 ? (
          images.map((image) => (
            <Col key={image.idAnh} span={8}>
              <div>
                <img
                  src={image.anh}
                  alt={`Ảnh ${image.idAnh}`}
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    border: selectedImages.some((img) => img.idAnh === image.idAnh)
                      ? "2px solid blue"
                      : "none",
                  }}
                  onClick={() => handleSelectImage(image)}
                />
                <p>{image.idAnh}</p>
              </div>
            </Col>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>
            Không có ảnh nào để hiển thị
          </p>
        )}
      </Row>
    </Modal>
  );
};

export default ImageListModal;
