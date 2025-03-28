import { Modal } from 'antd';
import { Article } from '../../../../services/articleService';
import articleService from '../../../../services/articleService';

interface DeleteConfirmModalProps {
  visible: boolean;
  article: Article | null;
  onClose: (refresh?: boolean) => void;
}

const DeleteConfirmModal = ({ visible, article, onClose }: DeleteConfirmModalProps) => {
  const handleDelete = async () => {
    if (!article) return;

    try {
      await articleService.deleteArticle(article.id);
      onClose(true);
    } catch {
      // Error is handled by API interceptor
    }
  };

  return (
    <Modal
      title="Delete Article"
      open={visible}
      onOk={handleDelete}
      onCancel={() => onClose()}
      okText="Delete"
      okButtonProps={{ danger: true }}
    >
      <p>Are you sure you want to delete article "{article?.title}"?</p>
    </Modal>
  );
};

export default DeleteConfirmModal;