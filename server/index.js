const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db"); // Import our new database helper

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// GET all posts
app.get("/api/posts", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM posts");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});

// CREATE a new post
app.post("/api/posts", async (req, res) => {
  try {
    const { title, content } = req.body;
    // Use placeholders ($1, $2) to prevent SQL injection
    const { rows } = await db.query(
      "INSERT INTO posts(title, content) VALUES($1, $2) RETURNING *",
      [title, content]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post." });
  }
});

// Serve static React files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
