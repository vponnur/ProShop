import asyncHandler from 'express-async-handler'; // to handle async exceptions
import Order from '../models/orderModel.js';



//@desc create new order
//@route Post /api/orders
//@access private
export const addOrderItems = asyncHandler(async (req, res) => {

    const { orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice } = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('no order items')
    }
    else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

//@desc Get order by Id
//@route GET /api/orders/:id
//@access private
export const getOrderById = asyncHandler(async (req, res) => {

    const order = await Order
        .findById(req.params.id)
        .populate('user', 'name email');

    if (order) {
        res.json(order)
    }
    else {
        res.status(404);
        throw new Error('order not found');
    }
});



//@desc Updated order to paid
//@route GET /api/orders/:id/pay
//@access private
export const updateOrderToPaid = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        //get data form paypal
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }
    else {
        res.status(404);
        throw new Error('order not found');
    }
});



//@desc GET loggedin user orders
//@route GET /api/orders/myorders
//@access private
export const getMyOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({ user: req.user._id });
    if (orders) {
        res.json(orders);
    }
    else {
        res.status(404);
        throw new Error('no orders');
    }
});


//@desc GET all user orders
//@route GET /api/orders
//@access private/Admin
export const getOrders = asyncHandler(async (req, res) => {

    const orders = await Order
        .find({})
        .populate('user', 'id name');
    if (orders) {
        res.json(orders);
    }
    else {
        res.status(404);
        throw new Error('no orders');
    }
});



//@desc Updated order to delivered
//@route GET /api/orders/:id/delivered
//@access private/admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id)

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }
    else {
        res.status(404);
        throw new Error('order not found');
    }
});

