//Page Selectors
var homeEL = document.querySelector("#home-page");
var quizEl = document.querySelector("#quiz-page");
var highEl = document.querySelector("#scores-page");
//Buttton Selectors
var startBTN = document.getElementById("start-game");
var playBTN = document.getElementById('play-again');
var quizQEl= document.getElementById('question');
var ans1El = document.getElementById('answer1');
var ans2El = document.getElementById('answer2');
var ans3El = document.getElementById('answer3');
var ans4El = document.getElementById('answer4');

//High Scores Page Selectors
var highScore = document.getElementById('high-scores');
var nameSubmit = document.getElementById('submit-name');
var typeName= document.getElementById('nameInput');
var nameHead= document.getElementById('nameInput1')

//Timer and ScoreHUD
var timerEl = document.getElementById('timer');
var scoreEl = document.getElementById('current-score');

//Objects
var possible = [];
var qIndex = 0;
var selectedAnswer = "";
var score = 0;
var timeLeft = 60;
var highScores = JSON.parse(localStorage.getItem("high-scores")) || [];

var q1 = {
    question : "In which Italian city can you find the Colosseum?",
    correct : "Rome",
    incorrect : ["Venice", "Naples", "Milan",],
};
var q2 = {
    question : "What is the largest canyon in the world?",
    correct : "Grand Canyon, USA",
    incorrect : ["Verdon Gorge, France", "Kings Canyon, Australia", "Fjaðrárgljúfur Canyon, Iceland",],
};
var q3 = {
    question : "What is the largest active volcano in the world?",
    correct : "Mouna Loa",
    incorrect : ["Mount Etna", "Mount Vesuvius", "Mount Batur",],
};
var q4 = {
    question : "In which museum can you find Leonardo Da Vincis Mona Lisa?",
    correct : "Le Louvre",
    incorrect : ["Uffizi Museum", "British Museum", "Metropolitan Museum of Art",],
};
var q5 = {
    question : "What is the largest continent in size?",
    correct : "Asia",
    incorrect : ["Africa", "Europe", "North America",],
};
var q6 = {
    question : "If you are born on the 1st of January, which star sign are you?",
    correct : "Capricorn",
    incorrect : ["Scorpio", "Libra", "Aries",],
};
var q7 = {
    question : "What does the Richter scale measure?",
    correct : "Earthquake intensity",
    incorrect : ["Wind Speed", "Temperature", "Tornado Strength",],
};
var q8 = {
    question : "What is the longest river in the world?",
    correct : "Nile",
    incorrect : ["Amazon River", "Yellow River", "Congo River",],
};
var q9 = {
    question : "Which constellation is on the Australian flag?",
    correct : "The southern cross",
    incorrect : ["Orion", "Ursa Minor", "Scorpius",],
};
var q10 = {
    question : "What was the first national park in the US?",
    correct : "Yellowstone National Park",
    incorrect : ["Great Smoky Mountains National Park", "Zion National Park", "Rocky Mountain National Park",],
};


var allQuestions = [q1, q2, q3, q4, q5, q6, q7, q8, q9 ,q10];
//adding correct answers to incorrect answers and shuffling possible answers 

function createArray(){
    if (qIndex < allQuestions.length){
    possible = allQuestions[qIndex].incorrect.concat(allQuestions[qIndex].correct);
    }else{
        timeLeft -= timeLeft
    }
};
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};


//Shuffling Array and Cycling Through Array
function displayAnswers(){
    createArray();
    shuffleArray(possible);
    quizQEl.textContent= allQuestions[qIndex].question
    ans1El.textContent= possible[0];
    ans2El.textContent= possible[1];
    ans3El.textContent= possible[2];
    ans4El.textContent= possible[3];
};
function setQIndex(qIndex){
    if (qIndex > (allQuestions.length-1)){
        qIndex === 0}
};

//Scoring Function
function quizScore(selectedAnswer){
    if(selectedAnswer === allQuestions[qIndex].correct){
        score += 10
    }else{
        timeLeft -= 5
    }
};


//Page Navagation
function init(){
    homeEL.setAttribute("style", "display: block")
}
init();
startBTN.addEventListener('click', function() {
    homeEL.setAttribute("style", "display: none");
    quizEl.setAttribute("style", "display: block");
    gameClock();
});
playBTN.addEventListener('click', function() {
    location.reload()
    // highEl.setAttribute("style", "display:none");
    // homeEL.setAttribute("style", "display:block");
});

//pulling stored info from local storage to create high scores page
function saveScore(){
    var userName = typeName.value
    var userScore = score;
    var finalScore = {userName, userScore};
    highScores.push(finalScore);
    localStorage.setItem("high-scores", JSON.stringify(highScores));
    
};
function popScores(){
    highScores.sort(function (a,b){
        return b.userScore - a.userScore;
    })
    highScore.innerHTML = "";
    highScores.forEach(function(person){
        var listEl = document.createElement("li")
        listEl.textContent = "user: " + person.userName + "- Score " + person.userScore;
        highScore.appendChild(listEl);
    })
}

//CLOCK FUNCTION
function gameClock(){
    quizQEl.textContent = allQuestions[qIndex].question;
    displayAnswers();
    timeLeft = 60
    var timeInterval = setInterval(function(){
        if(timeLeft > 0){
            scoreEl.textContent = "Score: " + score
            timerEl.textContent = "You have " + timeLeft + " seconds left";
            timeLeft--;
        }else{   
            timerEl.textContent = "Game over";
            clearInterval(timeInterval);
            quizEl.setAttribute('style', 'display:none');
            highEl.setAttribute('style', 'display:block');
        };
    }, 1000);
};

//Answer Buttons
ans1El.addEventListener('click', function(){
    selectedAnswer = ans1El.textContent;
    quizScore(selectedAnswer);
    qIndex++;
    setQIndex(qIndex);
    displayAnswers();   
});
ans2El.addEventListener('click', function(){
    selectedAnswer = ans2El.textContent;
    quizScore(selectedAnswer);
    qIndex++;
    setQIndex(qIndex);
    displayAnswers();   
});
ans3El.addEventListener('click', function(){
    selectedAnswer = ans3El.textContent;
    quizScore(selectedAnswer);
    qIndex++;
    setQIndex(qIndex);
    displayAnswers();   
});
ans4El.addEventListener('click', function(){
    selectedAnswer = ans4El.textContent;
    quizScore(selectedAnswer);
    qIndex++;
    setQIndex(qIndex);
    displayAnswers();   
});

//Name Submit Button
nameSubmit.addEventListener('click', function(){
    if (typeName.value !== ""){
        saveScore();
        popScores();
        typeName.setAttribute("style", "display: none");
        nameSubmit.setAttribute("style", "display: none");
        nameHead.setAttribute('style', 'display: none')
    }else{
        alert("Error, please enter your name.")
    }
});