import {
  createOne,
  deleteById,
  findAll,
  findById,
  updateById,
} from "../services/book.service.js";

const getBooks = async (req, res) => {
  try {
    const response = await findAll();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addBook = async (req, res) => {
  try {
    const data = req.body;
    const response = await createOne(data);
    res.status(201).json({ message: "Add Data Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// tìm kiếm thông tin user bằng id
const getBookById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await findById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateData = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await updateById(data, id);
    res.status(200).json({ message: "Update Fields Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// xoá dữ liệu theo id
const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteById(id);
    res.status(200).json({ message: "Delete Data Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export { getBooks, addBook, getBookById, deleteBook, updateData };
