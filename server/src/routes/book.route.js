import express from "express";
import {
  addBook,
  deleteBook,
  getBookById,
  getBooks,
  updateData,
} from "../controllers/book.controller.js";
import { validation } from "../middlewares/book.middleware.js";
const bookRoute = express.Router();

bookRoute.post("/book", validation, addBook);
bookRoute.put("/book/:id", updateData);
bookRoute.get("/book", getBooks);
bookRoute.get("/book/:id", getBookById);
bookRoute.delete("/book/:id", deleteBook);

export default bookRoute;
