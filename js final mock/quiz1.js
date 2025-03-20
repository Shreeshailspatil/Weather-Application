const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const restartButton = document.getElementById('restart');
const timerElement = document.getElementById('time');
const progressValue = document.getElementById('progress-value');
const totalQuestionsElement = document.getElementById('total-questions');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: {
      a: "Berlin",
      b: "Madrid",
      c: "Paris"
    },
    correctAnswer: "c"
  },
  {
    question: "Which language runs in a web browser?",
    answers: {
      a: "Java",
      b: "C",
      c: "JavaScript"
    },
    correctAnswer: "c"
  },
  {
    question: "What does HTML stand for?",
    answers: {
      a: "Hypertext Markup Language",
      b: "Hypertext Machine Language",
      c: "Hypertext Programming Language"
    },
    correctAnswer: "a"
  },

  {
    question: "What full from of CSS?",
    answers: {
      a: "cascoding style sheets",
      b: "coding style sheets",
      c: "crypted style sheets"
    },
    correctAnswer: "a"
  },

  {
    question: "What full from SQL?",
    answers: {
      a: "sequence query Language",
      b: "sheet query Language",
      c: "style query Language"
    },
    correctAnswer: "a"
  }

];

// Shuffle questions for each attempt
function shuffleQuestions() {
  quizQuestions.sort(() => Math.random() - 0.5);
}

function buildQuiz() {
  shuffleQuestions();
  totalQuestionsElement.textContent = quizQuestions.length;
  showQuestion();
}

function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const answers = [];

  for (letter in currentQuestion.answers) {
    answers.push(
      `<label>
        <input type="radio" name="question${currentQuestionIndex}" value="${letter}">
        ${letter} :
        ${currentQuestion.answers[letter]}
      </label>`
    );
  }

  quizContainer.innerHTML = `
    <div class="question">${currentQuestion.question}</div>
    <div class="answers">${answers.join('')}</div>
  `;

  startTimer();
  updateProgress();
}

function startTimer() {
  timeLeft = 10;
  timerElement.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function updateProgress() {
  progressValue.textContent = currentQuestionIndex + 1;
}

function nextQuestion() {
  clearInterval(timer);
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll('.answers');
  let numCorrect = 0;

  quizQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
      answerContainers[questionNumber].style.color = 'green';
    } else {
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  score = numCorrect;
  resultsContainer.innerHTML = `You scored ${score} out of ${quizQuestions.length}!`;
  submitButton.style.display = 'none';
  restartButton.style.display = 'block';
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultsContainer.innerHTML = '';
  submitButton.style.display = 'none';
  restartButton.style.display = 'block';
  buildQuiz();
}

submitButton.addEventListener('click', showResults);
restartButton.addEventListener('click', restartQuiz);

buildQuiz();