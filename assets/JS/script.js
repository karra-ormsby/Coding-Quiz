var startButton = document.querySelector("#start");
var timerElement = document.querySelector("#time-reamaining");
var numberPoints = document.querySelector("#points-number");
var main = document.body.children[1];
var questionHeading = document.createElement("h2");
var answerP1 = document.createElement("p");
var answerP2 = document.createElement("p");
var answerP3 = document.createElement("p");
var questionP = document.createElement("p");
var submitButton = document.createElement("button");
var nameInput = document.createElement("input");

var timeLeft;
var timer;
var correctAnswer;
var point=0;
var i =1;
var answer;

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
    console.log(correctAnswer);
    generateQuestion(i);
}

function startTimer () {
    

    timer = setInterval(function () {

        timerElement.textContent = timeLeft;
        timeLeft--;
        
        // if(timeLeft > 0) {
        //     if (i >= questions.length-1) {
        //         //tell the user they won
        //         createSubmit();
        //     }
        // }
            if (!correctAnswer) {
                if(timeLeft < 5) {
                    timeLeft = 0;
                } else {
                    correctAnswer = true;
                    //subtracting 6 seconds for some reason
                    timeLeft = timeLeft - 5;
                }
            }
        if(timeLeft === 0) {
            //tell user they lost and ran out of time
            timerElement.textContent = timeLeft;
            createSubmit();
            clearInterval(timer);
        }

    }, 1000);

}

//something may not be working properly here too with the event listener
main.addEventListener("click", function (event) {
    var element = event.target;
    answer = element.getAttribute("data-number");

    checkAnswer(i, answer);
    return answer;
});


function checkAnswer (i, answer) {
    if (answer === questions[i].correctAnswer) {
        questionP.textContent = "Right Answer";
        correctAnswer = true;
        addPoint();
    } else {    //this has introduced a bug where if not right then always wrong instead of only checking if answer != correct answer
        questionP.textContent = "Wrong Answer";
        correctAnswer = false;
    }
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
        //this is not seeing the value returned by addPoint
        setScore(name, point);
        
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
        console.log(i);
        console.log(questions[i].question);
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

        //this is not using checkAnswer to return a value
        // checkAnswer(answer);
        // console.log(correctAnswer);
        // while( i <= questions.length - 1) {
            // if (correctAnswer) {
            //     i ++;
            //need to add something aboout stopping propagation?
            //     generateQuestion(i);
            // }
        // }

}

function createSubmit () {
    questionHeading.remove();
    answerP1.remove();
    answerP2.remove();
    answerP3.remove();
    questionP.remove();
    submitButton.textContent = "Submit";
    main.appendChild(submitButton);
    main.appendChild(nameInput);
    nameInput.setAttribute("id", "name");
}