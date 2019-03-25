var express = require("express");
var router = express.Router();
var models = require("../models");
var Sequelize = require("sequelize");
const Question = models.question;
const User = models.user;
const UserDetails = models.userdetails;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    req.isLogged = true;
    return next();
  }
  res.redirect("/user/signin");
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

/* GET home page. */
router.get("/classic", isLoggedIn ,function(req, res, next) {
  console.log(req.user);
  res.render("games/classic", {
    title: "Classic",
    isLogged: req.isLogged,
    username: req.user
      ? req.user.firstname + " " + req.user.lastname
      : "Not logged in"
  });
});

//get a question
router.get("/getQuestion", function(req, res) {
  Question.findOne({
    order: [[Sequelize.fn("RAND")]],
    limit: 1
  })
    .then(data => {
      var answers = shuffleArray([
        data.dataValues.answer,
        data.dataValues.falseAnswer1,
        data.dataValues.falseAnswer2,
        data.dataValues.falseAnswer3
      ]);
      const question = {
        topic: data.dataValues.topic,
        question: data.dataValues.question,
        answerA: answers[0],
        answerB: answers[1],
        answerC: answers[2],
        answerD: answers[3]
      };
      res.send(question);
    })
    .catch(err => {
      console.log(err);
    });
});

//check answer
router.post("/getAnswer", function(req, res) {
  const submitData = req.body;
  var user = req.user;
  console.log(user);
  UserDetails.findOne({where: {user_id: user.id}}).then((userDetails) => {
    console.log("USER DETAILS: " + userDetails);
    Question.findOne({ where: { question: submitData.question } })
      .then(data => {
        console.log(data.dataValues);
        if (data.dataValues.answer === submitData.answer) {
          res.send({ result: true });
          userDetails.addTrueQuizQuantity();
        } else {
          res.send({ result: false });
          userDetails.addFalseQuizQuantity();
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  
});

//get answer
router.post("/getTrueAnswer", function (req, res) {
  const ques = req.body;
  Question.findOne({ where: { question: ques.question } })
    .then(data => {
      res.send(data.answer);
    })
    .catch(err => {
      console.log(err);
    });
});

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
module.exports = router;
