import { useState } from 'react';
import { imageService } from '../services/api';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadRequestOption } from 'rc-upload/lib/interface';

interface ImageUploadProps {
    fetchImages: () => void;
}

const ImageUpload = ({ fetchImages }: ImageUploadProps) => {
    const [loading, setLoading] = useState(false);

    const handleUpload = async (options: UploadRequestOption) => {
        const { file, onSuccess, onError } = options;
        setLoading(true);

        // Verify that file is a File object
        if (!(file instanceof File)) {
            const error = new Error('Invalid file format');
            console.error('Upload error:', error);
            message.error('File không hợp lệ');
            onError?.(error);
            setLoading(false);
            return;
        }

        try {
            await imageService.uploadImage(file);
            message.success('Upload ảnh thành công!');
            fetchImages(); // Gọi lại danh sách ảnh ngay lập tức
            onSuccess?.('ok');
        } catch (error: unknown) {
            console.error('Upload error:', error);
            message.error('Lỗi khi upload ảnh');
            onError?.(error instanceof Error ? error : new Error('Upload failed'));
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
