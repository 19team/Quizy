const Sequelize = require("sequelize");
const models = require("../../models");
const Question = models.question;
const UserDetails = models.userdetails;
const utils = require("../../utils/utils");

exports.getGamePage = function(req, res) {
  console.log(req.user);
  res.render("games/classic", {
    title: "Classic",
    isLogged: req.isLogged,
    username: req.user
      ? req.user.firstname + " " + req.user.lastname
      : "Not logged in"
  });
};

exports.getARandomTopicQuestion = function(req, res) {
  Question.findOne({
    order: [[Sequelize.fn("RAND")]],
    limit: 1
  })
    .then(data => {
      var answers = utils.shuffleArray([
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
};

exports.checkAnswer = function(req, res) {
  const submitData = req.body;
  //get current user
  var user = req.user;
  //find user'details inorder to update information
  UserDetails.findOne({ where: { user_id: user.id } }).then(userDetails => {
    console.log("USER DETAILS: " + userDetails);
    Question.findOne({ where: { question: submitData.question } })
      .then(data => {
        console.log(data.dataValues);
        //if user had true answer, send result
        if (data.dataValues.answer === submitData.answer) {
          res.send({ result: true });
          // update true quiz quantity
          userDetails.update({
            trueQuizQuantity: userDetails.dataValues.trueQuizQuantity + 1
          });
          //update true quiz series
          userDetails.update({
            currentTrueQuizSeries:
              userDetails.dataValues.currentTrueQuizSeries + 1
          });
          //if current true quiz series is greater than true quiz series, update
          if (
            userDetails.dataValues.currentTrueQuizSeries >
            userDetails.dataValues.trueQuizSeries
          ) {
            userDetails.update({
              trueQuizSeries: userDetails.dataValues.currentTrueQuizSeries
            });
          }
          console.log(userDetails.dataValues.trueQuizQuantity);
          //if user had false answer, send result and update false quiz quantity
        } else {
          res.send({ result: false });
          //current true quiz series back to 0
          userDetails.update({
            falseQuizQuantity: userDetails.dataValues.falseQuizQuantity + 1,
            currentTrueQuizSeries: 0
          });
          console.log(userDetails.dataValues.falseQuizQuantity);
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
};

exports.getTrueAnswer = function(req, res) {
  const ques = req.body;
  Question.findOne({ where: { question: ques.question } })
    .then(data => {
      res.send(data.answer);
    })
    .catch(err => {
      console.log(err);
    });
};
