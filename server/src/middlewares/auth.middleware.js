import { login } from "../services/auth.service.js";
import { findByEmail } from "../services/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// check user đã tồn tại hay chưa
const checkEmptyUser = async (req, res, next) => {
  const { email } = req.body;
  const dataCheck = await findByEmail(email);
  if (dataCheck) {
    return res.status(400).json({ message: "Data Exist" });
  }
  next();
};

// validate dữ liệu
const validationUser = async (req, res, next) => {
  const data = req.body;
  if (
    !data.user_name ||
    !data.email ||
    !data.password ||
    !data.phone_number ||
    !data.address
  ) {
    return res.status(400).json({ message: "Missing Data Fields!" });
  }
  const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!emailFormat.test(data.email)) {
    return res.status(400).json({ message: "Email Invalid Format" });
  }
  if (data.password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password Must Be At Least 8 Characters" });
  }
  next();
};

// mã hoá mật khẩu
const hashPassword = async (req, res, next) => {
  const { password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

// check user
const checkExist = async (req, res, next) => {
  const data = req.body;
  const checkExist = await findByEmail(data.email);
  if (!checkExist) {
    return res.status(404).json({ message: "Not Found Data" });
  }
  req.userAuth = checkExist;
  next();
};

// giải mã mật khẩu
const decryptionPassword = async (req, res, next) => {
  try {
    const data = req.body;
    const userPasswordCheck = req.userAuth;
    // Sử dụng async/await để gọi bcrypt.compare
    const result = await bcrypt.compare(
      data.password,
      userPasswordCheck.password
    );

    // Kiểm tra kết quả trả về từ bcrypt.compare
    if (result) {
      next();
    } else {
      return res.status(401).json({ message: "Invalid Password" });
    }
  } catch (error) {
    console.error("Error in decryptionPassword:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// check tài khoản bị chặn
const checkBlockedUser = async (req, res, next) => {
  const userAuth = req.userAuth;
  if (userAuth.role == 0) {
    return res.status(403).json({ message: "Acccount Blocked" });
  }
  const userChecked = {
    id: userAuth.id,
    userName: userAuth.user_name,
    email: userAuth.email,
    role: userAuth.role,
  };
  console.log(userChecked);
  req.userChecked = userChecked;
  next();
};

// cung cấp token
const accessToken = async (req, res, next) => {
  const dataOfToken = req.userChecked;
  const token = jwt.sign(dataOfToken, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "30m",
  });
  req.token = token;
  next();
};

export {
  checkEmptyUser,
  validationUser,
  hashPassword,
  checkExist,
  decryptionPassword,
  checkBlockedUser,
  accessToken,
};
