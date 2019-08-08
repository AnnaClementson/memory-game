const icons = [
    "fa fa-bicycle",
    "fa fa-bicycle",
    "fa fa-leaf",
    "fa fa-leaf",
    "fa fa-cube",
    "fa fa-cube",
    "fa fa-anchor",
    "fa fa-anchor",
    "fa fa-paper-plane-o",
    "fa fa-paper-plane-o",
    "fa fa-bolt",
    "fa fa-bolt",
    "fa fa-bomb",
    "fa fa-bomb",
    "fa fa-diamond",
    "fa fa-diamond"
];

//shuffle cards
const iconsShuffle = shuffle(icons);


function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// timer variable
const timerContainer = document.querySelector(".timer");
let liveTimer,
    totalSeconds = 0;

//set the default value to the timers container
timerContainer.innerHTML = totalSeconds;

//start the timer
function startTimer() {
    liveTimer = setInterval(function() {
        //increase the total seconds by 1
        totalSeconds++;
        //update the HTML container with the new time
        timerContainer.innerHTML = totalSeconds;
    }, 1000);
}

//creating the deck
const cardsContainer = document.querySelector(".deck");

// array to compare cards
let openedCards = [];
let matchedCards = [];

//Initialize the game

function init() {
    for (let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        cardsContainer.appendChild(card);

        //Add click event to each card
        click(card);
    }
}

/*
 *click event
 */
let isFirstClick = true;

function click(card) {
    //card click event
    card.addEventListener("click", function() {
        //ADDED CONTENT

        if (isFirstClick) {
            //start timer
            startTimer();
            //change our first click bolean
            isFirstClick = false;
        }

        const currentCard = this;
        const previousCard = openedCards[0];

        //if we have an exisiting opened card
        if (openedCards.length === 1) {
            //show cards
            card.classList.add("open", "show", "disable");
            //compare cards
            openedCards.push(this);

            //we should compare our 2 open cards
            compare(currentCard, previousCard);
        } else {
            // we dont have any opened cards
            //show cards
            currentCard.classList.add("open", "show", "disable");
            //compare cards
            openedCards.push(this);
        }
    });
}

//compare the cards

function compare(currentCard, previousCard) {
    //matcher

    if (currentCard.innerHTML === previousCard.innerHTML) {
        //matched cards
        currentCard.classList.add("match");
        previousCard.classList.add("match");

        matchedCards.push(currentCard, previousCard);

        openedCards = [];

        //check if the game is over
        isOver();
    } else {
        //delay event of card flipping. wait 500 ms
        setTimeout(function() {
            currentCard.classList.remove("open", "show", "disable");
            previousCard.classList.remove("open", "show", "disable");
            openedCards = [];
        }, 500);
    }
    //add new move
    addMove();
}

//check if the game has been completed

function isOver() {
    if (matchedCards.length === icons.length) {
        modal.style.display = "block";

        //stop timer
        stopTimer();
        //timerContainer = "0";
    }
}

//stop timer
function stopTimer() {
    clearInterval(liveTimer);
}

/*
 * Rating
 */
const starsContainer = document.querySelector(".stars");
starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;

function rating() {
    if (moves > 17 && moves < 25) {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>`;
    } else if (moves >= 25) {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    } else {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
    }
}

//add move

const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;

function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

    //set the rating
    rating();

    //set the final moves for the modal
    const modalMoves = document.querySelector("#moves");

    modalMoves.innerHTML = moves;

    //set the final time for the modal
    const finalTime = document.querySelector("#seconds");

    finalTime.innerHTML = totalSeconds;

    //set the rating for the modal

    const starRating = document.querySelector(".stars");
    const ratingSpan = document.querySelector("#rating");

    ratingSpan.innerHTML = starRating.innerHTML;

    starsContainer.querySellectorAll(".fa-star").length;

}

//restart button

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
    //delete all cards
    cardsContainer.innerHTML = "";

    //timer reset
    isFirstClick = true;
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds;
    stopTimer();

    //shuffle cards
    shuffle(icons);

    //call "init" to create new cards
    init();

    //reset any related varibles (matched cards)
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

//Start the game for the first time
init();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
/* function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */