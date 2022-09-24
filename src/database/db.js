import mysql from "mysql";
import * as userQuery from "./tables/user/querys.js";
import * as linkQuery from "./tables/link/querys.js";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
  host: process.env.prod_db_host || process.env.dev_db_host,
  user: process.env.prod_db_user || process.env.dev_db_user,
  password: process.env.prod_db_pwd || process.env.dev_db_pwd,
  port: process.env.prod_db_port || process.env.dev_db_port,
});

const db_name = process.env.prod_db_name || process.env.dev_db_name;

db.connect((err) => {
  errorHandle(err);
  console.log("mysql: connection created!");
});

db.query(`CREATE DATABASE IF NOT EXISTS ${db_name};`, (err) => {
  errorHandle(err);
  console.log(`CREATING DATABASE ${db_name} IF NOT EXISTS`);
});

db.query(`use ${db_name};`, (err) => {
  errorHandle(err);
  console.log(`changed database: using ${db_name}`);
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
