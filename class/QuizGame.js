const mysql = require("mysql");
const dbconfig = require("../config/user-database");

module.exports = class QuizGame {
  constructor() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.trueQuestions = 0;
    this.falseQuestions = 0;
  }

  answerCorrectly() {
    this.trueQuestions++;
    this.currentQuestionIndex++;
  }
};
