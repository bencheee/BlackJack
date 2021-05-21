# BlackJack the game

[Click for live website demo](https://bencheee.github.io/BlackJack/)

**BlackJack the game** is web based game and it is part of my 2nd milestone project in **Code Institute's Full Stack Software Development Course**. This is a classic game of BlackJack also known by the name of '21' in some countries. Main objective of the game is to beat the dealer by having greater score but not to exceed total score of 21 which would result in automatic loss. More detailed rules are explained in help section of the game. This site is made to be fully responsive on range of devices and screen sizes.

![Mockup image](/documentation/images/mockup.JPG)

---

## 1. USER EXPERIENCE (UX)

### 1.1 User Stories

#### 1.1.1 First time player's goals

- *As a first time player*, I want to see simple design with clear instructions which will allow me to easily navigate through the site.

- *As a first time player*, I want to see 'help' section so I can quickly understand the rules of the game.

- *As a first time player*, I want to clearly see who won and why so I can quicker understand all mechanics of the game.

- *As a first time player*, I want to have fun playing the game.

#### 1.1.2 Casual player's goals

- *As a casual player*, I want to be challenged and entertained.

- *As a casual player*, I want to get notified about the score in real time so I can adapt my strategy accordingly.

- *As a casual player*, I want to see 'quit' button so I can exit the session whenever I wish.

#### 1.1.3 Advanced player's goals

- *As an advanced player*, I want to be able to choose advanced options in order to make the game more interesting.

- *As an advanced player*, I want to be able to keep my score so I can compare it with best scores.

- *As an advanced player*, I want to see virtual currency system so I can place bets in each round.


---


## 2. WIREFRAMES

- [Mobile view](documentation/wireframes/mobile.pdf)
- [Tablet view](documentation/wireframes/tablet.pdf)
- [Desktop view](documentation/wireframes/desktop.pdf)


---


## 3. TECHNOLOGIES USED

### 3.1 Languages

- [HTML5](https://en.wikipedia.org/wiki/HTML5)
- [CSS3](https://en.wikipedia.org/wiki/CSS) 
- [JavaScript](https://en.wikipedia.org/wiki/JavaScript)

### 3.2 Frameworks, libraries and programs

- [Balsamiq](https://balsamiq.com/) was used to create the wireframes during the site design process.

- [jQuery](https://jquery.com/) was used along with JavaScript to manipulate the DOM, CSS and handle JavaScript events in easier way.

- [Local Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) was used to store game high scores.

- [Google Fonts](https://fonts.google.com/) were used to import 'Oswald' and 'Bungee Inline' fonts which were used throughout the site.

- [Gitpod](https://www.gitpod.io/) was used to write all the HTML, CSS and JavaScript code for the site.

- [Git](https://git-scm.com/) was used for version control by utilizing the Gitpod terminal to commit to Git and Push to GitHub

- [GitHub](https://github.com/) is used to store the projects code after being pushed from Git.

- [Photopea](https://www.photopea.com/) is free online photo editor which was used to edit and optimize background image, logo and all card images.

- [Font Awesome](https://fontawesome.com/) was used to add icons for aesthetic and UX purposes.

- [Autoprefixer](https://autoprefixer.github.io/) was used to add prefixes to CSS properties which are not supported by some browsers.


---


## 4. DESIGN

Design is simplistic, with only one photo as main background (color and grayscale version). In the main menu there is also game logo (joker hat), game title and menu buttons. In the game playing area, main elements are opaque so the background is visible all the time. Background image shows a game of BlackJack in action which suits the theme of the site.

Color scheme consists of two main colors. Light green for main playing area where cards are displayed, and deep blue for controls area where most of the playing buttons are placed. Throught the game pop up messages are displayed to explain current status of the game to the user and sometimes to decide on the next step. They are made in white color with black text. Font which is used for headings is 'Bungee Inline' with 'Sans Serif' as the fallback font in case for any reason main font is not loaded. Font which is used throughout the site for the rest of the text is 'Oswald' with 'Sans Serif' as the fallback font.

### 4.1 Layout and Functionality

#### 4.1.1 Start Screen

First thing shown on the site is 'Start screen' with three buttons to select from: 'New game', 'Options', 'Rules' and additional 'Top Scores' button which is displayed only after there is at least one entry on top scores list. By selecting 'New game', new game of BlackJack starts. By selecting 'Options' button player can choose from 'Conservative' and 'Aggressive' modes. This controls the way dealer makes decisions during the round. Lastly, 'Rules' button displays basic rules of the game in a box with arrow buttons and 'close' button for easier navigation. 'Tops scores' button displays list of top 5 scores stored in local storage of the browser.

#### 4.1.2 Navigation

##### Cash-out

This option prompts a pop up message with a simple yes/no choice whether player wants to end current game session or not. If 'yes' is selected this informs the player of the final score and reloads the page, bringing the player to main menu.

##### Help

This option show the same rules window as the button in the main menu. Rules window is interactive and allows the player to easily navigate through all rules by selecting on of the arrows. Every rule has it's title and text which explains the rule.

#### 4.1.3 Main game area

##### Playing section

This is where majority of the card game takes place. It consists of 2 card containers (for player and dealer), score boxes, bet-info box and two buttons (double and insurance).

* *Card container* - There are two card containers, one for player and one for dealer. This is where cards are displayed after they have been drawn. Containers are initially empty and can take up to maximum of 5 cards per container.

* *Score boxes* - Their purpose is to show sum of the drawn card values. Because of the game mechanic players score box gets updated in real time after every new card is drawn. Dealers score box shows only the value of the one visible card in dealer's container. If dealer gets a chance to play and to show the cards in the end of the round then this score box is updated with total sum of card values too.

* *Undo bet button* - It is enabled only after at least one bet is placed and before cards are dealt. By selecting in the last bet will be cancelled and credits will be returned to player. If all bets are cancelled button gets disabled again. On desktop computers this button is shown inside of controls section.

* *Double button* - It is enabled only after initial cards are dealt. If player decides to choose other action at this stage (hit / stand / insurance), 'double' button gets disabled again until the end of the round. If 'hit' button is activated, 'double' button is deactivated for the rest of the round.

* *Insurance button* - It gets enabled only in situation when after initial dealing of cards dealer's visible card is Ace or any card which has value of 10. If player decides to activate insurance button, separate bet is placed. Then a pop-up message is shown informing the player of the outcome of insurance bet and game continues. If 'hit' button is activated, 'insurance' button is deactivated for the rest of the round.

* *Pop up message box* - It gets visible only when game needs to inform player about game outcome (win, loss, draw or insurance bet), or wait for payer's input. Message box is shown in the same section on the screen where scores and double/insurance buttons are so when it gets activated it will automatically disable the latter.

##### Controls section

This is where majority of player game choices takes place. It consists of 'Credits available' which shows current amount of credits on player's disposal, 'Total bet' box, chip buttons which are used to place bets and three game buttons (bet / hit / stand).

* *Credits available* - Shows current amount of credits left for player to place as a bet. It gets updated in real time depending on player's bets and potential winnings.

* *Total bet* - Shows total value of the bet in the round. It adds or deducts total value of the bet depending on player's actions and updates the value in real time. After the cards are dealt this value can not be changed until the end of the round (only exception is if player decides to play double game which will double the bet or insurance game which will display separate bet in brackets).

* *Chip buttons* - There are 5 chip buttons with different values and colors. By selecting any of them a bet of the assigned value in credits is placed. If there is no enough credits left to place a bet of certain chip value this chip is then deactivated. If the amount gets available again (for example by undoing the last bet) chip button gets activated. Once the bet is placed and initial cards are dealt all chip buttons get deactivated for the rest of the round.

* *Play buttons* - There are 3 buttons in this area available to play the game (bet / hit / stand). Bet button gets activated after there is minimum bet placed in the pot. Bet button can be selected only once, after which initial cards is dealt and button is deactivated until the end of the round. Hit button adds new card to player's card container and it can be selected until there are 5 cards in player's card container or until the total player's score is 21 or more. Stand button ends player's turn and allows dealer to play.


---


## 5. TESTING

The [W3C Markup Validator](https://validator.w3.org/) and [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) services were used to validate the HTML and CSS code of the project to ensure there were no syntax errors. [jsHint](https://jshint.com/) was used to test JavaScript code.

* HTML Code Test Results:

  - [index.html](documentation/testing/images/code_validation/html_test.jpg)

    - No errors were found in HTML code.

* CSS Code Test Results:

  - [CSS](documentation/testing/images/code_validation/css_test.jpg)

    - No errors were found in CSS code.

* JavaScript Code Testing:

  - Following settings were used to test the code

  - [Test Settings](documentation/testing/images/code_validation/js_test_settings.JPG)

  - *script.js* test results:

  - [script.js](documentation/testing/images/code_validation/js_test_script.JPG)

  - *help.js* test results:

  - [help.js](documentation/testing/images/code_validation/js_test_help.JPG)

  - *scores.js* test results:

  - [scores.js](documentation/testing/images/code_validation/js_test_scores.JPG)

    - All tests passed with no major issues

### 5.1 Testing User Stories from User Experience (UX) Section

**First time player's goals**

- As a first time player, I want to see simple design with clear instructions which will allow me to easily navigate through the site.

    - Main menu of the page consists of only three buttons with clear description of the purpose of each button

    [Example 1](/documentation/testing/images/ux/001.jpg)

    - Game screen is designed in a way that all the buttons are activated and deactivated depending on the situation in the game which makes the playing experience more intuitive 

    [Example 2](/documentation/testing/images/ux/002.jpg)

- As a first time player, I want to see 'help' section so I can quickly understand the rules of the game.

    - Help section is available by pressing *help* button in navigation bar during the game or by pressing *rules* button in the main menu

    [Example 3](/documentation/testing/images/ux/003.jpg)

    [Example 4](/documentation/testing/images/ux/004.jpg)

    [Example 5](/documentation/testing/images/ux/005.jpg)

    [Example 6](/documentation/testing/images/ux/006.jpg)

- As a first time player, I want to clearly see who won and why so I can faster understand all mechanics of the game.

    - Every game outcome is explained through pop up messages, same as special functions such as *double*, *insurance* and *cash-out*

    [Example 7](/documentation/testing/images/ux/007.jpg)

- As a first time player, I want to have fun playing the game.

    - This goal depends on the subjective opinion of the user. As a developer I believe game is fun to play and provides good overall user experience. 


**Casual player's goals**

- As a casual player, I want to be challenged and entertained.

    - Different combinations of cards, betting strategies and in game decisions made by user combined with many possible game outcomes make every round of the game a unique experience for the user.

- As a casual player, I want to get notified about the score in real time so I can adapt my strategy accordingly.

    - Using JavaScript, the whole page is highly interactive. Every change made by user is updated accordingly in real time.

    [Example 8](/documentation/testing/images/ux/008.jpg)

- As a casual player, I want to see 'quit' button so I can exit the session whenever I wish.

    - In the top left corner of the navigation bar there is *Cash-out* button which gives the user the option to leave current session and get notified about the final score.

    [Example 9](/documentation/testing/images/ux/009.jpg)

    [Example 10](/documentation/testing/images/ux/010.jpg)

**Advanced player's goals**

- As an advanced player, I want to be able to choose advanced options in order to make the game more interesting.

    - Under the *Options* section in the main menu, user can choose between *Conservative* and *Aggressive* mode which will impact dealer's approach to the game, forcing user to adapt and change playing style too.

    [Example 11](/documentation/testing/images/ux/011.jpg)

- As an advanced player, I want to be able to keep my score so I can compare it with best scores.

    - In the main menu there is a 'Top Scores' button which will show list of all time top 5 scores stored in local storage of the browser.

    [Example 12](/documentation/testing/images/ux/012.jpg)

- As an advanced player, I want to see virtual currency system so I can place bets in each round.

    - Currency system in the game exists, allowing the player to make bets and track progress during and after each round. Currency used in the game is called *'Credit'*.

### 5.2 Further testing

- Lighthouse test results for [desktop](/documentation/testing/lighthouse/desktop.pdf) and [mobile](/documentation/testing/lighthouse/mobile.pdf) .

- The website was tested on [Google Chrome](documentation/tests/browser_chrome.JPG), [Internet Explorer](documentation/tests/browser_ie.JPG), [Microsoft Edge](documentation/tests/browser_edge.JPG), [Mozilla Firefox](documentation/tests/browser_firefox.JPG) and [Opera](documentation/tests/browser_opera.JPG) browsers.

- The website was viewed on a mobile, tablet and laptop devices such as iPhone XR, Huawei Media Pad T3 and HP Elitebook 840.

    - iPhone XR

    ![mobile](/documentation/testing/images/resolutions/mobile.jpg)

    - Huawei Media Pad T3

    ![tablet](/documentation/testing/images/resolutions/tablet.jpg)

    - HP Elitebook 840

    ![laptop 1](/documentation/testing/images/resolutions/laptop1.JPG)

    ![laptop 2](/documentation/testing/images/resolutions/laptop2.JPG)

    ![laptop 3](/documentation/testing/images/resolutions/laptop3.JPG)

- The website was tested on desktop and laptop computers on a variety of screen sizes using device toolbar option in Google Chrome developer tools.

    ![responsive](/documentation/testing/images/resolutions/responsive.JPG)

- *NOTE: Game is designed to be played in portrait mode on mobile and tablet devices and in landscape mode on desktop and laptop computers. However, game experience gets better in landscape mode on mobile and tablet devices with larger screen resolutions. For this purpose, in cases when player is using mobile or tablet device in landscape mode, following pop up message appears:*

    ![screen-size-tip](/documentation/testing/images/resolutions/screen-size-tip.png)


### 5.3 JavaScript and jQuery tests

Due to extensive testing, this section is provided in separate file which can be found on the following [link](documentation/testing/testing.md).

### 5.4 Known bugs

- JavaScript code does not work in Internet Explorer 11 which causes page elements to display incorrectly on load, and none of the events work. 

- Screen height is not properly calculated on screen resize event on iOS version of Google Chrome on mobile devices.

- AdBlock plugin is preventing Ace of Diamonds card image to display. This is because the string value of this card in JavaScript code is *'AD'* and this word is automatically blocked by the plugin. This bug does not affect the outcome of the game, it just prevents card image to display. It is recommended to disable AdBlock plugin while playing the game.

### 5.5 Fixed bugs

- Value of ace card is not correctly calculated in cases where player draws an ace in the initial two cards and draws another ace in one of the next rounds. For example: If initial hand is Ace and 3, total score is calculated correctly (11 + 3 = 14), but if next card is also ace game is calculating this incorrectly (1 + 3 + 1 = 5) instead of 15 (11 + 3 + 1). 
([example screenshot](documentation/testing/images/bugs/003.jpg))

Solution: Added *if* statement to *aceCorrect()* function

```
function aceCorrect(handValue, score) {
    debugger;
    // Adjusts value of ace card to 1 if total score is > 21
    if (score > 21) {
        for (i = 0; i < handValue.length; i++) {
            if (handValue[i] === 11) {
                handValue[i] = 1;
                score -= 10;
                // Function should break out in case score is under 22 again to prevent possible additional aces to be changed from 11 to 1
                if (score < 22) {
                    break;
                } else {
                    aceCorrect(handValue, score);
                };
            };
        };
    };
};
```

- Page height is bigger than screen height on mobile and tablet devices. ([example screenshot](documentation/testing/images/bugs/002.png))

Solution: Fixed following code at the beggining of script.js file.

```
$('body').css("height", `${window.innerHeight}px`);
```

- In case when game is tied and dealer had to draw all 5 cards, dealer's first card is not revealed and dealer's score is not updated. ([example screenshot](documentation/testing/images/bugs/004.jpg))

Solution: Added code to reveal card and update score to *decideWinner()* function.

```
// Updates scoreboard in html for total score
$('#dealer-score').text(dealerScore);
// Shows first dealer's card
$('#dealer-cards').children(":first")
    .replaceWith(`<img src="assets/images/${dealerHandString[dealerHandString.length - 1]}.jpg" class="card"></img>`);
```

- Game shows two pop-up messages on screen when dealer reaches 5 cards and busts ([example screenshot](documentation/testing/images/bugs/001.png))

Solution: Added 'return' command to IF statement in *dealerTurn()* function.

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


## 6. DEPLOYMENT

### 6.1 GitHub Pages

This project was deployed to GitHub Pages using following steps:

1. Sign in to [GitHub account](https://github.com/bencheee) and open [Blackjack The Game repository](https://github.com/bencheee/BlackJack)

2. Click on the *Settings* tab just below the repository name

3. Click on the *Pages* section

4. Under *Source* section select *master* branch and *root* directory from drop down menus and click *Save*

5. Page is refreshed with the link of the published site (this can take up to few minutes)

![Deployment to GitHub Pages](/documentation/deployment/001.jpg)

### 6.2 Forking repository

To fork the repository use the following steps:

1. Sign in to GitHub and open [Blackjack The Game repository](https://github.com/bencheee/BlackJack)

2. Click on the *Fork* icon in the top right corner of the page

![Forking the repository](/documentation/deployment/002.jpg)

### 6.3 Cloning repository

To make a local clone of the repository use the following steps:

1. Sign in to GitHub and open [Blackjack The Game repository](https://github.com/bencheee/BlackJack)

2. At the top of the repository click on the *Code* icon

3. Copy the provided HTTPS link

4. Open Git Bash and change the current working directory to the location where the cloned directory should be made

5. Type *git clone* and then paste the copied URL

```
$ git clone https://github.com/bencheee/BlackJack.git
```

6. Press *Enter* and local clone of the repository will be created

![Cloning the repository](/documentation/deployment/003.jpg)

---

## 7. CREDITS

### 7.1 Code credits

**CODE CREDIT: https://www.w3schools.com/jsref/prop_win_innerheight.asp**

Code was used to fix screen height on mobile and tablet devices. While on desktop computers it was enough to add CSS property *'height: 100 vh'*, on mobile and tablet devices screen was still higher than the screen size. This code and it's variations was used in below segments of *script.js* file.

```
$('body').css("height", `${window.innerHeight}px`);
```

```
if (window.outerWidth >= 1024) {
    $('.desktop-container').addClass('flex-centered');
}
```

```
$(window).resize(function () {
    $('body').css("height", `${window.innerHeight}px`);
    if (window.outerWidth >= 1024) {
        $('.desktop-container').addClass('flex-centered');
    } else {
        $('.desktop-container').removeClass('flex-centered');
    };
});
```

**CODE CREDIT: https://www.quora.com/How-can-I-prevent-default-double-click-behavior-with-JavaScript**

Code was used to prevent double click event on site. The main reason for this was to improve user experience on mobile and tablet devices. Main issue was that the whole screen would zoom in when user would double tap the screen to place or undo bets, which resulted in poor playing experience. On desktop computers there was no such issue, but since other game events did not require double click function I have decided to disable it completely.

```
$(document).dblclick(function (event) {
    event.preventDefault();
});
```

**CODE CREDIT: https://stackoverflow.com/questions/4592493/check-if-element-exists-in-jquery**

Code was used to check if jQuery selector exists in the DOM.

```
if ($("#top-scores").length === 0) {
    showTopScoresBtn();
};
```

**// CODE CREDIT: https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value**

Code was used to sort objects in the *topFive* array by the *score* values.

```
function compare(a, b) {
    if (Number(a.score) > Number(b.score)) {
        return -1;
    }
    if (Number(a.score) < Number(b.score)) {
        return 1;
    }
    return 0;
}
```

**// CODE CREDIT: https://www.codegrepper.com/code-examples/javascript/local+storage+jquery**

Code was uset to get/set score values in local storage.

```
localStorage.setItem("highScore0", JSON.stringify(currentScore));
```

```
JSON.parse(localStorage.getItem("highScore4")).score;
```

**CODE CREDIT: https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom**

Code was used to hide navbar items in main menu only, when switching from portrait to landscape view

```
if ($(".menu-container")[0].offsetParent === true) {
    $(".nav-container").show();
}
```

### 7.2 Media

- [Joker hat logo](https://www.freepik.com/free-vector/colored-jester-hat-with-bells-isolated-white-background-vector-illustration_10602191.htm#page=1&query=joker&position=2) in main menu wass downloaded from [freepik.com](https://www.freepik.com). This logo licence is free for personal and commercial purpose with attribution. 

- Main background photo was taken and edited by Sandro Bencinic (developer)

- Card images used in the game are downloaded form [American Contract Bridge League Website](http://acbl.mybigcommerce.com/52-playing-cards/) and are free to use for non-commercial purpose. Design for the image of the back of the card is made by developer.

- [Blackjack article on Wikipedia](https://en.wikipedia.org/wiki/Blackjack) was used when writing the rules of the game.

- All content was written by developer.

### 7.3 Acknowledgements

- My mentor Aaron Sinnott for continuous helpful feedback

- Tutor support at Code Institute for their support 
