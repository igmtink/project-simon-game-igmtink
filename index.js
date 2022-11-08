// !Game Pattern
var colorPattern = ["green", "red", "yellow", "blue"];
var gamePattern = [];

// !Next Sequence
function nextSequence() {
  var randomChoice = Math.floor(Math.random() * 4);
  var randomColorPattern = colorPattern[randomChoice];

  // !Pass the current random pattern to game pattern array
  gamePattern.push(randomColorPattern);

  // !Button animation
  colorPressed(randomColorPattern);

  // !Button sound effect
  playSound(randomColorPattern);

  // !Everytime we call (nextSequence) we reset the user pattern
  userClickPattern = [];
}

// !Track if any key on keyboard was pressed, you need press only once
var start = false;

$(document).keydown(function () {
  if (start === false) {
    nextSequence();

    start = true;
  }
});

// !User pattern
var userClickPattern = [];

$(".btnColor").click(function () {
  if (start === true) {
    // !Get the current button clicked
    var activeBtn = $(this).attr("id");

    // !Pass the current button clicked to user pattern array
    userClickPattern.push(activeBtn);

    // !Button animation
    colorPressed(activeBtn);

    // !Button sound effect
    playSound(activeBtn);

    checkAnswer(userClickPattern.length - 1);
  }
});

// !Button animation
function colorPressed(color) {
  $("#" + color)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

// !Button sound effect
function playSound(color) {
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

// !Check answer
function checkAnswer(currentLevel) {
  // !If the current value of (gamePattern) is equal to the current value of (userClickPattern)
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    console.log("Correct!");

    // !If the value between the (gamePattern) and (userClickPattern) is correct, we will check if the lenght is also equal then we call the (nextSequence)
    if (gamePattern.length === userClickPattern.length) {
      // !Set delay for (nextSequence)
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong!");
  }
}
