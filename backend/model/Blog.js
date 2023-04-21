const express = require("express");
const { getAll, getMine, write, deleted } = require("../controller/blog");
const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/getAll", getAll);

router.use(authenticateToken);

router.get("/getMine", getMine);

router.put("/write", write);

router.delete("/deleted/:id", deleted);

module.exports = router;