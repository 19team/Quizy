class QuizGame {
  /**
   *
   * @param {Integer} maxQuestionAmount - maximumn number of question of the game
   */
  constructor(maxQuestionAmount) {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.trueQuestions = 0;
    this.falseQuestions = 0;
    this.maxQuestionAmount = maxQuestionAmount;
    this.isAnswered = false;
  }

  /**
   * count down timeleft of a question
   * @param {Integer} timeleft
   */
  progressCountdown(timeleft) {
    return new Promise((resolve, reject) => {
      const countdownTimer = setInterval(() => {
        timeleft--;
        $("#countdown").text(timeleft + "s");
        if (timeleft <= 0) {
          clearInterval(countdownTimer);
          resolve(true);
        }
        if (isAnswered) {
          clearInterval(countdownTimer);
          resolve(false);
        }
      }, 1000);
    });
  }

  /**
   * Reset style in new question
   */
  resetStyle() {
    $(".btn-answer").each((i, element) => {
      $(element).css("background-color", "#f8f9fa");
      $(element).css("color", "#272727");
    });
  }

  /**
   *
   * @param {string} buttonId - button's id attribute
   */
  checkAnswer(buttonId) {
    if (!this.isAnswered) {
      $.post(
        "/games/getAnswer",
        { question: $("#question").text(), answer: $("#" + buttonId).text() },
        data => {
          if (data.result == false) {
            $("#" + buttonId).css("background-color", "#d9534f");
            this.getTrueAnswer();
          } else {
            this.answerCorrectly();
            $("#" + buttonId).css("background-color", "#5cb85c");
          }
          $("#" + buttonId).css("color", "#ffffff");
        }
      );
      this.checkMaxQuestionAmount();
      this.isAnswered = true;
    }
  }

  /**
   * Get key from server
   */
  getTrueAnswer() {
    $.post(
      "/games/getTrueAnswer",
      { question: $("#question").text() },
      data => {
        $(".btn-answer").each((i, element) => {
          if ($(element).text() == data) {
            $(element).css("background-color", "#ffe400");
            $(element).css("color", "#272727");
          }
        });
      }
    );
    this.checkMaxQuestionAmount();
  }

  /**
   *get a random question
   */
  getARandomQuestion() {
    $.get("/games/getQuestion", data => {
      console.log(data);
      $("#topic").text(data.topic);
      $("#question").text(data.question);
      $("#answerA").text(data.answerA);
      $("#answerB").text(data.answerB);
      $("#answerC").text(data.answerC);
      $("#answerD").text(data.answerD);
      this.currentQuestionIndex++;
      this.isAnswered = false;
    });
  }

  /**
   * Update properties after player answer correctly
   */
  answerCorrectly() {
    this.trueQuestions++;
    this.score += 1;
  }

  /**
   * Check end game when question's amount is max
   */
  checkMaxQuestionAmount() {
    if (this.currentQuestionIndex == this.maxQuestionAmount) {
      $("#newGame").text(
        "Kết thúc. Bạn được " + this.score + "/" + this.maxQuestionAmount
      );
    }
  }
}
