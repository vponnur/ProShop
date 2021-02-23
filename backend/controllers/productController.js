import asyncHandler from 'express-async-handler'; // to handle async exceptions
import Product from '../models/productModel.js';

//@desc Fetch all Products
//@route GET /api/products
//@access Public
export const getProducts = asyncHandler(async (req, res) => {
    const pageSize = Number(process.env.PRODUCT_PAGE_SIZE) || 10; // 10 set default
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'   //case insensitive
        }
    } : {}

    // const count = await Product.count({ ...keyword });
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product
        .find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@desc Fetch single Product
//@route GET /api/products/:id
//@access Public
export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    }
    else {
        // res.status(404).json({ message: 'Product not found' });
        //now handling with middleware error handlers
        res.status(404);
        throw new Error("Product not found")
    }
});


//@desc Delete Product
//@route DELTE /api/products/:id
//@access Private/admin
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: 'Product removed' })
    }
    else {
        // res.status(404).json({ message: 'Product not found' });
        //now handling with middleware error handlers
        res.status(404);
        throw new Error("Product not found")
    }
});

//@desc Create Product
//@route POST /api/products/
//@access Private/admin
export const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        user: req.user._id,
        name: 'sample name',
        price: 0,
        image: '/image/sample.jpg',
        brand: 'sample brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sampel descritpion'
    });

    const createdProduct = await product.save()
    res.status(201).json(createdProduct);
});


//@desc Update Product
//@route PUT /api/products/:id
//@access Private/admin
export const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = product.save();
        res.json(updatedProduct);
    }
    else {
        res.status(401);
        throw new Error('Product not found')
    }
});


//@desc Create new Review
//@route POST /api/products/:id/review
//@access Private
export const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        const isAlreadyReivewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());

        if (isAlreadyReivewed) {
            res.status(400);
            throw new Error('product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment: comment,
            user: req.user._id
        }

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'review added' });
    }
    else {
        res.status(401);
        throw new Error('Product not found')
    }
});


//@desc GET Top Rated products
//@route POST /api/products/top
//@access Public    
export const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
        .sort({ rating: -1 })
        .limit(3);

    res.json(products);
});