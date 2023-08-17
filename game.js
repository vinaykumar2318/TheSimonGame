var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var start = false;
var level = 0;
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("."+randomChosenColor).fadeOut(100).fadeIn(100);
    soundProperty(randomChosenColor);
}

function soundProperty(color){
    var audio = new Audio("./sounds/"+color+".mp3");
    audio.play();
}

function animationProperty(colorClicked){
    $("#"+colorClicked).addClass("pressed");
    setTimeout(function () {
      $("#" + colorClicked).removeClass("pressed");
    }, 100);
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    soundProperty(userChosenColor);
    animationProperty(userChosenColor);

    answerCheck(userClickedPattern.length-1);
});

$(document).keypress(function(){
    if(!start){
        $("#level-title").text("level "+level);
        nextSequence();
        start = true;
    }
});

function answerCheck(level){
    if(gamePattern[level]===userClickedPattern[level]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        soundProperty("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart.");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startAgain();
    }
}

function startAgain(){
    level=0;
    gamePattern = [];
    start = false;
}