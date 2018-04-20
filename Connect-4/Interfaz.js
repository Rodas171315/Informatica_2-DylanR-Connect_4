import implement, {Interface, type } from implement-js;

const Jugador = Interface({
    edad: type('number'),
    nombre: type('var'),
    sonido: type('function')
})

const IA = Interface({
    nombre: type('var'),
    dificultad: type('number'),
    frase: type('function')
})

const Frases = Interface({
    ganadoras: type('var'),
    perdedoras: type('var'),
    empate: type('var')
})

const Tableros = Interface({
    small: type('array' [type('number', 'number')]),
    medium: type('array' [type('number', 'number')]),
    big: type('array' [type('number', 'number')])
})

const Ficha = Interface({
    color: type('var')
})