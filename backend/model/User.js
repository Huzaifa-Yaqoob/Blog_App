const express = require("express");
const {signup, login, update} = require("../controller/user");
const { authenticateToken } = require("../middleware/authenticateToken");
const multer = require('multer');
const { storage } = require("../middleware/uploadProfilePic");


const upload = multer({ storage: storage });

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.use(authenticateToken);

router.patch("/update", upload.single("profilePic"), update);

module.exports = router;