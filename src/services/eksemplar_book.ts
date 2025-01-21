import prisma from "../utils/prisma";


enum EksmplarStatus {
    AVAILABLE = "AVAILABLE",
    BORROWED = "BORROWED",
    DAMAGED = "DAMAGED"
}
export const createEksemplar = async (eksemplar: any) => {
    return await prisma.eksemplarBuku.create({
        data: {
            kode_inventaris: eksemplar.kode_inventaris,
            kondisi: eksemplar.kondisi,
            status: eksemplar.status,
            bukuId: eksemplar.bukuId
            
        }
    });
}

export const getEksemplar = async () => {
    return await prisma.eksemplarBuku.findMany({});
}

export const getEksemplarByBookUID = async (UID: string) => {
    return await prisma.eksemplarBuku.findMany({ where: { bukuId: UID } });
}


export const updateEksemplarStatus = async (UID: string, status: EksmplarStatus) => {
    return await prisma.eksemplarBuku.updateMany({ where: { id: UID }, data: { status: status } });
}


