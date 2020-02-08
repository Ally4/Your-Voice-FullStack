import dotenv from 'dotenv';
import pool from './configuration';

dotenv.config();
const dropTables = async () => {
  const users = 'DROP TABLE IF EXISTS users';
  const reports = 'DROP TABLE IF EXISTS reports';

  await pool.query(users);
  await pool.query(reports);
  console.log('tables droped');
};
dropTables();

export default dropTables;
