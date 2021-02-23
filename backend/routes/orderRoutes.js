import express from 'express';

import { protect, isAdmin } from '../middlewares/authMiddleware.js';
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered } from '../controllers/orderController.js';

const router = express.Router();

router.route('/')
    .post(protect, addOrderItems)
    .get(protect, isAdmin, getOrders)

router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered);

export default router;