/* eslint-disable no-unused-expressions */
/* eslint-disable linebreak-style */
import dotenv from 'dotenv';
import pool from './configuration';

dotenv.config();

const insert = async () => {
  const user = `INSERT INTO users (
            firstname ,
            lastname ,
            email ,
            password ,
            phonenumber,
            username
        ) VALUES ('Allybomayee', 'Babayaga', 'el.ally741@gmail.com', '1234567', '939393939', 'troptop' )`;
  const user1 = `INSERT INTO users (
            firstname ,
            lastname ,
            email ,
            password ,
            phonenumber,
            username
        ) VALUES ('Allybomayee', 'Babayaga', 'el.ally741abcde@gmail.com', '1234567', '939393939', 'troptop' )`;
  const user2 = `INSERT INTO users (
            firstname ,
            lastname ,
            email ,
            password ,
            phonenumber,
            username
        ) VALUES ('Allybomayee', 'Babayaga', 'admin@gmail.com', '1234567', '939393939', 'troptop' )`;
  const report = `INSERT INTO reports(
            email ,
            createdby ,
            title ,
            type ,
            latcoordonate ,
            longcoordonate ,
            images ,
            videos ,
            comment 
        ) VALUES ('el.ally741@gmail.com', 'AllyBomayee', 'Ni danje', 'intervention', '12345 lat', '12345 long', 'server\\uploadedFile\\_smokey_joker___Bx3-taXAOFl___.jpguploadedWell', 'server\\uploadedFile\\ayatul-kursi-y-lkrsy-sheikh-mishary-al-afasy-english-translations-and-arabic-text.mp4uploadedWell', 'blablabla sitaki kusikiya' )`;
  const report1 = `INSERT INTO reports(
            email ,
            createdby ,
            title ,
            type ,
            latcoordonate ,
            longcoordonate ,
            images ,
            videos ,
            comment 
        ) VALUES ('el.ally741@gmail.com', 'AllyBomayee', 'Ni danje', 'intervention', '12345 lat', '12345 long', 'server\\uploadedFile\\_smokey_joker___Bx3-taXAOFl___.jpguploadedWell', 'server\\uploadedFile\\ayatul-kursi-y-lkrsy-sheikh-mishary-al-afasy-english-translations-and-arabic-text.mp4uploadedWell', 'blablabla sitaki kusikiya' )`;
  await pool.query(report);
  await pool.query(report1);
  await pool.query(user1);
  await pool.query(user2);
  await pool.query(user);
};

insert();


// cross-env NODE_ENV=test npm run drop && cross-env NODE_ENV=test npm run create && cross-env NODE_ENV=test npm run insert &&  cross-env NODE_ENV=test
export default insert;
