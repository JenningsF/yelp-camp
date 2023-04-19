// Cloudinary is used for hosting images for each campground

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configures app's connection to cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

// Sets parameters for where images are stored and what formats
const storage = new CloudinaryStorage({
	cloudinary,
    params: {
        folder: "YelpCamp",
        allowedFormats: ["jpeg", "png", "jpg"],
    }
});

module.exports = {
	cloudinary,
	storage,
};
