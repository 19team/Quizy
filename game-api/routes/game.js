var express = require("express");
var router = express.Router();
var controller = require("../controllers/game-controller");
const utils = require("../../utils/utils");

/* GET list game page */
router.get("/", utils.isLoggedIn, controller.getGameListPage);

/* GET classic game page */
router.get("/classic", utils.isLoggedIn, controller.getClassicGamePage);

/* GET examination marketing page */
router.get("/examination_marketing", utils.isLoggedIn, controller.getExaminationMarketingPage);

/* GET a question */
router.post("/getQuestion", controller.getARandomTopicQuestion);

/* GET a question by topic */
router.post("/getQuestionByTopic", controller.getAQuestionByTopic);


/* POST an answer and check it */
router.post("/getAnswer", controller.checkAnswer);

/* Get true answer */
router.post("/getTrueAnswer", controller.getTrueAnswer);

module.exports = router;
