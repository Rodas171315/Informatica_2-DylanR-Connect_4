// http://www.chaijs.com/
// https://mochajs.org/

//var mocha = require('mocha'),
//    Programa = require('../Programa'),
//    assert = mocha.assert;
//
//describe('Prueba de Metodos con el Programa()', function() {
//   it('Prueba de checkFull()', function() {
//       assert.equal(Programa.checkFull([[1,2,1,2,1,2],[2,1,2,1,2,1],[1,2,1,2,1,2],[2,1,2,1,2,1],[1,2,1,2,1,2],[2,1,2,1,2,1],[1,2,1,2,1,2]]), true);
//    });
//});

var assert = require('assert');

describe('Jugador', function() {
    it('Crea nuevos jugadores', function() {
        function Jugador(edad, nombre, frase){
            this.edad = edad;
            this.nombre = nombre;
            this.frase = frase;
        }
        var Jugador1 = new Jugador(19, "Dylan", "Cae ante el poder del rey!");
        var x = Jugador1.edad;
        assert.equal(x,19);
    });
});

describe('Jugador', function() {
    it('Crea nuevos jugadores', function() {
        function Jugador(edad, nombre, frase){
            this.edad = edad;
            this.nombre = nombre;
            this.frase = frase;
        }
        var Jugador2 = new Jugador(19, "Pajopo", "Eeedna Moda!");
        var x = Jugador2.nombre;
        assert.equal(x,"Pajopo");
    });
});

describe('IA', function() {
    it('Crea nuevas IA', function() {
        function IA(nombre, dificultad, frase){
            this.nombre = nombre;
            this.dificultad = dificultad;
            this.frase = frase;
        }
        var Cortana = new IA("Cortana", 10, "Chief, can u hear me?");
        var x = Cortana.nombre;
        assert.equal(x,"Cortana");
    });
});

describe('Frases', function() {
    it('Crea nuevas frases', function() {
        function Frases(ganadoras, perdedoras, empate){
            this.ganadoras = ganadoras;
            this.perdedoras = perdedoras;
            this.empate = empate;
        }
        var Frases1 = new Frases("Mas suerte la proxima!", "Oh Raioz!", "Eres un digno adversario");
        var x = Frases1.empate;
        assert.equal(x, "Eres un digno adversario");
    });
});

describe('Tableros', function() {
    it('Crea diferentes tableros', function() {
        function Tableros(small, medium, big){
            this.small = small;
            this.medium = medium;
            this.big = big;
        }
        var Tableros1 = new Tableros([5,5],[7,6],[10,12]);
        var x = Tableros1.medium;
    });
});

describe('Ficha', function() {
    it('Establece el color de la ficha', function() {
        function Ficha(color){
            this.color = color;
        }
        var FichaAzul = new Ficha("Azul");
        var x = FichaAzul.color;
        assert.equal(x, "Azul");
    });
});

var tablero = [
    [1,2,1,2,1,2],
    [2,1,2,1,2,1],
    [1,2,1,2,1,2],
    [2,1,2,1,2,1],
    [1,2,1,2,1,2],
    [2,1,2,1,2,1],
    [1,2,1,2,1,2]
];

describe('#colocarFicha()', function() {
    it('Si el jugador esta habilitado permite colocar una ficha', function() {
        ;
    });
});

describe('#insertarFicha()', function() {
    it('Inserta la ficha en el tablero', function() {
        ;
    });
});

describe('#randomTurno()', function() {
    it('Realiza un turno aleatorio para la computadora', function() {
        ;
    });
});

describe('#checkFull()', function() {
    it('Retorna false si el tablero esta vacio o true si esta lleno', function() {
        tablero;
    });
});

describe('#checkWin()', function() {
    it('Verifica si se gano en alguna fila o columna', function() {
        ;
    });
});

