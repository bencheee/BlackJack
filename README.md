# BlackJack the game

**BlackJack the game** is web based game and it is part of my 2nd milestone project in **Code Institute's Full Stack Software Development Course**. This is a classic game of BlackJack also known by the name of '21' in some countries. Main objective of the game is to beat the dealer by having greater score but not to exceed total score of 21 which would result in automatic loss. More detailed rules are explained in help section of the game. This site is made to be fully responsive on range of devices and screen sizes.


---


## TABLE OF CONTENTS

[1. USER EXPERIENCE](#ux)

- [1.1 User Stories](#stories)

  - [1.1.1 First time player's goals](#first)

  - [1.1.2 Casual player's goals](#casual)

  - [1.1.3 Advanced player's goals](#advanced)

[2. WIREFRAMES](#wireframes)

[3. TECHNOLOGIES USED](#technologies)

- [3.1 Languages](#languages)

- [3.2 Frameworks, libraries and programs](#frameworks)

[4. DESIGN](#design)

- [4.1 Layout and Functionality](#layout)

  - [4.1.1 Start Screen](#start)

  - [4.1.2 Navigation](#nav)

  - [4.1.3 Main game area](#main)

[5. TESTING](#testing)

[6. DEPLOYMENT](#deployment)

[7. CREDITS](#credits)


---


<a name="ux"></a>
## 1. USER EXPERIENCE (UX)

<a name="stories"></a>
### 1.1 User Stories

<a name="first"></a>
#### 1.1.1 First time player's goals

*As a first time player*, I want to see simple design with clear instructions which will allow me to easily navigate through the site.

*As a first time player*, I want to see 'help' section so I can quickly understand the rules of the game.

*As a first time player*, I want to clearly see who won and why so I can quicker understand all mechanics of the game.

*As a first time player*, I want to have fun playing the game.

<a name="casual"></a>
#### 1.1.2 Casual player's goals

*As a casual player*, I want to be challenged and entertained.

*As a casual player*, I want to get notified about the score in real time so I can adapt my strategy accordingly.

*As a casual player*, I want to see 'quit' button so I can restart the session whenever I wish.

<a name="advanced"></a>
#### 1.1.3 Advanced player's goals

*As an advanced player*, I want to be able to choose advanced options in order to make the game more interesting.

*As an advanced player*, I want to be able to keep my score so I can compare it with previous scores.

*As an advanced player*, I want to see virtual currency system so I can place bets in each round.


---


<a name="wireframes"></a>
## 2. WIREFRAMES

- [Mobile view](documentation/wireframes/mobile.pdf)
- [Tablet view](documentation/wireframes/tablet.pdf)
- [Desktop view](documentation/wireframes/desktop.pdf)


---


<a name="technologies"></a>
## 3. TECHNOLOGIES USED

<a name="languages"></a>
### 3.1 Languages

- [HTML5](https://en.wikipedia.org/wiki/HTML5)
- [CSS3](https://en.wikipedia.org/wiki/CSS) 
- [JavaScript](https://en.wikipedia.org/wiki/JavaScript)

<a name="frameworks"></a>
### 3.2 Frameworks, libraries and programs

- [Balsamiq](https://balsamiq.com/) was used to create the wireframes during the site design process.

- [jQuery](https://jquery.com/)

- [Google Fonts](https://fonts.google.com/) were used to import 'Oswald' font which is the only font used throughout the site.

- [Gitpod](https://www.gitpod.io/) was used to write all the HTML and CSS for the site.

- [Git](https://git-scm.com/) was used for version control by utilizing the Gitpod terminal to commit to Git and Push to GitHub

- [GitHub](https://github.com/) is used to store the projects code after being pushed from Git.

- [Photopea](https://www.photopea.com/) is free online photo editor which was used to edit and optimize background image and all card images.

- [Font Awesome](https://fontawesome.com/) was used to add icons for aesthetic and UX purposes.

- [Autoprefixer](https://autoprefixer.github.io/) was used to add prefixes to CSS properties which are not supported by some browsers.


---


<a name="design"></a>
## 4. DESIGN

Design is very simplistic using only one photo as main background and all other elements are on top with added opacity so the background can be visible all the time. Background image is showing game of BlackJack in action which suits the theme of the site.

Color scheme consists of two main colors. Light green for main playing area where cards are displayed, and deep blue for controls area where most of the playing buttons are placed. Throught the game pop up screens (modals) are displayed. They are made in grey color with added opacity. Font which is used throughout the site is 'Oswald' with 'Sans Serif' as the fallback font in case for any reason main font is not loaded.

<a name="layout"></a>
### 4.1 Layout and Functionality

<a name="start"></a>
#### 4.1.1 Start Screen

First thing shown on the site is 'Start screen' with three buttons to select from: 'Start new game', 'Options' and 'Rules'. By selecting 'Start new game' as expected new game of BlackJack will start. By selecting 'Options' button player will have two options to enable / disable. This will control whether these options will be available in the game, as some player may prefer never to use them. Lastly, 'Rules' button will display basic rules of the game in a box with arrow buttons and 'close' button for easier navigation.

<a name="nav"></a>
#### 4.1.2 Navigation

##### End game

This option will prompt a modal with a simple yes/no choice whether player wants to end current game session or not. If 'yes' is selected this will reload the page and bring player to Start screen.

##### Rules

This option will show the same rules as the button on Start screen. Rules box is interactive and allows the player to easily navigate through all rules by selecting on of the arrows. Every rule has it's title and text explaining the rule.

<a name="main"></a>
#### 4.1.3 Main game area

##### Playing section

This is where majority of the card game takes place. It consists of 2 card containers (for player and dealer), score boxes, bet-info box and two buttons (double and insurance).

* *Card container* - There are two card containers, one for player and one for dealer. This is where cards are displayed after they have been drawn. Containers are initially empty and can take up to maximum of 5 cards per container.

* *Score boxes* - Their purpose is to show sum of the drawn card values. Because of the game mechanic players score box gets updated in real time after every new card is drawn. Dealers score box shows only the value of the one visible card in dealer's container. If dealer gets a chance to play and to show the cards in the end of the round then this score box is updated with total sum of card values too.

* *Bet-info box* - Shows total value of the bet in the round. It adds or deducts total value of the bet depending on player's actions and updates the value in real time. After the cards are dealt this value can not be changed until the end of the round (only exception is if player decides to play double game which will double the bet).

* *Undo bet button* - It is enabled only after at least one bet is placed and before cards are dealt. By selecting in the last bet will be cancelled and credits will be returned to player. If all bets are cancelled button gets disabled again.

* *Double button* - It is enabled only after initial cards are dealt. If player decides to choose other action at this stage (hit / stand / insurance) Double button gets disabled again until the end of the round.

* *Insurance button* - It gets enabled only in situation when after initial dealing of cards dealer's visible card is Ace. If player decides to activate insurance button separate bet will be placed. Pop-up message will be shown informing the player of the outcome of insurance bet and game will continue.

* *Message box* - It gets visible only when game needs to inform player about game outcome (win, loss, draw or insurance bet). Message box is shown in the same section on the screen where scores and double/insurance buttons are so when it gets activated it will automatically disable the latter.

##### Controls section

This is where majority of player game choices takes place. It consists of Bank info which shows current amount of credits in the bank, chip buttons which are used to place bets and three game buttons (bet / hit / stand).

* *Bank info* - Shows current amount of credits left for player to place as a bet. It gets updated in real time depending on player's bets and potential winnings.

* *Chip buttons* - There are 5 chip buttons with different values and colors. By selecting any of them a bet of the assigned value in credits will be placed. If there is no enough credits left in the bank to place a bet of certain chip value this will disable the chip button. If the amount gets available again (for example by undoing the last bet) chip button gets activated. Once the bet is placed and initial cards are dealt all chip buttons get deactivated until the beginning of the new round.

* *Play buttons* - There are 3 buttons in this area available to play the game (bet / hit / stand). Bet button gets activated after there is minimum bet placed in the pot. Bet button can be selected only once after which initial cards will be dealt and button will be disabled until new bet in next round is placed. Hit button will add new card to player's card container and it can be selected until there are 5 cards in player's card container or until the total player's score is 21 or more. Stand button will end player's turn and allow dealer to play.


---


<a name="testing"></a>
## 5. TESTING

### Known bugs

-

### Fixed bugs

- Game shows two pop-up messages on screen when dealer reaches 5 cards and busts ([example screenshot](documentation/testing/images/001.png))

Solution: Added 'return' command to IF statement in dealerTurn() function.

```
if (dealerHandString.length === 5) {
    if (dealerScore < 22) {
        decideWinner();
        return;
    } else {
        popUpOn('Dealer bust! Player wins!');
        creditsAvailable += (totalBet * 1.5);
        $('#bank-amount').text(creditsAvailable);
        $('.pop-up-box button').click(function () {
            popUpOff();
            setTimeout(resetRound, 1000);
        });
    };
    return;
};
```
---


<a name="deployment"></a>
## 6. DEPLOYMENT


---


<a name="credits"></a>
## 7. CREDITS