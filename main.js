const width = 19
const height = 24
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.score')
const up = document.querySelector('.up')
const down = document.querySelector('.down')
const left = document.querySelector('.left')
const right = document.querySelector('.right')
let squares = []
let score = 0

// 0 - pacdots
// 1 - wall
// 2 - powerpellets
// 3 - empty

const layout = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 2, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 2, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 0, 1, 0, 1, 1, 3, 1, 1, 0, 1, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 0, 1, 0, 1, 3, 3, 3, 3, 0, 1, 0, 1, 1, 1, 1,
        3, 3, 3, 3, 0, 0, 0, 1, 3, 1, 3, 1, 0, 0, 0, 3, 3, 3, 3,
        1, 1, 1, 1, 0, 1, 0, 3, 3, 3, 3, 1, 0, 1, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 0, 1, 0, 1, 1, 3, 1, 1, 0, 1, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 1,
        1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1,
        1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]
    //create board--------------------------------------------------
function createBoard() {
    //for loop 
    for (let i = 0; i < layout.length; i++) {
        //create a square 
        const square = document.createElement('div')
            //put square in grid 
        grid.appendChild(square)
            //put square in squares array
        squares.push(square)

        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
            squares[i].classList.add('power-pellet')
        }

    }
}
createBoard()
let direction = 0
    //starting position of pacman ---------------------------------------------
let pacmanCurrentIndex = 351
squares[pacmanCurrentIndex].classList.add('pacman')

// function for moving the pacman--------------------------
let timerId = setInterval(move, 300)

function move() {
    if (!((pacmanCurrentIndex + width >= width * height && direction === width) || //if pac-man has hit bottom
            (pacmanCurrentIndex % width === width - 1 && direction === 1) || //if pac-man has hit right wall
            (pacmanCurrentIndex % width === 0 && direction === -1) || //if pac-man has hit left wall
            (pacmanCurrentIndex - width < 0 && direction === -width) || //if pac-man has hit top
            squares[pacmanCurrentIndex + direction].classList.contains('wall'))) {
        squares[pacmanCurrentIndex].classList.remove('pacman')
        pacmanCurrentIndex = pacmanCurrentIndex + direction
        if (pacmanCurrentIndex === 209) {
            pacmanCurrentIndex = 227
        } else if (pacmanCurrentIndex === 227) {
            pacmanCurrentIndex = 209
        }
        squares[pacmanCurrentIndex].classList.add('pacman')
        pacDotEaten()
        powerPelletEaten()
        checkForGameOver()
        checkForWin()
    }
}
// controling the pacman-------------------------------
document.addEventListener("keyup", control)

function control(e) {
    if (e.key === 'ArrowDown' && !squares[pacmanCurrentIndex + width].classList.contains('wall')) {
        direction = width
    } else if (e.key === 'ArrowUp' && !squares[pacmanCurrentIndex - width].classList.contains('wall')) {
        direction = -width
    } else if (e.key === 'ArrowLeft' && !squares[pacmanCurrentIndex - 1].classList.contains('wall')) {
        direction = -1
    } else if (e.key === 'ArrowRight' && !squares[pacmanCurrentIndex + 1].classList.contains('wall')) {
        direction = 1
    }
}

// function for eating dots-------------------------------------
function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        score++
        scoreDisplay.textContent = score
    }
}
// function for eating power pallets-------------------------------

function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
        score += 10
        scoreDisplay.innerHTML = score
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhosts, 10000)
    }
}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

// creating a class of ghost and its properties----------------------
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost('blinky', 217, 300),
    new Ghost('pinky', 219, 400),
    new Ghost('inky', 199, 350),
    new Ghost('clyde', 237, 500)
]

//draw my ghosts onto my grid-------------------
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

//move the ghosts---------------------------------------
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    console.log('moved ghost')
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]
    console.log(direction)

    ghost.timerId = setInterval(function() {
        //all our code
        //if the next square does NOT contain a wall and does not contain a ghost
        if (!squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
        ) {
            //remove any ghost
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
                // //add direction to current Index
            ghost.currentIndex += direction
                // //add ghost class
            squares[ghost.currentIndex].classList.add(ghost.className)
            squares[ghost.currentIndex].classList.add('ghost')
        } else direction = directions[Math.floor(Math.random() * directions.length)]

        //if the ghost is currently scared 
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }

        //if the ghost is current scared AND pacman is on it
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
            //remove classnames - ghost.className, 'ghost', 'scared-ghost'
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                // change ghosts currentIndex back to its startIndex
            ghost.currentIndex = ghost.startIndex
                //add a score of 100
            score += 100
            scoreDisplay.innerHTML = score
                //re-add classnames of ghost.className and 'ghost' to the ghosts new postion  
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
    }, ghost.speed)
}

//check for game over--------------------------------------------
function checkForGameOver() {
    //if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost 
    if (
        squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')
    ) {
        //for each ghost - we need to stop it moving
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        clearInterval(timerId)
            //remove eventlistener from our control function
        document.removeEventListener('keyup', control)
            //tell user the game is over   
        scoreDisplay.textContent = 'You LOSE'
    }
}

//check for win----------------------------------------------------
function checkForWin() {
    if (score >= 300) {
        //stop each ghost
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        clearInterval(timerId)
            //remove the eventListener for the control function
        document.removeEventListener('keyup', control)
            //tell our user we have won
        scoreDisplay.textContent = 'You WON!'
    }
}

// touch compatability

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches || // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) { /*most significant*/
        if (xDiff > 0) {
            direction = -1
        } else {
            /* right swipe */
            direction = 1
        }
    } else {
        if (yDiff > 0) {
            /* up swipe */
            direction = -width
        } else {
            /* down swipe */
            direction = width
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};