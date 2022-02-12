const get = (req, res, next) => {
  try {
    throw new Error('só foi');
  } catch (err) {
    next(err);
  }
};
export default get;
