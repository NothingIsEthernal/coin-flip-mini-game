// Game state
let gameState = {
    wins: 0,
    losses: 0,
    playerChoice: null,
    isFlipping: false
};

// DOM elements
const coin = document.getElementById('coin');
const resultDiv = document.getElementById('result');
const winsSpan = document.getElementById('wins');
const lossesSpan = document.getElementById('losses');
const totalSpan = document.getElementById('total');
const headsBtn = document.getElementById('headsBtn');
const tailsBtn = document.getElementById('tailsBtn');
const resetBtn = document.getElementById('resetBtn');

// Event listeners
headsBtn.addEventListener('click', () => chooseHeads());
tailsBtn.addEventListener('click', () => chooseTails());
resetBtn.addEventListener('click', () => resetGame());
coin.addEventListener('click', () => flipCoin());

// Choose heads
function chooseHeads() {
    if (!gameState.isFlipping) {
        gameState.playerChoice = 'heads';
        flipCoin();
    }
}

// Choose tails
function chooseTails() {
    if (!gameState.isFlipping) {
        gameState.playerChoice = 'tails';
        flipCoin();
    }
}

// Flip coin
function flipCoin() {
    if (gameState.isFlipping || !gameState.playerChoice) {
        return;
    }

    gameState.isFlipping = true;
    resultDiv.textContent = '';
    resultDiv.className = '';

    // Disable buttons during flip
    headsBtn.disabled = true;
    tailsBtn.disabled = true;

    // Add flip animation
    coin.classList.remove('flip');
    void coin.offsetWidth; // Trigger reflow
    coin.classList.add('flip');

    // Determine result after animation
    setTimeout(() => {
        const result = Math.random() < 0.5 ? 'heads' : 'tails';
        determineWinner(result);
        gameState.isFlipping = false;
        headsBtn.disabled = false;
        tailsBtn.disabled = false;
    }, 600);
}

// Determine winner
function determineWinner(coinResult) {
    const playerChoice = gameState.playerChoice;
    const isWin = playerChoice === coinResult;

    if (isWin) {
        gameState.wins++;
        resultDiv.textContent = `🎉 You Won! It was ${coinResult}!`;
        resultDiv.className = 'win';
    } else {
        gameState.losses++;
        resultDiv.textContent = `😞 You Lost! It was ${coinResult}, not ${playerChoice}!`;
        resultDiv.className = 'lose';
    }

    updateStats();
    rotateCoinToResult(coinResult);
}

// Rotate coin to show result
function rotateCoinToResult(result) {
    coin.style.transform = result === 'tails' ? 'rotateY(180deg)' : 'rotateY(0deg)';
}

// Update statistics
function updateStats() {
    winsSpan.textContent = gameState.wins;
    lossesSpan.textContent = gameState.losses;
    totalSpan.textContent = gameState.wins + gameState.losses;
}

// Reset game
function resetGame() {
    if (confirm('Are you sure you want to reset all stats?')) {
        gameState.wins = 0;
        gameState.losses = 0;
        gameState.playerChoice = null;
        resultDiv.textContent = '';
        resultDiv.className = '';
        coin.style.transform = 'rotateY(0deg)';
        coin.classList.remove('flip');
        updateStats();
    }
}

// Initialize
updateStats();
