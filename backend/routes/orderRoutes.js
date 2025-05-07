import express from 'express';
import userAuth from '../middleware/userAuth.js';         
import {
  createOrder,
  getMyOrders,
  getOrderById
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/createorder', userAuth, createOrder);
router.get('/myorders', userAuth, getMyOrders);
router.get('/:id', userAuth, getOrderById);

export default router;
