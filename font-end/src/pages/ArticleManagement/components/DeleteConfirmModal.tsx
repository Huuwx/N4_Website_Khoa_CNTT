import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface DeleteConfirmModalProps {
  articleTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const DeleteConfirmModal = ({ articleTitle, onConfirm, onCancel, isLoading = false }: DeleteConfirmModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center mb-4">
          <ExclamationTriangleIcon className="h-8 w-8 text-red-500 mr-4" />
          <h3 className="text-lg font-medium text-gray-900">Xác nhận xóa bài viết</h3>
        </div>
        
        <p className="text-sm text-gray-500 mb-4">
          Bạn có chắc chắn muốn xóa bài viết sau đây?
        </p>
        
        <div className="bg-gray-100 p-3 rounded-md mb-4">
          <p className="text-sm font-medium text-gray-700">"{articleTitle}"</p>
        </div>
        
        <p className="text-sm text-red-500 mb-6">
          Hành động này không thể hoàn tác.
        </p>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-all duration-200"
            disabled={isLoading}
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Đang xóa...' : 'Xóa'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;