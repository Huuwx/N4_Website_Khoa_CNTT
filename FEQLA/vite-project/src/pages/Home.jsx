import { useState, useEffect } from 'react';
import ImageList from '../components/ImageList';
import ImageUpload from '../components/ImageUpload';
import { getImages } from '../services/api';
import HeaderNav from '../components/HeaderNav';

const Home = () => {
    const [images, setImages] = useState([]);

    // Hàm tải danh sách ảnh
    const fetchImages = async () => {
        try {
            const data = await getImages();
            setImages(data);
        } catch (error) {
            console.error('Lỗi khi tải ảnh:', error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);
    //p-5 max-w-4xl mx-auto
    return (
        <div className="p-5">
            <HeaderNav />
            <h1 className="text-2xl font-bold mb-4">Quản lý ảnh</h1>
            
            {/* Truyền fetchImages xuống để cập nhật sau khi tải ảnh */}
            
            <ImageList images={images} fetchImages={fetchImages} />
        </div>
    );
};

export default Home;
