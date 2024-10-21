
# 🛒 eCommerce Platform

Welcome to the **eCommerce Platform**! This is a full-stack application designed to allow sellers to post products for sale and shoppers to browse and purchase products. The platform includes a robust backend for managing users, roles (admin, seller, shopper), and product listings, along with a dynamic frontend built with React and Redux for a smooth user experience. 

## 🎯 Features
- 👤 **User Roles**: Admin, Seller, and Shopper.
- 🛠 **Admin Features**: Add or delete users.
- 🛒 **Seller Features**: Post products for sale with price, quantity, description, and upload images.
- 🛍️ **Shopper Features**: View products, add to cart, and purchase.
- 🖼️ **Product Image Upload**: Sellers can upload product images stored in Cloudinary.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v14.x or higher) 🟢
- **npm** (v6.x or higher) 📦
- **MongoDB** (Ensure MongoDB is installed and running locally, or set up a cloud-based MongoDB instance) 🍃
- **Cloudinary Account**: For storing product images ☁️

### 🔑 Environment Variables

You'll need to set up a `.env` file with the following variables for Cloudinary integration:

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🎬 Demo Video

<a href="https://www.youtube.com/watch?v=your-video-id" target="_blank">
  <img src="https://img.youtube.com/vi/your-video-id/0.jpg" alt="Watch the demo video" style="max-width: 100%; height: auto;">
</a>
---

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine.

### 📥 Cloning the Repository

```bash
git clone https://github.com/SinghShubhamkumarkrishnadev/Hackathon-stackup.git
cd Hackathon-stackup
```

### 🛠 Backend & Frontend Setup

1. Install the necessary dependencies:
   ```bash
   npm install
   ```

2. Set up your `.env` file in the root of the backend folder (as described above).

3. Run both the backend and frontend servers simultaneously with the following command:
   ```bash
   npm run dev
   ```

### 🧪 Testing the Application

Once both the backend and frontend are running, you can open the application in your browser by visiting `http://localhost:5173`.

- **Admin**: Log in as an admin to manage users.
- **Seller**: Log in as a seller to post new products with descriptions and images.
- **Shopper**: Log in as a shopper to browse products and make purchases.

---

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React, Redux, React-Router, Redux-Toolkit, TailwindCSS
- **Cloudinary**: For storing and serving product images
- **JWT**: For secure user authentication and role-based access

---

## 🔚 Conclusion

This project showcases a complete eCommerce platform with real-world features like user roles, product management, and image uploads via Cloudinary. Feel free to clone, contribute, or expand upon this platform based on your own needs! If you encounter any issues or have feedback, please feel free to open an issue on the repository.

---

**Author**: shubham