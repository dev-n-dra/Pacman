const width = 28
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
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty

const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 2, 2, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 2, 2, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 2, 1, 2, 2, 1, 2, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 2, 2, 4, 4, 2, 2, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 4, 4, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]

//create board--------------------------------------------------------------
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
            squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        }

    }
}
createBoard()


//starting position of pacman ---------------------------------------------
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add('pacman')

// keyboard controls--------------------------------------------------------

pacmanTimerId = setInterval(control, 500)

function control(e) {
    squares[pacmanCurrentIndex].classList.remove('pacman')

    switch (e.key) {
        case 'ArrowDown':
            if (!squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                pacmanCurrentIndex + width < width * width
            )
                pacmanCurrentIndex += width
            break
        case 'ArrowUp':
            if (!squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                pacmanCurrentIndex - width >= 0
            )
                pacmanCurrentIndex -= width
            break
        case 'ArrowLeft':
            if (!squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                pacmanCurrentIndex % width !== 0
            )
                pacmanCurrentIndex -= 1
            if (pacmanCurrentIndex === 364) {
                pacmanCurrentIndex = 391
            }
            break
        case 'ArrowRight':
            if (!squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                pacmanCurrentIndex % width < width - 1
            )
                pacmanCurrentIndex += 1
            if (pacmanCurrentIndex === 391) {
                pacmanCurrentIndex = 364
            }
            break
    }
    squares[pacmanCurrentIndex].classList.add('pacman')
    pacDotEaten()
    powerPelletEaten()
    checkForWin()
    checkForGameOver()
}
document.addEventListener('keyup', control)

// mouse control--------------------------------------------------------
up.addEventListener('click', () => {
    squares[pacmanCurrentIndex].classList.remove('pacman')

    if (!squares[pacmanCurrentIndex - width].classList.contains('wall') && pacmanCurrentIndex - width >= 0) {
        pacmanCurrentIndex -= width
    }

    squares[pacmanCurrentIndex].classList.add('pacman')
    pacDotEaten()
    powerPelletEaten()
    checkForWin()
    checkForGameOver()
})
left.addEventListener('click', () => {
    squares[pacmanCurrentIndex].classList.remove('pacman')

    if (!squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
        pacmanCurrentIndex % width !== 0
    )
        pacmanCurrentIndex -= 1
    if (pacmanCurrentIndex === 364) {
        pacmanCurrentIndex = 391
    }

    squares[pacmanCurrentIndex].classList.add('pacman')
    pacDotEaten()
    powerPelletEaten()
    checkForWin()
    checkForGameOver()
})
down.addEventListener('click', () => {
    squares[pacmanCurrentIndex].classList.remove('pacman')

    if (!squares[pacmanCurrentIndex + width].classList.contains('wall') &&
        pacmanCurrentIndex + width < width * width
    )
        pacmanCurrentIndex += width

    squares[pacmanCurrentIndex].classList.add('pacman')
    pacDotEaten()
    powerPelletEaten()
    checkForWin()
    checkForGameOver()
})
right.addEventListener('click', () => {
    squares[pacmanCurrentIndex].classList.remove('pacman')

    if (!squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
        pacmanCurrentIndex % width < width - 1
    )
        pacmanCurrentIndex += 1
    if (pacmanCurrentIndex === 391) {
        pacmanCurrentIndex = 364
    }

    squares[pacmanCurrentIndex].classList.add('pacman')
    pacDotEaten()
    powerPelletEaten()
    checkForWin()
    checkForGameOver()
})

// function for eating dots-------------------------------------
function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        score++
        scoreDisplay.innerHTML = score
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
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 375, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 380, 500)
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
        checkForGameOver()
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
            //remove eventlistener from our control function
        document.removeEventListener('keyup', control)
            //tell user the game is over   
        scoreDisplay.innerHTML = 'You LOSE'
    }
}

//check for win----------------------------------------------------
function checkForWin() {
    if (score >= 500) {
        //stop each ghost
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
            //remove the eventListener for the control function
        document.removeEventListener('keyup', control)
            //tell our user we have won
        scoreDisplay.innerHTML = 'You WON!'
    }
}