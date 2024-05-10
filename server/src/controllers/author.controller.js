import {
  createOne,
  deleteById,
  findAll,
  findById,
} from "../services/author.service.js";

const getAuthors = async (req, res) => {
  try {
    const response = await findAll();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addAuthor = async (req, res) => {
  try {
    const data = req.body;
    const response = await createOne(data);
    res.status(201).json({ message: "Add Data Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// tìm kiếm thông tin user bằng id
const getAuthorById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await findById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await updateRole(data, id);
    res.status(200).json({ message: "Update Fields Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// xoá dữ liệu theo id
const deleteAuthor = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteById(id);
    res.status(200).json({ message: "Delete Data Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export { getAuthors, addAuthor, updateAuthor, getAuthorById, deleteAuthor };
