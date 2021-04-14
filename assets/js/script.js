let cardsDrawn = [],
    playerHandString = [],
    playerHandValue = [],
    dealerHandString = [],
    dealerHandValue = [],
    playerScore,
    dealerScore;


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
        .css('background-image', 'url(assets/images/Red_back.jpg)');

    // Stores numeric values of current score for dealer / player 
    playerScore = getHandValue(playerHandValue);
    dealerScore = getHandValue(dealerHandValue);

    // Updates scoreboard in html
    $('#player-score').text(`${playerScore}`);
    $('#dealer-score').text(`${dealerHandValue[0]}`);

    checkBlackjack();

    console.log('----Initial hand----');
    logsInfo();

}); // end event listener


$('#hit').click(function () {
    generateCard();
    addCard(playerHandString, playerHandValue, $('#player-cards'));
    updateTotal();
    checkScore();

    logsInfo();
}); // end event listener


$('#stand').click(dealerTurn);



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
    let card = $('<div></div>').addClass('card');
    card.css('background-image', `url(assets/images/${cardsDrawn[0]}.jpg)`);
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
        if (dealerScore === 21) {
            popUp(`Player and Dealer have Blackjack! It's a tie!`);
            $('#dealer-score').text(dealerScore);
            // Shows first dealer's card
            $('#dealer-cards').children(":first")
                .css('background-image',
                    `url(assets/images/${dealerHandString[dealerHandString.length - 1]}.jpg)`);
            return;
        } else {
            popUp('Player wins with Blackjack!');
            $('#dealer-score').text(dealerScore);
            // Shows first dealer's card
            $('#dealer-cards').children(":first")
                .css('background-image',
                    `url(assets/images/${dealerHandString[dealerHandString.length - 1]}.jpg)`);
        }; // end if
    }; // end if
}; // end checkBlackjack


function checkScore() {

    // Player bust if score > 21
    if (playerScore > 21) {
        popUp('Player bust! Dealer wins!');
        return;
    } else if (playerScore === 21) {
        dealerTurn();
        return;
    }; // end if

    // Checks and limits amount of player's drawn cards to 5 
    if (playerHandString.length === 5) {
        popUp(`This was last card. Dealer's turn!`);
        // prevents running dealerTurn function before continue btn is clicked
        $('.pop-up-box button').attr('id', 'five-cards');
        $('#five-cards').click(function () {
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
        $('#dealer-score').text(`${dealerScore}`);
        // Shows first dealer's card
        $('#dealer-cards').children(":first")
            .css('background-image',
                `url(assets/images/${dealerHandString[dealerHandString.length - 1]}.jpg)`);
        // Limits cards drawn to 5 and checks the winner
        if (dealerHandString.length === 5) {
            if (dealerScore < 22) {
                decideWinner();
                return;
            } else {
                popUp('Dealer bust! Player wins!');
                return;
            }; // end if
        }; // end if
        if (dealerScore < playerScore) {
            dealerTurn();
            return;
        } else {
            if (dealerScore > 21) {
                popUp('Dealer bust! Player wins!');
                return;
            } else {
                decideWinner();
                return;
            }; // end if
        }; // end if
    } else {
        // Updates scoreboard in html for total score
        $('#dealer-score').text(`${dealerScore}`);
        // Shows first dealer's card
        $('#dealer-cards').children(":first")
            .css('background-image',
                `url(assets/images/${dealerHandString[dealerHandString.length - 1]}.jpg)`);
        decideWinner();
    }; // end if
}; // end dealerTurn


function decideWinner() {
    if (dealerScore === playerScore) {
        (dealerScore === 21) ?
        popUp(`Player and Dealer have Blackjack! It's a tie!`):
            popUp(`Player and dealer have the same score. It's a tie!`);
    } else if (dealerScore > playerScore) {
        (dealerScore === 21) ?
        popUp('Dealer wins with Blackjack!'):
            popUp('Dealer wins with higher score!');
    } else {
        popUp('Player wins with higher score!');
    }; // end if
}; // end decideWinner


function popUp(message) {
    $('#playing-section-middle').hide();

    let playSectionDealer = $('.playing-section--dealer');
    let popUpBox = $('<div></div>').addClass('pop-up-box');
    let popUpTxt = $('<div></div>').text(message);
    let popUpBtn = $('<button></button>').text('CONTINUE');

    playSectionDealer.after(popUpBox);
    popUpBox.append(popUpTxt);
    popUpBox.append(popUpBtn);

    $('.main-area--playing').addClass('pop-up-bg-green');
    $('.main-area--bank').addClass('pop-up-bg-blue');

    // turn off buttons

    $('.pop-up-box button').click(function () {
        popUpBox.remove();
        $('#playing-section-middle').show();
        $('.main-area--playing').removeClass('pop-up-bg-green');
        $('.main-area--bank').removeClass('pop-up-bg-blue');
    });
}; // end popUp


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