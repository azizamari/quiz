const question=document.querySelector("#question");
const answers=Array.from(document.querySelectorAll(".answer-text"));
const scoreText = document.querySelector("#score");
const progressText=document.querySelector("#progressText");

const hiddenItems=Array.from(document.querySelectorAll(".hide"));
const startBtn=document.querySelector("#start-btn");

let questions=[
  {
    question:"What is html?",
    answer1:"A Programming Language",
    answer2:"A Pokemon",
    answer3:"Food Name",
    answer4:"A Markup Language",
    correct:4,
  },
  {
    question:"Which one of these tools is a Pokemon not a tool?",
    answer1:"Apache",
    answer2:"Onix",
    answer3:"Hadoop",
    answer4:"Flutter",
    correct:2,
  },
  {
    question:"random",
    answer1:"f",
    answer2:"ff",
    answer3:"fff",
    answer4:"fff",
    correct:3,
  },
  {
    question:"random",
    answer1:"aaa",
    answer2:"ff",
    answer3:"fff",
    answer4:"fff",
    correct:1,
  },
];

let currentQuestion={};
let acceptingAnswers=true;
let score=0;
let questionCounter=0;
let availableQuestions=[];

let questionsNumber=questions.length;

function startGame(){
  questionCounter=0;
  score=0;
  // availableQuestions=questions;
  availableQuestions=[...questions];
  getNewQuestion();
}
function  getNewQuestion(){
  if(availableQuestions.length===0){
    location.reload();
    return;
  }
  questionCounter++;
  progressText.innerText=`Question ${questionCounter} / ${questionsNumber}`;

  const questionIndex=Math.floor(Math.random() * availableQuestions.length);
  currentQuestion=availableQuestions[questionIndex];
  question.innerText=currentQuestion.question;
  answers.forEach(choice =>{
    const number=choice.dataset['number'];
    choice.innerText=currentQuestion["answer"+number];
  });

  availableQuestions.splice(questionIndex,1);

  acceptingAnswers=true;
}

answers.forEach(choice =>{
  choice.addEventListener('click',e=>{
    if(!acceptingAnswers){
      return;
    }
    acceptingAnswers=false;
    const selectedChoice=e.target;
    const selectedAnswer=selectedChoice.dataset['number']
    console.log(selectedAnswer);
    console.log(currentQuestion.correct)

    let classToApply= selectedAnswer==currentQuestion.correct?'correct':'incorrect';

    if(classToApply=='correct'){
      incrementScore();
    }

    selectedChoice.classList.add(classToApply);

    setTimeout(()=>{
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();
    },500)

  });
});

function incrementScore(){
  score++;
  scoreText.innerText="Score: "+score;
}
startBtn.addEventListener('click', e=>{
  hiddenItems.forEach(item=>{
    item.classList.remove("hide");
  });
  startBtn.classList.add("hide");
  startGame();
  setTimeout(()=>{
  },500)
});
startGame();