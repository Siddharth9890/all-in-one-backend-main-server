const express = require("express");
const ImageModel = require("./models/ImageModel");
const User = require("./models/userModel");
const UserVideoDetails = require("./models/userVideoModel");

const router = express.Router();

router.get("/get-user-data/", async (request, response) => {
  if (!request.body.email) return response.status(500).send("Invalid auth");
  try {
    const result = await User.find();
    response.status(200).send(result);
  } catch (error) {
    console.log(error);
    response.status(500).send("Something went wrong");
  }
});

router.get("/get-images-data/", async (request, response) => {
  if (!request.body.email) return response.status(500).send("Invalid auth");

  try {
    const result = await ImageModel.find();
    response.status(200).send(result);
  } catch (error) {
    console.log(error);
    response.status(500).send("Something went wrong");
  }
});

router.get("/get-videos-data/", async (request, response) => {
  if (!request.body.email) return response.status(500).send("Invalid auth");

  try {
    const result = await UserVideoDetails.find();
    response.status(200).send(result);
  } catch (error) {
    console.log(error);
    response.status(500).send("Something went wrong");
  }
});

router.get("/get-country-data/", async (request, response) => {
  if (!request.body.email) return response.status(500).send("Invalid auth");

  try {
    const result = await User.find({ CountryName: "India" });
    const result2 = await User.find({ CountryName: "USA" });
    const result3 = await User.find({ CountryName: "Canada" });

    const final = { result, result2, result3 };
    response.status(200).send(final);
  } catch (error) {
    console.log(error);
    response.status(500).send("Something went wrong");
  }
});

module.exports = router;
