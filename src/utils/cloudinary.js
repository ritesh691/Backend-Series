// import {v2 as cloudinary} from 'cloudinary';
// import fs from  'fs';

// cloudinary.config({
//   cloud_name: process.env.cloudinary_cloud_name,
//   api_key: process.env.cloudinary_api_key,
//   api_secret: process.env.cloudinary_api_secret
// });

// const uploadOnCloudinary = async (localFilePath)  => {
//     try {
//         if (!localFilePath) return null
//         // Upload the image to Cloudinary
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: 'auto',
//         })
//         // file has been uploaded succesfully
//         console.log("File uploaded to Cloudinary successfully ", response.url);
//         return response;
//     }
//     catch (error) {
//         fs.unlinkSync(localFilePath);
//         //remove the locally stored file if upload fails

//         return null;
//     }

// };

// cloudinary.v2.uploader.upload("http://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill,g_auto,r_max/sample.jpg",
//   { public_id: "sample_image" },
//   function (error, result)
//     {console.log(result); });

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);

    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export { uploadToCloudinary };
