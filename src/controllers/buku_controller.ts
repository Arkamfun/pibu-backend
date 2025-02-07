import { Request, Response } from "express";
import * as book_service from "../services/book_service";
import uploader from "../libs/cloudinary";
import * as eksemplar_service from "../services/eksemplar_book";
export const getAllbook = async (req: Request, res: Response) => {
    const result = await book_service.getAllbook();
    res.send(result);
}

export const getBookByUID = async (req: Request, res: Response) => {
    const UID = req.params.UID;
    const result = await book_service.getBookByUID(String(UID));

    res.send(result)
}

export const getBookByNameOrAuthor = async (req: Request, res: Response) => {
    const { name } = req.params
    const uriCode = decodeURIComponent(name)
    const result = await book_service.getBookByNameOrAuthor(String(uriCode));
    res.send(result)
}

export const getBookByYear = async (req: Request, res: Response) => {
    try {
        const { year } = req.body

        const result = await book_service.getBookByYear(Number(year));

        if (result.length == 0) {
            res.status(404).send("Buku tidak ditemukan")
        } else {
            res.send(result)
        }


    } catch (error) {
        const err = error as Error
        res.status(500).send(err.message)
    }

}

export const addBook = async (req: Request, res: Response) => {
    try {
        const book = req.body;
        console.log(book.kategori_id)
        const image = await uploader(req.file as Express.Multer.File);
        const combine = { ...book, image };
        const existBook = await book_service.getBookByName(String(book.judul));
        if (existBook.length > 0) {
            console.log(existBook[0].id)
            const result = await eksemplar_service.createEksemplar(existBook[0])
            res.send({ result: result, message: "buku sudah ada, maka akan menambahkan eksemplar" })
        } else {
            const result = book_service.addBook(combine);
            res.send("buku berhasil ditambahkan")
        }
    } catch (error) {
        const err = error as Error
        res.status(500).send(err.message)
    }
}


export const updateBook = (req: Request, res: Response) => {
    console.log(req.body);
}


export const getBookByCategories = async (req: Request, res: Response) => {
    try {
        const { category } = req.params

        const result = await book_service.getBookByCategory(String(category));

        if (result.length == 0) {
            res.status(404).send("Buku tidak ditemukan")
        } else {
            res.send(result)
        }
    } catch (error) {
        const err = error as Error
        res.status(500).send(err.message)
    }

}
