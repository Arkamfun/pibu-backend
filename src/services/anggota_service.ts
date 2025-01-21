import { user_dto } from "../dtos/user_dto";
import prisma from "../utils/prisma";
import { addYears } from 'date-fns';



export const getAllAnggota = async () => {
    const result = await prisma.kartu_anggota.findMany();
    return result;
}


export const getAccountByNIK = async (NIK: Number) => {

    const result = await prisma.kartu_anggota.findFirst({
        where: {
            user: {
                NIK: Number(NIK)
            }
        }
    })

    return result
}

export const createAccount = async (user: user_dto) => {
    const createUser = await prisma.user.create({
        data: {
            nama_lengkap: user.nama_lengkap,
            jenis_kelamin: user.jenis_kelamin,
            NIK: Number(user.NIK),
            alamat: user.alamat,
            tanggal_lahir: new Date (user.tanggal_lahir),
            tempat_lahir: user.tempat_lahir
        },
    })

    const masa_berlaku = addYears(new Date(), 3);

    const createKartu = await prisma.kartu_anggota.create({
        data: {
            tanggal_lahir: new Date (user.tanggal_lahir),
            nama_lengkap: user.nama_lengkap,
            tempat_lahir: user.tempat_lahir,
            masa_berlaku: new Date(masa_berlaku),
            user: {
                connect: {
                    id: createUser.id
                }
            }
        }
    })
    return createKartu
}
