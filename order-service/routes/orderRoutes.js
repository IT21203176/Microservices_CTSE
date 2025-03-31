const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getOrderById, 
  updateOrderStatus, 
  getUserOrders 
} = require('../controllers/orderController');
const { verifyToken, checkUserOwnership } = require('../middleware/authMiddleware');

// Protect all routes
router.use(verifyToken);

// Order routes
router.post('/', createOrder);
router.get('/:id', getOrderById);
router.put('/:id/status', updateOrderStatus);
router.get('/user/:userId', checkUserOwnership, getUserOrders);

module.exports = router;