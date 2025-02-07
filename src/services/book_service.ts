import prisma from "../utils/prisma";
import { buku_dto } from "../dtos/buku_dto";

export const getAllbook = async () => {
    const result = await prisma.buku.findMany({
        include: {
            kategori_buku: true
        }
    });
    return result;
}

export const getBookByUID = async (UID: string) => {
    const result = await prisma.buku.findFirst({
        where: {
            id: UID
        }
    })
    return result;
}

export const getBookByNameOrPubisherOrAuthor = async (search: string) => {
    return await prisma.buku.findMany({
        where: {
            OR: [
                { judul: { contains: search } },
                { penerbit: { contains: search } },
                { penulis: { contains: search } }
            ]
        }
    })
}

export const getBookByNameOrAuthor = async (search: string) => {
    return await prisma.buku.findMany({
        where: {
            OR: [
                { judul: { contains: search.toLowerCase(), mode: "insensitive" } },
                { penulis: { contains: search.toLowerCase(), mode: "insensitive" } }
            ]
        },
        include: {
            review_buku: true
        }
    })
}
export const getBookByName = async (search: string) => {
    return await prisma.buku.findMany({
        where: {
            judul: { contains: search }
        }
    })
}


export const getBookByYear = async (year: number) => {
    const result = await prisma.buku.findMany({
        where: {
            tahun_penerbitan: year
        }
    })
    return result;
}

export const getBookByCategory = async (category: string) => {
    const result = await prisma.buku.findMany({
        where: {
            kategori_buku: {
                nama: category
            }
        }
    })
    return result;
}

export const addBook = async (book: buku_dto) => {
    const jumlah = await prisma.eksemplarBuku.count({
        where: {
            buku: {
                judul: book.judul
            }
        }
    })
    let invBook = `INV-${jumlah}-${book.judul}`
    if (jumlah == 0) {
        invBook = `INV-${jumlah + 1}-${book.judul}`
    }
    return await prisma.buku.create({
        data: {
            deksripsi: book.deksripsi,
            image: book.image,
            ISBN: book.ISBN,
            jumlah_tersedia: 1,
            judul: book.judul,
            penulis: book.penulis,
            penerbit: book.penerbit,
            status: "active",
            tahun_penerbitan: Number(book.tahun_terbit),
            kategori_buku: {
                connect: {
                    id: Number(book.kategori_id)
                }
            },
            EksemplarBuku: {
                create: {
                    kondisi: "Baik",
                    status: "AVAILABLE",
                    kode_inventaris: invBook

                }
            }
        }

    });
}