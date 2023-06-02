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
    if (user && (await user.matchPassword(password))) {
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
    res.cookie('jwt', '', { 
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: "User is now logged out" })
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
    const user = {
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email
    }

    res.status(200).json({ user })
})
 
// update user profile
// port PUT /api/users/profile
// private -- need json web token to access
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    // if user exists, update user data
    if (user) { 
        // if username is included in body or not so then it stays as is
        user.username = req.body.username || user.username;
        // if email is included in body or not so then it stays as is
        user.email = req.body.email || user.email;
        // if password is included in body, then they can update password
        if (req.body.password) { 
            user.password = req.body.password;
        }
        // update the user 
        const updatedUser = await user.save();
        // respond with updated user data
        res.status(201).json({
            message: "User updated successfully",
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email
        });
    } else {
        res.status(404);
        throw new Error("User not found");
     }
});

export {
    authUser,
    logoutUser,
    registerUser,
    getUserProfile,
    updateUserProfile
}