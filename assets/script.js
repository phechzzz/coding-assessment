var questionDisplay = document.querySelector('.start-page')
var scoreButton = document.querySelector('.score-button')
var countdownElement = document.querySelector('.countdown')
var rightChoice = document.querySelector('.right-choice')
var startButton = document.querySelector('.start-button')
var currentQuestionElement = document.getElementById("currentQuestion");
var score = 0
var time = []
var timeCount = []
var userScore = document.querySelector('.score')
var rankButton = document.querySelector('.rank-btn')
userScore.textContent = score

function showLeaderboard(){
// create a display to show scores in an organized manner
//
//

}

function storeScores(){
var userName =  document.getElementById('playerName')   
var nameScore = [score, userName]
var nameScoreStringify = JSON.stringify(nameScore)
localStorage.setItem('scoreName', nameScore)
showLeaderboard()
}

function endGame(){
var endScreen = document.querySelector('.endScreen')
endScreen.style.display = ('block')
currentQuestionElement.style.display = ('none')
userScore.textContent = score
}

function startCountdown(){
time = setInterval(function() {
    timeCount--;
    countdownElement.textContent = timeCount;
    if (timeCount <= 0){
        clearInterval(time);
        endGame();
       
    }
} ,1000);
} 

function askQuestions(){
var questionElements = document.getElementsByClassName("question");
var questions = Array.from(questionElements);
var startPageElement = document.getElementById("start-page")
var rightWrong = document.getElementById('right-wrong')  


function getRandomQuestion() {
    var randomIndex = Math.floor(Math.random() * questions.length);
    var randomQuestion = questions[randomIndex];
    questions.splice(randomIndex, 1); // Remove the selected question from the array
    return randomQuestion;
  }
  
  function displayNextQuestion() {
    if (questions.length > 0) {
      var nextQuestion = getRandomQuestion();
      displayQuestion(nextQuestion);
    } else {
      endGame()
    }
  }
  
  function displayQuestion(question) {
    if (question) {
      currentQuestionElement.innerHTML = question.innerHTML;
      startPageElement.style.display = "none"; // Hide the start page
  
      // Add event listeners to the choices
      var rightChoice = document.querySelector(".right-choice");
      rightChoice.addEventListener('click', function () {
        rightWrong.textContent = 'correct!';
        score += 2
        displayNextQuestion();
      });
  
      var wrongChoices = document.getElementsByClassName("wrong");
      Array.from(wrongChoices).forEach(function (wrongChoice) {
        wrongChoice.addEventListener('click', function () {
          rightWrong.textContent = 'incorrect!';
          if (timeCount >= 3) {
            timeCount -= 3;
          } else {
            timeCount = 0;
          }
          displayNextQuestion();
        });
      });
    }
  }
  
  // Hide all question elements initially
  Array.from(questionElements).forEach(function (question) {
    question.style.display = "none";
  });
  
  displayNextQuestion();
}

function startGame() {
    timeCount = 15;
    startCountdown();
    askQuestions();
}

startButton.addEventListener('click', startGame);
console.log();

rankButton.addEventListener('click', storeScores)

scoreButton.addEventListener('click', showLeaderboard)

//local storage display score with user name
//connect leaderboaard to highschores button