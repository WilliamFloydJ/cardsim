const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const db = require("./db"); // Import our new database helper

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // The directory where the files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.put("/api/cards", upload.none(), async (req, res) => {
  try {
    const {
      card_name,
      card_url,
      card_types,
      card_power,
      card_toughness,
      card_totalmana,
      card_red,
      card_blue,
      card_green,
      card_black,
      card_white,
      card_id,
    } = req.body;
    const card_type_arr = [...card_types];
    const card_type_quote = card_type_arr.map((item) => `"${item}"`);
    const card_type = `{${card_type_quote}}`;
    const query = `UPDATE cards
SET card_name = '${card_name}' , card_type = '${card_type}', card_url = '${card_url}', card_power = ${card_power}, card_toughness = ${card_toughness}, card_totalmana = ${card_totalmana}, card_red = ${card_red}, card_blue = ${card_blue}, card_green = ${card_green}, card_black = ${card_black}, card_white = ${card_white}
WHERE card_id = ${card_id} RETURNING *;`;
    console.log(query);
    // Use placeholders ($1, $2) to prevent SQL injection
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post." });
  }
});

// GET all posts
app.get("/api/cards/:search", async (req, res) => {
  try {
    const search = req.params.search;
    const { rows } = await db.query(
      `SELECT *
      FROM cards
      WHERE card_name ILIKE '%${search}%';`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});

// CREATE a new post
app.post("/api/cards", upload.none(), async (req, res) => {
  console.log(req.body);
  try {
    const {
      card_name,
      card_url,
      card_types,
      card_power,
      card_toughness,
      card_totalmana,
      card_red,
      card_blue,
      card_green,
      card_black,
      card_white,
    } = req.body;
    const card_type_arr = [...card_types];
    const card_type_quote = card_type_arr.map((item) => `"${item}"`);
    const card_type = `{${card_type_quote}}`;
    // Use placeholders ($1, $2) to prevent SQL injection
    const { rows } = await db.query(
      `INSERT INTO cards(card_name, card_type, card_url, card_power, card_toughness, card_totalmana, card_red, card_blue, card_green, card_black, card_white)
       VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
        card_name,
        card_type,
        card_url,
        card_power,
        card_toughness,
        card_totalmana,
        card_red,
        card_blue,
        card_green,
        card_black,
        card_white,
      ]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post." });
  }
});

app.get("/api/decks/:search", async (req, res) => {
  try {
    const search = req.params.search || null;
    const searchString = `'%${search}%'`;
    console.log(search);
    const { rows } = await db.query(
      `SELECT *
      FROM decks
      WHERE deck_name ILIKE ${searchString};`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});

app.post("/api/decks", upload.none(), async (req, res) => {
  try {
    const { deck_name } = req.body;

    // Use placeholders ($1, $2) to prevent SQL injection
    const { rows } = await db.query(
      `INSERT INTO decks(deck_name)
       VALUES('${deck_name}') RETURNING *`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post." });
  }
});

app.get("/api/decks", async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT *
      FROM decks;`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});

app.post("/api/decks/cardid", upload.none(), async (req, res) => {
  try {
    const { deck_id, card_id } = req.body;
    console.log(deck_id, card_id);
    const { rows } = await db.query(
      `INSERT INTO cards_decks(deck_id , card_id)
       VALUES(${deck_id}, ${card_id}) RETURNING *`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post." });
  }
});

app.delete("/api/decks/cardid", upload.none(), async (req, res) => {
  try {
    const { deck_id, card_id } = req.body;
    console.log(req.body);
    const { rows } = await db.query(
      `DELETE FROM cards_decks
       WHERE deck_id = ${deck_id} AND card_id = ${card_id} RETURNING *`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post." });
  }
});

app.get("/api/decks/cardid/:cardid/:deckid", async (req, res) => {
  try {
    const cardId = req.params.cardid;
    const deckId = req.params.deckid;
    const { rows } = await db.query(
      `SELECT *
      FROM cards_decks
      WHERE card_id = ${cardId} AND deck_id = ${deckId};`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts." });
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
