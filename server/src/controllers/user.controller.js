import {
  deleteById,
  findAll,
  findById,
  updateRole,
} from "../services/user.service.js";

// tạo api tổng
const general = async (req, res) => {
  try {
    res.status(200).json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// lấy dữ liệu tất cả sinh viên
const getAllUsers = async (req, res) => {
  try {
    const response = await findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// cập nhật giá trị của trường role
const changeRole = async (req, res) => {
  try {
    const { role } = req.body;
    const id = req.params.id;
    await updateRole(role, id);
    res.status(200).json({ message: "Update Fields Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// tìm kiếm thông tin user bằng id
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await findById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// xoá dữ liệu theo id
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteById(id);
    res.status(200).json({ message: "Delete Data Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export { getAllUsers, changeRole, getUserById, deleteUser, general };
