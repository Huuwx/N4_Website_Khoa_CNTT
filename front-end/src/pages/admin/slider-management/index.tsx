import React, { useEffect, useState } from "react";
import { Table, Button, Image, Modal, Space, message } from "antd";
import { DeleteOutlined, EyeOutlined, ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import type { SliderResponse } from "../../../services/sliderService";
import { sliderService } from "../../../services/sliderService";
import SliderModal from "./components/SliderModal";

const SliderManagement: React.FC = () => {
  const [sliders, setSliders] = useState<SliderResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const handleMoveUp = async (id: number, index: number) => {
      if (index > 0) {
        const sliderToMove = sliders[index];
        const sliderToSwapWith = sliders[index - 1];
  
        try {
          await sliderService.updateSliderOrder(sliderToMove.id, sliderToSwapWith.displayOrder);
          await sliderService.updateSliderOrder(sliderToSwapWith.id, sliderToMove.displayOrder);
          message.success("Di chuyển ảnh lên thành công");
          fetchSliders();
        } catch {
          message.error("Không thể di chuyển ảnh lên");
        }
      }
    };
  
    const handleMoveDown = async (id: number, index: number) => {
      if (index < sliders.length - 1) {
        const sliderToMove = sliders[index];
        const sliderToSwapWith = sliders[index + 1];
  
        try {
          await sliderService.updateSliderOrder(sliderToMove.id, sliderToSwapWith.displayOrder);
          await sliderService.updateSliderOrder(sliderToSwapWith.id, sliderToMove.displayOrder);
          message.success("Di chuyển ảnh xuống thành công");
          fetchSliders();
        } catch {
          message.error("Không thể di chuyển ảnh xuống");
        }
      }
    };

  const fetchSliders = async () => {
    try {
      setLoading(true);
      const data = await sliderService.getAllSliders();
      setSliders(data);
    } catch {
      message.error("Không thể tải danh sách ảnh");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await sliderService.deleteSlider(id);
      message.success("Xóa ảnh thành công");
      fetchSliders();
    } catch {
      message.error("Không thể xóa ảnh");
    }
  };

  const handlePreview = (url: string) => {
    setPreviewUrl(url);
    setIsPreviewVisible(true);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "displayOrder",
      key: "displayOrder",
      width: 80,
    },
    {
      title: "Ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url: string) => (
        <Image
          src={url}
          alt="slider"
          style={{ width: 100, height: 60, objectFit: "cover" }}
          preview={false}
        />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      render: (active: boolean) => (
        <span>{active ? "Đang hiển thị" : "Đã ẩn"}</span>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_: unknown, record: SliderResponse, index: number) => (
              <Space>
                <Button
                  icon={<ArrowUpOutlined />}
                  onClick={() => handleMoveUp(record.id, index)}
                  disabled={index === 0}
                >
                  Lên
                </Button>
                <Button
                  icon={<ArrowDownOutlined />}
                  onClick={() => handleMoveDown(record.id, index)}
                  disabled={index === sliders.length - 1}
                >
                  Xuống
                </Button>
                <Button
                  icon={<EyeOutlined />}
                  onClick={() => handlePreview(record.imageUrl)}
                >
                  Xem
                </Button>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(record.id)}
                >
                  Xóa
                </Button>
              </Space>
            ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Quản lý ảnh động</h1>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Thêm ảnh mới
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={sliders}
        loading={loading}
        rowKey="id"
      />

      <SliderModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSuccess={() => {
          fetchSliders();
          setIsModalVisible(false);
        }}
      />

      <Modal
        open={isPreviewVisible}
        footer={null}
        onCancel={() => setIsPreviewVisible(false)}
        width={800}
      >
        <img
          alt="Preview"
          src={previewUrl}
          style={{ width: "100%", height: "auto" }}
        />
      </Modal>
    </div>
  );
};

export default SliderManagement;