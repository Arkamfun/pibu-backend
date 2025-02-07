import { Router } from "express";
import * as book_controller from "../controllers/buku_controller"
import upload from "../libs/multer";

const book_route = Router();

book_route.get("/", book_controller.getAllbook);
book_route.get("/:UID", book_controller.getBookByUID);
book_route.get("/name/:name", book_controller.getBookByNameOrAuthor);
book_route.post("/year", book_controller.getBookByYear);
book_route.get("/categories/:category", book_controller.getBookByCategories);
book_route.post("/create", upload.single('image'), book_controller.addBook);
export default book_route
