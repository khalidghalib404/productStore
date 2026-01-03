import {neon} from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const  { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// this create a sql connection using env varibles
export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)

//this sql function we export is used as a tagged template literal, which allows us to write sql querise safely 
