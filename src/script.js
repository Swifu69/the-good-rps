import { Item } from "./class.js";
import { spinBot, stopBot } from "./botSelection.js";

const box = document.getElementById("alert-box");
const choices = document.querySelectorAll("img");
const timerEl = document.getElementById("countdown-field");
const rock = new Item("rock", "paper");
const scissors = new Item("scissors", "rock");
const paper = new Item("paper", "scissors");
const allChoices = [rock, scissors, paper];
let humanChoice;

const score = {
  humanScore: 0,
  botScore: 0,
};

function giveFeedback(feedback) {
  box.innerHTML = feedback;
  box.classList.remove("hide");
}

function resetScore() {
  setTimeout(() => {
    score.humanScore = 0; 
    score.botScore = 0; 
    box.innerHTML = "";
    updateScore();
  }, 1000);
}
let timer = 3;
let timerId;

spinBot();

function startTimer() {
  if (timerId) clearInterval(timerId);
  timer = 3;
  timerId = setInterval(() => {
    if (timer == -1) {
      clearInterval(timerId);
      timer--;
      return;
    }
    timerEl.innerHTML = timer--;
  }, 1000);
}

startTimer();

const scoreBoard = document.getElementById("score-field");
let updateScore = () => {
  scoreBoard.innerHTML = `Human: ${score.humanScore} Bot: ${score.botScore}`;
};
updateScore();

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    humanChoice = allChoices.find(
      (item) => e.target.getAttribute("value") === item.name
    );
    console.log(humanChoice.name);

    let botChoice = allChoices[Math.floor(Math.random() * allChoices.length)];
    stopBot(botChoice.name);
    console.log(botChoice.name);

    console.log(timer)
    if (timer != -1) {
      giveFeedback("Computer gets a point")
      score.botScore++;
    } else {
      if (humanChoice.weakness == botChoice.name) {
        giveFeedback("Computer gets a point")
        score.botScore++;
      }
      if (humanChoice.name == botChoice.weakness) {
        giveFeedback("Human gets a point")
        score.humanScore++;
      }

      if (humanChoice.name === botChoice.name) {
        giveFeedback("Draw")
        box.classList.remove("hide");
      }

    }
    if (score.botScore == 2) {
      giveFeedback("Computer wins")
      const wantToPlay = confirm("Wanna play again?");
      if (!wantToPlay) location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
      resetScore()
      
    } else if (score.humanScore == 2) {
      giveFeedback("Human wins")
      const wantToPlay = confirm("Wanna play again?");
      if (!wantToPlay) location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
      resetScore();
    }
    updateScore();
    setTimeout(() => {
      startTimer();
      spinBot();
      box.classList.add("hide");
    }, 1000);
    humanChoice = null;
  });
});
