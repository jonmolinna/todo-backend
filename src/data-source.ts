import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASENAME,
} from "./config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASENAME,
  synchronize: false,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ["build/entity/**/*.ts", "./entity/**/*.js"],
  migrations: ["src/migration/**/*.ts", "./migration/**/*.js"],
  subscribers: ["src/subscriber/**/*.ts", "./subscriber/**/*.js"],
});
