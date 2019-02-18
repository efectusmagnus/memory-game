"use strict";
/* Create a list that holds all icons */
let icons = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
/* Create an empty `array` to store the opened cards */
let openIcons = [];

let moves = 0;
const modalWin = document.querySelector("#results-container");
const closeWin = document.querySelector(".close-icon");

/*
//yellowStar();
function yellowStar() {
  document.querySelector("#first-star").className = "yellow-star";
}
*/
//Time variables
let second = 0;
let minute = 0;
let hour = 0;
let clock = document.querySelector(".timer");
let clockRunning = false;
let clockID;

//Shuffle cards when web page loads
shuffle(icons);

//Create cards
const cardsDeck = document.querySelector(".deck");
for (let icon of icons) {
  cardsDeck.innerHTML += `<li class="card"><i class="${icon}"></i></li>`;
}

//Shuffle function from htpp://stackoverflow.com/a/2450976
function shuffle(array){

  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

document.addEventListener("click", cardClicked); //add "cardClicked" when a card is clicked
let openCards = []; //store an empty array in openCards
let moveCounter = document.getElementsByClassName("moves")[0];
//When card is clicked
function cardClicked() {
  const selection = event.target;
  if ((selection.getAttribute("class") == "card") && openCards.length < 2) {
    displayCard(selection); // shows displayed card
    //The "countStars();" was here before :D
  }
  //if the clock is not running
  if (!clockRunning) {
    startClock(); //Call this function to run the timer after the first click
    clockRunning = true;
  }
}

function displayCard(card) {
  card.setAttribute("class", "card open show");
  addToOpenCards(card);
}

function addToOpenCards(newCard) {
  openCards.push(newCard); //push a new card to "openCards" (the cards that are "open")
  if (openCards.length == 2) { //if there are two opened cards
    incrementCounter();
    let openCard = openCards[0];
    if (checkMatch(newCard, openCard)) { //Check if the new card matches with the card that is "open"
      cardsMatch(newCard, openCard); //By comparing the two cards that are seen, respectively "newCard" and "openCard".
    } else { // If do not match,
      setTimeout(cardsMissMatch, 550, newCard, openCard);//wait 550ms to close the "newCard" and "openCard"
    }
  }
}

function checkMatch(newCard, openCard) {
  //If the icons of "newCard" is equal to the icon of "openCard"
  if (newCard.querySelector("i").getAttribute("class") == openCard.querySelector("i").getAttribute("class")) {
    return true;
  } else {
  return false;
  }
}

function cardsMatch(newCard, openCard) {
  moves++;
  newCard.setAttribute("class", "card match"); //adds the class "match" to newCard
  openCard.setAttribute("class", "card match"); //adds the class "match" to openCard
  openCards.pop(newCard); //removes the "newCard"(=last element) from openCards
  openCards.pop(openCard); //removes the "openCard"(=last element) from "openCards"
  openIcons.push(newCard);
  openIcons.push(openCard);
  countStars();
  CheckGameEnded();
}

function cardsMissMatch(newCard, openCard) {
  moves++;
  newCard.setAttribute("class", "card");
  openCard.setAttribute("class", "card");
  openCards.pop(newCard);
  openCards.pop(openCard);
  countStars();
}

function incrementCounter() {
  //changes the string "0" from `html` to a number and add 1 to it
  moveCounter.innerHTML = parseInt(moveCounter.innerHTML) + 1;
}


// check if the game is over
function CheckGameEnded() {
  //if the icons that are "open"(seen on the screen) are equal the number of icons in the array
  if (openIcons.length == icons.length) {
    clearInterval(clockID);
    modalWin.classList.add("show-modal");
    document.querySelector("#number-moves").innerHTML = moves;
    /*document.querySelector("#time-taked").innerHTML = minute+":"+second;*/
    document.querySelector("#time-taked").innerHTML = minute+" mins " +second+" secs";
    document.querySelector("#star-wins").innerHTML = document.querySelector(".stars").innerHTML;
    //invoke this function to close the modal Window (the window with the scores)
    closeModal();
  }
}

function closeModal() {
  //close the modal window with a click on the x
  closeWin.addEventListener("click", function() {
    //remove the class "show"
    modalWin.classList.remove("show");
    restartGame();
  });
}
//This function is called when the html button, also callled "play-again" is clicked
function playAgain() {
  //remove the class "show"
  modalWin.classList.remove("show");
  restartGame();
}

countStars();
//Based on the moves, change the color of the stars
function countStars() {
  moveCounter.innerHTML = moves;

  if (moves <= 9) {
    //Change the color of three stars to yellow
    document.querySelector("#first-star").classList.add("yellow-star");
    document.querySelector("#second-star").classList.add("yellow-star");
    document.querySelector("#third-star").classList.add("yellow-star");

  } else if (moves >= 10 && moves < 20) {
    //Change the color of two stars to yellow and let one be black
    document.querySelector("#third-star").classList.add("black-star");

  } else {
    //Change only one star to yellow and the others be black
    document.querySelector("#second-star").classList.add("black-star");
  }

}

//Timer
function startClock() {
  clockID = setInterval(function() {
    clock.innerHTML = minute+" m " +second+" s";
    second++; //increments second,
    if (second == 60) { //When it reaches 60
      minute++; //increment minute
      second = 0; //restart counting the seconds
    } if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000); //wait 1000ms
}

// restart Button
const restartButton = document.querySelector(".restart"); //select the button by class name
restartButton.addEventListener("click", restartGame); // restart the game when clicked on the restart button

function restartGame() {
  location.reload(); // reloads the page
}
