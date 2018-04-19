alert("Juega y\nConecta con tus amigos!");

var player1 = prompt("Ingresa tu nombre jugador 1");
var player2 = prompt("Ingresa tu nombre jugador 2");

var result = confirm("Realmente quieres salir de esta pagina?");
if (result == true) {
  alert("Gracias por jugar");
}
else {
  alert("Quieres la revancha verdad?");
}

var board = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]
];

var winSound = new Audio('Audio/won.mp3');
var loseSound = new Audio('Audio/lose.mp3');
var blopSound = new Audio('Audio/blop.mp3');

