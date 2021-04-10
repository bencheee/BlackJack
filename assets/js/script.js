let cardsDrawn = [],
    playerHandString = [],
    playerHandValue = [],
    dealerHandString = [],
    dealerHandValue = [];


$('#bet').click(function () {
    generateCard();
    addCard(playerHandString, playerHandValue, $('#player-cards'));
}); // end event listener



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
    card.css('background-image', `url(/images/${cardsDrawn[0]}.jpg)`);
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