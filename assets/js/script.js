let cardsDrawn = [],
    playerHandString = [],
    playerHandValue = [],
    dealerHandString = [],
    dealerHandValue = [],
    playerScore,
    dealerScore;

let betPool = [],
    totalBet = 0,
    creditsAvailable = 1000;

$('body').css("height", `${window.innerHeight}px`);

$('.nav-container').hide();
$('.help-container').hide();
$('.playing-container').hide();
$('.controls-container').hide();
$('.options-container').hide();

$('#new-game').click(function () {
    $('.nav-container').show();
    $('.playing-container').show();
    $('.controls-container').show();
    $('.menu-container').hide();
    $("body").css("background-image", "url('assets/images/bg-bw.jpg')");
}); // end listener

$('#options').click(function () {
    $('.menu-container').hide();
    $('.options-container').show();

    // enables or disables insurance option in game
    $('#option-insurance').click(function () {
        $('#option-insurance i').toggleClass('fa-check-square');
        $('#option-insurance i').toggleClass('fa-square');

        if ($("#option-insurance i").hasClass("fa-square")) {
            $('#insurance').attr('id', 'insurance-disabled');
        } else {
            $('#insurance-disabled').attr('id', 'insurance');
        }; // end if
    }); //end listener

    // enables or disables double option in game
    $('#option-double').click(function () {
        $('#option-double i').toggleClass('fa-check-square');
        $('#option-double i').toggleClass('fa-square');

        if ($("#option-double i").hasClass("fa-square")) {
            $('#double').attr('id', 'double-disabled');
        } else {
            $('#double-disabled').attr('id', 'double');
        }; // end if
    }); //end listener

    $('.options-close').click(function () {
        $('.menu-container').show();
        $('.options-container').hide();
    }); // end listener

}); // end listener

$('#rules').click(function () {
    $('.menu-container').hide();
    $('.help-container').show();
    $('.help-container').css('height', '95%');
    let btn = $('<button></button>').addClass('help-close').text('CLOSE');
    $('.help-controls').append(btn);

    $('.help-close').click(function () {
        $('.menu-container').show();
        $('.help-container').hide();
        $('.help-container').css('height', '90%');
        $('.help-close').remove();
    }); // end listener
}); // end listener




$('.play-btn').addClass('play-btn-disabled');

$('#bank-amount').text(creditsAvailable);

$('.chip').click(function () {
    // turns on 'bet' button
    $('#bet').removeClass('play-btn-disabled');
    // adds chip value to array
    betPool.unshift(Number($(this).text()));
    // adds current amount to total bet and updates html
    totalBet += betPool[0];
    $('#total-bet').text(`${totalBet}`);
    // deducts current amount from bank and updates html
    creditsAvailable -= betPool[0];
    $('#bank-amount').text(creditsAvailable);
    // activates bet info box
    $('#bet-info').addClass('bet-info--active');
    // adds undo button
    undoBtn();
    // checks which chips are still available
    chipsToggle();
}); // end event listener

// disables zoom on double click
$('button').dblclick(function (event) {
    event.preventDefault();
});


$('#bet').click(function () {

    // Draws 2 cards for player / dealer
    for (i = 0; i < 2; i++) {
        generateCard();
        addCard(playerHandString, playerHandValue, $('#player-cards'));
        generateCard();
        addCard(dealerHandString, dealerHandValue, $('#dealer-cards'));
    };

    // Hides first dealer's card
    $('#dealer-cards').children(":first")
        .replaceWith(`<img src="assets/images/Red_back.jpg" class="card"></img>`);

    // Stores numeric values of current score for dealer / player 
    playerScore = getHandValue(playerHandValue);
    dealerScore = getHandValue(dealerHandValue);

    // Updates scoreboard in html
    $('#player-score').text(`${playerScore}`);
    $('#dealer-score').text(`${dealerHandValue[0]}`);

    // disables chip buttons

    // disables bet button
    $('#bet').addClass('play-btn-disabled');
    // removes undo button
    $('.undo-btn').remove();
    // enables hit button
    $('#hit').removeClass('play-btn-disabled');
    // enables stand button
    $('#stand').removeClass('play-btn-disabled');

    if (playerScore < 21) {
        // enables double button
        $('#double').removeClass('play-btn-disabled');
    }; // end if

    if (dealerHandValue[0] === 11 || dealerHandValue[0] === 10) {
        // enables insurance button
        $('#insurance').removeClass('play-btn-disabled');
    }; // end if

    $('.chip').addClass('chip-off');

    checkBlackjack();

    console.log('----Initial hand----');
    logsInfo();

}); // end event listener


$('#hit').click(function () {
    generateCard();
    addCard(playerHandString, playerHandValue, $('#player-cards'));
    updateTotal();
    checkScore();

    // disables double button
    $('#double').addClass('play-btn-disabled');
    // disables insurance button
    $('#insurance').addClass('play-btn-disabled');

    logsInfo();
}); // end event listener


$('#stand').click(function () {
    dealerTurn();
    // disables all buttons
    $('.play-btn').addClass('play-btn-disabled');

});

$('#double').click(double);

$('#insurance').click(insurance);


function generateCard() {

    /* Determines card value by generating string
       2-10 or A, J, Q, K */
    let randNumber = Math.ceil(Math.random() * 13);
    switch (randNumber) {
        case 1:
            cardValue = 'A';
            break;
        case 11:
            cardValue = 'J';
            break;
        case 12:
            cardValue = 'Q';
            break;
        case 13:
            cardValue = 'K';
            break;
        default:
            cardValue = randNumber.toString();
    };

    /* Determines card color by generating string
       H, C, D or S (first letter of the color) */
    let randColor = Math.ceil(Math.random() * 4);
    switch (randColor) {
        case 2:
            cardColor = 'H';
            break;
        case 3:
            cardColor = 'C';
            break;
        case 4:
            cardColor = 'D';
            break
        default:
            cardColor = 'S';
    };

    /* If generated combination of strings already exists
       in cardsDrawn array generate another*/
    if (!cardsDrawn.includes(`${cardValue}${cardColor}`)) {
        cardsDrawn.unshift(`${cardValue}${cardColor}`);
    } else {
        generateCard();
    };
}; // end generateCard


function addCard(handString, handValue, container) {

    // Creates and adds new card element to index.html
    let card = $(`<img src="assets/images/${cardsDrawn[0]}.jpg"></img>`).addClass('card');
    container.append(card);

    // Updates handString array for player / dealer with string value of drawn card
    handString.unshift(cardsDrawn[0]);

    /*
    Converts first character of card string to number
    Ace card is converted to NaN
    */
    let convertedValue;
    let firstChar = handString[0].slice(0, 1);
    switch (firstChar) {
        case 'J':
            convertedValue = 10;
            break;
        case 'Q':
            convertedValue = 10;
            break;
        case 'K':
            convertedValue = 10;
            break;
        case '1':
            convertedValue = 10;
            break;
        default:
            convertedValue = Number(firstChar);
    };

    // Updates handValue array for player / dealer with numeric value of card drawn
    handValue.unshift(convertedValue);
}; // end addCard


function getHandValue(handValue) {
    let totalHandValue = 0;
    for (i = 0; i < handValue.length; i++) {
        // Checks for NaN value to determine if this is Ace card
        if (isNaN(handValue[i])) {
            // Gives value of 1 or 11 to Ace card
            if (totalHandValue > 10) {
                handValue[i] = 1;
            } else {
                handValue[i] = 11;
            };
        };
        totalHandValue += handValue[i];
    }
    return totalHandValue;
}; // end getHandValue


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
    $('#player-score').text(`${playerScore}`);
    $('#dealer-score').text(`${dealerHandValue[0]}`);
}; // end updateTotal


function aceCorrect(handValue, score) {
    // Adjusts value of ace card to 1 if total score is > 21
    if (score > 21) {
        for (i = 0; i < handValue.length; i++) {
            if (handValue[i] === 11) {
                handValue[i] = 1;
            }; // end if
        }; // end loop
    }; // end if
}; // end aceCorrect


function checkBlackjack() {
    if (playerScore === 21) {
        popUpOn(`Player has Blackjack! Dealer's turn!`);
        $('.pop-up-box button').click(function () {
            popUpOff();
            if (dealerScore === 21) {
                popUpOn(`Player and Dealer have Blackjack! It's a tie!`);
                creditsAvailable += totalBet;
                // Shows first dealer's card
                $('#dealer-cards').children(":first")
                    .replaceWith(`<img src="assets/images/${dealerHandString[dealerHandString.length - 1]}.jpg" class="card"></img>`);
            } else {
                popUpOn('Player wins with Blackjack!');
                creditsAvailable += (totalBet * 1.5);

                $('#dealer-score').text(dealerScore);
                // Shows first dealer's card
                $('#dealer-cards').children(":first")
                    .replaceWith(`<img src="assets/images/${dealerHandString[dealerHandString.length - 1]}.jpg" class="card"></img>`);
            }; // end if 
            $('.pop-up-box button').click(function () {
                popUpOff();
                setTimeout(resetRound, 1000);
            }); // end event listener   
        }); // end event listener
    }; // end if
}; // end checkBlackjack


function checkScore() {
    // Player bust if score > 21
    if (playerScore > 21) {
        popUpOn('Player bust! Dealer wins!');
        $('.pop-up-box button').click(function () {
            popUpOff();
            setTimeout(resetRound, 1000);
        }); // end event listener 
    } else if (playerScore === 21) {
        popUpOn(`Player has Blackjack! Dealer's turn!`);
        $('.pop-up-box button').click(function () {
            popUpOff();
            dealerTurn();
        }); // end event listener
    }; // end if

    // Checks and limits amount of player's drawn cards to 5 
    if (playerHandString.length === 5 && playerScore < 21) {
        popUpOn(`This was last card. Dealer's turn!`);
        // prevents running dealerTurn function before continue btn is clicked
        $('.pop-up-box button').click(function () {
            popUpOff();
            dealerTurn();
        }); // end event listener
    }; // end if


    console.log('------Next hand------');
    logsInfo();
}; // end checkScore


function dealerTurn() {
    // Keeps drawing cards as long as player is in the lead
    if (dealerScore < playerScore) {
        generateCard();
        addCard(dealerHandString, dealerHandValue, $('#dealer-cards'));
        updateTotal();
        // Updates scoreboard in html for total score
        $('#dealer-score').text(dealerScore);
        // Shows first dealer's card
        $('#dealer-cards').children(":first")
            .replaceWith(`<img src="assets/images/${dealerHandString[dealerHandString.length - 1]}.jpg" class="card"></img>`);
        // Limits cards drawn to 5 and checks the winner
        if (dealerHandString.length === 5) {
            if (dealerScore < 22) {
                decideWinner();
                return;
            } else {
                popUpOn('Dealer bust! Player wins!');
                creditsAvailable += (totalBet * 1.5);

                $('.pop-up-box button').click(function () {
                    popUpOff();
                    setTimeout(resetRound, 1000);
                }); // end event listener 
            }; // end if
            return;
        }; // end if
        if (dealerScore < playerScore) {
            dealerTurn();
            return;
        } else {
            if (dealerScore > 21) {
                popUpOn('Dealer bust! Player wins!');
                creditsAvailable += (totalBet * 1.5);

                $('.pop-up-box button').click(function () {
                    popUpOff();
                    setTimeout(resetRound, 1000);
                }); // end event listener 
            } else {
                decideWinner();
                return;
            }; // end if
        }; // end if
    } else {
        // Updates scoreboard in html for total score
        $('#dealer-score').text(dealerScore);
        // Shows first dealer's card
        $('#dealer-cards').children(":first")
            .replaceWith(`<img src="assets/images/${dealerHandString[dealerHandString.length - 1]}.jpg" class="card"></img>`);
        decideWinner();
    }; // end if
}; // end dealerTurn


function decideWinner() {
    if (dealerScore === playerScore) {
        (dealerScore === 21) ?
        popUpOn(`Player and Dealer have Blackjack! It's a tie!`):
            popUpOn(`Player and dealer have the same score. It's a tie!`);
        creditsAvailable += totalBet;

        $('.pop-up-box button').click(function () {
            popUpOff();
            setTimeout(resetRound, 1000);
        }); // end event listener 
    } else if (dealerScore > playerScore) {
        (dealerScore === 21) ?
        popUpOn('Dealer wins with Blackjack!'):
            popUpOn('Dealer wins with higher score!');
        $('.pop-up-box button').click(function () {
            popUpOff();
            setTimeout(resetRound, 1000);
        }); // end event listener 
    } else {
        popUpOn('Player wins with higher score!');
        creditsAvailable += (totalBet * 1.5);
        $('.pop-up-box button').click(function () {
            popUpOff();
            setTimeout(resetRound, 1000);
        }); // end event listener 
    }; // end if
}; // end decideWinner


function popUpOn(message) {
    $('#playing-section-middle').hide();

    let playSectionDealer = $('.playing-section--dealer');
    let popUpBox = $('<div></div>').addClass('pop-up-box flex-centered');
    let popUpTxt = $('<div></div>').text(message);
    let popUpBtn = $('<button></button>').text('CONTINUE');

    playSectionDealer.after(popUpBox);
    popUpBox.append(popUpTxt);
    popUpBox.append(popUpBtn);

    $('.main-area--playing').addClass('pop-up-bg-green');
    $('.main-area--bank').addClass('pop-up-bg-blue');

    $('#hit, #stand').addClass('play-btn-disabled');

}; // end popUpOn

function popUpOff() {
    $('.pop-up-box').remove();
    $('#playing-section-middle').show();
    $('.main-area--playing').removeClass('pop-up-bg-green');
    $('.main-area--bank').removeClass('pop-up-bg-blue');

}; // end popUpOff

function undoBtn() {
    // makes sure undo button is not duplicated
    if ($('#player-cards').is(':empty')) {

        let undoBtn = $('<button></button>').addClass('undo-btn');
        $('#player-cards').append(undoBtn.text('UNDO BET '));

        // removes last bet
        $('.undo-btn').click(function () {
            totalBet -= betPool[0];
            creditsAvailable += betPool[0];
            betPool.shift();
            $('#total-bet').text(`${totalBet}`);
            $('#bank-amount').text(creditsAvailable);
            // if there are no bets left remove button
            if (totalBet === 0) {
                $('.undo-btn').remove();
                // deactivates bet info box
                $('#bet-info').removeClass('bet-info--active');
                // deactivates bet button
                $('#bet').addClass('play-btn-disabled');
            }; // end if
            chipsToggle();
        }); // end event listener
    }; // end if
}; // end undoBtn

function double() {

    // checks if there is enough credit to place double bet
    if (creditsAvailable < (totalBet)) {
        popUpOn(`You don't have enough credit to place double bet!`);
        $('.pop-up-box button').click(popUpOff);
        $('#hit, #stand').removeClass('play-btn-disabled');
        return;
    }; // end if 

    // displays pop-up message with yes/no option
    popUpOn(`You will place additional bet of ${totalBet} credits and draw only one card. Do you wish to proceed?`);
    $('.pop-up-box button').remove();
    let container = $('<div></div>').addClass('flex-centered');
    let yes = $('<button></button>').text('YES').attr('id', 'yes');
    let no = $('<button></button>').text('NO').attr('id', 'no');
    container.append(yes);
    container.append(no);
    $('.pop-up-box').append(container);

    yes.click(function () {
        // disables all buttons
        $('.play-btn').addClass('play-btn-disabled');
        popUpOff();
        // doubles the current bet
        creditsAvailable -= totalBet;
        totalBet *= 2;
        $('#total-bet').text(`${totalBet}`);
        $('#bank-amount').text(creditsAvailable);

        generateCard();
        addCard(playerHandString, playerHandValue, $('#player-cards'));
        updateTotal();
        checkScore();

        if (playerScore < 21) {
            dealerTurn();
        }; // end if
    }); // end event listener

    no.click(function () {
        popUpOff();
        $('#hit, #stand').removeClass('play-btn-disabled');
    });
}; // end double

function insurance() {

    // checks if there is enough credit to place insurance bet
    if (creditsAvailable < (totalBet / 2)) {
        popUpOn(`You don't have enough credit to place insurance bet!`);
        $('.pop-up-box button').click(popUpOff);
        $('#hit, #stand').removeClass('play-btn-disabled');
        return;
    }; // end if 

    // displays pop-up message with yes/no option
    popUpOn(`You will place separate bet of ${totalBet / 2} credits. Do you wish to proceed?`);
    $('.pop-up-box button').remove();
    let container = $('<div></div>').addClass('flex-centered');
    let yes = $('<button></button>').text('YES').attr('id', 'yes');
    let no = $('<button></button>').text('NO').attr('id', 'no');
    container.append(yes);
    container.append(no);
    $('.pop-up-box').append(container);

    yes.click(function () {
        // disables insurance button
        $('#insurance').addClass('play-btn-disabled');

        popUpOff();

        creditsAvailable -= (totalBet / 2);

        if (dealerScore === 21) {
            creditsAvailable += totalBet;
            $('#bank-amount').text(creditsAvailable);
            // Updates scoreboard in html for total score
            $('#dealer-score').text(dealerScore);
            // Shows first dealer's card
            $('#dealer-cards').children(":first")
                .replaceWith(`<img src="assets/images/${dealerHandString[dealerHandString.length - 1]}.jpg" class="card"></img>`);

            popUpOn(`Dealer wins with Blackjack! Player wins insurance bet!`);
            $('.pop-up-box button').click(function () {
                popUpOff();
                setTimeout(resetRound, 1000);
            }); // end event listener

        } else {
            popUpOn(`Dealer does not have Blackjack! Player lost insurance bet! Round continues...`);
            $('.pop-up-box button').click(function () {
                popUpOff();
                $('#hit, #stand').removeClass('play-btn-disabled');
            });
        }; // end if

    }); // end event listener

    no.click(function () {
        popUpOff();
        $('#hit, #stand').removeClass('play-btn-disabled');
    });
}; // end insurance

function chipsToggle() {
    $('.chip div').each(function () {
        if (creditsAvailable < Number(this.innerHTML)) {
            $(this.parentNode).addClass('chip-off');
        } else {
            $(this.parentNode).removeClass('chip-off');
        };
    }); // end each
}; // end chipsToggle

function resetRound() {
    $('.card').remove();
    $('#total-bet').text('0');
    $('#player-score').text('0');
    $('#dealer-score').text('0');
    $('#bank-amount').text(creditsAvailable);

    cardsDrawn = [],
        playerHandString = [],
        playerHandValue = [],
        dealerHandString = [],
        dealerHandValue = [],
        playerScore = 0,
        dealerScore = 0,
        betPool = [],
        totalBet = 0;

    if (creditsAvailable < 25) {
        popUpOn(`Not enought credits to place bet. Game over!`);
        $('.pop-up-box button').click(function () {
            popUpOff();
            location.reload();
        });
    }; // end if

    chipsToggle();

    // disables all buttons
    $('.play-btn').addClass('play-btn-disabled');

}; // end resetRound


// Function for testing purposes
function logsInfo() {
    console.log('Deck: ' + cardsDrawn);
    console.log('Players Hand: ' + playerHandString);
    console.log('Dealers Hand: ' + dealerHandString);
    console.log('Players Hand Values: ' + playerHandValue);
    console.log('Dealers Hand Values: ' + dealerHandValue);
    console.log('Players Score: ' + playerScore);
    console.log('Dealers Score: ' + dealerScore);
};