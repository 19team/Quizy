//countdown timer
var game;
var isAnswered = false;
//get next question
$(document).ready(function() {
  //get a random question
  $("#newGame").click(() => {
    game = new QuizGame(10);
    $("#newGame").text("Ván mới");
  });
  $("#nextQuestion").click(() => {
    game.resetStyle();
    game.progressCountdown(10).then((value) => {
      if(value) {
        game.getTrueAnswer();
      }
    }
    );
    game.getARandomQuestion();
    isAnswered = false;
  });

  $(".btn-answer").each((i, element) => {
    $(element).click(()=>  {
      isAnswered = true;
      game.checkAnswer($(element).attr("id"));
    });
  });
});
