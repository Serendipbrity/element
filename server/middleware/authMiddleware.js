import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// protect routes so you have to be logged in to access the route
const protect = asyncHandler(async (req, res, next) => { 
    let token;
    // only able to use because of cookie-parser installed
    // this gets the token
    token = req.cookies.jwt;

    // if token exists, verify it
    if (token) { 
        try {
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // get user data except hashed password
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
     }
 });

export { protect}