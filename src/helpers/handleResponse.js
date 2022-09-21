export default (res, statusCode, msg, error = false) => {
  return res.status(statusCode).json({ msg, error });
};
