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


app.use("/api/students", require("./routes/studentRoutes"));

// prediction routes
app.use("/api/prediction", require("./routes/predictionRoutes"));

// prediction summary route
app.use("/api/prediction-summary", require("./routes/predictionSummaryRoutes"));

// unit routes
app.use("/api/units", require("./routes/unitRoutes"));

// unit attendance routes
app.use("/api/unit-attendance", require("./routes/unitAttendanceRoutes"));

// unit mark routes
app.use("/api/unit-marks", require("./routes/unitMarkRoutes"));

// general student performance routes
app.use("/api/student-performance", require("./routes/studentPerformanceRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});