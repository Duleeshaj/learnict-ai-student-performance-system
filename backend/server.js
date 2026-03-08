const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

// connect database
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// home route
app.get("/", (req, res) => {
  res.send("LearnICT Backend Server Running");
});

// test api route
app.get("/api/test", (req, res) => {
  res.json({ message: "API test route working" });
});

// student routes
app.use("/api/students", require("./routes/studentRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});