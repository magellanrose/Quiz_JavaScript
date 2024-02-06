// questions

const questions = [
    {
        question: "Commonly used data types DO NOT include..?",
        answers: [
            { text: "Strings", correct: false },
            { text: "Booleans", correct: false },
            { text: "Numbers", correct: false },
            { text: "Alerts", correct: true },

        ]
    },
    {
        question: "The best football team in the world is..?",
        answers: [
            { text: "New York Giants", correct: true },
            { text: "Philadelphia Eagles", correct: false },
            { text: "Kansa City Chiefs", correct: false },
            { text: "Detriot Lios", correct: false },
        ]

    },
    {
        question: "The best state in the world is..?",
        answers: [
            { text: "California", correct: false },
            { text: "New York", correct: false },
            { text: "New Jersey", correct: false },
            { text: "Kansas", correct: true },

        ]
    },
    {
        question: "What is the best breakfast food..?",
        answers: [
            { text: "Bagels", correct: true },
            { text: "Eggs", correct: false },
            { text: "Oatmeal", correct: false },
            { text: "Avocado Toast", correct: false },

        ]
    },
    {
        question: "Best town to live in in New Jersey..?",
        answers: [
            { text: "Paramus", correct: false },
            { text: "Montclair", correct: true },
            { text: "Hackensack", correct: false },
            { text: "Toms River", correct: false },

        ]
    }
];

// Code for quiz

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerEl = document.getElementById("timer");
const inputEl = document.getElementById("init-input");

let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 60;
let countdown;
let highscoresList = JSON.parse(localStorage.getItem('highscores-list')) || [];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    countdown = setInterval(timer, 1000);
    showQuestion();
}

function timer(){
    timeRemaining-- 
    timerEl.textContent = timeRemaining;
    if(timeRemaining <= 0){
        showScore();
    }
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
        timeRemaining -=10;
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = "block";
    clearInterval(countdown);
    currentQuestionIndex = 0;
    saveScore();
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(nextButton.innerHTML === 'Next'){
        handleNextButton();
    }else{
        startQuiz();
    }
})

function saveScore(){
    let initials = inputEl.value;
    highscoresList.push({
        initials,
        score
    })
    localStorage.setItem('highscores-list', JSON.stringify(highscoresList))
}

startQuiz();

// Timer and Highscores
