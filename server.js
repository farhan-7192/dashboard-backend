const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 5000;

app.use(cors()); 
app.use(express.json()); 

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

db.serialize(() => {
  db.run(
    `
        CREATE TABLE IF NOT EXISTS campaigns (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            subtitle TEXT,
            iconBg TEXT,
            icon TEXT,
            inboxCount INTEGER DEFAULT 0,
            clockCount INTEGER DEFAULT 0,
            status TEXT DEFAULT 'Draft',
            delivered TEXT DEFAULT '0',
            opened TEXT DEFAULT '0%',
            clicked TEXT DEFAULT '0%',
            converted TEXT DEFAULT '0%'
        )
    `,
    (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("Campaigns table is ready!");
      }
    },
  );
});

app.get("/", (req, res) => {
  res.send("Welcome to the Campaign Backend API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
