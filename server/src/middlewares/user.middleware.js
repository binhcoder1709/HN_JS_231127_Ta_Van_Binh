import { findById } from "../services/user.service.js";

// check dữ liệu có tồn tại hay không
const checkUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const check = await findById(id);
    if (!check) {
      return res.status(404).json({ message: "Not Found Data" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { checkUserById };
