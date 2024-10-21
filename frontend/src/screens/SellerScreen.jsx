import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const SellerScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const auth = useSelector(state => state.auth);
  const { userInfo } = auth;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!userInfo || userInfo.role !== 'seller') {
      setMessage('Only sellers can add products.');
      return;
    }

    try {
      setIsLoading(true); 
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/products`,
        { name, price, quantity, description, image },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setIsLoading(false);
      setMessage('Product added successfully!');

      setTimeout(() => {
        setMessage(null);
      }, 3000);

      // Optionally, reset form fields
      setName('');
      setPrice('');
      setQuantity('');
      setDescription('');
      setImage(null);
    } catch (error) {
      setMessage(error.response?.data.message || error.message);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // Set base64 string
    };

    if (file) {
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      {isLoading && <div className="spinner">⏳ Uploading...</div>}
      {message && <p className="mb-2 text-green-500">{message}</p>}
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block mb-1">Product Name:</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter product name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Price:</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Enter product price"
            min="0"
            step="0.01"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Quantity:</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            placeholder="Enter product quantity"
            min="1"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description:</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default SellerScreen;
