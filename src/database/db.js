import mysql from "mysql2";
import * as userQuery from "./tables/user/querys.js";
import * as linkQuery from "./tables/link/querys.js";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createPool({
  host: process.env.prod_db_host || process.env.dev_db_host,
  user: process.env.prod_db_user || process.env.dev_db_user,
  password: process.env.prod_db_pwd || process.env.dev_db_pwd,
  port: process.env.prod_db_port || process.env.dev_db_port,
  database: process.env.prod_db_name || process.env.dev_db_name,
});

db.query(userQuery.createTableUsers, (err) => {
  errorHandle(err);
  console.log("CREATING TABLE users IF NOT EXISTS");
});

db.query(linkQuery.createTableLinks, (err) => {
  errorHandle(err);
  console.log("CREATING TABLE links IF NOT EXISTS");
});

function errorHandle(e) {
  if (e) throw e;
}

export default db;
