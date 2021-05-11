<a name="top"></a>
# Testing of JavaScript and jQuery

Testing of the JavaScript and jQuery code is divided in two sections. 

In first section focus is on testing manipulation of the DOM. This test assumes that all in game calculations are done correctly and the only concern is to show, hide or update DOM elements depending on the player’s actions and game outcomes.

In second section game functions are tested to make sure all calculations are done correctly (example: no duplicate cards are dealt, cards are limited to 5 per hand, bets and scores are calculated correctly, etc.).

Most of the testing is done in Chrome developer tools. Console logging is used in combination with debugger command in JS to fix the code step by step in case of errors. It is important to emphasize that layout / sizing / graphic aspect of the site is not tested in this section. Therefore all in-game screenshots will be in desktop size as functionality of the code is the same regardless of the screen resolution.

## TABLE OF CONTENTS

[TESTING DOM MANIPULATION](#dom)

[1.	MAIN MENU](#mainmenu)

- [1.1 New game](#newgame)

- [1.2 Options](#options)

    - [1.2.1 Conservative / aggressive mode](#modes)

    - [1.2.2 Close button](#closeoptions)

- [1.3 Rules](#rules)

    - [1.3.1 Left / right arrow](#arrows)

    - [1.3.2 Close button](#closerules)

[2.	GAME SCREEN](#gamescreen)

- [2.1 Chip buttons](#chipbtns)

- [2.2 Undo button](#undobtn)

- [2.3 Command buttons](#commbtns)

    - [2.3.1 Bet](#bet)

    - [2.3.2 Hit](#hit)

    - [2.3.3 Stand](#stand)

    - [2.3.4 Double](#double)

    - [2.3.5 Insurance](#insurance)

- [2.4 Pop-up buttons](#popupbtns)

[3.	NAV BUTTONS](#navbtns)

- [3.1 Cash-out](#cashout)

- [3.2 Help](#help)

[Game outcomes](#outcomes)

[TESTING GAME FUNCTIONS](#functions)

[1. Generating random card](#generatecard)

[2. Adding generated card to player’s / dealer’s hand, getting card values and scores](#addcard)

[3. Calculating the score](#calculatescore)

[4. Calculating payouts](#payouts)

<a name="dom"></a>
## TESTING DOM MANIPULATION

<a name="mainmenu"></a>
### 1. MAIN MENU

Main menu consists of three main buttons – ‘New game’, ‘Options’ and ‘Rules’.

![test001](/documentation/testing/images/DOM/001.jpg)

[Back to Table of contents](#mainmenu)

<a name="newgame"></a>
#### 1.1 New game

Expected outcome: By pressing ‘New game’ button main menu section should be hidden. Game screen elements should be shown on the screen along with nav buttons. Background should change from colour to greyscale. Pop up message should be displayed. All buttons on the page should be inactive.

Test outcome:

![test002](/documentation/testing/images/DOM/002.jpg)

Result: Passed all criteria

[Back to Table of contents](#mainmenu)

<a name="options"></a>
#### 1.2 Options

Expected outcome: By pressing ‘Options’ button main menu buttons should be hidden and options window should appear on the screen. Inside the window there should be two options – ‘conservative’ and ‘aggressive’. Close button should be in bottom right corner.

Test outcome:

![test003](/documentation/testing/images/DOM/003.jpg)

Result: Passed all criteria

[Back to Table of contents](#mainmenu)

<a name="modes"></a>
##### 1.2.1	Conservative / aggressive mode
Expected outcome: By pressing ‘conservative’ option empty box icon next to it should change to ticked box icon. Ticked box icon next to ‘aggressive’ option should change to empty box icon. The same outcome is expected in opposite situation.

Test outcome:

![test004](/documentation/testing/images/DOM/004.jpg)

Result: Passed all criteria

[Back to Table of contents](#mainmenu)

<a name="closeoptions"></a>
##### 1.2.2	Close button

Expected outcome: By pressing ‘close’ button options window should close and main menu screen should appear on screen.

Test outcome:

![test005](/documentation/testing/images/DOM/005.jpg)

Result: Passed all criteria

[Back to Table of contents](#mainmenu)

<a name="rules"></a>
#### 1.3 Rules

Expected outcome: By pressing ‘rules’ button main menu buttons should be hidden and rules window should appear on the screen. Inside the window there should be title section, text section, two arrow buttons (left and right) and close button in bottom right corner.

Test outcome:

![test006](/documentation/testing/images/DOM/006.jpg)

Result: Passed all criteria

[Back to Table of contents](#mainmenu)

<a name="arrows"></a>
##### 1.3.1	Left / right arrow

Expected outcome: By pressing one of the ‘arrow’ buttons title and text sections should change their content. Looping should be allowed when all content is shown and starts from beginning.

Test outcome:

![test007](/documentation/testing/images/DOM/007.jpg)

Result: Passed all criteria

[Back to Table of contents](#mainmenu)

<a name="closerules"></a>
##### 1.3.2	Close button

Expected outcome: By pressing ‘close’ button rules window should close and main menu screen should appear on screen.

Test outcome:

![test008](/documentation/testing/images/DOM/008.jpg)

Result: Passed all criteria

[Back to Table of contents](#mainmenu)

<a name="gamescreen"></a>
### 2. GAME SCREEN
Game screen consists of two main sections – ‘playing section’ and ‘controls section’. Playing section is green area where majority of card game is played out. It consists of card containers (this is area where cards are put after dealing) and score boards for player and dealer. Also, buttons for ‘double’ and ‘insurance’ game modes are in the same section. Controls section is blue area where game control buttons are placed (bet, hit and stand). This area also consists of chip buttons and info about ‘total bet’ and ‘available credits’. When game starts all buttons except chip buttons are inactive.

![test009](/documentation/testing/images/DOM/009.jpg)

[Back to Table of contents](#mainmenu)

<a name="chipbtns"></a>
#### 2.1 Chip buttons

Expected outcome: By pressing ‘chip’ button ‘bet’ button should be activated. Also ‘undo’ button should appear in the middle of player’s playing section. ‘Total bet’ and ‘Credits available’ text should update accordingly depending on the value of the pressed chip. Lastly, if value of any chip is bigger than available credits this chip should become inactive.

Test outcome:

![test010](/documentation/testing/images/DOM/010.jpg)

Result: Passed all criteria

[Back to Table of contents](#mainmenu)

<a name="undobtn"></a>
#### 2.2 Undo button

‘Undo button’ is the red button in the middle of player’s playing section which is shown only when there is an active bet. 

Expected outcome: By pressing this button the last placed bet should be cancelled and ‘Total bet’ and ‘Credits available’ text should be updated accordingly depending on the new bet value. Inactive ‘Chip buttons’ should activate if their values are higher or equal to the value of the available credits. If the ‘Total bet’ equals to zero ‘undo button’ should be removed from the screen and ‘bet’ button should become inactive.

Test outcome:

![test011](/documentation/testing/images/DOM/011.jpg)

Result: Passed all criteria

[Back to Table of contents](#mainmenu)

<a name="commbtns"></a>
#### 2.3 Command buttons

‘Command buttons’ are the blue squared buttons (when active) placed in both sections. They are labelled as ‘Bet’, ‘Hit’, ‘Stand’, ‘Double’ and ‘Insurance’.

[Back to Table of contents](#mainmenu)

<a name="bet"></a>
##### 2.3.1	Bet

Expected outcome: By pressing the ‘Bet’ button all chip buttons should become inactive. ‘Bet’ button itself should also become inactive. Two cards should appear in player’s and dealer’s card section, however dealer’s first card should remain hidden. Player’s score box should be updated with sum of player’s cards values. Dealer’s score box should be updated with the value of the dealer’s only visible card. 

After this, game will check whether player has total score of 21.

IF YES: Pop-up message should appear with message ‘You have Blackjack! It’s dealers turn now!’. By pressing ‘Continue’ button dealer’s hidden card should be revealed. There can be two possible outcomes.

If dealer’s total score is less than 21: Pop-up message should appear with message ‘You win with Blackjack!’.

If dealer’s total score is 21: Pop-up message should appear with message ‘You and Dealer have Blackjack. It’s a tie!’.

Regardless of the outcome, by pressing ‘continue’ button game should reset to default (remove cards, reset score boxes, make all command buttons inactive). Inactive ‘Chip buttons’ should activate if their values are higher or equal to the value of the available credits. ‘Total bet’ text should reset to zero and ‘Credits available’ text should be updated accordingly depending on the outcome of the previous round.

IF NO: ‘Hit’, ‘Stand’ and ‘Double’ buttons should be activated. ‘Insurance’ button should be activated only if dealer’s visible card value is 10 or 11.

Test outcome: 

-	If Player has Blackjack

![test012](/documentation/testing/images/DOM/012.jpg)

-	If Player wins with Blackjack

![test013](/documentation/testing/images/DOM/013.jpg)

-	If Player and Dealer have Blackjack

![test014](/documentation/testing/images/DOM/014.jpg)

-	If Player does not have Blackjack

![test015](/documentation/testing/images/DOM/015.jpg)

Result: Passed all criteria

[Back to Table of contents](#mainmenu)

<a name="hit"></a>
##### 2.3.2	Hit

Expected outcome: By pressing ‘Hit’ button new card should be added to player’s card container. Player’s score box should be updated with sum of player’s cards values. If ‘Double’ and ‘Insurance’ buttons are active they should become inactive now. In order to make this file as short as possible list of all possible [outcomes](#outcomes) and how they affect manipulating the DOM is provided at the end of the file.

Test outcome: Please see list of game outcomes.

Result: Passed all criteria

[Back to Table of contents](#mainmenu)

<a name="stand"></a>
##### 2.3.3	Stand

Expected outcome: By pressing ‘Stand’ button Pop up message should appear with message: 'You have ${playerScore} points! It's dealer's turn now!'. 'Hit' and 'Stand' buttons should become inactive. 
Test outcome: Please see list of [game outcomes](#outcomes). Since at this stage player will never have 5 cards in hand only outcomes only those outcomes can be applied.

Result: Passed all criteria

[Back to Table of contents](#mainmenu)

<a name="double"></a>
##### 2.3.4	Double

Expected outcome: By pressing ‘Double’ button, game evaluates if player has enough credits to place the bet. If this is the case, pop up message should appear with message ‘You will place additional bet of ${totalBet * 2} credits and draw only one card. Do you wish to proceed?’. If NO is selected this should bring the player to previous stage. If YES is selected ‘Total bet’ and ‘Credits available’ text should be updated. Standard [game outcomes](#outcomes) are applied now. In case player does not have enough credits to place double bet, pop up message should appear with message ‘You don't have enough credit to place double bet!’. By pressing ‘Continue’ this should bring the player to previous stage, but ‘Double’ button should be inactive now.

Test outcome:

![test016](/documentation/testing/images/DOM/016.jpg)

![test017](/documentation/testing/images/DOM/017.jpg)

Result: Passed all criteria

[Back to Table of contents](#mainmenu)

<a name="insurance"></a>
##### 2.3.5	Insurance

By pressing ‘Insurance’ button, game evaluates if player has enough credits to place the bet. If this is the case, pop up message should appear with message ‘You will bet ${totalBet / 2} credits on whether dealer has Blackjack or not. Do you wish to proceed?’. If NO is selected this should bring the player to previous stage. If YES is selected ‘Total bet’ and ‘Credits available’ text should be updated. Game should check if dealer has Blackjack now. If dealer has Blackjack, pop up message should appear with message ‘Dealer wins with Blackjack! You win insurance bet!’. If dealer does not have Blackjack, pop up message should appear with message ‘Dealer does not have Blackjack! Insurance bet is lost! Round continues...’. In case player does not have enough credits to place insurance bet, pop up message should appear with message ‘You don't have enough credit to place insurance bet!’. By pressing ‘Continue’ this should bring the player to previous stage, but ‘Insurance’ button should be inactive now.

Test outcome:

![test018](/documentation/testing/images/DOM/018.jpg)

![test019](/documentation/testing/images/DOM/019.jpg)

![test020](/documentation/testing/images/DOM/020.jpg)

![test021](/documentation/testing/images/DOM/021.jpg)

Result: Passed all criteria

[Back to Table of contents](#mainmenu)

<a name="popupbtns"></a>
#### 2.4 Pop-up buttons

Pop up buttons are part of pop up messages and allow player to perform an action on them. These buttons are ‘Continue’, ‘Yes’ and ‘No’. When pop up message appears on screen all other buttons which are not part of pop up message should become temporarily inactive and black opaque layer should be applied over the whole screen except over the pop up message itself. By pressing any of the buttons pop up message should be removed from the screen and black opaque layer should be removed and game should resume depending on the selected choice. All these buttons were already tested as a part of the previous examples so there is no need to test them specifically.

[Back to Table of contents](#mainmenu)

<a name="navbtns"></a>
### 3. NAV BUTTONS

Navigation buttons are placed at top of the screen while player is already in game. Navigation buttons are hidden in main screen.

[Back to Table of contents](#mainmenu)

<a name="cashout"></a>
#### 3.1 Cash-out

Expected outcome: By pressing ‘Cash-out’ button, there are few possible outcomes. If this is pressed during the round, pop up should appear with message ‘You can't cash out in the middle of the round!’. If this is pressed before the round starts, but the bet is already placed, pop up should appear with message ‘Please remove all bets before leaving!’. In all other cases pop up should appear with message ‘You will cash out ${creditsAvailable} credits and end the game. Do you wish to proceed?’. If yes is pressed, pop up should appear with message ‘Congratulations! You won ${creditsAvailable} credits. Good job!’. By pressing continue, the whole page should reload and the player should be taken to the main menu.

Test outcome:

![test022](/documentation/testing/images/DOM/022.jpg)

![test023](/documentation/testing/images/DOM/023.jpg)

![test024](/documentation/testing/images/DOM/024.jpg)

![test025](/documentation/testing/images/DOM/025.jpg)

Result: Passed all criteria

[Back to Table of contents](#mainmenu)

<a name="help"></a>
#### 3.2 Help

Expected outcome: By pressing ‘Help’ outcome all items from game screen should be hidden and window with rules should appear on screen. By pressing close button player should be taken back where he left off in the game.

Test outcome:

![test026](/documentation/testing/images/DOM/026.jpg)

Result: Passed all criteria

[Back to Table of contents](#mainmenu)

<a name="outcomes"></a>
### Game outcomes

In all stages of the game there is a high number of different outcomes depending on combination of player’s and dealer’s score at that stage. Due to high number of outcomes, screenshots are not provided for this as it would take a lot of space and make file hard to read. List of possible outcomes are below.

**Player has less than 5 cards and bust**

Expected outcome: Pop up message should appear with message: 'You bust! Dealer wins!'. 'Hit' and 'Stand' buttons should become inactive. Dealer's hidden card should remain hidden and dealer's score should not be updated.

**Player has less than 5 cards and has Blackjack**

Expected outcome: Pop up message should appear with message: 'You have Blackjack! It's dealer's turn now!'. 'Hit' and 'Stand' buttons should become inactive. After pressing continue button dealer's hidden card should be shown and delaer's score should be updated to sum of dealer's card values. These are possible outcomes depending on dealer's score.
	
*Dealer has less than 5 cards and bust*

- Expected outcome: Pop up message should appear with message: 'Dealer busts! You win!'.

*Dealer has less than 5 cards and has Blackjack*

- Expected outcome: Pop up message should appear with message: 'You and dealer have Blackjack! It's a tie!'.

*Dealer has less than 5 cards and score is less than 21*

- Expected outcome: New card should be added to dealer's card container and delaer's score should be updated to sum of dealer's card values.

*Dealer has 5 cards and bust*

- Expected outcome: Pop up message should appear with message: 'Dealer busts! You win!'.

*Dealer has 5 cards and has Blackjack*

- Expected outcome: Pop up message should appear with message: 'You and dealer have Blackjack! It's a tie!'.

*Dealer has 5 cards and score is less than 21 *

- Expected outcome: Pop up message should appear with message: 'Player wins with Blackjack!'. 

**Player has less than 5 cards and score is less than 21**

Expected outcome: No further changes.

**Player has 5 cards and bust**

Expected outcome: Pop up message should appear with message: 'You bust! Dealer wins!'. By pressing 'Continue' button, player's score should be updated in player's score box. Dealer's hidden card should remain hidden and delaer's score should not be updated.

**Player has 5 cards and has Blackjack**

Expected outcome: Pop up message should appear with message: 'You have Blackjack! It's dealer's turn now!'. 'Hit' and 'Stand' buttons should become inactive. After pressing continue button dealer's hidden card should be shown and delaer's score should be updated to sum of dealer's card values. These are possible outcomes depending on dealer's score.

*Dealer has less than 5 cards and bust*

- Expected outcome: Pop up message should appear with message: 'Dealer busts! You win!'.

*Dealer has less than 5 cards and has Blackjack*

- Expected outcome: Pop up message should appear with message: 'You and dealer have Blackjack! It's a tie!'.

*Dealer has less than 5 cards and score is less than 21*

- Expected outcome: Expected outcome: New card should be added to dealer's card container and delaer's score should be updated to sum of dealer's card values.

*Dealer has 5 cards and bust*

- Expected outcome: Pop up message should appear with message: 'Dealer busts! You win!'.

*Dealer has 5 cards and has Blackjack*

- Expected outcome: Pop up message should appear with message: 'You and dealer have Blackjack! It's a tie!'.

*Dealer has 5 cards and score is less than 21 *

- Expected outcome: Pop up message should appear with message: 'Player wins with Blackjack!'. 

**Player has 5 cards and score is less than 21**

Expected outcome: Pop up message should appear with message: 'This was your last card. You have ${playerScore} points. It's dealer's turn now!'. 'Hit' and 'Stand' buttons should become inactive. By pressing 'Continue' button, player's score should be updated in player's score box. These are possible outcomes depending on dealer's score.
	
*Dealer has less than 5 cards and bust*

- Expected outcome: Pop up message should appear with message: 'Dealer busts! You win!'. By pressing 'Continue' button, dealer's hidden card should remain hidden and delaer's score should not be updated.

*Dealer has less than 5 cards and has Blackjack*

- Expected outcome: Pop up message should appear with message: 'Dealer wins with Blackjack!'. After pressing continue button dealer's hidden card should be shown and delaer's score should be updated to sum of dealer's card values. 

*Dealer has less than 5 cards, score is less than 21 and equal to player's score:*

- Expected outcome: Pop up message should appear with message: 'You and dealer have ${playerScore} points. It's a tie!'. After pressing continue button dealer's hidden card should be shown and delaer's score should be updated to sum of dealer's card values.

*Dealer has less than 5 cards, score is less than 21 and greater than player's score:*

- Expected outcome: Pop up message should appear with message: 'Dealer wins with ${dealerScore} points!'.  After pressing continue button dealer's hidden card should be shown and delaer's score should be updated to sum of dealer's card values.

*Dealer has less than 5 cards, score is less than 21 and less than player's score:*

- Expected outcome: Pop up message should appear with message: 'Player wins with ${playerScore} points!'.  After pressing continue button dealer's hidden card should be shown and delaer's score should be updated to sum of dealer's card values.

*Dealer has 5 cards and bust*

- Expected outcome: Pop up message should appear with message: 'Dealer busts! You win!'. By pressing 'Continue' button, dealer's hidden card should remain hidden and delaer's score should not be updated.

*Dealer has 5 cards and has Blackjack*

- Expected outcome: Expected outcome: Pop up message should appear with message: 'Dealer wins with Blackjack!'. After pressing continue button dealer's hidden card should be shown and delaer's score should be updated to sum of dealer's card values. 

*Dealer has 5 cards, score is less than 21 and equal to player's score:*

- Expected outcome: Pop up message should appear with message: 'You and dealer have ${playerScore} points. It's a tie!'. After pressing continue button dealer's hidden card should be shown and delaer's score should be updated to sum of dealer's card values.

*Dealer has 5 cards, score is less than 21 and greater than player's score:*

- Expected outcome: Pop up message should appear with message: 'Dealer wins with ${dealerScore} points!'.  After pressing continue button dealer's hidden card should be shown and delaer's score should be updated to sum of dealer's card values.

*Dealer has 5 cards, score is less than 21 and less than player's score:*

- Expected outcome: Pop up message should appear with message: 'Player wins with ${playerScore} points!'.  After pressing continue button dealer's hidden card should be shown and delaer's score should be updated to sum of dealer's card values.

[Back to Table of contents](#mainmenu)

<a name="functions"></a>
## TESTING GAME FUNCTIONS

This section is focused on testing functions which are used to calculate and manipulate data such as card strings, card values, total scores, etc. Please note that logical comparisons and game outcomes will not be tested here as they were already tested in [game outcome](#outcomes) section.

[Back to Table of contents](#mainmenu)

<a name="generatecard"></a>
### 1. Generating random card

For this purpose, *generateCard()* function is used. This function should generate random card string where first character of the string represents value of the card and second character represents card color. This string combination then should be stored into *cardsDrawn* array. Function should also check if generated string combination already exists in which case it should be discarded and new string combination should be generated. 

**Testing procedure:** 

In console, loop is created to call *generateCard()* function 53 times. This should result in generating 52 unique card string combinations which should be stored in *cardsDrawn* array. On last attempt function should log an error as there should not be any more unique card string combinations available.

**Testing result:** Code is working correctly

![test001](/documentation/testing/images/functions/001.jpg)

[Back to Table of contents](#mainmenu)

<a name="addcard"></a>
### 2. Adding generated card to player’s / dealer’s hand, getting card values and scores

For this purpose, *addCard()* function is used. This function should add card string combination to *handString* array (separate arrays for player and dealer). Then string combination of each card should be converted to numeric value which should then be stored in *handValue* array (separate arrays for player and dealer). Please note that ace card at this stage is always converted to *NaN* value because this card can have multiple values (1 or 11) depending on situation and has to be evaluated separately.

**Testing procedure:**

In console, *addCard()* function is called to store first card of *cardsDrawn* array to player’s and then dealer’s arrays.  Function *testLog()* is then created to log *handString* and *handValue* arrays for player and dealer. As outcome player’s and dealer’s arrays should now be populated with the same card / value.

**Testing result:** Code is working properly

![test002](/documentation/testing/images/functions/002.jpg)

[Back to Table of contents](#mainmenu)

<a name="calculatescore"></a>
###  3. Calculating the score

For this purpose, combination of functions is used.

*getHandValue()* – This function should return the sum of all values in player’s / dealer’s *handValue* array. Also, function should check if there is an ace card in array (*NaN* value) and assign it value of 1 (if total score is greater than 21) or 11 (if total score is less than 21).

*aceCorrect()* – This function should additionally check ace card in the whole *handValue* array. This is to ensure that ace card which was previously assigned value of 11 is given value of 1 if total score changes later in the round. It should look for all values of 11 in *handValue* array and assign them value of 1  if total score is greater than 21. 

*updateTotal()* – This function calls previous two functions and then it should update player’s or dealer’s score.

**Testing procedure:** 

In console, *updateTotal()* function is called. Then *playerScore* and *dealerScore* variables are logged. As outcome, *playerScore* and *dealerScore* variables should both return value of 11.

**Testing result:** Code is working properly

![test003](/documentation/testing/images/functions/003.jpg)

[Back to Table of contents](#mainmenu)

<a name="payouts"></a>
### 4. Calculating payouts

Payouts should be updated every time player wins or draws the round. There is no specific function which calculates payouts as this is part of many different functions.

**Testing procedure:**

In console, all possible scenarios are simulated where payouts should be calculated. For testing purposes value of all initial bets will be 100 credits. There are few possible scenarios:

Player wins
- *Payout should be 150 credits, and creditsAvailable variable should have value of 1050*

Player and dealer draw
- *Payout should be 100 credits, and creditsAvailable variable should have value of 1000*

Player wins double bet
- *Bet is doubled to 200 credits*
- *Payout should be 400 credits, and creditsAvailable variable should have value of 1200*

Player wins insurance bet
- *Additional bet is 50 credits*
- *Payout should be 100 credits, and creditsAvailable variable should have value of 950*

**Testing result:** Code is working properly

![test004](/documentation/testing/images/functions/004.jpg)

![test005](/documentation/testing/images/functions/005.jpg)

![test006](/documentation/testing/images/functions/006.jpg)

![test007](/documentation/testing/images/functions/007.jpg)

[Back to top of the document](#top)


