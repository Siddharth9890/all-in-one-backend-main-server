const CronJob = require("cron").CronJob;
const ImageModel = require("./models/ImageModel");
const cloudinary = require("cloudinary");
const job = new CronJob("0 * * * *", async function () {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    const images = await ImageModel.find();
    images.forEach((image) => {
      let Public_id = image.SecureUrl.slice(image.SecureUrl.length - 24);
      console.log(Public_id);
      Public_id = Public_id.slice(0, Public_id.length - 4);

      cloudinary.v2.uploader.destroy(Public_id, function (error, result) {
        console.log(result, error);
      });
    });
    const d = new Date();
    console.log("success at time :", d);
  } catch (error) {
    const d = new Date();
    console.log("error failed at time ", d, error);
  }
});
module.exports = job;
