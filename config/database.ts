import { DataSource } from "typeorm";
import { Campaign } from "../models/Campaign";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./database.db",
  synchronize: true,
  logging: false,
  entities: [Campaign],
});
