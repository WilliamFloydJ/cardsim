const { Pool } = require("pg");

const pool = new Pool({
  user: "your_username",
  host: "localhost",
  database: "your_database_name",
  password: "your_password",
  port: 5432, // Default PostgreSQL port
});

module.exports = {
  // Export a query function to handle all database interactions
  query: (text, params) => pool.query(text, params),
};
