import { useState, useEffect } from "react";
import { Button, Table, message, Typography, Input } from "antd";
import type { ColumnType } from "antd/es/table";
import ImageListModal from "../components/ImageListModal";
import { imageService } from "@/services/api";

interface Image {
  idAnh: number;
  anh: string;
}

const { Title, Text } = Typography;

const Config = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [transitionTime, setTransitionTime] = useState(3000);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await imageService.getImages();
        setImages(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách ảnh:", error);
        setImages([]);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const savedImages = localStorage.getItem("selectedImages");
    if (savedImages) {
      setSelectedImages(JSON.parse(savedImages));
    }
  }, []);

  useEffect(() => {
    if (selectedImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % selectedImages.length;
        return nextIndex;
      });
    }, transitionTime);

    return () => clearInterval(interval);
  }, [selectedImages, transitionTime]);

  const handleAddImages = (newImages: Image[]) => {
    const updatedImages = [...selectedImages, ...newImages];

    const uniqueImages: Image[] = [];
    const seenIds = new Set();

    for (const img of updatedImages) {
      if (!seenIds.has(img.idAnh)) {
        seenIds.add(img.idAnh);
        uniqueImages.push(img);
      }
    }

    if (uniqueImages.length > 5) {
      uniqueImages.splice(0, uniqueImages.length - 5);
      message.warning("Đã đạt giới hạn 5 ảnh, ảnh cũ nhất sẽ bị thay thế!");
    }

    setSelectedImages(uniqueImages);
    localStorage.setItem("selectedImages", JSON.stringify(uniqueImages));
    setModalVisible(false);
  };

  const moveImage = (index: number, direction: number) => {
    if (
      (direction === -1 && index === 0) ||
      (direction === 1 && index === selectedImages.length - 1)
    ) {
      return;
    }

    const updatedImages = [...selectedImages];
    const temp = updatedImages[index];
    updatedImages[index] = updatedImages[index + direction];
    updatedImages[index + direction] = temp;

    setSelectedImages(updatedImages);
    localStorage.setItem("selectedImages", JSON.stringify(updatedImages));
  };

  const columns: ColumnType<Image>[] = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (_: unknown, __: Image, index: number) => index + 1
    },
    {
      title: "ID Ảnh",
      dataIndex: "idAnh",
      key: "idAnh"
    },
    {
      title: "Ảnh",
      dataIndex: "anh",
      key: "anh",
      render: (url: string) => (
        <img
          src={url}
          alt="Ảnh"
          className="w-20 h-20 object-cover rounded-lg shadow-md"
        />
      ),
    },
    {
      title: "Đường Dẫn",
      dataIndex: "anh",
      key: "url",
      render: (url: string) => <Text copyable>{url}</Text>,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: unknown, record: Image, index: number) => (
        <div className="flex gap-2">
          <Button disabled={index === 0} onClick={() => moveImage(index, -1)}>⬆️</Button>
          <Button disabled={index === selectedImages.length - 1} onClick={() => moveImage(index, 1)}>⬇️</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-5">
      <Title level={2} className="text-center text-blue-600">
        Quản lý Ảnh
      </Title>

      <div className="flex justify-center my-4">
        <Button type="primary" onClick={() => setModalVisible(true)} icon="🖼">
          Chọn ảnh
        </Button>
      </div>

      <ImageListModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onAddImages={handleAddImages}
        images={images}
      />

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
            <div className="flex justify-center items-center">
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
