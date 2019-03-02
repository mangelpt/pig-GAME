/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
let scores, roundScore, activePlayer, gamePlaying;

init();

//******roll button********+ */
document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gamePlaying) {
    // 1:random number
    let dice = Math.floor(Math.random() * 6) + 1;
    // 2: diplay the result
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    /*trick*/
    diceDOM.src = "img/dice-" + dice + ".png";
    // 3: update the round score IF the rolled number was not a 1
    if (dice !== 1) {
      //add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // next player
      nextPlayer();
    }
  }
});
// ******* hold button *********
document.querySelector(".btn-hold").addEventListener("click", () => {
  if (gamePlaying) {
    // add the  current score to global score
    scores[activePlayer] += roundScore;
    // update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    // check IF player won the game
    if (scores[activePlayer] >= 20) {
      document.querySelector("#name-" + activePlayer).textContent = "WIN!!";
      // reset dice
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //next player
      nextPlayer();
    }
  }
});

//*****new button  */
document.querySelector(".btn-new").addEventListener("click", init);

// next player function
function nextPlayer() {
  // turn the next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  // reset score display
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  // togle
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  // reset dice
  document.querySelector(".dice").style.display = "none";
}

// *** init function
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  //*********reset values */
  document.querySelector(".dice").style.display = "none";
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#score-0").textContent = 0;
  document.querySelector("#score-1").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.querySelector("#name-0").textContent = "player 1";
  document.querySelector("#name-1").textContent = " player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
}