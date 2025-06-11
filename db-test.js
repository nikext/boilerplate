const { Client } = require("pg");

// Connection details matching our docker-compose.yml
const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "boilerplate",
});

async function testConnection() {
  try {
    console.log("Attempting to connect to PostgreSQL...");
    await client.connect();
    console.log("Connected to PostgreSQL successfully!");

    const res = await client.query("SELECT current_timestamp");
    console.log("Database timestamp:", res.rows[0]);

    await client.end();
  } catch (err) {
    console.error("Error connecting to PostgreSQL:");
    console.error("Error code:", err.code);
    console.error("Error message:", err.message);
    console.error("Stack trace:", err.stack);
  }
}

testConnection();
