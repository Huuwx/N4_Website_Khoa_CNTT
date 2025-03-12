import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

interface Image {
  id: string;
  url: string;
  duration?: number; // Duration in seconds for each image
}

interface ImageConfigurationProps {
  initialImages: Image[];
  onSave: (images: Image[]) => void;
  onCancel: () => void;
}

const ImageConfiguration: React.FC<ImageConfigurationProps> = ({
  initialImages,
  onSave,
  onCancel
}) => {
  const [images, setImages] = useState<Image[]>(
    initialImages.map(img => ({ ...img, duration: img.duration || 5 }))
  );
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [imageDuration, setImageDuration] = useState<number>(5);

  const moveUp = () => {
    if (selectedRowIndex !== null && selectedRowIndex > 0) {
      const newImages = [...images];
      [newImages[selectedRowIndex - 1], newImages[selectedRowIndex]] = 
        [newImages[selectedRowIndex], newImages[selectedRowIndex - 1]];
      setImages(newImages);
      setSelectedRowIndex(selectedRowIndex - 1);
    }
  };

  const moveDown = () => {
    if (selectedRowIndex !== null && selectedRowIndex < images.length - 1) {
      const newImages = [...images];
      [newImages[selectedRowIndex + 1], newImages[selectedRowIndex]] = 
        [newImages[selectedRowIndex], newImages[selectedRowIndex + 1]];
      setImages(newImages);
      setSelectedRowIndex(selectedRowIndex + 1);
    }
  };

  const handleRowClick = (index: number) => {
    setSelectedRowIndex(index);
    setImageDuration(images[index].duration || 5);
  };




  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setImageDuration(value);
      
      // Update duration for selected image
      if (selectedRowIndex !== null) {
        const updatedImages = [...images];
        updatedImages[selectedRowIndex] = {
          ...updatedImages[selectedRowIndex],
          duration: value
        };
        setImages(updatedImages);
      }
    }
  };

  return (
    <div className="container mx-auto">


      <div className="flex">
        {/* Main table */}
        <div className="flex-grow bg-white rounded-lg shadow-md overflow-hidden mb-4">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider w-16">
                  STT
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider w-32">
                  ID
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  ẢNH
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {images.map((image, index) => (
                <tr 
                  key={image.id} 
                  className={`hover:bg-gray-50 cursor-pointer ${selectedRowIndex === index ? 'bg-blue-50' : ''}`}
                  onClick={() => handleRowClick(index)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center border">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center border">
                    {image.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center border">
                    {image.url}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Arrow controls */}
        <div className="ml-2 flex flex-col justify-center">
          <button
            onClick={moveUp}
            disabled={selectedRowIndex === null || selectedRowIndex === 0}
            className={`p-2 mb-16 ${selectedRowIndex === null || selectedRowIndex === 0 ? 'text-gray-400' : 'text-black'}`}
            title="Di chuyển lên"
          >
            <FaArrowUp size={24} className="text-black" />
          </button>
          <button
            onClick={moveDown}
            disabled={selectedRowIndex === null || selectedRowIndex === images.length - 1}
            className={`p-2 ${selectedRowIndex === null || selectedRowIndex === images.length - 1 ? 'text-gray-400' : 'text-black'}`}
            title="Di chuyển xuống"
          >
            <FaArrowDown size={24} className="text-black" />
          </button>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mb-4">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            &lt;
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-600 text-sm font-medium text-white">
            1
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            2
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            3
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            4
          </button>
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            5
          </button>
          <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
            ...
          </span>
          <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            &gt;
          </button>
        </nav>
      </div>

      {/* Duration settings */}
      <div className="flex items-center justify-center mb-6">
        <label htmlFor="duration" className="mr-2 text-sm font-medium">
          Số giây:
        </label>
        <input
          id="duration"
          type="number"
          min="1"
          value={imageDuration}
          onChange={handleDurationChange}
          className="w-24 p-2 border border-gray-300 rounded-md mr-2"
          disabled={selectedRowIndex === null}
        />
        <span className="ml-2 text-sm font-medium">s</span>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
        >
          HỦY BỎ
        </button>
        <button
          onClick={() => onSave(images)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          LƯU THAY ĐỔI
        </button>
      </div>
    </div>
  );
};

export default ImageConfiguration;