import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "molina125",
  database: "todo_list",
  synchronize: true,
  logging: true,
  entities: ["src/entity/**/*.ts", "./entity/**/*.js"],
  migrations: ["src/migration/**/*.ts", "./migration/**/*.js"],
  subscribers: ["src/subscriber/**/*.ts", "./subscriber/**/*.js"],
});
