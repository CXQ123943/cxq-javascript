let arrayBox = []; // 存放单元格
let arraySnake = []; // 存放蛇
let food; // 食物
let snakeHead; //蛇头
let key = true; // 判断页面是否需要初始化
let timeKey; // 运动定时器常量

/*初始化(){
    初始化游戏面板和游戏分数显示区
    造蛇()
    造豆()
    监听键盘()
}*/
document.querySelector("#");
function newGame() {
    arrayBoxInit();
    initSnake();
    randomFood();
}

newGame();
document.onclick = function () {
    if (key) {
        gameStart(arraySnake);
        key = false;
    }
};

/*造蛇(){
    循环蛇初始化长度次{
        创造蛇的新关节，每个关节都是一个div
        蛇头变红
        蛇的新关节推入数组
        蛇的新关节的左距离为上一个蛇关节左侧
        蛇的新关节展示在面板上
    }
}*/
function initSnake() {
    let x = Math.floor(Math.random() * 20);
    let y = Math.floor(Math.random() * 20);
    let initA = document.getElementsByClassName("box-" + y + "-" + x)[0];
    snakeHead = initA;
    let b = initBFn(x, y);
    let initB = document.getElementsByClassName(b)[0];
    arraySnake.push(initB);
    arraySnake.push(initA);
    initA["style"]["backgroundColor"] = "while";
    initB["style"]["backgroundColor"] = "while";
    arrayBox[y][x] = 1;
    arrayBox[b.split("-")[1]][b.split("-")[2]] = 1;
}

/*造豆(){
    if(存在旧豆){
        从游戏面板上删除旧豆
    }
    创建新豆，每个豆都是一个span
    调用随机坐标()，为新豆生成出生坐标
    随机坐标(){
        面板宽度1000除以20（豆子宽20px），等分成500份
        乘以一个随机数并取整，得出一个0-500的整数
        乘以20得到一个0-1000范围内的20的整数倍，即横坐标
        纵坐标同理
        遍历蛇关节数组{
            if(和当前豆的坐标冲突){
                随机坐标();
            }
        }
    }
    为新豆赋值横纵坐标
    将新豆追加到面板中
}*/

function randomFood() {
    let x = Math.floor(Math.random() * 20);
    let y = Math.floor(Math.random() * 20);
    if (!arrayBox[y][x]) {
        document.getElementsByClassName("box-" + y + "-" + x)[0].style = "background-color: while;border-radius:50%";
        arrayBox[y][x] = 1;
        food = document.getElementsByClassName("box-" + y + "-" + x)[0];
    } else {
        addSnakeLength();
    }
}

/*监听键盘(){
    按了左键：当方向不为右，方向改为左
    按了上键：当方向不为下，方向改为上
    按了右键：当方向不为左，方向改为右
    按了下键：当方向不为上，方向改为下
    按了空格键：暂停和开始游戏效果切换
}*/

document.addEventListener("keydown", function (e) {
    if (e.code === "ArrowDown") {
        turnDown();
    } else if (e.code === "ArrowUp") {
        turnUp();
    } else if (e.code === "ArrowLeft") {
        turnLeft();
    } else if (e.code === "ArrowRight") {
        turnRight();
    }
}, false);

// 下拐
function turnDown() {
    if (arraySnake[arraySnake.length - 1].className.split("-")[1] === arraySnake[arraySnake.length - 2].className.split("-")[1]) {
        clearInterval(timeKey);
        moveDown();
    }
}

// 下拐
function turnUp() {
    if (arraySnake[arraySnake.length - 1].className.split("-")[1] === arraySnake[arraySnake.length - 2].className.split("-")[1]) {
        clearInterval(timeKey);
        moveUp();
    }
}

// 左拐
function turnLeft() {
    if (arraySnake[arraySnake.length - 1].className.split("-")[2] === arraySnake[arraySnake.length - 2].className.split("-")[2]) {
        clearInterval(timeKey);
        moveLeft();
    }
}

// 右拐
function turnRight() {
    if (arraySnake[arraySnake.length - 1].className.split("-")[2] === arraySnake[arraySnake.length - 2].className.split("-")[2]) {
        clearInterval(timeKey);
        moveRight();
    }
}

/*游戏开始(){
    清除旧定时器
    开启新定时器{
        蛇移动()
        撞自己()：判断本次移动蛇是否撞到自己
        吃豆子()：判断本次移动蛇是否吃到豆子
    }
}*/

function gameStart(arraySnake) {
    let Ax = arraySnake[1].className.split("-")[2];
    let Ay = arraySnake[1].className.split("-")[1];
    let Bx = arraySnake[0].className.split("-")[2];
    let By = arraySnake[0].className.split("-")[1];
    if (Ay === By) {
        if (Ax > Bx) {
            moveRight();
        } else {
            moveLeft()
        }
    } else {
        if (Ay > By) {
            moveDown()
        } else {
            moveUp()
        }
    }
}

/*蛇移动(){
    获取蛇头左距离和上距离
    判断当前蛇的移动方向{
        if(对应方向上出界){
            游戏结束()
        }
        蛇身移动()
        蛇头移动
    }
    蛇身移动(){
        循环所有蛇身{
            后面的关节横向顶替前面的关节
            后面的关节纵向顶替前面的关节
        }
    }
}*/

function moveRight() {
    timeKey = setInterval(function () {
        let nextBox = document.getElementsByClassName("box-" + arraySnake[arraySnake.length - 1].className.split("-")[1] + "-" + (parseInt(arraySnake[arraySnake.length - 1].className.split("-")[2]) + 1))[0];
        if (nextBox) {
            arrayBox[arraySnake[arraySnake.length - 1].className.split("-")[1]][(parseInt(arraySnake[arraySnake.length - 1].className.split("-")[2]) + 1)] = 1;
            nextBox.style.backgroundColor = "#9c9c9c";
            arraySnake.push(nextBox);
            arrayBox[arraySnake[0].className.split("-")[1]][arraySnake[0].className.split("-")[2]] = 0;
            arraySnake[0].style.backgroundColor = "#fff";
            arraySnake.shift();
            eatFood();
        }
    }, 200);
}

function moveLeft() {
    timeKey = setInterval(function () {
        let nextBox = document.getElementsByClassName("box-" + arraySnake[arraySnake.length - 1].className.split("-")[1] + "-" + (parseInt(arraySnake[arraySnake.length - 1].className.split("-")[2]) - 1))[0];
        if (nextBox) {
            arrayBox[arraySnake[arraySnake.length - 1].className.split("-")[1]][(parseInt(arraySnake[arraySnake.length - 1].className.split("-")[2]) - 1)] = 1;
            nextBox.style.backgroundColor = "#9c9c9c";
            arraySnake.push(nextBox);
            arrayBox[arraySnake[0].className.split("-")[1]][arraySnake[0].className.split("-")[2]] = 0;
            arraySnake[0].style.backgroundColor = "#fff";
            arraySnake.shift();
            eatFood();
        }
    }, 200);
}

function moveUp() {
    timeKey = setInterval(function () {
        let nextBox = document.getElementsByClassName("box-" + (parseInt(arraySnake[arraySnake.length - 1].className.split("-")[1]) - 1) + "-" + arraySnake[arraySnake.length - 1].className.split("-")[2])[0];
        if (nextBox) {
            arrayBox[(parseInt(arraySnake[arraySnake.length - 1].className.split("-")[1]) - 1)][arraySnake[arraySnake.length - 1].className.split("-")[2]] = 1;
            nextBox.style.backgroundColor = "#9c9c9c";
            arraySnake.push(nextBox);
            arrayBox[arraySnake[0].className.split("-")[1]][arraySnake[0].className.split("-")[2]] = 0;
            arraySnake[0].style.backgroundColor = "#fff";
            arraySnake.shift();
            eatFood();
        }
    }, 200);
}

function moveDown() {
    timeKey = setInterval(function () {
        let nextBox = document.getElementsByClassName("box-" + (parseInt(arraySnake[arraySnake.length - 1].className.split("-")[1]) + 1) + "-" + arraySnake[arraySnake.length - 1].className.split("-")[2])[0];
        if (nextBox) {
            arrayBox[(parseInt(arraySnake[arraySnake.length - 1].className.split("-")[1]) + 1)][arraySnake[arraySnake.length - 1].className.split("-")[2]] = 1;
            nextBox.style.backgroundColor = "#9c9c9c";
            arraySnake.push(nextBox);
            arrayBox[arraySnake[0].className.split("-")[1]][arraySnake[0].className.split("-")[2]] = 0;
            arraySnake[0].style.backgroundColor = "#fff";
            arraySnake.shift();
            eatFood();
        }
    }, 200);
}

/*撞自己(){
    遍历所有蛇身{
        if(蛇头坐标与某个蛇身关节坐标冲突){
            结束游戏()
        }
    }
}*/

/*吃豆子(){
    if(蛇头坐标和当前豆的坐标一致){
        分数++
        创建一个新的蛇关节
        新蛇关节的出生坐标就是被吃掉豆子的坐标
        新蛇关节加入到蛇的数组中
        新蛇关节展示在游戏面板中
        造豆()
    }
}*/

function eatFood() {
    if (arrayBox[food.className.split("-")[1]][food.className.split("-")[2]] === 0) {
        randomFood();
        addSnakeLength(food);
    }
}

function addSnakeLength(temp) {
    arraySnake.unshift(temp);
}

/*游戏结束(){
    清空定时器
    刷新页面
    展示分数
    提示游戏结束
}*/

/*
游戏暂停(){
    清空定时器
}
*/

/*游戏重置(){
    刷新页面
}*/


// 记录的单元格数组初始化
function arrayBoxInit() {
    for (let y = 0; y < 20; y++) {
        arrayBox[y] = [];
        for (let x = 0; x < 20; x++) {
            arrayBox[y][x] = 0;
        }
    }
}



// 初始化蛇身
function initBFn(x, y) {
    if (x !== 19 && x !== 0) {
        if (y !== 19 && y !== 0) {
            if (Math.random() > 0.5) {
                if (Math.random() > 0.5) {
                    return "box-" + y + "-" + (x + 1);
                } else {
                    return "box-" + y + "-" + (x - 1);
                }
            } else {
                if (Math.random() > 0.5) {
                    return "box-" + (y + 1) + "-" + x;
                } else {
                    return "box-" + (y - 1) + "-" + x;
                }
            }
        } else if (y === 0) {
            if (Math.random() > 0.5) {
                return "box-0-" + (x + 1);
            } else {
                return "box-0-" + (x - 1);
            }
        } else if (y === 19) {
            if (Math.random() > 0.5) {
                return "box-19-" + (x + 1);
            } else {
                return "box-19-" + (x - 1);
            }
        }
    } else if (x === 0) {
        if (y !== 19 && y !== 0) {
            if (Math.random() > 0.5) {
                return "box-" + (y + 1) + "-0";
            } else {
                return "box-" + (y - 1) + "-0";
            }
        } else if (y === 0) {
            if (Math.random() > 0.5) {
                return "box-1-0";
            } else {
                return "box-0-1";
            }
        } else if (y === 19) {
            if (Math.random() > 0.5) {
                return "box-18-0";
            } else {
                return "box-19-1";
            }
        }
    } else if (x === 19) {
        if (y !== 19 && y !== 0) {
            if (Math.random() > 0.5) {
                return "box-" + (y + 1) + "-19";

            } else {
                return "box-" + (y - 1) + "-19";
            }
        } else if (y === 0) {
            if (Math.random() > 0.5) {
                return "box-1-19";
            } else {
                return "box-0-18";
            }
        } else if (y === 19) {
            if (Math.random() > 0.5) {
                return "box-18-19";
            } else {
                return "box-19-18";
            }
        }
    }
}


// 开始游戏


// 键盘操作拐弯


// 蛇吃食物


// 增加长度在蛇尾

