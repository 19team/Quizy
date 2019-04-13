var express = require("express");
var router = express.Router();
var controller = require("../controllers/game-controller");
const utils = require("../../utils/utils");
/* GET classic game page */
router.get("/classic", utils.isLoggedIn, controller.getGamePage);

/* GET a question */
router.get("/getQuestion", controller.getARandomTopicQuestion);

/* POST an answer and check it */
router.post("/getAnswer", controller.checkAnswer);

/* Get true answer */
router.post("/getTrueAnswer", controller.getTrueAnswer);

module.exports = router;
