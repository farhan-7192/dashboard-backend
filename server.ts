import express from "express";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.db",
});

const Campaign = sequelize.define(
  "Campaign",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    subtitle: {
      type: DataTypes.STRING,
    },

    theme: {
      type: DataTypes.STRING,
    },

    type: {
      type: DataTypes.STRING,
    },

    inboxCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    clockCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "Draft",
    },

    delivered: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },

    opened: {
      type: DataTypes.STRING,
      defaultValue: "0%",
    },

    clicked: {
      type: DataTypes.STRING,
      defaultValue: "0%",
    },

    converted: {
      type: DataTypes.STRING,
      defaultValue: "0%",
    },
  },
  {
    tableName: "campaigns",
    timestamps: false,
  },
);

async function initDB() {
  try {
    await sequelize.sync();

    const count = await Campaign.count();

    if (count === 0) {
      await Campaign.bulkCreate([
        {
          title: "Special Offers for Loyal Customers",
          subtitle:
            "Thank you for being our loyal customer! As a token of our appreciation, we...",
          theme: "indigo",
          type: "bookmark",
          inboxCount: 2,
          clockCount: 4,
          status: "Running",
          delivered: "5.72K",
          opened: "60.5%",
          clicked: "17.7%",
          converted: "1.2%",
        },
        {
          title: "Customer Feedback Request",
          subtitle:
            "We would love to hear your thoughts! Please take a moment to complete o...",
          theme: "pink",
          type: "message",
          inboxCount: 2,
          clockCount: 2,
          status: "Running",
          delivered: "4.82K",
          opened: "34.5%",
          clicked: "6.9%",
          converted: "2.3%",
        },
      ]);

      console.log("Seeded database with dummy campaigns");
    }
  } catch (error) {
    console.error("Database error:", error);
  }
}

initDB();

app.get("/api/campaigns", async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({
      order: [["id", "ASC"]],
    });

    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch campaigns" });
  }
});

app.post("/api/campaigns", async (req, res) => {
  try {
    const { title, subtitle } = req.body;

    const campaign = await Campaign.create({
      title,
      subtitle,
      theme: "teal",
      type: "bookmark",
      inboxCount: 0,
      clockCount: 0,
      status: "Draft",
      delivered: "0",
      opened: "0%",
      clicked: "0%",
      converted: "0%",
    });

    res.json({
      message: "Campaign created successfully",
      id: campaign.get("id"),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create campaign" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
