import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
// auth user and set token
// port POST /api/users/auth
// public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email });

    // if user exists and password matches, send back user data
    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            message: "User logged in successfully",
            _id: user._id,
            username: user.username,
            email: user.email
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// logout user
// port POST /api/users/logout
// public
const logoutUser = asyncHandler(async (req, res) => { 
    res.status(200).json({ message: "Logout User" })
 });

// register new user
// port POST /api/users/
// public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    // create user if they dont exist
    const user = await User.create({
        username,
        email,
        password
    });
    // if user is created, send back user data
    if (user) { 
        generateToken(res, user._id);
        res.status(201).json({
            message: "User created successfully",
            _id: user._id,
            username: user.username,
            email: user.email
        })
    } else {
        res.status(400).json({ message: "Invalid user data" })
        throw new Error("Invalid user data");
    }
});

// get user profile
// port GET /api/users/profile
// private -- need json web token to access
const getUserProfile = asyncHandler(async (req, res) => { 
    // User.find({}).then((users) => {
    //     res.status(200).json(req.body)
    // }).catch((err) => {
    //     console.log(err);
    // })
    res.status(200).json({ message: "Find User" })
})
 
// update user profile
// port PUT /api/users/profile
// private -- need json web token to access
const updateUserProfile = asyncHandler(async (req, res) => { 
    res.status(200).json({ message: "Update User Profile" })
 });

export {
    authUser,
    logoutUser,
    registerUser,
    getUserProfile,
    updateUserProfile
}