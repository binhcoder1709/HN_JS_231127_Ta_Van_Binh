const validation = async (req, res, next) => {
  const data = req.body;
  if (!data.id || !data.book_name || !data.description || !data.price) {
    return res.status(400).json({ message: "Missing Data" });
  }
  return next();
};
export { validation };
