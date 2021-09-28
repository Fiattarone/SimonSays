// alert("This works");

var buttonColors = [ "red", "blue", "green", "yellow"];

var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var totalAccuracy = true;
var buttonClicks = 0;

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  // console.log(currentColor + " got animated");
  // console.log($(currentColor).attr("class"));
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  for (i = 0; i < gamePattern.length; i++) {
    if (userClickedPattern[i] === gamePattern[i]) {
      console.log("Winning");
    } else {
      console.log("Loser lol");
      totalAccuracy = false;
    }
  }

  if (totalAccuracy === false) {
    $("h1").text("YOU LOSE! Press Any Key To Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
  }
}

function checkIntermittant(num) {
  if (userClickedPattern[num] === gamePattern[num]) {
    totalAccuracy = true;
    console.log("Intermittant Win");
  } else {
    totalAccuracy = false;
    console.log("LOSS");
    checkAnswer(0);
  }
}

function gameOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  totalAccuracy = true;
  buttonClicks = 0;
  $("h1").text("Press A Key to Start");
}

function nextSequence() {
  randomChosenColor = buttonColors[Math.floor(Math.random()*4)];
  console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
  $("." + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  console.log("Game Pattern So Far: " + gamePattern);
  $("h1").text("Level " + ++level);
}

function playSound(audioSound) {
  var buttonAudio = new Audio("sounds/" + audioSound + ".mp3");
  buttonAudio.play();
}

$(".btn").on("click", function(event) {
  // console.log(event.target.id + " got clicked");
  userClickedPattern.push(event.target.id);
  console.log("All colors user has clicked: " + userClickedPattern);
  playSound(event.target.id);
  animatePress(event.target.id);
  checkIntermittant(buttonClicks);
  console.log(buttonClicks);
  buttonClicks++;

  if (userClickedPattern.length === gamePattern.length) {
    checkAnswer(userClickedPattern.length - 1);
    if (totalAccuracy) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
        buttonClicks = 0;
      }, 1000);
    }
  }
})

$(document).keydown(function() {
  $("h1").text("Level " + level);
  if (level === 0) {
    nextSequence();
  } else if (totalAccuracy === false) {
    gameOver();
  }
})
