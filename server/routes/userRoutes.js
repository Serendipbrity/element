import express from "express";
import {
  authUser,
  logoutUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// register
router.post("/", registerUser);
// login
router.post("/auth", authUser);
// logout
router.post("/logout", logoutUser);
// get and/or update user profile
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
export default router;
