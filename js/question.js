import {
  quiz,
  questions,
  questionsContainer,
  categoryInput,
  difficultyOptionsInput,
  questionsNumberInput,
  quizOptionForm,
} from "./index.js";

export default class Question {
  constructor(index) {
    this.index = index;
    this.category = questions[index].category;
    this.difficulty = questions[index].difficulty;
    this.question = questions[index].question;
    this.wrongChoices = questions[index].incorrect_answers;
    this.answer = questions[index].correct_answer;
    this.allChoices = this.getChoicesReady();
    this.answered = false;
  }

  getChoicesReady() {
    return this.wrongChoices.concat(this.answer).sort();
  }

  displayQuestion() {
    console.log(this);
    const questionMarkUp = `
    <div
      class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
    >
      <div class="w-100 d-flex justify-content-between">
        <span class="btn btn-category">${this.category}</span>
        <span class="fs-6 btn btn-questions">${this.index + 1} of ${questions.length
      } Questions</span>
      </div>
      <h2 class="text-capitalize h4 text-center">${this.question}</h2>  
      <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
      ${this.allChoices.map((choice) => `<li>${choice}</li>`).join("")}
      </ul>
      <h2 class="text-capitalize text-center score-color h3 fw-bold"><i class="bi bi-emoji-laughing"></i> Score: ${quiz.score
      } </h2>        
    </div>
  `;

    questionsContainer.innerHTML = questionMarkUp;

    const allChoicesBtns = document.querySelectorAll(".question ul li");
    for (let i = 0; i < allChoicesBtns.length; i++) {
      allChoicesBtns[i].addEventListener("click", (e) => {
        this.checkAnswer(e);
      });
    }
  }

  checkAnswer(e) {
    if (this.answered == false) {
      this.answered = true;
      if (e.target.innerHTML.toLowerCase() == this.answer.toLowerCase()) {
        e.target.classList.add(
          "correct",
          "animate__animated",
          "animate__flipInY"
        );
        quiz.score += 1;
      } else {
        e.target.classList.add("wrong", "animate__animated", "animate__shakeX");
      }

      this.animateQuestion(e.target, 1000);
    }
  }

  nextQuestion() {
    this.index++;
    if (this.index > questions.length - 1) {
      questionsContainer.innerHTML = quiz.endQuiz();
      const tryAgain = document.querySelector(".again");
      tryAgain.addEventListener("click", function () {
        questionsContainer
          .querySelector(".question")
          .classList.replace("d-flex", "d-none");
        categoryInput.value = "";
        difficultyOptionsInput.value = "easy";
        questionsNumberInput.value = "";
        quizOptionForm.classList.replace("d-none", "d-flex");
      });
      return
    }

    const nextQuestion = new Question(this.index);
    nextQuestion.displayQuestion();
  }

  animateQuestion(element, duration) {
    setTimeout(() => {
      element
        .closest(".question")
        .classList.add("animate__animated", "animate__bounceOutLeft");
      setTimeout(() => {
        this.nextQuestion()
      }, duration)
    }, duration);
  }
}
