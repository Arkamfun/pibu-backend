-- CreateEnum
CREATE TYPE "Jenis_Kelamin" AS ENUM ('Pria', 'Wanita');

-- CreateEnum
CREATE TYPE "EksmplarStatus" AS ENUM ('AVAILABLE', 'BORROWED', 'DAMAGED');

-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Peminjaman', 'Pengembalian');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nama_lengkap" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "NIK" BIGINT NOT NULL,
    "tempat_lahir" TEXT NOT NULL,
    "tanggal_lahir" TIMESTAMP(3) NOT NULL,
    "jenis_kelamin" "Jenis_Kelamin" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kartu_anggota" (
    "id" TEXT NOT NULL,
    "user_Id" INTEGER NOT NULL,
    "nama_lengkap" TEXT NOT NULL,
    "tempat_lahir" TEXT NOT NULL,
    "tanggal_lahir" TIMESTAMP(3) NOT NULL,
    "masa_berlaku" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kartu_anggota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Buku" (
    "id" TEXT NOT NULL,
    "kategori_buku_id" INTEGER NOT NULL,
    "judul" TEXT NOT NULL,
    "penulis" TEXT NOT NULL,
    "penerbit" TEXT NOT NULL,
    "tahun_penerbitan" INTEGER NOT NULL,
    "ISBN" TEXT NOT NULL,
    "jumlah_tersedia" INTEGER,
    "peminjamanId" INTEGER,
    "status" "BookStatus" NOT NULL,
    "deksripsi" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Buku_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EksemplarBuku" (
    "id" TEXT NOT NULL,
    "bukuId" TEXT NOT NULL,
    "kode_inventaris" TEXT NOT NULL,
    "kondisi" TEXT NOT NULL,
    "status" "EksmplarStatus" NOT NULL,

    CONSTRAINT "EksemplarBuku_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kategori" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Kategori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "buku_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "komentar" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "anggota_id" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Peminjaman" (
    "id" SERIAL NOT NULL,
    "anggota_id" TEXT NOT NULL,
    "eksemplar_buku_id" TEXT NOT NULL,
    "tanggal_peminjaman" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_pengembalian" TIMESTAMP(3) NOT NULL,
    "qr_code" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "Peminjaman_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kartu_anggota_user_Id_key" ON "Kartu_anggota"("user_Id");

-- CreateIndex
CREATE UNIQUE INDEX "EksemplarBuku_kode_inventaris_key" ON "EksemplarBuku"("kode_inventaris");

-- AddForeignKey
ALTER TABLE "Kartu_anggota" ADD CONSTRAINT "Kartu_anggota_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buku" ADD CONSTRAINT "Buku_kategori_buku_id_fkey" FOREIGN KEY ("kategori_buku_id") REFERENCES "Kategori"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buku" ADD CONSTRAINT "Buku_peminjamanId_fkey" FOREIGN KEY ("peminjamanId") REFERENCES "Peminjaman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EksemplarBuku" ADD CONSTRAINT "EksemplarBuku_bukuId_fkey" FOREIGN KEY ("bukuId") REFERENCES "Buku"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_buku_id_fkey" FOREIGN KEY ("buku_id") REFERENCES "Buku"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_anggota_id_fkey" FOREIGN KEY ("anggota_id") REFERENCES "Kartu_anggota"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peminjaman" ADD CONSTRAINT "Peminjaman_eksemplar_buku_id_fkey" FOREIGN KEY ("eksemplar_buku_id") REFERENCES "EksemplarBuku"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peminjaman" ADD CONSTRAINT "Peminjaman_anggota_id_fkey" FOREIGN KEY ("anggota_id") REFERENCES "Kartu_anggota"("id") ON DELETE CASCADE ON UPDATE CASCADE;
