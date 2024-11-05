import multer from 'multer';
import { BlobServiceClient } from "@azure/storage-blob";
import { Request } from "express";


const blobserviceclient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING as string
);

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req: Request, file: any, cb: any) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

export const uploadImagesToAzure = async (files: any) => {
  const containerClient =
    blobserviceclient.getContainerClient("hotelbookingapp");
  let imgurl;
try {
      const uniquename = `${Date.now()}-${files.originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(uniquename);
  await blockBlobClient.uploadData(files.buffer);
    imgurl = blockBlobClient.url;
    console.log(imgurl);
} catch (error) {
    console.log(error);
}


  return imgurl;
};
