import dotenv from 'dotenv/config';
import { Pool } from 'pg';

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 5000,
});

db.on('connect', () => {
  console.log('Database client connected to pool');
});

db.on('error', () => {
  console.error('Unexpected database pool error. |', error.message);
});

const testConnection = async () => {
  try {
    const client = await db.connect();
    const database = client.connectionParameters.database;
    console.log(`Connection to "${database}" DB was successful`);
    client.release();
  } catch (err) {
    console.log('Failed to connect to the databse. |', err.message);
  }
};
testConnection();

export default db;
