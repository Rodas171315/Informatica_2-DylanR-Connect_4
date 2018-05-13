import implement, {Interface, type } from implement-js;

// El proposito de la interfaz Jugador es agregar una variedad de jugadores para cuando se conecten varias personas.
var Jugador = Interface({
    edad: type('number'),
    nombre: type('var'),
    frase: type('var')
})

// El proposito de la interfaz IA es agregar una variedad de jugadores IA para dar variedad al juego con distintos contrincates.
var IA = Interface({
    nombre: type('var'),
    dificultad: type('number'),
    frase: type('var')
})

// El proposito de la interfaz Frases es agregar una variedad de dialogos para poder interactuar con los otros jugadores o el rival durante la partida.
var Frases = Interface({
    ganadoras: type('var'),
    perdedoras: type('var'),
    empate: type('var')
})

// El proposito de la interfaz Tableros es agregar una variedad de tableros para optimizar la dificultad del juego.
var Tableros = Interface({
    small: type('array' [type('number', 'number')]),
    medium: type('array' [type('number', 'number')]),
    big: type('array' [type('number', 'number')])
})

// El proposito de la interfaz Ficha es agregar una variedad de fichas para personalizar y volver mas amena la partida de los jugadores.
var Ficha = Interface({
    color: type('var')
})
