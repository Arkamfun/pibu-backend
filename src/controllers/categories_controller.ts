import { Request, Response } from "express";
import * as categories_service from "../services/categories_service";
import uploader from "../libs/cloudinary";

export const getAllCategories = async (req: Request, res: Response) => {
    const result = await categories_service.getAllCtagories();

    res.send(result);
}

export const createCategories = async (req: Request, res: Response) => {
    const { kategori } = req.body;
    const image = await uploader(req.file as Express.Multer.File);


    console.log(kategori);
    const result = await categories_service.createCategories(kategori, image);
    res.send(result);
}
