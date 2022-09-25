import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../database/db.js";
import * as userQuery from "../database/tables/user/querys.js";
import { createToken, verify } from "../helpers/jwt.js";
import handleResponse from "../helpers/handleResponse.js";

const controller = {};

controller.signUp = (req, res) => {
  try {
    const name = req.body.name.trim();
    const lastname = req.body.lastname.trim();
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    if (!name || !email || !password) {
      return handleResponse(res, 200, "user or password is empty", true);
    }

    db.query(userQuery.validUser, [email], (err, data) => {
      if (err) return handleResponse(res, 500, err.message, true);
      if (data[0]) return handleResponse(res, 200, "user already exists", true);

      const hashedPwd = bcrypt.hashSync(password, 10);

      db.query(
        userQuery.createUser,
        [name, lastname, email, hashedPwd],
        (err) => {
          if (err) return handleResponse(res, 500, err.message, true);
          handleResponse(res, 201, `user ${name} created`);
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
};

controller.login = (req, res) => {
  try {
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    if (!email || !password) {
      return handleResponse(res, 200, "user or password is empty", true);
    }

    db.query(userQuery.validEmail, [email], (err, data) => {
      if (err) return handleResponse(res, 500, err.message, true);

      const validPwd = bcrypt.compareSync(password, data[0]?.password || "");

      if (!data[0] || !validPwd) {
        return handleResponse(res, 200, "user or password invalid", true);
      }

      const user = {
        id: data[0].id,
        name: data[0].name,
        lastname: data[0].lastname,
        email: data[0].email,
      };
      const token = createToken({ id: data[0].id, email: data[0].email });
      console.log("TOKENN------------>>>>", token);
      handleResponse(res, 200, { token, user });
    });
  } catch (err) {
    console.log(err);
  }
};

controller.verify = (req, res) => {
  try {
    const { token } = req.body;
    console.log(token);

    const verify = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return { msg: "invalid or expired token", error: true };
      }
      return { msg: "verified token", error: false };
    });

    handleResponse(res, 200, verify.msg, verify.error);
  } catch (err) {
    console.log(err);
  }
};

export default controller;
