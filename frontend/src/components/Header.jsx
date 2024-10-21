import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { userInfo } = auth;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-blue-600 text-white py-5 relative shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left-aligned Home link */}
        <Link
          to="/"
          className="text-xl font-bold pl-3 hover:text-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Home
        </Link>

        <h1 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center' }}>
          Welcome 😊
        </h1>

        {/* Right-aligned Navigation */}
        <nav>
          {userInfo ? (
            <div className="flex items-center space-x-4">
              <span className="hover:text-blue-300 transition duration-300 ease-in-out">Welcome, {userInfo.name}</span>

              <button
                onClick={logoutHandler}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-400 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Logout
              </button>

              {userInfo && userInfo.role === 'shopper' && (
                <Link
                  to="/favorites"
                  className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-400 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Favorites
                </Link>
              )}


              {userInfo.role === 'admin' && (
                <Link
                  to="/admin"
                  className="bg-green-500 px-3 py-1 rounded hover:bg-green-400 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Admin
                </Link>
              )}

              {userInfo.role === 'seller' && (
                <Link
                  to="/seller"
                  className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-400 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Seller
                </Link>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="bg-green-500 px-3 py-1 rounded hover:bg-green-400 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-purple-500 px-3 py-1 rounded hover:bg-purple-400 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
