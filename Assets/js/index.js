var headerElem = document.querySelector('header')
var startBtn = document.querySelector('#start-btn')
var sectionElem = document.querySelector('section')

var questionsList = [
    {
        title: 'Commonly used data types in JavaScript DO NOT include..?',
        answers: ['A','B','C','D'],
        correct: 'A',

    },

    {
        title: 'Commonly used data types in JavaScript DO NOT include..?',
        answers: ['A','B','C','D'],
        correct: 'A',

    }
]

function startQuiz(event) {
    console.log(startBtn.id)
    console.log('starting quiz')
    console.log({ event });
    sectionElem.setAttribute('hidden', 'true')
}








startBtn.addEventListener('click', startQuiz)