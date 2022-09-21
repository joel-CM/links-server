import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export function verify(token) {
  let data = null;
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) return false;
    data = decoded;
  });
  return data;
}
