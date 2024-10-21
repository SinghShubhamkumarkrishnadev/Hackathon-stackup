const Product = require('../models/Product');

const cloudinary = require('cloudinary').v2; // Import cloudinary

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @desc    Create a product
// @route   POST /api/products
// @access  Seller
const createProduct = async (req, res) => {
  const { name, price, quantity, description, image } = req.body;

  if (!req.user || req.user.role !== 'seller') {
    return res.status(403).json({ message: 'Not authorized as a seller' });
  }

  try {

    // Check if image exists
    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }
    
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: "products",
    });

    const product = new Product({
      name,
      price,
      quantity,
      description,
      image: result.secure_url, // Save the image URL from Cloudinary
      seller: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};


// @desc    Buy a product (decrease quantity)
// @route   POST /api/products/:id/buy
// @access  Shopper
const buyProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product && product.quantity >= req.body.quantity) {
    product.quantity -= req.body.quantity;
    await product.save();
    res.json({ message: 'Product bought successfully' });
  } else {
    res.status(400).json({ message: 'Insufficient quantity' });
  }
};



module.exports = { createProduct, getProducts, getProductById, buyProduct };
