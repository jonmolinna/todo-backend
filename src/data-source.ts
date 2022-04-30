import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASENAME,
} from "./config";
import { Lists } from "./entity/Lists";
import { Users } from "./entity/User";
import { Tasks } from "./entity/Tasks";

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
  // entities: ["src/entity/**/*.ts", "./entity/**/*.js"],
  entities: [Lists, Users, Tasks],
  migrations: ["src/migration/**/*.ts", "./migration/**/*.js"],
  subscribers: ["src/subscriber/**/*.ts", "./subscriber/**/*.js"],
});
