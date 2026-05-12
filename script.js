/* ==================== GAME DATA ==================== */
const gameData = {
    easy: {
        words: [
            { word: 'BOOK', type: 'Literacy', challenge: 'A bound set of pages with a story' },
            { word: 'MATH', type: 'Math', challenge: 'Solve: 2 + 2 = 4. Spell the word for this subject' },
            { word: 'READ', type: 'Literacy', challenge: 'To look at words and understand them' },
            { word: 'PLAN', type: 'Math', challenge: 'Solve: 5 + 5 = 10. This is a 4-letter ___' },
            { word: 'POEM', type: 'Literacy', challenge: 'A piece of creative writing with rhymes' },
            { word: 'QUIZ', type: 'Math', challenge: 'Solve: 3 × 3 = 9. A short test or ___ question' },
            { word: 'IDEA', type: 'Literacy', challenge: 'A thought or suggestion' },
            { word: 'AREA', type: 'Math', challenge: 'Solve: 4 × 3 = 12. The space inside a shape is called ___' }
        ],
        maxAttempts: 8
    },
    medium: {
        words: [
            { word: 'STORY', type: 'Literacy', challenge: 'A narrative tale or account of events' },
            { word: 'GRAPH', type: 'Math', challenge: 'Solve: 10 - 3 = 7. A visual display of data on a ___' },
            { word: 'NOVEL', type: 'Literacy', challenge: 'A long fictional narrative book' },
            { word: 'SHAPE', type: 'Math', challenge: 'Solve: 6 + 4 = 10. A circle or square is a geometric ___' },
            { word: 'THEME', type: 'Literacy', challenge: 'The main idea or subject of a story' },
            { word: 'LOGIC', type: 'Math', challenge: 'Solve: 8 ÷ 2 = 4. Mathematical ___ and reasoning' },
            { word: 'WRITE', type: 'Literacy', challenge: 'To compose words on paper or screen' },
            { word: 'ANGLE', type: 'Math', challenge: 'Solve: 45 + 45 = 90. A 90-degree ___ is a right angle' },
            { word: 'FABLE', type: 'Literacy', challenge: 'A short story with a moral lesson' },
            { word: 'EQUAL', type: 'Math', challenge: 'Solve: 7 = 7. Two things that are the same are ___' }
        ],
        maxAttempts: 6
    },
    hard: {
        words: [
            { word: 'AUTHOR', type: 'Literacy', challenge: 'A person who writes books or stories' },
            { word: 'VOLUME', type: 'Math', challenge: 'Solve: 5 × 4 × 3 = 60. The amount of space in a 3D shape' },
            { word: 'POETRY', type: 'Literacy', challenge: 'Creative writing using rhythm and emotion' },
            { word: 'METRIC', type: 'Math', challenge: 'Solve: 1000mm = 1m. The ___ system measures in powers of 10' },
            { word: 'SYMBOL', type: 'Literacy', challenge: 'A sign or image that represents something else' },
            { word: 'PRIMES', type: 'Math', challenge: 'Solve: 2,3,5,7. Numbers divisible only by 1 and themselves' },
            { word: 'PHRASE', type: 'Literacy', challenge: 'A group of words that express an idea' },
            { word: 'MATRIX', type: 'Math', challenge: 'Solve: 2×2 with 4 elements. A rectangular array of numbers' },
            { word: 'THESIS', type: 'Literacy', challenge: 'The main argument or claim in an essay' },
            { word: 'CALCULUS', type: 'Math', challenge: 'The branch of math dealing with change and motion' }
        ],
        maxAttempts: 5
    }
};

/* ==================== GAME STATE ==================== */
let gameState = {
    difficulty: 'medium',
    currentWord: {},
    guesses: [],
    currentGuess: '',
    gameOver: false,
    won: false,
    hintUsed: false,
    score: 0,
    streak: 0,
    wins: 0,
    keyStates: {}
};

/* ==================== INITIALIZATION ==================== */
document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    startNewGame();
    addKeyboardSupport();
});

function startNewGame() {
    const difficulty = document.getElementById('difficulty').value;
    gameState.difficulty = difficulty;
    gameState.currentWord = getRandomWord(difficulty);
    gameState.guesses = [];
    gameState.currentGuess = '';
    gameState.gameOver = false;
    gameState.won = false;
    gameState.hintUsed = false;
    gameState.keyStates = {};
    
    document.getElementById('hintBtn').disabled = false;
    document.getElementById('hintDisplay').style.display = 'none';
    document.getElementById('gameOverModal').style.display = 'none';
    
    updateDisplay();
    renderGameBoard();
}

function getRandomWord(difficulty) {
    const words = gameData[difficulty].words;
    return words[Math.floor(Math.random() * words.length)];
}

function changeDifficulty() {
    startNewGame();
}

/* ==================== DISPLAY UPDATES ==================== */
function updateDisplay() {
    const maxAttempts = gameData[gameState.difficulty].maxAttempts;
    const remainingAttempts = maxAttempts - gameState.guesses.length;
    
    document.getElementById('challengeType').textContent = 
        `🎯 ${gameState.currentWord.type} Challenge: ${gameState.currentWord.challenge}`;
    document.getElementById('attempts').textContent = gameState.guesses.length;
    document.getElementById('maxAttempts').textContent = maxAttempts;
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('streak').textContent = gameState.streak;
    document.getElementById('wins').textContent = gameState.wins;
}

function renderGameBoard() {
    const maxAttempts = gameData[gameState.difficulty].maxAttempts;
    const wordLength = gameState.currentWord.word.length;
    const container = document.getElementById('guessesContainer');
    container.innerHTML = '';

    for (let i = 0; i < maxAttempts; i++) {
        const row = document.createElement('div');
        row.className = 'guess-row';
        
        for (let j = 0; j < wordLength; j++) {
            const box = document.createElement('div');
            box.className = 'letter-box';
            
            if (i < gameState.guesses.length) {
                const letter = gameState.guesses[i][j];
                box.textContent = letter;
                
                if (letter === gameState.currentWord.word[j]) {
                    box.classList.add('correct');
                } else if (gameState.currentWord.word.includes(letter)) {
                    box.classList.add('present');
                } else {
                    box.classList.add('absent');
                }
            } else if (i === gameState.guesses.length) {
                if (j < gameState.currentGuess.length) {
                    box.textContent = gameState.currentGuess[j];
                }
                box.classList.add('active');
            }
            
            row.appendChild(box);
        }
        container.appendChild(row);
    }
    updateDisplay();
}

/* ==================== GAME INPUT ==================== */
function guessLetter(letter) {
    if (gameState.gameOver || gameState.currentGuess.length >= gameState.currentWord.word.length) {
        return;
    }
    
    gameState.currentGuess += letter;
    renderGameBoard();
}

function deleteLetter() {
    if (gameState.gameOver) return;
    gameState.currentGuess = gameState.currentGuess.slice(0, -1);
    renderGameBoard();
}

function submitGuess() {
    if (gameState.gameOver) {
        startNewGame();
        return;
    }

    const wordLength = gameState.currentWord.word.length;
    
    if (gameState.currentGuess.length !== wordLength) {
        alert(`Please enter a ${wordLength}-letter word!`);
        return;
    }

    gameState.guesses.push(gameState.currentGuess);
    updateKeyStates();

    if (gameState.currentGuess === gameState.currentWord.word) {
        // Won!
        calculateScore();
        endGame(true);
    } else if (gameState.guesses.length === gameData[gameState.difficulty].maxAttempts) {
        // Lost
        gameState.streak = 0;
        endGame(false);
    } else {
        gameState.currentGuess = '';
        renderGameBoard();
    }
}

function updateKeyStates() {
    const guess = gameState.currentGuess;
    const word = gameState.currentWord.word;

    for (let i = 0; i < guess.length; i++) {
        const letter = guess[i];
        
        if (word[i] === letter) {
            gameState.keyStates[letter] = 'correct';
        } else if (word.includes(letter) && gameState.keyStates[letter] !== 'correct') {
            gameState.keyStates[letter] = 'present';
        } else if (!gameState.keyStates[letter]) {
            gameState.keyStates[letter] = 'absent';
        }
    }
    
    updateKeyboardDisplay();
}

function updateKeyboardDisplay() {
    document.querySelectorAll('.key').forEach(button => {
        const letter = button.textContent;
        if (gameState.keyStates[letter]) {
            button.classList.remove('correct', 'present', 'absent');
            button.classList.add(gameState.keyStates[letter]);
        }
    });
}

function calculateScore() {
    const baseScore = 100;
    const penaltyPerGuess = 10;
    const guessCount = gameState.guesses.length;
    const wordLengthBonus = gameState.currentWord.word.length * 5;
    
    const score = Math.max(0, baseScore - (guessCount * penaltyPerGuess) + wordLengthBonus);
    gameState.score += score;
    gameState.streak += 1;
    gameState.wins += 1;
    
    return score;
}

function endGame(won) {
    gameState.gameOver = true;
    gameState.won = won;
    
    const modal = document.getElementById('gameOverModal');
    const title = document.getElementById('gameOverTitle');
    const message = document.getElementById('gameOverMessage');
    const finalScore = document.getElementById('finalScore');

    if (won) {
        title.textContent = '🎉 You Won!';
        message.textContent = `Congratulations! You guessed the word: ${gameState.currentWord.word}`;
        finalScore.textContent = gameState.score;
    } else {
        title.textContent = '😢 Game Over';
        message.textContent = `The word was: ${gameState.currentWord.word}. Better luck next time!`;
        gameState.streak = 0;
        finalScore.textContent = gameState.score;
    }

    saveStats();
    renderGameBoard();
    modal.style.display = 'flex';
}

/* ==================== HINT SYSTEM ==================== */
function showHint() {
    if (gameState.hintUsed || gameState.gameOver) return;

    gameState.hintUsed = true;
    document.getElementById('hintBtn').disabled = true;

    const word = gameState.currentWord.word;
    const hintIndex = Math.floor(Math.random() * word.length);
    const hintLetter = word[hintIndex];
    
    const hintText = `Hint: There is a '${hintLetter}' in position ${hintIndex + 1}`;
    document.getElementById('hintText').textContent = hintText;
    document.getElementById('hintDisplay').style.display = 'block';
}

/* ==================== STATISTICS ==================== */
function saveStats() {
    const stats = {
        score: gameState.score,
        streak: gameState.streak,
        wins: gameState.wins
    };
    localStorage.setItem('wordleStats', JSON.stringify(stats));
}

function loadStats() {
    const saved = localStorage.getItem('wordleStats');
    if (saved) {
        const stats = JSON.parse(saved);
        gameState.score = stats.score;
        gameState.streak = stats.streak;
        gameState.wins = stats.wins;
    }
    updateDisplay();
}

/* ==================== KEYBOARD SUPPORT ==================== */
function addKeyboardSupport() {
    document.addEventListener('keydown', (event) => {
        if (gameState.gameOver) return;

        const letter = event.key.toUpperCase();
        
        if (/^[A-Z]$/.test(letter)) {
            guessLetter(letter);
        } else if (event.key === 'Backspace') {
            deleteLetter();
        } else if (event.key === 'Enter') {
            submitGuess();
        }
    });
}