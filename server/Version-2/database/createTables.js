import dotenv from 'dotenv';
import pool from './configuration';

dotenv.config();

const createTables = async () => {
  const users = `CREATE TABLE IF NOT EXISTS
    users (
        id serial primary key,
        firstname VARCHAR,
        lastname VARCHAR,
        email VARCHAR,
        password VARCHAR,
        phonenumber INT,
        username VARCHAR,
        role VARCHAR DEFAULT 'user'
    )`;
  const report = `CREATE TABLE IF NOT EXISTS
    reports (
        reportid serial primary key,
        createdon TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        email VARCHAR,
        createdby VARCHAR,
        title VARCHAR,
        type VARCHAR,
        latcoordonate VARCHAR,
        longcoordonate VARCHAR,
        status VARCHAR DEFAULT 'Draft',
        images VARCHAR,
        videos VARCHAR,
        comment VARCHAR
    )`;
  await pool.query(users);
  await pool.query(report);
  console.log('tables created');
};
createTables();

export default createTables;
