import { useState, useEffect } from 'react';
import ImageList from '../components/ImageList';
import { imageService } from '../services/api';

interface ImageData {
    idAnh: string | number;
    anh: string;
    stt?: number;
}

const Home = () => {
    const [images, setImages] = useState<ImageData[]>([]);

    // Hàm tải danh sách ảnh
    const fetchImages = async () => {
        try {
            const data = await imageService.getImages();
            setImages(data as ImageData[]);
        } catch (error) {
            console.error('Lỗi khi tải ảnh:', error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Quản lý ảnh</h1>
            <ImageList images={images} fetchImages={fetchImages} />
        </div>
    );
};

export default Home;
