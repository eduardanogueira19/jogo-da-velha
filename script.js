const cells = document.querySelectorAll('[data-cell]');
const statusDiv = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let board = Array(9).fill(null);

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
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
        statusDiv.textContent = '${currentPlayer} venceu!';
        return;
    }

    if (board.every(cell => cell)) {
        statusDiv.textContent = 'Empate!';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDiv.textContent = 'É a vez do ${currentPlayer}';
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    statusDiv.textContent = 'É a vez do ${currentPlayer}';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

statusDiv.textContent = 'É a vez do ${currentPlayer}';