export default (res, msg, error = false) => {
  return res.json({ msg, error });
};
