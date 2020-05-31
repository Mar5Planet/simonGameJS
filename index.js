var userClickedPattern= [];
var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    started = true;
    nextSequence();
  }
});

//The function that allows for random pattern
function nextSequence() {
level++
userClickedPattern = [];

$("#level-title").text("Level " + level);
var randomNumber =  Math.round(Math.random()*3);
var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

$("#"+ randomChosenColor).fadeIn(250).fadeOut(250).fadeIn(250);
playSound(randomChosenColor);
}



//Allows for user interaction
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
})




//This function checks answer
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}




//function to play sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}



//animate clicks function
function animatePress(currentColor) {

  var colorClassName = $("." + currentColor)

  colorClassName.addClass("pressed");

  setTimeout(function() {

  colorClassName.removeClass("pressed");}, 100);
}

//function to start over game.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
