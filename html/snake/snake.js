let snakeArray = [];
/*初始化蛇关节的数组*/
let isPause = false;
/*游戏是否暂停：未暂停*/
let snakeSize = 5;
/*蛇的初始长度*/
let direct = "right";
/*蛇初始方向：向右*/
let speed = 80;
/*蛇移动初始速度：80*/
let score, timer, board, bean;
/*游戏初始分数显示区，定时器，面板，豆*/

/*游戏初始化*/
onload = () => {
    board = document.querySelector("#board");
    score = document.querySelector("#score");
    createSnake();
    createBean();
    keyListener();
};

/*造蛇*/
function createSnake() {
    for (let i = 0; i < snakeSize; i++) {
        let snake = document.createElement("div");
        if (i === 0) {
            snake["style"]["backgroundColor"] = "red";
        }
        snakeArray.push(snake);
        snake["style"]["left"] = (snakeSize - i - 1) * 20 + "px";
        board.appendChild(snake);
    }
}

/*造豆*/
function createBean() {
    if (bean) {
        board.removeChild(bean);
    }
    bean = document.createElement("span");
    let x = null, y = null;
    randomXY();

    function randomXY() {
        x = parseInt("" + (Math.random() * (1000 / 20))) * 20;
        y = parseInt("" + (Math.random() * (500 / 20))) * 20;
        for (let i = 0, j = snakeArray.length; i < j; i++) {
            if (snakeArray[i]["offsetLeft"] === x && snakeArray[i]["offsetTop"] === y) {
                randomXY();
                break;
            }
        }
    }

    bean["style"]["left"] = x + "px";
    bean["style"]["top"] = y + "px";
    board.appendChild(bean);
}

/*键盘监听*/
function keyListener() {
    document.onkeydown = event => {
        let ev = event || window.event;
        switch (ev.keyCode) {
            case 37 :
                if (direct !== "right") {
                    direct = "left";
                }
                break;
            case 38 :
                if (direct !== "down") {
                    direct = "up";
                }
                break;
            case 39 :
                if (direct !== "left") {
                    direct = "right";
                }
                break;
            case 40 :
                if (direct !== "up") {
                    direct = "down";
                }
                break;
            case 32 :
                if (!isPause) {
                    pause();
                } else {
                    start();
                }
                isPause = !isPause;
                break;
        }
    };
}

/*游戏开始*/
function start() {
    clearInterval(timer);
    timer = setInterval(() => {
        move();
        isHit();
        isEat();
    }, speed);
}

/*蛇移动*/
function move() {
    let hLeft = snakeArray[0].offsetLeft;
    let hTop = snakeArray[0].offsetTop;
    switch (direct) {
        case "left":
            if (hLeft <= 0) {
                gameover();
                return;
            }
            snakeBodyMove();
            snakeArray[0]["style"]["left"] = hLeft - 20 + "px";
            break;
        case "up":
            if (hTop <= 0) {
                gameover();
                return;
            }
            snakeBodyMove();
            snakeArray[0]["style"]["top"] = hTop - 20 + "px";
            break;
        case "right":
            if (hLeft >= 1000 - 20) {
                gameover();
                return;
            }
            snakeBodyMove();
            snakeArray[0]["style"]["left"] = hLeft + 20 + "px";
            break;
        case "down":
            if (hTop >= 500 - 20) {
                gameover();
                return;
            }
            snakeBodyMove();
            snakeArray[0]["style"]["top"] = hTop + 20 + "px";
            break;
    }

    /*蛇身移动*/
    function snakeBodyMove() {
        for (let i = snakeArray.length - 1; i > 0; i--) {
            snakeArray[i]["style"]["left"] = snakeArray[i - 1]["style"]["left"];
            snakeArray[i]["style"]["top"] = snakeArray[i - 1]["style"]["top"];
        }
    }
}

/*判断本次移动是否撞到自己*/
function isHit() {
    for (let i = 1, j = snakeArray.length; i < j; i++) {
        if (snakeArray[0].offsetLeft === snakeArray[i].offsetLeft) {
            if (snakeArray[0].offsetTop === snakeArray[i].offsetTop) {
                gameover();
                break;
            }
        }
    }
}

/*判断本次移动是否吃到豆*/
function isEat() {
    if (snakeArray[0].offsetLeft === bean.offsetLeft) {
        if (snakeArray[0].offsetTop === bean.offsetTop) {
            score.innerText = parseInt(score.innerText) + 1;
            let snake = document.createElement("div");
            snake["style"]["left"] = bean["style"]["left"];
            snake["style"]["top"] = bean["style"]["top"];
            snakeArray.push(snake);
            board.appendChild(snake);
            createBean();
        }
    }
}

/*游戏结束*/
function gameover() {
    clearInterval(timer);
    location.reload();
    alert("game over!");
}

/*游戏暂停*/
function pause() {
    clearInterval(timer);
}

/*游戏重置*/
function reset() {
    location.reload();
}