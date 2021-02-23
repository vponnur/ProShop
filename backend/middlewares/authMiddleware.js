import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
    let token;
    const authToken = req.headers.authorization;
    if (authToken && authToken.startsWith('Bearer')) {
        try {
            // Token example "Bearer xxxxxxxxx"
            token = authToken.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // here id is userId is added in token , -password it will not return password details
            req.user = await User.findById(decoded.userId).select('-password');
            next();

        }
        catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized , no token');
    }

});

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    }
    else {
        throw new Error('not authorized as Admin')
    }
}