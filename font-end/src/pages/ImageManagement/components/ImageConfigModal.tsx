import React, { useState } from "react";
import Modal from "react-modal";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";

interface Image {
  id: number;
  name: string;
  url: string;
}

interface ImageConfigModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  images: Image[];
}

const ImageConfigModal: React.FC<ImageConfigModalProps> = ({ isOpen, onRequestClose, images }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 5;
  const [sliderValue, setSliderValue] = useState(5);

  const totalPages = Math.ceil(images.length / imagesPerPage);
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white p-6 rounded-lg shadow-md w-[90vw] max-w-5xl mx-auto relative z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
    >
      <h2 className="text-xl font-bold text-center mb-4">CẤU HÌNH ẢNH</h2>
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="border p-2">STT</th>
              <th className="border p-2">ID</th>
              <th className="border p-2">ẢNH</th>
            </tr>
          </thead>
          <tbody>
            {currentImages.map((image, index) => (
              <tr key={image.id} className="border-t text-center">
                <td className="border p-2">{indexOfFirstImage + index + 1}</td>
                <td className="border p-2">{image.name}</td>
                <td className="border p-2">
                  <img src={image.url} alt={image.name} className="h-12 w-12 object-cover mx-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Phân trang & Slider */}
      <div className="flex items-center justify-center mt-4 space-x-3 bg-gray-300 p-2 rounded-full">
        <FaChevronLeft
          className={`cursor-pointer text-blue-600 ${currentPage === 1 ? 'opacity-50' : ''}`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        />
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`w-8 h-8 rounded-full text-center font-bold ${
              currentPage === i + 1 ? 'bg-red-600 text-white' : 'bg-white'
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <FaChevronRight
          className={`cursor-pointer text-blue-600 ${currentPage === totalPages ? 'opacity-50' : ''}`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        />
        <FaPlay className="text-blue-600" />
        <input
          type="range"
          min="1"
          max="10"
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="ml-2"
        />
        <span>{sliderValue}s</span>
      </div>
      
      {/* Nút Xác Nhận & Hủy Bỏ */}
      <div className="flex justify-center mt-6 space-x-4">
        <button className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg">XÁC NHẬN</button>
        <button className="px-6 py-3 bg-gray-400 text-black font-bold rounded-lg" onClick={onRequestClose}>
          HỦY BỎ
        </button>
      </div>
    </Modal>
  );
};

export default ImageConfigModal;
