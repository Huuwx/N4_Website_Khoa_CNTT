import React, { useState, useEffect } from "react";
import { Button, Table, Modal, message, Typography, Input } from "antd";
import ImageListModal from "../components/ImageListModal";
import { getImages } from "../services/api";
import HeaderNav from "../components/HeaderNav";

const { Title, Text } = Typography;

const Config = () => {
  const [images, setImages] = useState([]); // Danh sách ảnh từ API
  const [selectedImages, setSelectedImages] = useState([]); // Ảnh đã chọn
  const [modalVisible, setModalVisible] = useState(false);
  const [transitionTime, setTransitionTime] = useState(3000); // Thời gian chuyển đổi ảnh (mặc định 3 giây)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 🖼 Lấy danh sách ảnh từ API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await getImages();
        setImages(response || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách ảnh:", error);
        setImages([]);
      }
    };
    fetchImages();
  }, []);

  // 🔥 Load ảnh đã chọn từ localStorage khi mở trang
  useEffect(() => {
    const savedImages = localStorage.getItem("selectedImages");
    if (savedImages) {
      setSelectedImages(JSON.parse(savedImages));
    }
  }, []);

  // 🖼 Khi chọn ảnh (Chỉ giữ tối đa 5 ảnh, thay thế ảnh cũ nhất)
  const handleAddImages = (newImages) => {
    console.log("Ảnh đã chọn:", newImages);

    let updatedImages = [...selectedImages, ...newImages];

    // Loại bỏ ảnh trùng bằng cách tạo danh sách với ID duy nhất
    const uniqueImages = [];
    const seenIds = new Set();

    for (let img of updatedImages) {
      if (!seenIds.has(img.idAnh)) {
        seenIds.add(img.idAnh);
        uniqueImages.push(img);
      }
    }

    // Giữ tối đa 5 ảnh mới nhất (loại bỏ ảnh cũ nhất)
    if (uniqueImages.length > 5) {
      uniqueImages.splice(0, uniqueImages.length - 5);
      message.warning("Đã đạt giới hạn 5 ảnh, ảnh cũ nhất sẽ bị thay thế!");
    }

    setSelectedImages(uniqueImages);
    localStorage.setItem("selectedImages", JSON.stringify(uniqueImages));
    setModalVisible(false);
  };

  // Chuyển đổi giữa các ảnh mỗi `transitionTime` ms
  useEffect(() => {
    if (selectedImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % selectedImages.length;
        return nextIndex;
      });
    }, transitionTime);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [selectedImages, transitionTime]);

  const columns = [
    { title: "STT", dataIndex: "stt", key: "stt", render: (_, __, index) => index + 1 },
    { title: "ID Ảnh", dataIndex: "idAnh", key: "idAnh" },
    {
      title: "Ảnh",
      dataIndex: "anh",
      key: "anh",
      render: (url) => <img src={url} alt="Ảnh" className="w-20 h-20 object-cover rounded-lg shadow-md" />,
    },
    {
      title: "Đường Dẫn",
      dataIndex: "anh",
      key: "url",
      render: (url) => <Text copyable>{url}</Text>,
    },
  ];

  return (
    <div className="p-5">
      <HeaderNav />
      <Title level={2} className="text-center text-blue-600">
        Quản lý Ảnh
      </Title>

      <div className="flex justify-center my-4">
        <Button type="primary" onClick={() => setModalVisible(true)} icon="🖼">
          Chọn ảnh
        </Button>
      </div>

      {/* Modal chọn ảnh */}
      <ImageListModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onAddImages={handleAddImages}
        images={images}
      />

      {/* Hiển thị ảnh đã chọn */}
      <div className="mt-6">
        <Title level={3} className="text-center bg-gray-100 py-2 rounded-lg shadow">
          Cấu Hình Ảnh
        </Title>

        {selectedImages.length === 0 ? (
          <p className="text-center text-gray-500">Chưa có ảnh nào được chọn.</p>
        ) : (
          <>
            <div className="text-center mb-4">
              <Text>Thời gian chuyển đổi (ms): </Text>
              <Input
                type="number"
                value={transitionTime}
                onChange={(e) => setTransitionTime(Number(e.target.value))}
                className="w-32"
              />
            </div>
            <div className="flex justify-center items-center ">
              <img
                src={selectedImages[currentImageIndex]?.anh}
                alt="Ảnh chuyển đổi"
                className="w-64 h-64 object-cover rounded-lg shadow-md"
              />
            </div>
            <Table
              dataSource={selectedImages.map((img, index) => ({
                ...img,
                key: img.idAnh || `selected-${index}`,
              }))}
              columns={columns}
              pagination={false}
              className="mt-4 shadow-lg"
            />
            
          </>
        )}
      </div>
    </div>
  );
};

export default Config;
