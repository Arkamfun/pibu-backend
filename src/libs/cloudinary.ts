import { v2 as cloudinary } from "cloudinary";
import upload from "./multer";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploader = async (file: Express.Multer.File) => {
    console.log(file)
    const b64 = Buffer.from(file.buffer).toString('base64');
    const dataURI = 'data:' + file.mimetype + ';base64,' + b64;
    const uploadFile = await cloudinary.uploader.upload(dataURI, {
        folder: 'PIBU'
    });
    return uploadFile.url;
}

export default uploader