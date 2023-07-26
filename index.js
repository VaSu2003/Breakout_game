const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')

const blockWidth = 100
const blockHeight = 20

const userStart = [230,10]
let currentPosition = userStart;

const ballStart = [270,30]
let ballCurrentPos = ballStart;

let xDirection = 2
let yDirection = 2


//create block 
class Block{
    constructor(xAxis,yAxis){
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight = [xAxis+blockWidth,yAxis]
        this.topLeft = [xAxis,yAxis+blockHeight]
        this.topRight = [xAxis+blockWidth,yAxis+blockHeight]
    }
}


//array of blocks

const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),

    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),

    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
   
]

function addBlocks(){

    for(let i = 0 ; i<blocks.length ;i++){

        let block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block)

    }
    
}

addBlocks();


//add user

const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//Draw user
function drawUser(){
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}


//move user

function moveUser(e){
    switch(e.key){
        case "ArrowLeft":
            if(currentPosition[0] > 0){
                currentPosition[0] -= 10
                drawUser()
            }
            break;

        case "ArrowRight":
            if(currentPosition[0] < 460){
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown',moveUser)


//add a ball

const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//Draw the ball
function drawBall(){
    ball.style.left = ballCurrentPos[0] + 'px'
    ball.style.bottom = ballCurrentPos[1] + 'px'
}

//Move the ball

function moveBall(){
    ballCurrentPos[0] += xDirection
    ballCurrentPos[1] += yDirection
    drawBall();
    checkForCollisions();
}

let timerId = setInterval(moveBall,30)

//check for collisions

function checkForCollisions(){

    //check for block collisions
    for(let i = 0 ; i< blocks.length; i++){
        if(
            (ballCurrentPos[0] > blocks[i].bottomLeft[0] && ballCurrentPos[0] < blocks[i].bottomRight[0]) && ((ballCurrentPos[1] + 20) > blocks[i].bottomLeft[1] && ballCurrentPos[1] < blocks[i].topLeft[1])
        ){
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            // console.log(allBlocks)
            allBlocks[i].classList.remove('block')
            blocks.splice(i,1)
            changeDirection();
        }
    }

    //check for wall collisions
    if(ballCurrentPos[0] >= 540){
        changeDirection();
    }
    if(ballCurrentPos[1] >= 280 ){
        changeDirection();
    }
    if(ballCurrentPos[0] <= 0){
        changeDirection();
    }
    

    // check for game over
    if(ballCurrentPos[1] <= 0 ){
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You Lose'
        document.removeEventListener('keydown',moveUser)
    }
}


function changeDirection(){
    if(xDirection === 2 && yDirection === 2){
        yDirection = -2
        // xDirection = 2
        return
    }
    if(xDirection === 2 && yDirection === -2){
        // yDirection = -2
        xDirection = -2 
        return 
    }
    if(xDirection === -2 && yDirection === -2){
        yDirection = 2
        // xDirection = 2
        return 
    }
    if(xDirection === -2 && yDirection === 2){
        xDirection = 2
        return
    }
    
}
