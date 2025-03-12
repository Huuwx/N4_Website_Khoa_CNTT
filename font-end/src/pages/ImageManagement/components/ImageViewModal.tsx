import React from "react";

interface ImageViewModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageViewModal: React.FC<ImageViewModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
      <div className="bg-white rounded-lg p-4">
        <img src={imageUrl} alt="Large view" className="max-w-full max-h-screen" />
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
          ĐÓNG
        </button>
      </div>
    </div>
  );
};

export default ImageViewModal;
