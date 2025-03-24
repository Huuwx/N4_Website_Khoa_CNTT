import { Modal } from 'antd';

const ImageModal = ({ open, onClose, imageUrl }) => {
    return (
        <Modal open={open} onCancel={onClose} footer={null}>
            <img src={imageUrl} alt="Ảnh chi tiết" className="w-full" />
        </Modal>
    );
};

export default ImageModal;
