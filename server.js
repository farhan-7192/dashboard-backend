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
  db.run(`
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
    `);

  db.get("SELECT COUNT(*) AS count FROM campaigns", (err, row) => {
    if (row && row.count === 0) {
      const stmt = db.prepare(`
                INSERT INTO campaigns 
                (title, subtitle, iconBg, icon, inboxCount, clockCount, status, delivered, opened, clicked, converted) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

      // Insert Campaign 1
      stmt.run(
        "Special Offers for Loyal Customers",
        "Thank you for being our loyal customer! As a token of our appreciation, we...",
        "bg-indigo-600",
        "/body/bookmark.svg",
        2,
        4,
        "Running",
        "5.72K",
        "60.5%",
        "17.7%",
        "1.2%",
      );

      // Insert Campaign 2
      stmt.run(
        "Customer Feedback Request",
        "We would love to hear your thoughts! Please take a moment to complete o...",
        "bg-pink-500",
        "/body/message.svg",
        2,
        2,
        "Running",
        "4.82K",
        "34.5%",
        "6.9%",
        "2.3%",
      );

      stmt.finalize();
      console.log("Database was empty. Seeded with initial dummy campaigns!");
    }
  });
});

app.get("/api/campaigns", (req, res) => {
  db.all("SELECT * FROM campaigns", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
