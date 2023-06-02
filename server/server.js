import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5001;
// const port = 5001;
import userRoutes from "./routes/userRoutes.js";

connectDB();
const app = express();

// allow us to parse raw json
app.use(express.json());
// allow us to send form data
app.use(express.urlencoded({ extended: true }));
// any route using /api/users will be connected to userRoutes
app.use('/api/users', userRoutes);

app.get("/", (req, res) =>  res.send("Hello World!"));

// middleware to handle errors
app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>  console.log(`Server is running on port ${port}`));