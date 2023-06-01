import asyncHandler from 'express-async-handler';
// auth user and set token
// port POST /api/users/auth
// public
const authUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Auth User" })
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
    res.status(200).json({ message: "Register User" })
});

// get user profile
// port GET /api/users/profile
// private -- need json web token to access
const getUserProfile = asyncHandler(async (req, res) => { 
    res.status(200).json({ message: "Get User Profile" })
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