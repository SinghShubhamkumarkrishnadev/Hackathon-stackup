import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('shopper'); // Default role set to 'shopper'
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector(state => state.auth);
  const { loading, error, userInfo } = auth;

  useEffect(() => {
    if (userInfo) {
      navigate('/'); // Redirect if userInfo is present
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password, role })); // Dispatch register action with user data
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>} {/* Display error message */}
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Role:</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="shopper">Shopper</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option> {/* Added Admin option */}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterScreen;
