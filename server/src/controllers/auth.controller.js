import { createOne } from "../services/auth.service.js";

// thêm dữ liệu sinh viên
const addUser = async (req, res) => {
  const data = req.body;
  try {
    const response = await createOne(data);
    console.log(response);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" }); // Trả về thông báo lỗi cho client
  }
};

//   đăng nhập
const loginUser = async (req, res) => {
  try {
    const token = req.token;
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { addUser, loginUser };
