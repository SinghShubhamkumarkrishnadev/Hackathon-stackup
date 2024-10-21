const express = require('express');
const { registerUser, loginUser, adminCreateUser } = require('../controllers/authController');
const { admin, protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/admin/create-user', protect, admin, adminCreateUser);


module.exports = router;
