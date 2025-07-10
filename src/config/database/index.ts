import pgPromise from "pg-promise";

const pgp = pgPromise();

const HOST = process.env.DB_HOST || "localhost";
const PORT = process.env.DB_PORT || 5432;
const DATA_BASE_URL = process.env.DATABASE_URL;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;

export const connection = pgp({
  host: HOST as string,
  port: PORT as number,
  database: DATA_BASE_URL,
  user: USER,
  password: PASSWORD,
});

export const connectToDatabase = async () => connection.connect();