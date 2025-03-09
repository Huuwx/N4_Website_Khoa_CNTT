import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { faker } from "@faker-js/faker";
import Pagination from "./components/Pagination";
import { MagnifyingGlassIcon, TrashIcon, Cog6ToothIcon, PlusIcon } from "@heroicons/react/24/outline";
import ImageConfigModal from "./components/ImageConfigModal"; 

Modal.setAppElement("#root");

interface Image {
  id: number;
  name: string;
  url: string;
}

const generateFakeImages = (num: number): Image[] => {
  return Array.from({ length: num }, (_, i) => ({
    id: i + 1,
    name: `AA${i + 1}`,
    url: faker.image.url(),
  }));
};

const ImageManagement = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<Image | null>(null);
  const [configModalIsOpen, setConfigModalIsOpen] = useState(false); // Thêm state cho modal cấu hình

  const imagesPerPage = 5;

  useEffect(() => {
    setTimeout(() => {
      setImages(generateFakeImages(12));
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleDelete = (id: number) => {
    setImages(images.filter((image) => image.id !== id));
    setModalIsOpen(false);
  };

  const openDeleteModal = (image: Image) => {
    setImageToDelete(image);
    setModalIsOpen(true);
  };

  const openConfigModal = () => { // Hàm mở modal cấu hình
    setConfigModalIsOpen(true);
  };

  const closeConfigModal = () => { // Hàm đóng modal cấu hình
    setConfigModalIsOpen(false);
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(images.length / imagesPerPage);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <div className="flex justify-between mb-4">
        <button className="flex items-center px-4 py-2 bg-green-600 text-white font-bold rounded-lg">
          <PlusIcon className="h-5 w-5 mr-2" /> THÊM
        </button>
        <button className="flex items-center px-4 py-2 bg-gray-700 text-white font-bold rounded-lg" onClick={openConfigModal}> {/* Thêm onClick */}
          <Cog6ToothIcon className="h-5 w-5 mr-2" /> CẤU HÌNH
        </button>
      </div>
      <div className="overflow-hidden border rounded-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">STT</th>
              <th className="border p-2">ID</th>
              <th className="border p-2">ẢNH</th>
              <th className="border p-2">HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center p-4">Đang tải...</td>
              </tr>
            ) : (
              currentImages.map((image, index) => (
                <tr key={image.id} className="border-t">
                  <td className="border p-2 text-center">{indexOfFirstImage + index + 1}</td>
                  <td className="border p-2 text-center">{image.name}</td>
                  <td className="border p-2 text-center">
                    <img src={image.url} alt={image.name} className="h-12 w-12 object-cover mx-auto" />
                  </td>
                  <td className="border p-2 text-center flex justify-center space-x-4">
                    <button className="text-blue-500 hover:text-blue-700">
                      <MagnifyingGlassIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => openDeleteModal(image)} className="text-red-500 hover:text-red-700">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white p-4 rounded-lg shadow-md max-w-fit mx-auto mt-32"
        overlayClassName="fixed inset-0 bg-gray bg-opacity-20 flex justify-center items-center"
      >
        <h2 className="text-lg font-bold text-center">BẠN CÓ CHẮC CHẮN MUỐN XÓA ẢNH NÀY KHÔNG!!!</h2>
        <div className="flex justify-center mt-4 space-x-4">
          <button className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg" onClick={() => imageToDelete && handleDelete(imageToDelete.id)}>
            XÁC NHẬN
          </button>
          <button className="px-4 py-2 bg-gray-400 text-gray-800 font-bold rounded-lg" onClick={() => setModalIsOpen(false)}>
            HỦY BỎ
          </button>
        </div>
      </Modal>
      <ImageConfigModal isOpen={configModalIsOpen} onRequestClose={closeConfigModal} images={images} /> {/* Thêm ImageConfigModal */}
    </div>
  );
};

export default ImageManagement;