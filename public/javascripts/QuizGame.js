class QuizGame {
  /**
   *
   * @param {Integer} maxQuestionAmount - maximumn number of question of the game
   */
  constructor(maxQuestionAmount, timeLimit) {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.trueQuestions = 0;
    this.falseQuestions = 0;
    this.maxQuestionAmount = maxQuestionAmount;
    this.isAnswered = false;
    this.answeredList = ["Empty"];
    this.timeLimit = timeLimit;
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
  async checkAnswer(buttonId) {
    if (!this.isAnswered) {
      this.isAnswered = true;
      await $.post(
        "/games/getAnswer",
        { question: $("#question").text(), answer: $("#" + buttonId).text() },
        data => {
          if (data.result == false) {
            $("#" + buttonId).css("background-color", "#d9534f");
            $(".btn-answer").each((i, element) => {
              if ($(element).text() == data.answer) {
                $(element).css("background-color", "#ffe400");
                $(element).css("color", "#272727");
              }
            });
          } else {
            this.answerCorrectly();
            $("#" + buttonId).css("background-color", "#5cb85c");
          }
          $("#" + buttonId).css("color", "#ffffff");

          $("#nextQuestion").show();
        }
      );

    }
  }

  /**
   * Get key from server
   */
  getTrueAnswer() {
    this.isAnswered = true;
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

        $("#nextQuestion").show();
      }
    );
  }

  /**
   *get a random question
   */
  getARandomQuestion() {
    console.log(this.answeredList);
    $.post("/games/getQuestion", { answeredList: JSON.stringify(this.answeredList) }, data => {
      $("#topic").text(data.topic);
      $("#question").text(data.question);
      $("#answerA").text(data.answerA);
      $("#answerB").text(data.answerB);
      $("#answerC").text(data.answerC);
      $("#answerD").text(data.answerD);
      $("#countdown").text(this.timeLimit.toString() + "s");
      this.currentQuestionIndex++;
      this.isAnswered = false;
      this.answeredList.push(data.question); //add to answerdQuestionList
    });
    $("#nextQuestion").hide();
  }

  /**
   *get a random question by topic
   */
  getARandomQuestionByTopic(topic) {
    console.log(this.answeredList);
    $.post("/games/getQuestionByTopic", {topic:topic, answeredList: JSON.stringify(this.answeredList) }, data => {
      $("#topic").text(data.topic);
      $("#question").text(data.question);
      $("#answerA").text(data.answerA);
      $("#answerB").text(data.answerB);
      $("#answerC").text(data.answerC);
      $("#answerD").text(data.answerD);
      $("#countdown").text(this.timeLimit.toString());
      this.currentQuestionIndex++;
      this.isAnswered = false;
      this.answeredList.push(data.question); //add to answerdQuestionList
    });
    $("#nextQuestion").hide();
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
      return true;
    }
    return false;
  }

  showEndGameStage() {
    $("#game-stage").hide();
    $("#end-stage").show();
    $("#result").text(
      "Bạn trả lời đúng: " + this.score + "/" + this.maxQuestionAmount
    );
  }
}
