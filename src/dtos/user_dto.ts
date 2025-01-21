
export interface user_dto {
    nama_lengkap: string;
    alamat: string;
    NIK: number;
    tempat_lahir: string;
    tanggal_lahir: Date;
    jenis_kelamin: jenis_kelamin;
}

export enum jenis_kelamin {
    Pria = "Pria",
    Wanita = "Wanita"
}