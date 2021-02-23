import mongoose from 'mongoose';
import dotenv from 'dotenv';

import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany(); //Not passing any urgement it will delete everything
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map(product => {
            return {
                ...product,
                user: adminUser
            }
        });

        await Product.insertMany(sampleProducts);

        console.log("Data Imported Successfully");
        process.exit();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

const destroytData = async () => {
    try {
        await Order.deleteMany(); //Not passing any urgement it will delete everything
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed.");
        process.exit();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

//read values from Terminal widow // npm script check
if (process.argv[2] === '-d') {
    destroytData();
}
else {
    importData();
}