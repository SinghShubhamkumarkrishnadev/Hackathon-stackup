import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AdminScreen = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'shopper',
  });

  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      if (userInfo && userInfo.role === 'admin') {
        try {
          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          });
          setUsers(data);
        } catch (error) {
          setMessage(error.response?.data.message || error.message);
        }
      } else {
        setMessage('Not authorized to view this page.');
      }
    };

    fetchUsers();
  }, [userInfo]);

  // Delete user handler
  const deleteUserHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setUsers(users.filter((user) => user._id !== id));
        setMessage('User deleted successfully.');
      } catch (error) {
        setMessage(error.response?.data.message || error.message);
      }
    }
  };

  // Add user handler
  const addUserHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/admin/create-user`,
        newUser,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setUsers([...users, data]); // Add new user to state
      setMessage('User added successfully.');
      setShowAddUserForm(false); // Close the form
      setNewUser({ name: '', email: '', password: '', role: 'shopper' }); // Reset form
    } catch (error) {
      setMessage(error.response?.data.message || error.message);
    }
  };

  // Update user role handler
  const updateUserRoleHandler = async (id, newRole) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/update-role`,
        { userId: id, newRole },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setUsers(users.map((user) => (user._id === id ? { ...user, role: newRole } : user)));
      setMessage('User role updated successfully.');
    } catch (error) {
      setMessage(error.response?.data.message || error.message);
    }
  };

  if (!userInfo || userInfo.role !== 'admin') {
    return <p className="text-red-500">{message || 'Access Denied'}</p>;
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {message && <p className="text-green-500 mb-2">{message}</p>}

      {/* Add User Button */}
      <button
        onClick={() => setShowAddUserForm(!showAddUserForm)}
        className="bg-green-500 text-white px-4 py-2 mb-4 rounded hover:bg-green-600"
      >
        {showAddUserForm ? 'Cancel' : 'Add User'}
      </button>

      {/* Add User Form */}
      {showAddUserForm && (
        <form onSubmit={addUserHandler} className="mb-6 p-4 border rounded bg-gray-100">
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full border px-3 py-2 rounded"
              required
              placeholder="Enter name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full border px-3 py-2 rounded"
              required
              placeholder="Enter email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="w-full border px-3 py-2 rounded"
              required
              placeholder="Enter password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role:</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="shopper">Shopper</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add User
          </button>
        </form>
      )}

      {/* Users Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Role</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border">{user._id}</td>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">
                {/* Role Dropdown */}
                <select
                  value={user.role}
                  onChange={(e) => updateUserRoleHandler(user._id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="shopper">Shopper</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => deleteUserHandler(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminScreen;
