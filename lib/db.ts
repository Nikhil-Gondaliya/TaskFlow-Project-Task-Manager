import { Sequelize } from "sequelize";
import pg from "pg";

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

if (!DB_NAME || !DB_USER || !DB_PASS || !DB_HOST) {
  throw new Error("Missing required DB environment variables.");
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialectModule: pg,
  host: DB_HOST,
  port: Number(DB_PORT) || 5432,
  dialect: "postgres",
  logging: false,
});

export default sequelize;
