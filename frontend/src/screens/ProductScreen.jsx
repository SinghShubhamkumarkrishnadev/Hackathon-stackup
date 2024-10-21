import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaHeart } from 'react-icons/fa';

const ProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
        setProduct(data);
      } catch (error) {
        setError(error.response?.data.message || error.message);
      }
    };

    const fetchFolders = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/favorites/folders`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setAvailableFolders(data);
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };

    fetchProduct();
    if (userInfo) {
      fetchFolders();
    }
  }, [id, userInfo]);

  const buyHandler = async () => {
    setError(null);
    setSuccess(false);

    if (!userInfo || userInfo.role !== 'shopper') {
      setError('You must be a shopper to buy products.');
      return;
    }

    if (quantity < 1 || quantity > product.quantity) {
      setError('Please enter a valid quantity.');
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/products/${id}/buy`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setSuccess(true);
      setMessage('Product bought successfully!');
      setProduct(prev => ({ ...prev, quantity: prev.quantity - quantity }));

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError(error.response?.data.message || error.message);
    }
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (e) => {
    // Close modal when clicking outside the image
    if (e.target.className.includes('modal-overlay')) {
      setIsModalOpen(false);
    }};

  if (!product) {
    return <p>Loading product...</p>;
  }

  const shareUrl = `${window.location.origin}/products/${product._id}`;
  const shareText = `Check out this product: ${product.name} - ${product.price}`;

  return (
    <div className="max-w-2xl mx-auto mt-6 p-8 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

      <div className="w-full mb-4 flex items-center">
        <img
          src={product.image || 'https://picsum.photos/200/300'}
          alt={product.name}
          className="max-w-xs h-auto object-contain transition-transform duration-300 hover:scale-110 cursor-pointer"
          onClick={handleImageClick}
        />
      </div>
            {/* Modal for displaying the full-size image */}
            {isModalOpen && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center" onClick={handleCloseModal}>
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      <p className="text-gray-700 mb-2 font-bold">Price: ${product.price}</p>
      <p className="text-gray-700 mb-2">Quantity Available: {product.quantity}</p>
      <p className="text-gray-700 mb-4">Description: {product.description}</p>

      {error && <p className="mb-2 text-red-500">{error}</p>}
      {success && <p className="mb-2 text-green-500">{message}</p>}
      <div className="mb-4 flex items-center">
        <label htmlFor="quantity" className="mr-2">Quantity:</label>
        <input
          type="number"
          id="quantity"
          className="border rounded px-2 py-1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={buyHandler}
      >
        Buy Now
      </button>
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Share this product:</h3>
        <div className="flex space-x-2">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-blue-500 text-3xl" />
          </a>
          <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-blue-400 text-3xl" />
          </a>
          <a href={`https://www.linkedin.com/shareArticle?url=${shareUrl}&title=${shareText}`} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-blue-600 text-3xl" />
          </a>
          <a href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="text-green-500 text-3xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
