/*function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];


    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const dropToken = (column, player) => {
        const availableCells = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);

        if (!availableCells.length) return;

        const nextCell = Math.floor((Math.random() * (availableCells.length - 1)));
        board[nextCell][column].addToken(player);
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    return { getBoard, dropToken, printBoard };
}

function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addToken, 
        getValue
    };
}

function GameController (
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0];
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (column) => {
        console.log(
            `Dropping ${getActivePlayer().name}'s token into column ${column}...`
        );
        board.dropToken(column, getActivePlayer().token);

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}
const game = GameController(); */

const X_CLASS = 'x';
const O_CLASS = 'o';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');
const restartBtn = document.getElementById('restartButton');
const players = document.getElementById('players');
const labelX = document.createElement('label')
const labelO = document.createElement('label')
const playerX = document.createElement('input');
const playerO = document.createElement('input');
const playerXscore = document.createElement('p');
const playerOscore = document.createElement('p');
players.appendChild(playerXscore);
players.appendChild(playerOscore);
let oTurn
let Xscore = 0;
let Oscore = 0;

function createPlayers() {

    playerX.value = '';
    playerO.value = '';
    const iform = document.createElement('form');

    labelX.textContent = 'Name of Player 1: ';
    labelX.classList.add('labelx');
    labelO.textContent = 'Name of Player 2: ';
    labelO.classList.add('labelo');
    
    playerX.setAttribute('type', 'text');
    playerX.setAttribute('name', 'PlayerXName');
    playerX.setAttribute('placeholder', 'Name of Player1');
    playerX.classList.add('playerx');

    
    playerO.setAttribute('type', 'text');
    playerO.setAttribute('name', 'PlayerOName');
    playerO.setAttribute('placeholder', 'Name of Player2');
    playerO.classList.add('playero');

    const start = document.createElement('input');
    start.setAttribute('type', 'button');
    start.setAttribute('value', 'Start');
    start.classList.add('start');

    start.addEventListener('click', startGame);
    start.addEventListener('click', gameScores);

    iform.appendChild(labelX);
    iform.appendChild(playerX);
    iform.appendChild(labelO);
    iform.appendChild(playerO);
    iform.appendChild(start);

    players.appendChild(iform);


}

createPlayers()


restartBtn.addEventListener('click', startGame);



function startGame() {

    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show');

}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else if (oTurn) {
        winningMessageTextElement.innerText = `${playerO.value} Wins!`;
        Oscore++;
    } else{
        winningMessageTextElement.innerText = `${playerX.value} Wins!`;
        Xscore++;
    } 
    
    /* else {
        winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
    } */
    winningMessageElement.classList.add('show');
    gameScores();
    overallWinner()

}
function gameScores() {
    

    playerXscore.textContent = `${playerX.value}'s score is ${Xscore}`;
    playerOscore.textContent = `${playerO.value}'s score is ${Oscore}`;

    players.innerText = `${playerXscore.textContent}, ${playerOscore.textContent}`;

}

function overallWinner() {
    if (Oscore === 3) {
        winningMessageTextElement.innerText = `Game Over!, ${playerOscore.textContent}  and Has Won!`;
        Oscore = 0;
        Xscore = 0;
        players.innerHTML = '';
        createPlayers();
    } else if (Xscore === 3) {
        winningMessageTextElement.innerText = `Game Over!, ${playerXscore.textContent} and Has Won!`;
        Oscore = 0;
        Xscore = 0;
        players.innerHTML = '';
        createPlayers();
    }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })

}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    oTurn = !oTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }

}
function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}