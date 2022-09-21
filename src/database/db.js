import mysql from "mysql";
import * as userQuery from "./tables/user/querys.js";
import * as linkQuery from "./tables/link/querys.js";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_pwd,
});

db.connect((err) => {
  errorHandle(err);
  console.log("mysql: connection created!");
});

db.query("CREATE DATABASE IF NOT EXISTS yourlink;", (err) => {
  errorHandle(err);
  console.log("CREATING DATABASE yourlink IF NOT EXISTS");
});

db.query("use yourlink;", (err) => {
  errorHandle(err);
  console.log("changed database: using yourlink");
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
