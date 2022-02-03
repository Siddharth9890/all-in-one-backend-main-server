const express = require("express");
const User = require("./models/userModel");
const router = express.Router();

router.post("/", async (request, response) => {
  const { country_name, city, state, latitude, longitude, IPv4, userData } =
    request.body;
  const findUser = await User.findOne({ IPV4: IPv4 });
  if (findUser) {
    await User.updateOne(findUser, { LastVisited: new Date().toISOString() });
    response.status(200).send("");
  } else {
    await User.create({
      CountryName: country_name,
      City: city,
      State: state,
      latitude: latitude,
      longitude: longitude,
      IPV4: IPv4,
      UserAgent: userData,
    });
    response.status(200).send("");
  }
});

module.exports = router;
