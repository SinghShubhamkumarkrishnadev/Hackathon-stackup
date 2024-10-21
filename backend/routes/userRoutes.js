const express = require('express');
const { getUsers, deleteUser, updateUserRole } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, admin, getUsers);

router.route('/:id')
  .delete(protect, admin, deleteUser);

router.put('/update-role', protect, updateUserRole);
module.exports = router;
