import { Router } from "express";
import * as categories_controller from "../controllers/categories_controller"
import upload from "../libs/multer";

const categories_route = Router();

categories_route.get("/", categories_controller.getAllCategories);
categories_route.post("/create", upload.single('image'), categories_controller.createCategories);
export default categories_route