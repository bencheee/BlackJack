/*
##########################
DECLARING GLOBAL VARIABLES
##########################
*/

let cardsDrawn = [],
  playerHandString = [],
  playerHandValue = [],
  dealerHandString = [],
  dealerHandValue = [],
  playerScore,
  dealerScore,
  betPool = [],
  totalBet = 0,
  creditsAvailable = 1000,
  playStyle = "conservative",
  doubleMode = false,
  placedBet = false;

  /*
###################################################
ADJUSTING HTML / CSS ELEMENTS WHEN SCRIPT IS LOADED
###################################################
*/

// Checks screen size / layout
$(window).ready(checkScreenSize);
$(window).resize(checkScreenSize);

/*
Disables zoom on double click
CODE CREDIT: https://www.quora.com/How-can-I-prevent-default-double-click-behavior-with-JavaScript
*/
$(document).dblclick(function(event) {
  event.preventDefault();
});

// Hides everything except main menu items
$(".nav-container").hide();
$(".help-container").hide();
$(".playing-container").hide();
$(".controls-container").hide();
$(".options-container").hide();
$(".top-scores-container").hide();
$("#bank-amount").text(creditsAvailable);
disableBtn(".play-btn");

/*
###############
EVENT LISTENERS
###############
*/

$("#new-game").click(function() {
  // Changes height of .desktop-container to 90% due to .nav-container is now displayed
  $(".desktop-container").css("height", "90%");
  $("body").css("background-image", "url('assets/images/bg-bw.jpg')");
  $(".nav-container").show();
  $(".playing-container").show();
  $(".controls-container").show();
  $(".menu-container").hide();
  $("h1").hide();
  $("h1").hide();
  popUpOn(
    "Welcome to 'Blackjack The Game'. Place your first bet by pressing one of the chip buttons. Good luck!"
  );
  $(".pop-up-box button").click(function() {
    popUpOff();
    $(".chip").removeClass("chip-off");
  });
});

$("#options").click(function() {
  $(".menu-container").hide();
  $("h1").hide();
  $(".options-container").show();
  // Adds close button to options window. This is necessary because this button is removed by showTopScoresList() function which causes a bug where button is permanently hidden.
  if ($(".options-close").length === 0) {
    let btn = $("<button></button>").addClass("options-close").text(
      "CLOSE");
    $(".options-box").append(btn);
  }
  // Toggles between "aggressive" and "conservative" mode
  $("#option-conservative").click(function() {
    if ($("#option-conservative i").hasClass("fa-square")) {
      $("#option-conservative i").toggleClass("fa-square");
      $("#option-conservative i").toggleClass("fa-check-square");
      $("#option-aggressive i").toggleClass("fa-check-square");
      $("#option-aggressive i").toggleClass("fa-square");
      if ($("#option-conservative i").hasClass("fa-square")) {
        playStyle = "aggressive";
      } else {
        playStyle = "conservative";
      }
    }
  });
  // Toggles between "aggressive" and "conservative" mode
  $("#option-aggressive").click(function() {
    if ($("#option-aggressive i").hasClass("fa-square")) {
      $("#option-conservative i").toggleClass("fa-square");
      $("#option-conservative i").toggleClass("fa-check-square");
      $("#option-aggressive i").toggleClass("fa-check-square");
      $("#option-aggressive i").toggleClass("fa-square");
      if ($("#option-aggressive i").hasClass("fa-square")) {
        playStyle = "conservative";
      } else {
        playStyle = "aggressive";
      }
    }
  });
  $(".options-close").click(function() {
    $(".menu-container").show();
    $("h1").show();
    $(".options-container").hide();
  });
});

$("#rules").click(function() {
  $(".menu-container").hide();
  $("h1").hide();
  $(".help-container").show();
  let btn = $("<button></button>").addClass("help-close").text("CLOSE");
  $(".help-controls").append(btn);
  $(".help-close").click(function() {
    $(".menu-container").show();
    $("h1").show();
    $(".help-container").hide();
    $(".help-close").remove();
  });
});

$(".chip").click(function() {
  // Activates "bet" button
  enableBtn("#bet");
  // Adds chip value to array
  betPool.unshift(Number($(this).text()));
  // Adds current amount to total bet and updates html
  totalBet += betPool[0];
  $("#total-bet").text(`${totalBet}`);
  // Deducts current amount from bank and updates html
  creditsAvailable -= betPool[0];
  $("#bank-amount").text(creditsAvailable);
  // Activates bet info box
  $("#bet-info").addClass("bet-info--active");
  // Adds undo button
  undoBtn();
  // Checks which chips need to be activated / deactivated
  chipsToggle();
});

$("#bet").click(function() {
  placedBet = true;
  // Draws 2 cards for player / dealer
  for (let i = 0; i < 2; i++) {
    generateCard();
    addCard(playerHandString, playerHandValue, $("#player-cards"));
    generateCard();
    addCard(dealerHandString, dealerHandValue, $("#dealer-cards"));
  }
  // Hides first dealer's card
  $("#dealer-cards").children(":first")
    .replaceWith(`<img src="assets/images/red_back.jpg" class="card">`);
  // Stores numeric values of current score for dealer / player 
  playerScore = getHandValue(playerHandValue);
  dealerScore = getHandValue(dealerHandValue);
  // Updates scoreboard in html
  $("#player-score").text(`${playerScore}`);
  $("#dealer-score").text(`${dealerHandValue[0]}`);
  disableBtn("#bet");
  enableBtn("#hit, #stand");
  $(".undo-btn").remove();
  if (playerScore < 21) {
    enableBtn("#double");
  }
  if (dealerHandValue[0] === 11 || dealerHandValue[0] === 10) {
    enableBtn("#insurance");
  }
  $(".chip").addClass("chip-off");
  // Checks if player has Blackjack
  checkBlackjack();
});

$("#hit").click(function() {
  // Draws one new card for player
  generateCard();
  addCard(playerHandString, playerHandValue, $("#player-cards"));
  updateTotal();
  checkScore();
  disableBtn("#double, #insurance");
});

$("#stand").click(function() {
  popUpOn(`You have ${playerScore} points! It's dealer's turn now!`);
  $(".pop-up-box button").click(function() {
    popUpOff();
    dealerTurn();
    // disables all buttons
    disableBtn(".play-btn");
  });
});

$("#double").click(double);

$("#insurance").click(insurance);

/*
##############
GAME FUNCTIONS
##############
*/

//  Function generates new card by creating unique string combination where first character of the string represents card value and second character represents card color. When string is generated it is pushed in to cardsDrawn array.
function generateCard() {
  /* Determines card value by generating string
     2-10 or a, j, q, k ( a = Ace, j = Jack, q = Queen, k = King */
  let cardValue;
  let randNumber = Math.ceil(Math.random() * 13);
  switch (randNumber) {
    case 1:
      cardValue = "a";
      break;
    case 11:
      cardValue = "j";
      break;
    case 12:
      cardValue = "q";
      break;
    case 13:
      cardValue = "k";
      break;
    default:
      cardValue = randNumber.toString();
  }
  /* Determines card color by generating string
     h, c, d or s (h = Hearts, c = Clubs, d = Diamonds, s = Spades) */
  let cardColor;
  let randColor = Math.ceil(Math.random() * 4);
  switch (randColor) {
    case 2:
      cardColor = "h";
      break;
    case 3:
      cardColor = "c";
      break;
    case 4:
      cardColor = "d";
      break;
    default:
      cardColor = "s";
  }
  /* If generated combination of strings already exists
     in cardsDrawn array generates another*/
  if (!cardsDrawn.includes(`${cardValue}${cardColor}`)) {
    cardsDrawn.unshift(`${cardValue}${cardColor}`);
  } else {
    generateCard();
  }
}

// Function takes parameters depending on if it is adding card to player's or dealer's hand
function addCard(handString, handValue, container) {
  // Creates and adds new card element to index.html
  let card = $(`<img src="assets/images/${cardsDrawn[0]}.jpg">`).addClass(
    "card");
  container.append(card);
  // Updates handString array for player / dealer with string value of drawn card
  handString.unshift(cardsDrawn[0]);
  /*
  Converts first character of card string to number.
  Ace card is converted to NaN
  */
  let convertedValue;
  let firstChar = handString[0].slice(0, 1);
  switch (firstChar) {
    case "j":
      convertedValue = 10;
      break;
    case "q":
      convertedValue = 10;
      break;
    case "k":
      convertedValue = 10;
      break;
    case "1":
      convertedValue = 10;
      break;
    default:
      convertedValue = Number(firstChar);
  }
  // Updates handValue array for player / dealer with numeric value of card drawn
  handValue.unshift(convertedValue);
}

// Adds up all items in player's/dealer's handValue array and returns the sum
function getHandValue(handValue) {
  let totalHandValue = 0;
  for (let i = 0; i < handValue.length; i++) {
    // Checks for NaN value to determine if this is Ace card
    if (isNaN(handValue[i])) {
      // Gives value of 1 or 11 to Ace card
      if (totalHandValue > 10) {
        handValue[i] = 1;
      } else {
        handValue[i] = 11;
      }
    }
    totalHandValue += handValue[i];
  }
  return totalHandValue;
}

// Corrects and updates the scores for player/dealer
function updateTotal() {
  // Stores score for player / dealer BEFORE correcting ace value
  playerScore = getHandValue(playerHandValue);
  dealerScore = getHandValue(dealerHandValue);
  // Corrects ace value
  aceCorrect(playerHandValue, playerScore);
  aceCorrect(dealerHandValue, dealerScore);
  // Stores score for player / dealer AFTER correcting ace value
  playerScore = getHandValue(playerHandValue);
  dealerScore = getHandValue(dealerHandValue);
  // Updates html with latest scores
  $("#player-score").text(`${playerScore}`);
  $("#dealer-score").text(`${dealerHandValue[0]}`);
}

function aceCorrect(handValue, score) {
  // Adjusts value of ace card to 1 if total score is > 21
  if (score > 21) {
    for (let i = 0; i < handValue.length; i++) {
      if (handValue[i] === 11) {
        handValue[i] = 1;
        score -= 10;
        // Function should break out in case score is under 22 again to prevent possible additional aces to be changed from 11 to 1
        if (score < 22) {
          break;
        } else {
          aceCorrect(handValue, score);
        }
      }
    }
  }
}

// Checks if player has Blackjack after initial two cards are dealt
function checkBlackjack() {
  if (playerScore === 21) {
    popUpOn("You have Blackjack! It's dealer's turn now!");
    disableBtn("#insurance");
    $(".pop-up-box button").click(function() {
      popUpOff();
      if (dealerScore === 21) {
        popUpOn("You and Dealer have Blackjack! It's a tie!");
        creditsAvailable += totalBet;
        $("#dealer-score").text(dealerScore);
        $("#dealer-cards").children(":first")
          .replaceWith(
            `<img src="assets/images/${dealerHandString[dealerHandString.length - 1]}.jpg" class="card">`
          );
      } else {
        popUpOn("You win with Blackjack!");
        creditsAvailable += (totalBet * 1.5);
        $("#dealer-score").text(dealerScore);
        $("#dealer-cards").children(":first")
          .replaceWith(
            `<img src="assets/images/${dealerHandString[dealerHandString.length - 1]}.jpg" class="card">`
          );
      }
      $(".pop-up-box button").click(function() {
        popUpOff();
        setTimeout(resetRound, 1000);
      });
    });
  }
}

// Checks if player busted / has Blackjack / drew 5 cards after "hit" button is pressed
function checkScore() {
  if (playerScore > 21) {
    popUpOn("You bust! Dealer wins!");
    $(".pop-up-box button").click(function() {
      popUpOff();
      setTimeout(resetRound, 1000);
    });
  } else if (playerScore === 21) {
    popUpOn("You have Blackjack! It's dealer's turn now!");
    $(".pop-up-box button").click(function() {
      popUpOff();
      dealerTurn();
    });
  }
  // Checks and limits amount of player"s drawn cards to 5 
  if (playerHandString.length === 5 && playerScore < 21) {
    popUpOn(
      `This was your last card. You have ${playerScore} points. It's dealer's turn now!`
    );
    $(".pop-up-box button").click(function() {
      popUpOff();
      dealerTurn();
    });
  }
}

function dealerTurn() {
  // Keeps drawing cards as long as player is in the lead
  if (dealerScore <= playerScore) {
    if (dealerScore === playerScore && playStyle === "conservative") {
      // Prevents dealer from drawing card in conservative mode
      decideWinner();
      return;
    } else {
      if (dealerScore === 21) {
        popUpOn("You and dealer have Blackjack! It's a tie!");
        creditsAvailable += totalBet;
        $("#dealer-score").text(dealerScore);
        $("#dealer-cards").children(":first")
          .replaceWith(
            `<img src="assets/images/${dealerHandString[dealerHandString.length - 1]}.jpg" class="card">`
          );
        $(".pop-up-box button").click(function() {
          popUpOff();
          setTimeout(resetRound, 1000);
        });
        return;
      }
      dealerDraws();
    }
    if (dealerScore <= playerScore) {
      if (dealerScore === playerScore && playStyle === "conservative") {
        decideWinner();
      } else {
        if (dealerHandString.length === 5) {
          return;
        }
        dealerTurn();
      }
      return;
    } else {
      if (dealerScore > 21) {
        if (dealerHandString.length === 5) {
          return;
        }
        popUpOn("Dealer busts! You win!");
        if (doubleMode) {
          creditsAvailable += (totalBet * 2);
        } else {
          creditsAvailable += (totalBet * 1.5);
        }
        $(".pop-up-box button").click(function() {
          popUpOff();
          setTimeout(resetRound, 1000);
        });
      } else {
        if (dealerHandString.length === 5) {
          return;
        }
        decideWinner();
        return;
      }
    }
  } else {
    $("#dealer-score").text(dealerScore);
    $("#dealer-cards").children(":first")
      .replaceWith(
        `<img src="assets/images/${dealerHandString[dealerHandString.length - 1]}.jpg" class="card">`
      );
    decideWinner();
  }
}

// Generates new card for dealer
function dealerDraws() {
  generateCard();
  addCard(dealerHandString, dealerHandValue, $("#dealer-cards"));
  updateTotal();
  $("#dealer-score").text(dealerScore);
  $("#dealer-cards").children(":first")
    .replaceWith(
      `<img src="assets/images/${dealerHandString[dealerHandString.length - 1]}.jpg" class="card">`
    );
  // Limits cards drawn to 5 and checks the winner
  if (dealerHandString.length === 5) {
    if (dealerScore < 22) {
      decideWinner();
      return;
    } else {
      popUpOn("Dealer busts! You win!");
      if (doubleMode) {
        creditsAvailable += (totalBet * 2);
      } else {
        creditsAvailable += (totalBet * 1.5);
      }
      $(".pop-up-box button").click(function() {
        popUpOff();
        setTimeout(resetRound, 1000);
      });
    }
  }
}

function decideWinner() {
  $("#dealer-score").text(dealerScore);
  $("#dealer-cards").children(":first")
    .replaceWith(
      `<img src="assets/images/${dealerHandString[dealerHandString.length - 1]}.jpg" class="card">`
    );
  if (dealerScore === playerScore) {
    (dealerScore === 21) ?
    popUpOn("You and dealer have Blackjack! It's a tie!"):
      popUpOn(`You and dealer have ${playerScore} points. It's a tie!`);
    creditsAvailable += totalBet;
    $(".pop-up-box button").click(function() {
      popUpOff();
      setTimeout(resetRound, 1000);
    });
  } else if (dealerScore > playerScore) {
    (dealerScore === 21) ?
    popUpOn("Dealer wins with Blackjack!"):
      popUpOn(`Dealer wins with ${dealerScore} points!`);
    $(".pop-up-box button").click(function() {
      popUpOff();
      setTimeout(resetRound, 1000);
    });
  } else {
    (playerScore === 21) ?
    popUpOn("You win with Blackjack!"):
      popUpOn(`You win with ${playerScore} points!`);
    if (doubleMode) {
      creditsAvailable += (totalBet * 2);
    } else {
      creditsAvailable += (totalBet * 1.5);
    }
    $(".pop-up-box button").click(function() {
      popUpOff();
      setTimeout(resetRound, 1000);
    });
  }
}

// Displays pop up message on game screen
function popUpOn(message) {
  $(".playing-section-middle--item").hide();
  let overlay = $("<div></div>").addClass("overlay");
  let playSectionDealer = $(".playing-section--dealer");
  let popUpBox = $("<div></div>").addClass("pop-up-box flex-centered");
  let popUpTxt = $("<div></div>").text(message);
  let popUpBtn = $("<button></button>").text("CONTINUE");
  $("footer").after(overlay);
  playSectionDealer.after(popUpBox);
  popUpBox.append(popUpTxt);
  popUpBox.append(popUpBtn);
  disableBtn("#hit, #stand");
}

// Removes pop up message from game screen
function popUpOff() {
  $(".overlay").remove();
  $(".pop-up-box").remove();
  $(".playing-section-middle--item").show();
  $("nav button").css("pointer-events", "auto");
}

// Cancels last bet in totalBet array and changes DOM elements accordingly
function undoBtn() {
  // Makes sure undo button is not duplicated
  if ($("#player-cards").is(":empty") && $(".undo-container").is(":empty")) {
    let undoBtn = $("<button></button>").addClass("undo-btn");
    if (window.innerWidth > window.innerHeight) {
      $(".undo-container").append(undoBtn.text("UNDO BET"));
    } else {
      $("#player-cards").append(undoBtn.text("UNDO BET"));
    }
    // Removes last bet
    $(".undo-btn").click(undoClick);
  }
}

// Runs when double button is pressed
function double() {
  // Checks if there is enough credit to place double bet
  if (creditsAvailable < (totalBet)) {
    popUpOn("You don't have enough credit to place the double bet!");
    $(".pop-up-box button").click(function() {
      popUpOff();
      enableBtn("#hit, #stand");
      disableBtn("#double");
    });
    return;
  }
  // Displays pop-up message with yes/no option
  popUpOn(
    `You will place additional bet of ${totalBet} credits and draw only one card. Do you wish to proceed?`
  );
  $(".pop-up-box button").remove();
  let container = $("<div></div>").addClass("flex-centered");
  let yes = $("<button></button>").text("YES").attr("id", "yes");
  let no = $("<button></button>").text("NO").attr("id", "no");
  container.append(yes);
  container.append(no);
  $(".pop-up-box").append(container);
  // Runs if YES option is pressed
  yes.click(function() {
    // Deactivates all playing buttons
    disableBtn(".play-btn");
    popUpOff();
    doubleMode = true;
    // Doubles the current bet
    creditsAvailable -= totalBet;
    totalBet *= 2;
    $("#total-bet").text(`${totalBet}`);
    $("#bank-amount").text(creditsAvailable);
    // Generates new card and updates the score
    generateCard();
    addCard(playerHandString, playerHandValue, $("#player-cards"));
    updateTotal();
    checkScore();
    if (playerScore < 21) {
      popUpOn(`You have ${playerScore} points! It's dealer's turn now!`);
      $(".pop-up-box button").click(function() {
        popUpOff();
        dealerTurn();
      });
    }
  });
  no.click(function() {
    popUpOff();
    enableBtn("#hit, #stand");
  });
}

// Runs when double button is pressed
function insurance() {
  // Checks if there is enough credit to place insurance bet
  if (creditsAvailable < (totalBet / 2)) {
    popUpOn("You don't have enough credit to place the insurance bet!");
    $(".pop-up-box button").click(function() {
      popUpOff();
      enableBtn("#hit, #stand");
      disableBtn("#insurance");
    });
    return;
  }
  // Displays pop-up message with yes/no option
  popUpOn(
    `You will bet ${totalBet / 2} credits on whether dealer has Blackjack or not. Do you wish to proceed?`
  );
  $(".pop-up-box button").remove();
  let container = $("<div></div>").addClass("flex-centered");
  let yes = $("<button></button>").text("YES").attr("id", "yes");
  let no = $("<button></button>").text("NO").attr("id", "no");
  container.append(yes);
  container.append(no);
  $(".pop-up-box").append(container);
  // Runs if YES option is pressed
  yes.click(function() {
    disableBtn("#insurance");
    popUpOff();
    creditsAvailable -= (totalBet / 2);
    $("#bank-amount").text(creditsAvailable);
    $("#total-bet").text(`${totalBet} (+${totalBet / 2})`);
    if (dealerScore === 21) {
      creditsAvailable += totalBet;
      $("#dealer-score").text(dealerScore);
      $("#dealer-cards").children(":first")
        .replaceWith(
          `<img src="assets/images/${dealerHandString[dealerHandString.length - 1]}.jpg" class="card">`
        );
      popUpOn("Dealer wins with Blackjack! You win insurance bet!");
      $(".pop-up-box button").click(function() {
        popUpOff();
        $("#bank-amount").text(creditsAvailable);
        setTimeout(resetRound, 1000);
      });
    } else {
      popUpOn(
        "Dealer does not have Blackjack! Insurance bet is lost! Round continues."
      );
      $(".pop-up-box button").click(function() {
        popUpOff();
        enableBtn("#hit, #stand");
        $("#total-bet").text(`${totalBet}`);
      });
    }
  });
  no.click(function() {
    popUpOff();
    enableBtn("#hit, #stand");
  });
}

// Checks which chip buttons should activate/deactivate depending on the available player's credit left
function chipsToggle() {
  $(".chip span").each(function() {
    if (creditsAvailable < Number(this.innerHTML)) {
      $(this.parentNode).addClass("chip-off");
    } else {
      $(this.parentNode).removeClass("chip-off");
    }
  });
}

function undoClick() {
  // Makes sure there are no bets so NaN can't be returned
  if (betPool.length === 0) {
      return;
  }

  totalBet -= betPool[0];
  creditsAvailable += betPool[0];
  betPool.shift();
  $("#total-bet").text(`${totalBet}`);
  $("#bank-amount").text(creditsAvailable);
  // If there are no bets left removes button
  if (totalBet === 0) {
    $(".undo-btn").remove();
    // Deactivates bet info box
    $("#bet-info").removeClass("bet-info--active");
    // Deactivates bet button
    disableBtn("#bet");
  }
  chipsToggle();
}

// Resets everything except available credits to default values
function resetRound() {
  $(".card").remove();
  $("#total-bet").text("0");
  $("#player-score").text("0");
  $("#dealer-score").text("0");
  $("#bank-amount").text(creditsAvailable);
  cardsDrawn = [],
    playerHandString = [],
    playerHandValue = [],
    dealerHandString = [],
    dealerHandValue = [],
    playerScore = 0,
    dealerScore = 0,
    betPool = [],
    totalBet = 0,
    doubleMode = false,
    placedBet = false;
  // If there is not enough credits ends the game
  if (creditsAvailable < 25) {
    popUpOn("You don't have enough credits to place the bet.");
    $(".pop-up-box button").text("GAME OVER");
    $(".pop-up-box button").click(function() {
      popUpOff();
      location.reload();
    });
  }
  chipsToggle();
  disableBtn(".play-btn");
}

/*
Adds .flex-centered class to .desktop-container if in landscape mode.
Shows the message about recommended screen size / orientation when in landscape mode on mobile and tablet devices. 
Sets the height of the body to inner window height in order to avoid issues with phones and tablets where css "height: 100vh" does not work properly.
CODE CREDIT: https://www.w3schools.com/jsref/prop_win_innerheight.asp
*/
function checkScreenSize() {
  if (window.innerWidth > window.innerHeight) {
    $(".desktop-container").addClass("flex-centered");
    // It will not pop up message if another pop up is active
    if ((window.innerWidth < 992) && ($("div").hasClass("pop-up-box") ===
        false)) {
      popUpWarning(
        "TIP: For best experience it is recommended to play in portrait mode when on mobile and tablet devices."
      );
      $(".overlay").css("height", `${window.innerHeight}px`);
      $(".pop-up-box button").click(function() {
        popUpOff();
      });
    }
  } else {
    $(".desktop-container").removeClass("flex-centered");
    popUpOff();
    // Does nod display navbar items if in main menu
    // CODE CREDIT: https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
    if ($(".menu-container")[0].offsetParent === true) {
      $(".nav-container").show();
    }
  }

  // Changes location of activated undo button depending on screen layout
  if ((window.innerWidth > window.innerHeight) && ($("#player-cards").is(
    ":empty") === false)) {
      $(".undo-btn").remove();
      let undoBtn = $("<button></button>").addClass("undo-btn");
      $(".undo-container").append(undoBtn.text("UNDO BET"));
  } else if ((window.innerHeight > window.innerWidth) && ($(".undo-container").is(
    ":empty") === false)) {
      $(".undo-btn").remove();
      let undoBtn = $("<button></button>").addClass("undo-btn");
      $("#player-cards").append(undoBtn.text("UNDO BET"));
  }
  $(".undo-btn").click(undoClick);
  $("body").css("height", `${window.innerHeight}px`);
}

function popUpWarning(message) {
  let overlay = $("<div></div>").addClass("overlay flex-centered");
  overlay.css("height", "100vh");
  let popUpBox = $("<div></div>").addClass("pop-up-box flex-centered");
  popUpBox.css("left", "auto");
  let popUpTxt = $("<div></div>").text(message);
  let popUpBtn = $("<button></button>").text("CONTINUE");
  popUpBtn.css("height", "8vh");
  $("footer").after(overlay);
  overlay.append(popUpBox);
  popUpBox.append(popUpTxt);
  popUpBox.append(popUpBtn);
}

function enableBtn(btn) {
  $(btn).removeClass("play-btn-disabled");
}

function disableBtn(btn) {
  $(btn).addClass("play-btn-disabled");
}