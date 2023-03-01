const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;

let level = 0;

$(document).keypress(function(){
    if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
});

$(".btn").click( function (){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    playSound(userChosenColour);

    pressAniation(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    } else {
        playSound("wrong");
        
        $("body").addClass("red");
        setTimeout(function () {
        $("body").removeClass("red");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart ");

        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
  
  };

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();  
  }

function pressAniation(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");   
    }, 100);
   
}

function startOver(){
    level=0;
    gamePattern = [];
    started = false;
}

