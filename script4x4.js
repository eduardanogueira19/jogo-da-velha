const cells = document.querySelectorAll('[data-cell]');
const statusDiv = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

let currentPlayer = 'X';
let board = Array(15).fill(null);
let scores = { X: 0, O: 0 };

const winPatterns = [
    [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], // Linhas
    [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], // Colunas
    [0, 5, 10, 15], [3, 6, 9, 12]              // Diagonais
];

function checkWin(player) {
    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === player)
    );
}

function handleClick(event) {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);

    if (cell.textContent || checkWin('X') || checkWin('O')) return;

    cell.textContent = currentPlayer;
    board[index] = currentPlayer;

    if (checkWin(currentPlayer)) {
        statusDiv.textContent = `${currentPlayer} venceu!`;
        scores[currentPlayer]++;
        updateScoreboard();
        return;
    }

    if (board.every(cell => cell)) {
        statusDiv.textContent = `Empate!`;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDiv.textContent = `É a vez do ${currentPlayer}`;
}

function updateScoreboard() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    statusDiv.textContent = `É a vez do ${currentPlayer}`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

statusDiv.textContent = `É a vez do ${currentPlayer}`;
