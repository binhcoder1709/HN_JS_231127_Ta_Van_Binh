import express from "express";
import { addAuthor, deleteAuthor, getAuthors } from "../controllers/author.controller.js";
const authorRoute = express.Router();

authorRoute.get("/author", getAuthors);
authorRoute.post("/author", addAuthor);
authorRoute.delete("/author/:id", deleteAuthor)

export default authorRoute;
