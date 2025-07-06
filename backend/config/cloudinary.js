const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.cloduanme || 'di2nkhwfy',
  api_key: process.env.CLOUDINARY_API_KEY || process.env.apikey || '357862814721853',
  api_secret: process.env.CLOUDINARY_API_SECRET || process.env.apiscreatkey || '9RgEfhIjfwq0nB3oSmZq6hnj1_4'
});

module.exports = cloudinary; 