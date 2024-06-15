import express from "express";
import dotenv from "dotenv";
import db from "./config/Database.js";
import cookieParser from "cookie-parser";
import Users from "./model/usermodel.js";
import router from "./routes/index.js";
dotenv.config();

const app = express();

try {
  await db.authenticate();
  console.log("Database connected");
  await Users.sync();
} catch (error) {
  console.error(error);
}

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware untuk menangani x-www-form-urlencoded
app.use(router);

app.listen(5000, () => console.log("Server running on port 5000"));
