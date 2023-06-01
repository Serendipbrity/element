import express from "express";
import {
  authUser,
  logoutUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

// register
router.post("/", registerUser);
// login
router.post("/auth", authUser);
// logout
router.post("/logout", logoutUser);
// get and/or update user profile
router.route("/profile").get(getUserProfile).put(updateUserProfile);
export default router;
