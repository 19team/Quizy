const QuizGame = require("./QuizGame");

var quizGame = new QuizGame();
quizGame
  .chooseRandomQuestionByTopic("Lịch sử")
  .then(value => {
    console.log(value);
  })
  .catch(error => {
    console.log(error + "");
  });

