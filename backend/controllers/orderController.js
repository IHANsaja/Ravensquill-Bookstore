import Order from '../models/orderModel.js';

export const createOrder = async (req, res, next) => {
    try {
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;
  
      console.log('Incoming order data:', req.body);
      console.log('Authenticated user:', req.user);
  
      if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
      }
  
      const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
  
      const createdOrder = await order.save();
  
      res.status(201).json(createdOrder);
    } catch (err) {
      console.error('Order creation error:', err); // ← more helpful than just passing to next()
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  };

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'username email profileImage');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'id username');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const updateOrderToDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    next(err);
  }
};