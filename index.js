
let inputDir = {x : 0, y : 0};

const foodsound = new Audio("food.mp3");
const musicSound = new Audio("music.mp3");
const gameoversound = new Audio("gameover_snakegame.mp3");
const movesound = new Audio("move.mp3");
const yourscore = document.getElementById("score");


let lastPaintTime = 0;
const speed = 5;
let score = 0;

let snakeArr = [
    {x : 13, y : 9}
]

let food = {x : 3, y : 15};

// game functions
function main(ctime){
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;

    gameEngine();
    musicSound.play();
}

function isCollide(snakeArr){
    // if you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++){
        if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y){
            return true;
        }
    }

    // if you bumb into wall
    if (snakeArr[0].x <= 0 || snakeArr[0].x >= 18 || snakeArr[0].y <= 0 || snakeArr[0].y >= 18){
        return true;
    }
}

function gameEngine(){
    // part 1 -> update the snake array
    if (isCollide(snakeArr)){
        gameoversound.play();
        musicSound.pause();

        alert("game over. Press any key to play again!");

        inputDir = {x : 0, y : 0};
        snakeArr = [{x : 13, y : 9}];
        musicSound.play();
        score = 0;
        yourscore.innerHTML = "Score: " + score;
        speed = 5;
    }

    // if snake has eaten the food, increment the score and regenerate the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodsound.play();
        score++;

        yourscore.innerHTML = "Score: " + score;
        snakeArr.unshift(
            {x : snakeArr[0].x + inputDir.x, y : snakeArr[0].y + inputDir.y}
        );

        let a = 1;
        let b = 17;
        let randval = Math.round(Math.random() * (b - a) + a);
        food = {x : randval, y : randval};
    }

    // moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // part 2 -> display the snake 
    board.innerHTML = "";

    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');

        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });

    // part -> display the food
    foodElement = document.createElement('div');

    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;

    foodElement.classList.add('food');

    board.appendChild(foodElement);
}


// main logic
window.requestAnimationFrame(main);

window.addEventListener("keydown", e => {
    switch(e.key){
        case "ArrowUp":
            if (inputDir.y === 1) return;
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            if (inputDir.y === -1) return;
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            if (inputDir.x === 1) return;
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            if (inputDir.x === -1) return;
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
    movesound.play();
});