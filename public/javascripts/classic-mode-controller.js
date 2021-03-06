//countdown timer
var game;
var isAnswered = false;

function startNewGame() {
  game = new QuizGame(10, 10);
  game.currentQuestionIndex = 0;
  game.resetStyle();
  game.progressCountdown(game.timeLimit).then(value => {
    if (value) {
      game.getTrueAnswer();
    }
  });
  game.getARandomQuestion();
  isAnswered = false;
}

function nextQuestion() {
  game.resetStyle();
  game.progressCountdown(game.timeLimit).then(value => {
    if (value) {
      game.getTrueAnswer();
    }
  });
  if (game.checkMaxQuestionAmount())
  {
    game.showEndGameStage();
    return;
  }
  game.getARandomQuestion();
  isAnswered = false;
}

//get next question
$(document).ready(function() {
  //get a random question
  $(".start-btn").click(() => {
    $("#intro-stage").hide();
    $("#game-stage").show();
    $("#end-stage").hide();
    startNewGame();
  });
  $("#nextQuestion").click(() => {
    nextQuestion();
  });

  $(".btn-answer").each((i, element) => {
    $(element).click(() => {
      isAnswered = true;
      game.checkAnswer($(element).attr("id"));
    });
  });
});
