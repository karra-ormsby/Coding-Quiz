var highscoreList = document.querySelector("#highscore-list");
var clearButton = document.querySelector("#clear-button");

var highScores = JSON.parse(localStorage.getItem("highScores"));

console.log(highScores);

for (i = 0; i < highScores.length; i ++) {
    console.log("name: " + highScores[i].name);
    console.log("score: " + highScores[i].point);
    var score = document.createElement("p");
    score.textContent = "name: " + highScores[i].name + "     " + "points: " + highScores[i].point;
    highscoreList.appendChild(score);
}


clearButton.addEventListener("click", function (event) {
    localStorage.clear();
    highscoreList.innerHTML = "";
    
});