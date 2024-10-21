const express = require('express');
const upload = require('../middleware/uploadMiddleware'); // Import upload middleware


const {
  createProduct,
  getProducts,
  getProductById,  
  buyProduct,
} = require('../controllers/productController');
const { protect, seller, shopper } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getProducts).post(protect, seller, createProduct);  // Create a product (seller only)

router.route('/:id').get(getProductById);  // Get a single product by ID

router.post('/:id/buy', protect, shopper, buyProduct);  // Buy a product (shopper only)

router.post('/', protect, seller, upload.single('image'), createProduct); // Upload image

module.exports = router;
