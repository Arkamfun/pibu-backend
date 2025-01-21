import { Request, Response } from "express";
import * as anggota_service from "../services/anggota_service";
import { user_dto } from "../dtos/user_dto";
import { format } from "date-fns"

export const createAccount = async (req: Request, res: Response) => {
    try {
        const user: user_dto = req.body;
        const existUser = await anggota_service.getAccountByNIK(user.NIK)
        if (existUser) {
            throw new Error("user sudah ada")
        }
        const result = await anggota_service.createAccount(user);
        if (!result) {
            res.send(result)

        } else {
            res.send("anggota berhasil dibuat");
        }

    } catch (error) {
        const err = error as Error
        res.status(500).send(err.message)
    }
}

export const getAllAccount = async (req: Request, res: Response) => {
    try {
        const result = await anggota_service.getAllAnggota()
        res.send(result)
    } catch (error) {
        const err = error as Error
        res.status(500).send(err.message)
    }
}

export const getAccountByNIK = async (req: Request, res: Response) => {
    try {
        const { NIK } = req.body;
        const user = await anggota_service.getAccountByNIK(Number(NIK));
        if (!user) {
            res.status(404).send("Anggota tidak ditemukan")
        } else {
            const formatDate = format(new Date(user.tanggal_lahir), "dd-MM-yyyy")
            const formatMasaBerlaku = format(new Date(user.masa_berlaku), "MM-yyyy")
            const { tanggal_lahir, masa_berlaku, ...result } = user
            res.send({
                user: result,
                tanggal_lahir: formatDate,
                masa_berlaku: formatMasaBerlaku
            })
        }
    } catch (error) {
        const err = error as Error
        res.status(500).send(err.message)
    }
}

export const deleteAccount = (req: Request, res: Response) => {
    console.log(req.body);
}

export const updateAccount = (req: Request, res: Response) => {
    console.log(req.body);
}
