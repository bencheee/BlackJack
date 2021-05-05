let help = [{
        title: `BASIC RULES`,
        text: `The main objective of the game is to have greater score than the dealer at the end of each round while the score must not exceed the total of 21. In case the score is greater than 21 at any point, this results with "bust" and the round is lost.
        In case the score in exactly 21, this results with "Blackjack". If the dealer's score is also 21, the round ends in a tie. Otherwise the player wins the round.`
    },
    {
        title: `BETTING`,
        text: `The player starts the game with the amount of 1000 credits. Before the start of each round, the player has to place the initial bet. In case the round is won, the award is paid to the player in 3/2 ratio (example: If the bet is 100 credits, the payout to the player is 150 credits.). If the round ends in a tie, the whole bet is returned to the player.`
    },
    {
        title: `INITIAL DEAL`,
        text: `At the start of each round two cards are dealt to the player and the dealer. The dealer’s first card remains hidden until it’s the dealer’s turn to play. In case the player does not have Blackjack on initial deal, the additional options become available (“Hit”, “Stand” or “Double”).`
    },
    {
        title: `HIT / STAND`,
        text: `By pressing the “Hit” button, a new card is added to the player’s hand. The player can draw new cards until there is maximum of 5 cards in the player’s hand or until the total score exceeds 21 which ends with “bust” and loss of the round. By pressing the “Stand” button, the player ends the turn and the dealer is on the move.`
    },
    {
        title: `DOUBLE`,
        text: `By pressing the “Double” button, the amount of the original bet is doubled. The player can draw only one new card after and in case the game does not end with bust, it is the dealer’s turn to play.
        In case the round is won, the award is paid to the player in 2/1 ratio (example: If the bet is 100 credits, the payout to the player is 200 credits.). If the round ends in a tie, the whole bet is returned to the player.`
    },
    {
        title: `INSURANCE`,
        text: `Insurance gives an option to the player to bet on whether the dealer has Blackjack in his initial hand. This option is available only in case if the visible card in the dealer’s hand is an ace or value of ten.
        This bet is separate from the original bet. In case insurance bet is won, player loses the original bet. The insurance payout is paid to the player in 2/1 ratio (example: If the bet is 100 credits, the payout to the player is 200 credits.).
        In case the dealer does not have Blackjack, the player loses the insurance bet and the game continues.`
    },
    {
        title: `END OF GAME`,
        text: `There are two ways to end the game. First on is to use “Cash-out” option at any time which ends the game. Second one is to spend all credits. In case that the player doesn't have at least 25 credits to place minimum bet, the game is automatically lost.`
    }
];

let helpCounter = 0;

$('.help-title').text(help[0].title)
$('.help-text').text(help[0].text);

$('#help-ingame').click(function () {
    $('.playing-container').hide();
    $('.controls-container').hide();
    $('.help-container').show();
    let btn = $('<button></button>').addClass('help-close').text('CLOSE');
    $('.help-controls').append(btn);

    $('.help-close').click(function () {
        $('.playing-container').show();
        $('.controls-container').show();
        $('.help-container').hide();
        $('.help-close').remove();
    }); // end listener

}); // end listener



$('#btn-right').click(function () {
    helpCounter += 1;
    if (helpCounter > 6) {
        helpCounter = 0;
    };

    helpText(helpCounter);
}); // end listener

$('#btn-left').click(function () {
    helpCounter -= 1;
    if (helpCounter < 0) {
        helpCounter = 6;
    };

    helpText(helpCounter);
}); // end listener


function helpText(i) {
    $('.help-title').text(help[i].title)
    $('.help-text').text(help[i].text);
}; // endhelpText