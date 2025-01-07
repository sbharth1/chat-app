import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "../routes/authRoutes";
const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);

export default app;
