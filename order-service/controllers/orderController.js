const Order = require('../models/orderModel');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    const userId = req.user.userId;

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order = new Order({
      userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if the requesting user owns the order
    if (order.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order
    if (order.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user's order history
exports.getUserOrders = async (req, res) => {
  try {
    // Verify the requesting user is accessing their own orders
    if (req.params.userId !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const orders = await Order.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
      
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};