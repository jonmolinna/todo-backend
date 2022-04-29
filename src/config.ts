import { config } from "dotenv";
config();

export const DB_HOST: string | undefined = process.env.DB_HOST;
export const DB_DATABASENAME: string | undefined = process.env.DB_DATABASENAME;
export const DB_USER: string | undefined = process.env.DB_USER;
export const DB_PORT: number | undefined = Number(process.env.DB_PORT);
export const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD;

export const SECRET_TOKEN = process.env.SECRET_TOKEN;
