import implement, {Interface, type } from implement-js;

var Jugador = Interface({
    edad: type('number'),
    nombre: type('var'),
    frase: type('var')
})

var IA = Interface({
    nombre: type('var'),
    dificultad: type('number'),
    frase: type('var')
})

var Frases = Interface({
    ganadoras: type('var'),
    perdedoras: type('var'),
    empate: type('var')
})

var Tableros = Interface({
    small: type('array' [type('number', 'number')]),
    medium: type('array' [type('number', 'number')]),
    big: type('array' [type('number', 'number')])
})

var Ficha = Interface({
    color: type('var')
})

