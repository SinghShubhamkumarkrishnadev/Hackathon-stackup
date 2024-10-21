import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`}>
    <div className="border rounded-lg shadow-lg p-7 m-7 transition-transform duration-300 hover:scale-105 cursor-pointer">
      {/* Wrapper for image with proper dimensions */}
      <div className="w-full h-44 mb-4 flex justify-center items-center overflow-hidden"> {/* Added overflow-hidden */}
        <img
          src={product.image || 'https://picsum.photos/200/300'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300" // Ensure the image is responsive
        />
      </div>
      <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
      <p className="text-gray-700 text-md mb-2">${product.price}</p>
      <Link
        to={`/products/${product._id}`}
        className="text-blue-500 hover:underline"
      >
        View Details
      </Link>
    </div>
    </Link>
  );
};

export default ProductCard;
