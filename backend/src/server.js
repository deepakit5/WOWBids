import app from "./app.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env", //if path is not provided ,by default it search .env file in root directory
});
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
