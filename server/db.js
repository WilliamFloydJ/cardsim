const { Pool } = require("pg");

const pool = new Pool({
  user: "cardsim_db_user",
  database: "cardsim_db",
  password: "3gTnZ3JjGyJxHJemO4kRxGpFC5HR56TS",
  port: 5432, // Default PostgreSQL port
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // This is important for Render's managed databases
    rejectUnauthorized: false,
  },
});

module.exports = {
  // Export a query function to handle all database interactions
  query: (text, params) => pool.query(text, params),
};
