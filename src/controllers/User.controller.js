import db from "../database/db.js";
import * as userQuery from "../database/tables/user/querys.js";
import { createToken } from "../jwt/jwt.js";
import bcrypt from "bcrypt";
import handleResponse from "../helpers/handleResponse.js";

const controller = {};

controller.signUp = (req, res) => {
  const name = req.body.name.trim();
  const lastname = req.body.lastname.trim();
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  if (!name || !email || !password) {
    handleResponse(res, "user or password is empty", true);
  }

  db.query(userQuery.validUser, [email], (err, data) => {
    if (err) handleResponse(res, err.message, true);
    if (data[0]) handleResponse(res, "user already exists", true);

    const hashedPwd = bcrypt.hashSync(password, 10);

    db.query(
      userQuery.createUser,
      [name, lastname, email, hashedPwd],
      (err) => {
        if (err) handleResponse(res, err.message, true);
        handleResponse(res, `user ${name} created`);
      }
    );
  });
};

controller.login = (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  if (!email || !password) {
    handleResponse(res, "user or password is empty", true);
  }

  db.query(userQuery.validEmail, [email], (err, data) => {
    if (err) handleResponse(res, err.message, true);

    const validPwd = bcrypt.compareSync(password, data[0]?.password || "");

    if (!data[0] || !validPwd) {
      handleResponse(res, "user or password invalid", true);
    }

    const token = createToken({ id: data[0].id, email: data[0].email });
    handleResponse(res, { token, user: data[0] });
  });
};

export default controller;