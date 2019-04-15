var express = require("express");
var router = express.Router();
var controller = require("../controllers/rank-controller");

router.get("/getLevelRank", controller.getLevelRank);

module.exports = router;