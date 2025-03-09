import React from 'react';
import { Link } from 'react-router-dom';

const AddImageButton = () => {
  return (
    <div className="flex justify-end mb-4">
      <Link
        to="/add-image"
        className="btn bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Thêm ảnh động
      </Link>
    </div>
  );
};

export default AddImageButton;