//countdown timer
function ProgressCountdown(timeleft) {
  return new Promise((resolve, reject) => {
    var countdownTimer = setInterval(() => {
      timeleft--;
      $("#countdown").text(timeleft + "s");
      if (timeleft <= 0) {
        clearInterval(countdownTimer);
        resolve(true);
      }
    }, 1000);
  });
}

//reset style in new question
function resetStyle() {
  $(".btn-answer").each((i, element) => {
    $(element).css("background-color", "#f8f9fa");
    $(element).css("color", "#000000");
  })
}

//check answer submit
function checkAnswer(buttonId) {
  $.post(
    "/games/getAnswer",
    { question: $("#question").text(), answer: $("#" + buttonId).text() },
    data => {
      if (data.result == false) {
        $("#" + buttonId).css("background-color", "#d9534f");
      } else {
        $("#" + buttonId).css("background-color", "#5cb85c");
      }
      $("#" + buttonId).css("color", "#ffffff");
    }
  );
}

function getTrueAnswer() {
  $.post(
    "/games/getTrueAnswer",
    { question: $("#question").text()},
    data => {
      $(".btn-answer").each((i, element) => {
        if ($(element).text() == data) {
          $(element).css("background-color", "#5cb85c");
          $(element).css("color", "#ffffff");
        }
      })
    }
  );
}

//get next question
$(document).ready(function() {
  //get a random question
  $("#nextQuestion").click(() => {
    resetStyle();
    ProgressCountdown(10).then(
      value => getTrueAnswer()
    );
    $.get("/games/getQuestion", data => {
      console.log(data);
      $("#topic").text(data.topic);
      $("#question").text(data.question);
      $("#answerA").text(data.answerA);
      $("#answerB").text(data.answerB);
      $("#answerC").text(data.answerC);
      $("#answerD").text(data.answerD);
    });
  });

  $(".btn-answer").each((i, element) => {
    $(element).click(()=>  {
      checkAnswer($(element).attr("id"));
    });
  });
});
