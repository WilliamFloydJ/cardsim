// server/index.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db"); // Import our new database helper

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
