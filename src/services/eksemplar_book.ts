import prisma from "../utils/prisma";


enum EksmplarStatus {
    AVAILABLE = "AVAILABLE",
    BORROWED = "BORROWED",
    DAMAGED = "DAMAGED"
}
export const createEksemplar = async (eksemplar: any) => {
    console.log(eksemplar.id)
    const invBook = await prisma.eksemplarBuku.count({ where: { bukuId: eksemplar.id } });
    console.log(invBook);
    const result = await prisma.eksemplarBuku.create({
        data: {
            kode_inventaris: `INV-${invBook + 1}-${eksemplar.judul}`,
            kondisi: "Baik",
            status: "AVAILABLE",
            bukuId: eksemplar.id

        },

    })
    const updateBook = await prisma.buku.update({ where: { id: eksemplar.id }, data: { jumlah_tersedia: invBook } });

    return result
}

export const getEksemplar = async () => {
    return await prisma.eksemplarBuku.findMany({});
}

export const getEksemplarByBookUID = async (UID: string) => {
    return await prisma.eksemplarBuku.findMany({ where: { bukuId: UID } });
}


export const updateEksemplarStatus = async (UID: string, status: EksmplarStatus) => {
    return await prisma.eksemplarBuku.update({ where: { id: UID }, data: { status: status } });
}

export const updateKondisiEksemplar = async (UID: string, kondisi: string) => {
    return await prisma.eksemplarBuku.update({ where: { id: UID }, data: { kondisi: kondisi } });
}


