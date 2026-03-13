import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./config/database";

const PORT = 5000;

AppDataSource.initialize()
  .then(async () => {
    console.log("Connected");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });
