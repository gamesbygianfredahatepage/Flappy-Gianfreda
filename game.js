const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Carica l'immagine del personaggio
const character = new Image();
character.src = 'images/2993C541-CC22-495D-9BCA-9F349D3D7DAE';  // Assicurati di avere questa immagine nella tua cartella

// Imposta variabili del gioco
let characterX = 50;
let characterY = 150;
let gravity = 0.6;
let lift = -15;
let velocity = 0;

let pipes = [];
let pipeWidth = 50;
let pipeGap = 150;
let pipeFrequency = 90;
let frameCount = 0;

// Funzione per disegnare il personaggio
function drawCharacter() {
    ctx.drawImage(character, characterX, characterY, 40, 40);
}

// Funzione per creare i tubi
function createPipe() {
    let pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap));
    pipes.push({
        x: canvas.width,
        top: pipeHeight,
        bottom: canvas.height - pipeHeight - pipeGap,
    });
}

// Funzione per disegnare i tubi
function drawPipes() {
    ctx.fillStyle = "green";
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);  // Tubo superiore
        ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipeWidth, pipe.bottom);  // Tubo inferiore
        pipe.x -= 2;  // Movimento dei tubi
    });
}

// Funzione per aggiornare la posizione e la gravità
function update() {
    velocity += gravity;
    characterY += velocity;

    if (characterY + 40 > canvas.height || characterY < 0) {
        alert("Game Over! Ricarica la pagina per riprovare.");
        resetGame();
    }

    if (frameCount % pipeFrequency === 0) {
        createPipe();
    }

    pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);
    frameCount++;
}

// Funzione per resettare il gioco
function resetGame() {
    characterY = 150;
    velocity = 0;
    pipes = [];
    frameCount = 0;
}

// Funzione per far saltare il personaggio
function jump() {
    velocity = lift;
}

// Aggiungi l'evento per far saltare il personaggio
document.addEventListener("keydown", event => {
    if (event.code === "Space") {
        jump();
    }
});

// Funzione principale del gioco
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Pulisce il canvas
    drawCharacter();
    drawPipes();
    update();
    requestAnimationFrame(gameLoop);  // Ripeti il ciclo di gioco
}

gameLoop();  // Inizia il gioco
