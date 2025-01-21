import { kategoridto } from "../dtos/kategori_dto";
import prisma from "../utils/prisma";

export const getAllCtagories = async () => {
    const result = await prisma.kategori.findMany();
    return result;
}

export const createCategories = async (data: string, image: string) => {
    const result = await prisma.kategori.create({ data: { nama: data, image: image } });
    return result;
}



