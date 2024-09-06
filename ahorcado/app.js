const words = ['JAVASCRIPT', 'PROGRAMACION', 'AHORCADO', 'DESARROLLO', 'WEB']; // Palabras posibles
let selectedWord = '';
let displayedWord = [];
let mistakes = 0;
const maxMistakes = 6;
let guessedLetters = [];

// Seleccionar elementos del DOM
const wordDisplay = document.getElementById('word-display');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');
const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');

// Función para elegir una palabra aleatoria
function selectRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex];
}

// Función para dibujar el estado del ahorcado
function drawHangman() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (mistakes > 0) {
        // Base
        ctx.beginPath();
        ctx.moveTo(10, 190);
        ctx.lineTo(190, 190);
        ctx.stroke();
    }

    if (mistakes > 1) {
        // Poste vertical
        ctx.beginPath();
        ctx.moveTo(50, 190);
        ctx.lineTo(50, 10);
        ctx.stroke();
    }

    if (mistakes > 2) {
        // Poste horizontal
        ctx.beginPath();
        ctx.moveTo(50, 10);
        ctx.lineTo(150, 10);
        ctx.stroke();
    }

    if (mistakes > 3) {
        // Cuerda
        ctx.beginPath();
        ctx.moveTo(150, 10);
        ctx.lineTo(150, 40);
        ctx.stroke();
    }

    if (mistakes > 4) {
        // Cabeza
        ctx.beginPath();
        ctx.arc(150, 50, 10, 0, Math.PI * 2);
        ctx.stroke();
    }

    if (mistakes > 5) {
        // Cuerpo
        ctx.beginPath();
        ctx.moveTo(150, 60);
        ctx.lineTo(150, 120);
        ctx.stroke();
    }

    if (mistakes > 6) {
        // Pierna izquierda
        ctx.beginPath();
        ctx.moveTo(150, 120);
        ctx.lineTo(130, 150);
        ctx.stroke();

        // Pierna derecha
        ctx.moveTo(150, 120);
        ctx.lineTo(170, 150);
        ctx.stroke();

        // Brazo izquierdo
        ctx.moveTo(150, 80);
        ctx.lineTo(130, 100);
        ctx.stroke();

        // Brazo derecho
        ctx.moveTo(150, 80);
        ctx.lineTo(170, 100);
        ctx.stroke();
    }
}

// Función para inicializar el juego
function initGame() {
    mistakes = 0;
    guessedLetters = [];
    selectRandomWord();
    displayedWord = Array(selectedWord.length).fill('_');
    wordDisplay.textContent = displayedWord.join(' ');
    message.textContent = '';
    restartBtn.style.display = 'none';
    drawHangman();
    generateKeyboard();
}

// Función para generar el teclado
function generateKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    alphabet.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => handleGuess(letter));
        keyboard.appendChild(button);
    });
}

// Función para manejar una letra adivinada
function handleGuess(letter) {
    if (guessedLetters.includes(letter)) return;

    guessedLetters.push(letter);
    
    if (selectedWord.includes(letter)) {
        selectedWord.split('').forEach((char, index) => {
            if (char === letter) {
                displayedWord[index] = letter;
            }
        });

        wordDisplay.textContent = displayedWord.join(' ');

        if (!displayedWord.includes('_')) {
            message.textContent = '¡Ganaste! 🎉';
            document.getElementById('keyboard').innerHTML = '';
            restartBtn.style.display = 'inline-block';
        }
    } else {
        mistakes++;
        drawHangman();

        if (mistakes > maxMistakes) {
            message.textContent = `Perdiste. La palabra era: ${selectedWord}`;
            document.getElementById('keyboard').innerHTML = '';
            restartBtn.style.display = 'inline-block';
        }
    }
}

// Reiniciar el juego
restartBtn.addEventListener('click', initGame);

// Inicializar el juego al cargar
initGame();
