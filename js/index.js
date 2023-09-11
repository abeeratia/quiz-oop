// ^==========> HTML Elements
export const categoryInput = document.getElementById("categoryMenu");
export const difficultyOptionsInput = document.getElementById("difficultyOptions");
export const questionsNumberInput = document.getElementById("questionsNumber");
export const startQuizBtn = document.getElementById("startQuiz");
export const quizOptionForm = document.getElementById("quizOptions");
export const questionsContainer = document.querySelector(".questions-container")

// ?==========> App Variables
import Quiz from "./quiz.js";
import Question from "./question.js"

export let quiz;
export let questions;

// &==========> Events
startQuizBtn.addEventListener("click", async function () {
  const category = categoryInput.value;
  const difficulty = difficultyOptionsInput.value;
  const number = questionsNumberInput.value;
  quiz = new Quiz(number, category, difficulty);
  questions = await quiz.getQuestions();
  const question = new Question(0);
  question.displayQuestion()
  quizOptionForm.classList.replace("d-flex", "d-none")
  questionsContainer.classList.replace("d-none", "d-flex")
})
