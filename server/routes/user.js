const express = require("express");
const { getUser } = require("../controller/user.js");

const router = express.Router();

router.get("/find/:userId", getUser);

module.exports = router;
