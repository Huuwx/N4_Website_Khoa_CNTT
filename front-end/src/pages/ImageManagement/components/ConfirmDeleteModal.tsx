import React from "react";

interface ConfirmDeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">XÁC NHẬN XÓA</h2>
        <p>Bạn có chắc chắn muốn xóa hình ảnh này?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">HỦY BỎ</button>
          <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded">XÁC NHẬN</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
