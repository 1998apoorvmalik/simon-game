import {
    SimonGame
} from './game.js';

let blockColorArray = ["yellow", "blue", "red", "green"];
let game = new SimonGame(playBlockAnimation, showGameOver);

function playBlockAnimation(blockIndex) {
    let gameBlocks = $(".game-block");
    $("#info").text(`Current Level : ${game.currentLevel}`);
    let target = gameBlocks[blockIndex];

    if (target != null) {
        var tempId = target.id;
        target.id = "";

        setTimeout(function () {
            target.id = tempId;
        }, 150);
    }
}

function showGameOver() {
    $('h1').text("Game Over!");
    $('h1').after(`<h2 id="score" class="container center">Your Score : ${game.currentLevel - 1}<h2>`);
    $("#info").text("Press any key or double tap to start...");
    $("body").css("background-color", "#6F2232");
}

function reset() {
    $("body").css("background-color", "#1A1A1D");
    $('h1').text("Simon Game");
    $('#score').remove();
    game.reset();
}

$(".game-block").on('click', (event) => {
    if (!game.isGameRunning || event.target.id == "") {
        return;
    }

    let clickedBlockIndex = blockColorArray.indexOf(event.target.id);
    game.getMove(clickedBlockIndex);
})

$("body").on('keypress', function () {
    if (!game.isGameRunning) {
        reset();
    }
});

$("body").on('dblclick', function () {
    if (!game.isGameRunning) {
        reset();
    }
});