const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question:
      "The amount an investor will have in 15 years if $1,000 is invested today at an annual interest rate of 9% will be closest to:",
    choice1: "$1,350.",
    choice2: "$3,518.",
    choice3: "$3,642.",
    choice4: "$3,142.",
    answer: 3,
  },
  {
    question:
      "How much must be invested today, at 8% interest, to accumulate enough to retire a $10,000 debt due seven years from today?",
    choice1: "$5,835.",
    choice2: "$6,123.",
    choice3: "$8,794.",
    choice4: "$8,000.",
    answer: 1,
  },
  {
    question:
      "An investor has just won the lottery and will receive $50,000 per year at the end of each of the next 20 years. At a 10% interest rate, the present value of the winnings is closest to:",
    choice1: "$425,678.",
    choice2: "$637,241.",
    choice3: "$2,863,750.",
    choice4: "$425,679.",
    answer: 1,
  },
  {
    question:
      "An investor is to receive a 15-year, $8,000 annuity, with the first payment to be received today. At an 11% discount rate, this annuity’s worth today is closest to:",
    choice1: "$55,855.",
    choice2: "$57,527.",
    choice3: "$63,855.",
    choice4: "$57,456.",
    answer: 3,
  },
  {
    question:
      "If $1,000 is invested today and $1,000 is invested at the beginning of each of the next three years at 12% interest (compounded annually), the amount an investor will have at the end of the fourth year will be closest to:",
    choice1: "$4,779.",
    choice2: "$5,353.",
    choice3: "$6,792.",
    choice4: "$6,892.",
    answer: 2,
  },
  {
    question:
      "Terry Corporation preferred stocks are expected to pay a $9 annual dividend forever. If the required rate of return on equivalent investments is 11%, a share of Terry preferred should be worth:",
    choice1: "$81.82.",
    choice2: "$99.00.",
    choice3: "$122.22.",
    choice4: "$100.",
    answer: 1,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = questions.length;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
