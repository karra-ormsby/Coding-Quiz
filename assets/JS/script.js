var startButton = document.querySelector("#start");
var timerElement = document.querySelector("#time-reamaining");
var main = document.querySelector("#quiz-area");
var questionP = document.createElement("p");
var submitButton = document.createElement("button");
var nameInput = document.createElement("input");
var submitP = document.createElement("p");
var numberPoints = document.createElement("p");

var highScores = JSON.parse(localStorage.getItem("newScore"));

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
    if( element.nodeName !== "LI") {
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
                timeLeft = timeLeft - 9;
            }   
        questionP.textContent = "Wrong Answer";
        correctAnswer = false;
    }
    i ++;
    generateQuestion(i);
}

function addPoint() {
    point ++;
    return point;
}

submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    var name = document.querySelector("#name").value

    if (name === "") {
        displayMessage("error", "Name cannot be blank");
    } else {
        var newScore = {
            name: name,
            point: point
        }

        localStorage.setItem("newScore", JSON.stringify(newScore));
        highScores.push(newScore);

        console.log(highScores);
    }

    // window.location.href = "./highscore.html";
    
});


function displayMessage(type, message) {
    scoreboardDiv.textContent = message;
    scoreboardDiv.setAttribute("class", type);
}


function generateQuestion(i) {
    if (i > questions.length - 1) {
        //tell the user they won
        clearInterval(timer);
        createSubmit();
    } else {
        //removing the children of main
        main.innerHTML = "";
        var questionHeading = document.createElement("ul");
        var answerP1 = document.createElement("li");
        var answerP2 = document.createElement("li");
        var answerP3 = document.createElement("li");

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
    submitP.textContent = "Please enter you initals";
    numberPoints.textContent = "Congratulations, you earned " + point + " points!";
    main.appendChild(numberPoints);
    main.appendChild(submitP);
    main.appendChild(nameInput);
    main.appendChild(submitButton);
    nameInput.setAttribute("id", "name");
    submitButton.setAttribute("id", "submit");
}