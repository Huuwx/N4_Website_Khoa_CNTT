import React, { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaTrash, FaCog } from "react-icons/fa";
import ImageConfiguration from "./components/ImageConfiguration";

interface Image {
  id: string;
  url: string;
}

const ImageManagement: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);

  // State for modals
  const [isImageViewOpen, setIsImageViewOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState("");
  // New state for configuration modal
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  useEffect(() => {
    // Simulating API call to fetch images
    const fetchImages = () => {
      const dummyImages: Image[] = [
        {
          id: "AA1",
          url: "https://huongnghiep.hocmai.vn/wp-content/uploads/2022/02/148434662-2961600134114291-582-2356-7538-1631711557.jpg",
        },
        {
          id: "AA2",
          url: "https://huongnghiep.hocmai.vn/wp-content/uploads/2022/02/148434662-2961600134114291-582-2356-7538-1631711557.jpg",
        },
      ];
      setImages(dummyImages);
    };

    fetchImages();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAddImage = () => {
    // Implement image upload functionality
    console.log("Add image clicked");
  };

  const handleViewImage = (url: string) => {
    setSelectedImageUrl(url);
    setIsImageViewOpen(true);
  };

  const handleDeleteImage = () => {
    if (imageToDelete) {
      setImages(images.filter((image) => image.id !== imageToDelete));
      setIsConfirmDeleteOpen(false);
    }
  };

  // New function to handle configuration button click
  const handleConfigClick = () => {
    setIsConfigOpen(true);
  };

  // Function to update images after configuration changes
  const handleConfigSave = (updatedImages: Image[]) => {
    setImages(updatedImages);
    setIsConfigOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">QUẢN LÝ ẢNH ĐỘNG</h1>

      <div className="flex justify-between mb-4">
        <button
          onClick={handleAddImage}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaPlus className="mr-2" /> THÊM
        </button>

        <button
          onClick={handleConfigClick}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaCog className="mr-2" /> CẤU HÌNH
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-16">
                STT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-24">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                ẢNH (URL)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-32">
                HÀNH ĐỘNG
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {images.map((image, index) => (
              <tr key={image.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {index + 1 + (currentPage - 1) * 10}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {image.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  <span
                    className="text-blue-600 cursor-pointer hover:underline"
                    onClick={() => handleViewImage(image.url)}
                  >
                    {image.url}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                  <button
                    onClick={() => handleViewImage(image.url)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Xem"
                  >
                    <FaSearch size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setImageToDelete(image.id);
                      setIsConfirmDeleteOpen(true);
                    }}
                    className="text-red-600 hover:text-red-900 ml-2"
                    title="Xóa"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            &lt;
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            &gt;
          </button>
        </nav>
      </div>

      {/* Image View Modal */}
      {isImageViewOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/25">
          <div className="bg-white rounded-lg p-4 max-w-md max-h-[80%] overflow-y-auto">
            <img
              src={selectedImageUrl}
              alt="Large view"
              className="w-full h-auto rounded mb-4"
            />
            <button
              onClick={() => setIsImageViewOpen(false)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              ĐÓNG
            </button>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">XÁC NHẬN XÓA</h2>
            <p>Bạn có chắc chắn muốn xóa hình ảnh này?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsConfirmDeleteOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                HỦY BỎ
              </button>
              <button
                onClick={handleDeleteImage}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                XÁC NHẬN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      {isConfigOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-lg p-6 w-4/5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">CẤU HÌNH ẢNH</h2>
              <button
                onClick={() => setIsConfigOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <ImageConfiguration 
              initialImages={images} 
              onSave={handleConfigSave} 
              onCancel={() => setIsConfigOpen(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageManagement;