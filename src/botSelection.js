let intervalID = null;

const images = [
  "assets/paper.png",
  "assets/scissors.png",
  "assets/rock.png",
];
const botImage = document.getElementById("bot");

export function spinBot() {
  let index = images.length - 1;
  intervalID = setInterval(() => {
    botImage.src = images[index--];
    if (index == -1) index = images.length - 1;
  }, 500);
}

/**
 * Stop the bot on a specific item.
 * @param {string} item Rock, paper or scissors
 */
export function stopBot(item) {
  botImage.src = images.find(pic => pic.includes(item.toLowerCase()));
  clearInterval(intervalID);
}
