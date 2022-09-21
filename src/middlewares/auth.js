import { verify } from "../jwt/jwt.js";

const auth = (req, res, next) => {
  const token = req.headers?.token;
  const valid = verify(token);
  if (!valid) return res.json({ msg: "invalid or expired token", error: true });
  req.token = valid;
  next();
};

export default auth;
