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

let timer = 3;
let timerId;

spinBot();
box.innerHTML="";

function startTimer() {
  if (timerId) clearInterval(timerId);
  timer = 3;
  timerId = setInterval(() => {
    timerEl.innerHTML = timer--;
    if (timer == -1) clearInterval(timerId);
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
    console.log(humanChoice);

    let botChoice = allChoices[Math.floor(Math.random() * allChoices.length)];
    stopBot(botChoice.name);

      if (humanChoice.weakness == botChoice.name) {
        box.innerHTML="Computer gets a point"
        score.botScore++;
      }
      if (humanChoice.name == botChoice.weakness) {
        box.innerHTML="Human gets a point"
        score.humanScore++;

      }
    
    if (score.botScore == 2) {
      box.innerHTML="Computer Wins";
      setTimeout(() => {  score.humanScore = 0; score.botScore = 0; box.innerHTML="" }, 1000);
      
    } else if (score.humanScore == 2) {
      box.innerHTML="Human Wins!";
      setTimeout(() => {  score.humanScore = 0; score.botScore = 0; box.innerHTML = ""}, 1000);
    }
    updateScore();
    setTimeout(() => {
      startTimer();
      spinBot();
    }, 2000);
    humanChoice = null;
  });
});


