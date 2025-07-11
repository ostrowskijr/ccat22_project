import pgPromise from "pg-promise";

const pgp = pgPromise();

const HOST = process.env.DB_HOST || "localhost";
const PORT = process.env.DB_PORT || 5432;
const DB_NAME = process.env.DB_NAME;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;

export const connection = pgp({
  host: HOST as string,
  port: PORT as number,
  database: DB_NAME,
  user: USER,
  password: PASSWORD,
});

export const connectToDatabase = async () => connection.connect();