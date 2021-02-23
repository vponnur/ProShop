import express from 'express';

import { protect, isAdmin } from '../middlewares/authMiddleware.js';
import {
    getProducts, getProductById,
    deleteProduct, createProduct,
    updateProduct, createProductReview, getTopProducts
} from '../controllers/productController.js';

const router = express.Router();

//router.get('/',);
router.route('/')
    .get(getProducts)
    .post(protect, isAdmin, createProduct);

router.route('/:id/reviews')
    .post(protect, createProductReview);

router.get('/top', getTopProducts);

router.route('/:id')
    .get(getProductById)
    .delete(protect, isAdmin, deleteProduct)
    .put(protect, isAdmin, updateProduct);


export default router;