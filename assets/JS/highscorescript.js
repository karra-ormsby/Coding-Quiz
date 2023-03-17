var highscoreList = document.querySelector("#highscore-list");
var clearButton = document.querySelector("#clear-button");

var highScores = JSON.parse(localStorage.getItem("highScores"));

console.log(highScores);

for (i = 0; i < highScores.length; i ++) {
    var score = document.createElement("p");
    score.textContent = "Name: " + highScores[i].name + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + "Score: " + highScores[i].point;
    highscoreList.appendChild(score);
}


clearButton.addEventListener("click", function (event) {
    localStorage.clear();
    highscoreList.innerHTML = "";
    
});