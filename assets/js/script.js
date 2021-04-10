let cardsDrawn = [];


$('#bet').click(function () {
    generateCard();
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
};