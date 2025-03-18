import { useState } from 'react';
import { uploadImage } from '../services/api';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ImageUpload = ({ fetchImages }) => {
    const [loading, setLoading] = useState(false);

    const handleUpload = async ({ file }) => {
        setLoading(true);
        try {
            await uploadImage(file);
            message.success('Upload ảnh thành công!');
            fetchImages(); // Gọi lại danh sách ảnh ngay lập tức
        } catch (error) {
            message.error('Lỗi khi upload ảnh');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Upload customRequest={handleUpload} showUploadList={false}>
        <Button 
            icon={<UploadOutlined />} 
            loading={loading} 
            className="!bg-green-500 hover:!bg-green-600 !text-white !border-none"
        >
            Tải lên ảnh
        </Button>
    </Upload>
    );
};

export default ImageUpload;
