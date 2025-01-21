

export interface buku_dto {
    judul: string,
    penulis: string,
    penerbit: string,
    tahun_terbit: number
    ISBN: string
    jumlah_tersedia: number
    status: BookStatus
    deksripsi: string
    image: string
    kategori_id: number
}

export enum BookStatus {
    active = "active",
    inactive = "inactive"
}