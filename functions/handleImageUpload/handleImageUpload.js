const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const file = req.file;

    cloudinary.uploader.upload(file.path, function (error, result) {
      if (error) {
        console.log(error);
      }

      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    });
  } catch (err) {
    return {statusCode: 500, body: err.toString()};
  }
};
