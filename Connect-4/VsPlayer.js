import { resetGame } from "./BaseCode";

function Alert(){
    alert("Juega\nConecta con tus amigos!");
}

function Prompt(){
    var Player1 = prompt("Ingresa tu nombre jugador 1");
    var Player2 = prompt("Ingresa tu nombre jugador 2");
    return Player1;
    return Player2;
}

// Alert();
// Prompt();

var tablero = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]
];

function Audio(){
    var winSound = new Audio('Audio/won.mp3');
    var loseSound = new Audio('Audio/lose.mp3');
    var blopSound = new Audio('Audio/blop.mp3');
}

var gameover = false;

var lastPlayer1Row = 0;
var lastPlayer1Column = 0;

var lastPlayer2Row = 0;
var lastPlayer2Column = 0;

// turno = indica quién está jugando (si es el turno del jugador 1, cambia == 0, 
//                                    si es el turno del jugador 2, cambia == 1,)
// en la matriz "tablero" ---> si la entrada == 0, entonces el lugar está vacío,
//                             si la entrada == 1, está la ficha azul,
//                             si la entrada == 2, está la ficha roja.


function SoloGame()
{
    resetGame();
}
