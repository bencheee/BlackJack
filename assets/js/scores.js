let currentScore = {};
let lowestScore;
let topFive = [];

// If local storage is full, stores lowest score for future comparison
// CODE CREDIT: https://www.codegrepper.com/code-examples/javascript/local+storage+jquery
if (localStorage.length > 4) {
  lowestScore = JSON.parse(localStorage.getItem("highScore4")).score
};

// If there is at least one item in local storage, shows 'top score' button in main menu
showTopScoresBtn();

// Event listener for 'top scores' button in main menu
$("#top-scores").click(showTopScoresList);

// Event listener for 'cash out' button in nav
$("#cash-out").click(function() {
  if (placedBet) {
    popUpOn(`You can't cash out in the middle of the round!`);
    $(".pop-up-box button").click(function() {
      popUpOff();
      $("#stand").removeClass("play-btn-disabled");
      $("#hit").removeClass("play-btn-disabled");
    });
  } else {
    if (totalBet != 0) {
      popUpOn(`Please remove all bets before leaving!`);
      $("#bet").addClass("play-btn-disabled");
      $(".undo-btn").hide();
      $(".chip").addClass("chip-off");
      $(".pop-up-box button").click(function() {
        popUpOff();
        $("#bet").removeClass("play-btn-disabled");
        $(".undo-btn").show();
        chipsToggle();
      });
    } else {
      cashOut();
    };
  };
});

// Shows pop up message with yes/no option
function cashOut() {
  popUpOn(
    `You will cash out ${creditsAvailable} credits and end the game. Do you wish to proceed?`
  );
  // Removes 'continue' button and adds 'yes/no' buttons
  $(".pop-up-box button").remove();
  let container = $("<div></div>").addClass("flex-centered");
  let yes = $("<button></button>").text("YES").attr("id", "yes");
  let no = $("<button></button>").text("NO").attr("id", "no");
  container.append(yes);
  container.append(no);
  $(".pop-up-box").append(container);
  // Deactivates 'chip' buttons and 'nav' buttons
  $(".chip").addClass("chip-off");
  $('nav button').css("pointer-events", "none");
  yes.click(function() {
    popUpOff();
    checkNameInput();
  });
  no.click(function() {
    popUpOff();
    $(".chip").removeClass("chip-off");
    $('nav button').css("pointer-events", "auto");
  });
};

// Depending on the final score, function decides whether it will ask the player for username to update top scores list, or it will continue to end the game
function checkNameInput() {
  // If there is less than 5 items in local storage or if final score is higher then lowest top 5 score, shows pop up with input field for players name
  if (localStorage.length < 5) {
    enterPlayerName();
    $(".pop-up-box button").click(function() {
      saveHighScore();
    });
    $("#name").keypress(function(e) {
      if (e.which == 13) {
        saveHighScore();
      }
    });
  } else if ((localStorage.length > 4) && (creditsAvailable > lowestScore)) {
    enterPlayerName();
    $(".pop-up-box button").click(function() {
      saveHighScore();
    });
    $("#name").keypress(function(e) {
      if (e.which == 13) {
        saveHighScore();
      }
    });
  } else {
    popUpOn(
      `Congratulations! You won ${creditsAvailable} credits, Good job!`);
    $(".pop-up-box button").click(function() {
      popUpOff();
      location.reload();
    });
  };
};

// Shows pop up with input field for players name
function enterPlayerName() {
  popUpOn(
    `Congratulations! You won ${creditsAvailable} credits, which is all time top 5 result! Please enter your name!`
  );
  $(".pop-up-box").css("height", "50%");
  let input = $("<input></input>");
  input.attr({
    type: "text",
    id: "name",
    name: "name"
  });
  $(".pop-up-box button").before(input);
};

// Makes sure input field is populated, and calls the calculateHighScores() function to manipulate the local storage
function saveHighScore() {
  if ($("#name").val() === "") {
    if ($(".required-text").length === 0) {
      let requiredTxt = $("<span></span>").addClass("required-text");
      requiredTxt.text("* Name field cannot be empty *");
      $(".pop-up-box").append(requiredTxt);
      return;
    };
  } else {
    currentScore = {
      name: $("#name").val(),
      score: creditsAvailable
    };
    calculateHighScores();
  };
};

// Saves current score to local storage if local storage is empty. If there is at least one item in local storage but less then 5 items, all items from local storage are copied to topFive array. Current score is also pushed to the array, which is then sorted, local storage cleared and sorted items from topFive array are then put back to local storage.
// CODE CREDIT: https://www.codegrepper.com/code-examples/javascript/local+storage+jquery
function calculateHighScores() {
  if (localStorage.length < 5) {
    if (localStorage.length === 0) {
      localStorage.setItem("highScore0", JSON.stringify(currentScore));
    } else {
      copyFromLocal();
      topFive.push(currentScore);
      topFive.sort(compare);
      localStorage.clear();
      copyToLocal()
      creditsAvailable = 1000;
      $("#bank-amount").text(creditsAvailable);
    };
    popUpOff();
    showTopScoresList();
    // Changes default behaviour of close button to reload page in case top scores list is shown from inside the game area and not from the main menu.
    $(".options-close").addClass("top-scores-close");
    $(".top-scores-close").removeClass("options-close");
    $(".top-scores-close").click(function() {
      location.reload();
    });
  } else {
    copyFromLocal();
    topFive.sort(compare);
    // Compares last object in topFive array with current score object
    // If current score is higher it is pushed into topFive array and the last object is popped out of it
    if (creditsAvailable > Number(topFive[4].score)) {
      topFive.pop();
      topFive.push(currentScore);
      topFive.sort(compare);
      localStorage.clear();
      copyToLocal()
      creditsAvailable = 1000;
      $("#bank-amount").text(creditsAvailable);
      popUpOff();
      showTopScoresList();
      // Changes default behaviour of close button to reload page in case top scores list is shown from inside the game area and not from the main menu.
      $(".options-close").addClass("top-scores-close");
      $(".top-scores-close").removeClass("options-close");
      $(".top-scores-close").click(function() {
        location.reload();
      });
    };
  };
};

// Sorts objects in topFive array by score value
// CODE CREDIT: https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
function compare(a, b) {
  if (Number(a.score) > Number(b.score)) {
    return -1;
  }
  if (Number(a.score) < Number(b.score)) {
    return 1;
  }
  return 0;
}

// Copy topFive to localStorage
function copyToLocal() {
  for (i = 0; i < topFive.length; i++) {
    localStorage.setItem(`highScore${i}`, JSON.stringify(topFive[i]));
  };
};

// Get localStorage objects and push them into topFive array
function copyFromLocal() {
  for (i = 0; i < localStorage.length; i++) {
    topFive.push(JSON.parse(localStorage.getItem(`highScore${i}`)));
  };
};

// If there is at least one item in local storage, shows 'top score' button in main menu
function showTopScoresBtn() {
  if (localStorage.length != 0) {
    let scoresBtn = $("<button></button>").addClass("main-btn").attr("id",
      "top-scores").text("TOP SCORES");
    $(".buttons-container").append(scoresBtn);
  };
};

// Displays all localStorage objects in html
function updateDom() {
  for (i = 0; i < localStorage.length; i++) {
    $(`.no${i + 1} .name`).text((JSON.parse(localStorage.getItem(
      `highScore${i}`))).name);
    $(`.no${i + 1} .score`).text((JSON.parse(localStorage.getItem(
      `highScore${i}`))).score);
  };
};

function showTopScoresList() {
  updateDom();
  $(".nav-container").hide();
  $(".menu-container").hide();
  $("h1").hide();
  $(".playing-container").hide();
  $(".controls-container").hide();
  $(".overlay").remove();
  $("body").css("background-image", "url('assets/images/bg-color.jpg')");
  $(".top-scores-container").show();
  let btn = $("<button></button>").addClass("options-close").text("CLOSE");
  $(".top-scores-box").append(btn);
  $(".options-close").click(function() {
    // Makes sure button is not duplicated
    // CODE CREDIT: https://stackoverflow.com/questions/4592493/check-if-element-exists-in-jquery
    if ($("#top-scores").length === 0) {
      showTopScoresBtn();
    };
    $(".menu-container").show();
    $("h1").show();
    $(".top-scores-container").hide();
    $(".options-close").remove();
  });
};