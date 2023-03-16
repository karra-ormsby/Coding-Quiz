var startButton = document.querySelector("#start");
var timerElement = document.querySelector("#time-reamaining");
var quizArea = document.querySelector("#quiz-area");
var questionP = document.createElement("p");
var submitButton = document.createElement("button");
var nameInput = document.createElement("input");
var submitP = document.createElement("p");
var numberPoints = document.createElement("p");

var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

var timeLeft;
var timer;
var correctAnswer;
var point=0;
var i =0;


var questions = [
    {
    question: "What are HTML semantic elements?",
    answer1: "Semantic elements, like `<div>`, hold the important content together so it's easy to understand.",
    answer2: "Semantic elements are outdated and are no longer used in HTML.",
    answer3: "A semantic element clearly describes its meaning to both the browser and the developer.",
    answer4: "A semantic element reveals nothing about its content to the browser or the developer.",
    correctAnswer: "3"
    },
    {
    question: "What is the difference between && and ||?",
    answer1: "The logical operator && returns true if both expressions are true while the logical operator || returns false if one expression or the other returns true.",
    answer2: "The logical operator && returns true if both expressions are true while the logical operator || returns true if one expression or the other returns true.",
    answer3: "The logical operator && returns true if one expression is true while the logical operator || returns true if both expressions returntrue true.",
    answer4: "The logical operator && returns true if none of the expressions are true while the logical operator || returns true if one expression or the other returns true.",
    correctAnswer: "2"
    },
    {
    question: "What is a media query?",
    answer1: "A feature of CSS3 allowing content rendering to adapt to different conditions such as screen resolution",
    answer2: "A feature of JavaScript allowing content rendering to adapt to different conditions such as screen resolution",
    answer3: "A feature of HTML allowing content rendering to adapt to different conditions such as screen resolution",
    answer4: "A feature of Flexbox allowing content rendering to adapt to different conditions such as screen resolution",
    correctAnswer: "1"
    },
    {
    question: "Which property can you use in order to implement event delegation?",
    answer1: "event.addEventListener()",
    answer2: "event.stopPropagation()",
    answer3: "event.preventDefault()",
    answer4: "event.target",
    correctAnswer: "4"
    },
    {
    question: "You just finished the feature that you've been working on a successfully merged your branch, feature-52. How would you delete branch, feature-52?",
    answer1: "git checkout feature-52",
    answer2: "git branch -d feature-52",
    answer3: "git branch feature-52",
    answer4: "git branch feature-52",
    correctAnswer: "2"
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
            // createSubmit();
            clearInterval(timer);
        }

    }, 1000);

}


quizArea.addEventListener("click", function (event) {
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
    // generateQuestion(i);
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

        highScores.push(newScore);  
        console.log(highScores);
        localStorage.setItem("highScores", JSON.stringify(highScores));  
        window.location.href = "./highscore.html";
    }

    
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
        //removing the children of quizArea
        quizArea.innerHTML = "";
        var questionHeading = document.createElement("ul");
        var answerP1 = document.createElement("li");
        var answerP2 = document.createElement("li");
        var answerP3 = document.createElement("li");
        var answerP4 = document.createElement("li");

        questionHeading.textContent = questions[i].question;
        answerP1.textContent = questions[i].answer1;
        answerP2.textContent = questions[i].answer2;
        answerP3.textContent = questions[i].answer3;
        answerP4.textContent = questions[i].answer4;

        quizArea.appendChild(questionHeading);
        quizArea.appendChild(answerP1);
        quizArea.appendChild(answerP2);
        quizArea.appendChild(answerP3);
        quizArea.appendChild(answerP4);
        quizArea.appendChild(questionP);


        questionHeading.setAttribute("data-type", "question")
        answerP1.setAttribute("data-number", "1");
        answerP2.setAttribute("data-number", "2");
        answerP3.setAttribute("data-number", "3");
        answerP3.setAttribute("data-number", "4");
        questionHeading.setAttribute("class", "question");
        answerP1.setAttribute("class", "answer");
        answerP2.setAttribute("class", "answer");
        answerP3.setAttribute("class", "answer");
        answerP4.setAttribute("class", "answer");
    }



}

function createSubmit () {
    quizArea.innerHTML = "";
    submitButton.textContent = "Submit";
    submitP.textContent = "Please enter you initals";
    numberPoints.textContent = "Congratulations, you earned " + point + " points!";
    quizArea.appendChild(numberPoints);
    quizArea.appendChild(submitP);
    quizArea.appendChild(nameInput);
    quizArea.appendChild(submitButton);
    nameInput.setAttribute("id", "name");
    submitButton.setAttribute("id", "submit");
    submitButton.setAttribute("class", "btn");
}