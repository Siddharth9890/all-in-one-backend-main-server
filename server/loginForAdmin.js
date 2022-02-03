const express = require("express");
const AdminModel = require("./models/adminModel");

const router = express.Router();

router.post("/login", async (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  console.log(password);
  if (!email || !password) {
    return response.status(500).send({ message: "missing email or password " });
  }
  try {
    const findEmail = await AdminModel.findOne({ email, password });
    let expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + 7);
    findEmail.expiresIn = expiresIn;
    findEmail.password = null;
    findEmail._id = null;
    if (!findEmail)
      return response
        .status(403)
        .send({ message: "Invalid email or password " });
    console.log(findEmail);
    return response.status(200).send({ findEmail });
  } catch (error) {
    return response.status(500).send({ message: "Invalid email or password " });
  }
});

module.exports = router;
