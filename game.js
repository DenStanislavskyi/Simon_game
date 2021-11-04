let gamePattern = [];
let userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];

let gameStarted = false;
let level = 0;


$(document).keypress(function(){
        if (gameStarted === false){
            $('h1').text("Level " + level);
            nextSequence();
            gameStarted = true;
        }       
    });


$('.btn').click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    
    userClickedPattern = [];
    level++;
    $('#level-title').text("Level " + level);

    let randomNumber = Math.floor((Math.random() * 4));
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColour){
    $('#' + currentColour).addClass("pressed");
    setTimeout(() => { $('#' + currentColour).removeClass("pressed"); }, 100);
}

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(() => { nextSequence(); }, 1000);
        }

    }
    else {

        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(() => { $("body").removeClass("game-over"); }, 200);
        startOver();
    }
}


function startOver(){
    level = 0;
    gamePattern = [];
    gameStarted = false;
}



