const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const employeeRoutes = require("./routes/employee.routes");

app.use("/api/employees", employeeRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Employee CRUD API is running");
});

// Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});