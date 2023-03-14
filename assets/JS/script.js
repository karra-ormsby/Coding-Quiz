var startButton = document.querySelector("#start");
var timerElement = document.querySelector("#time-reamaining");
var numberPoints = document.querySelector("#points-number");
var main = document.querySelector("#quizz-area");
var questionP = document.createElement("p");
var submitButton = document.createElement("button");
var nameInput = document.createElement("input");

var timeLeft;
var timer;
var correctAnswer;
var point=0;
var i =0;

var questions = [
    {
    question: "Here is a question",
    answer1: "answer 1",
    answer2: "answer 2",
    answer3: "answer 3",
    correctAnswer: "1"
    },
    {
    question: "Here is another question",
    answer1: "answer2 1",
    answer2: "answer2 2",
    answer3: "answer2 3",
    correctAnswer: "3"
    }
]


startButton.addEventListener("click", startGame);



function startGame (){
    correctAnswer = true;
    timeLeft = 30;
    startTimer();
    startButton.remove();
    generateQuestion(i);
}

function startTimer () {
    

    timer = setInterval(function () {

        timerElement.textContent = timeLeft;
        timeLeft--;
        

        if(timeLeft === 0) {
            //tell user they lost and ran out of time
            timerElement.textContent = timeLeft;
            createSubmit();
            clearInterval(timer);
        }

    }, 1000);

}


main.addEventListener("click", function (event) {
    var element = event.target;
    if( element.nodeName !== "P") {
        return;
    }
    var answer;
    answer = element.getAttribute("data-number");
    checkAnswer(answer);
});


function checkAnswer (answer) {
    if (answer === questions[i].correctAnswer) {;
        questionP.textContent = "Right Answer";
        correctAnswer = true;
        addPoint();
    } else {
            if (timeLeft-5 < 0) {
                timeLeft = 0;
                createSubmit();
            } else {
                timeLeft = timeLeft - 4;
            }   
        questionP.textContent = "Wrong Answer";
        correctAnswer = false;
    }
    i ++;
    console.log("i in checkAnswer: " + i);
    generateQuestion(i);
}

function addPoint() {
    point ++;
    numberPoints.textContent = point;
    return point;
}

submitButton.addEventListener("click", function(event) {

    var name = document.querySelector("#name").value

    console.log(name);

    if (name === "") {
        displayMessage("error", "Name cannot be blank");
    } else {
        setScore(name, point);
        name = " ";
        
    }

});


function displayMessage(type, message) {
    scoreboardDiv.textContent = message;
    scoreboardDiv.setAttribute("class", type);
}

function setScore(name, point) {
    var newScore = {
        name: name,
        score: point
    }
    localStorage.setItem("newScore", JSON.stringify(newScore));
}
function generateQuestion(i) {
    console.log("in in generateQuestion: " + i);
    if (i > questions.length - 1) {
        //tell the user they won
        clearInterval(timer);
        createSubmit();
    } else {
        //removing the children of main
        main.innerHTML = "";
        var questionHeading = document.createElement("h2");
        var answerP1 = document.createElement("p");
        var answerP2 = document.createElement("p");
        var answerP3 = document.createElement("p");

        questionHeading.textContent = questions[i].question;
        answerP1.textContent = questions[i].answer1;
        answerP2.textContent = questions[i].answer2;
        answerP3.textContent = questions[i].answer3;

        main.appendChild(questionHeading);
        main.appendChild(answerP1);
        main.appendChild(answerP2);
        main.appendChild(answerP3);
        main.appendChild(questionP);

        questionHeading.setAttribute("data-type", "question")
        answerP1.setAttribute("data-number", "1");
        answerP2.setAttribute("data-number", "2");
        answerP3.setAttribute("data-number", "3");
        questionHeading.setAttribute("class", "question");
        answerP1.setAttribute("class", "answer");
        answerP2.setAttribute("class", "answer");
        answerP3.setAttribute("class", "answer");
    }



}

function createSubmit () {
    main.innerHTML = "";
    submitButton.textContent = "Submit";
    main.appendChild(submitButton);
    main.appendChild(nameInput);
    nameInput.setAttribute("id", "name");
}