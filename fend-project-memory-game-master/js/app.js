
// Create a list that holds all of your cards
let cardsList = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
 "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb",
 "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"],

// List of global variables
    delay = 500,
    match = 0,
    count = 0,
    moves = 0;
    score = 3;
    cardsTotal = cardsList.length / 2;

// add each card's HTML to the page
function startGame() {
    $( ".deck" ).empty();
    match = 0;
    moves = 0;
    count = 0;
    openCards = [];
    rating(moves);
    $( ".moves" ).text(moves);
    startTime();

// shuffle the list of cards using the provided "shuffle" method below
    let shuffleCards = shuffle(cardsList);

// loop through each card and create its HTML
    for (var i =0; i < shuffleCards.length; i++) {
        $( ".deck" ).append($( "<li class=\"card\"><i class=\"" + shuffleCards[i] + "\"></i></li>" ));
    }

// set up the event listener for a card. If a card is clicked:
    addCardListener()
}

function startTime() {
     time = setInterval (function () {
     count ++;
     $(" .time ").text(count);
     }, 1000);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
  return array;
}

// Determines score of player.
// increment the move counter and display it on the page
function rating(moves) {
    if (moves > 10 && moves < 15) {
        $('.fa-star').eq(3).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > 15 && moves < 20) {
        $('.fa-star').eq(2).removeClass('fa-star').addClass('fa-star-o');
        score = 2;
    } else if (moves > 20) {
        $('.fa-star').eq(1).removeClass('fa-star').addClass('fa-star-o');
        score = 1;
    }
    return score
}


// Restarts the game on click.
$( ".restart" ).on("click", function() {
  $( ".fa-star-o" ).removeClass("fa-star-o").addClass("fa-star");
  stopTime(time);
  startGame();
  $( ".time ").text(count);
});

// Set up the event listener for a card. If a card is clicked:
let openCards = [];

let addCardListener = function () {

     $( ".card" ).on("click", function(){
// Stops user clicking on the same card to match
    if (!$(this).hasClass( "open showc" )) {
// display the card's symbol
     let card = $(this).html();
     $(this).addClass("open showc");
// add the card to a *list* of "open" cards
     openCards.push(card);

// if the list already has another card, check to see if the two cards match
// if the cards do match, lock the cards in the open position
     if (openCards.length > 1) {
        if (card === openCards[0]) {
           $( ".open" ).addClass("match");
           setTimeout(function () {
              $( ".open" ).removeClass("open showc");
          }, delay);
          match ++;

// if the cards do not match, remove the cards from the list and hide the card's symbol
       } else {
         $( ".open" ).addClass("notmatch");
         setTimeout(function () {
             $( ".open" ).removeClass("open showc");
         }, delay);
       }

     openCards = [];
     moves ++;
     rating(moves);
     $( ".moves" ).text(moves);

 }
// *    + if all cards have matched, display a message with the final score
    if (cardsTotal === match) {
      stopTime(time);
      $( "#completed-modal" ).modal('toggle');
      $( ".completed-text" ).text(`You completed the game with a ${score} star rating, in ${moves} moves and in ${count} seconds!`);
    }
 }
 });

}

// Stop Timer
function stopTime(timer) {
    clearInterval(timer)
}

startGame()
