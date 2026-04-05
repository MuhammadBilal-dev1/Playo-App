import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import venueRoutes from "./routes/venueRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const DB_URL = process.env.MONGODB_URI;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/venues", venueRoutes);

mongoose
  .connect(DB_URL)
  .then(console.log("✅ Connected To MongoDB"))
  .catch((error) => console.log("🔴 Error connecting to MongoDB", error));

app.listen(port, () => {
  console.log(`🌐 Server running on PORT: ${port}`);
});

export default app;
