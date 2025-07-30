import { Sequelize } from "sequelize";
import pg from "pg";

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

if (!DB_NAME || !DB_USER || !DB_PASS || !DB_HOST || !DB_PORT) {
  throw new Error("Missing required DB environment variables.");
}

const sequelize = new Sequelize(
  DB_NAME,     
  DB_USER,     
  DB_PASS, 
  {
    host: DB_HOST,
    port: parseInt(DB_PORT, 10) ,
    dialect: 'postgres',
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);  



export default sequelize;
