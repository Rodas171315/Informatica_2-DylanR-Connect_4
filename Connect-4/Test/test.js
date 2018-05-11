// http://www.chaijs.com/
// https://mochajs.org/

//    Programa = require('../Programa'),
//    assert = mocha.assert;
//
//describe('Prueba de Metodos con el Programa()', function() {
//   it('Prueba de checkFull()', function() {
//       assert.equal(Programa.checkFull([[1,2,1,2,1,2],[2,1,2,1,2,1],[1,2,1,2,1,2],[2,1,2,1,2,1],[1,2,1,2,1,2],[2,1,2,1,2,1],[1,2,1,2,1,2]]), true);
//    });
//});

var mocha = require('mocha');
var assert = require('assert');

const {Jugador, IA, Frases, Tableros, Ficha} = require("../Programa");

describe('Jugador', function() {
    it('Crea nuevos jugadores', function() {
        var Jugador1 = new Jugador(19, "Dylan", "Cae ante el poder del rey!");
        var x = Jugador1.edad;
        assert.equal(x,19);
    });
});

describe('Jugador', function() {
    it('Crea nuevos jugadores', function() {
        var Jugador2 = new Jugador(19, "Pajopo", "Eeedna Moda!");
        var x = Jugador2.nombre;
        assert.equal(x,"Pajopo");
    });
});

describe('IA', function() {
    it('Crea nuevas IA', function() {
        var Cortana = new IA("Cortana", 10, "Chief, can u hear me?");
        var x = Cortana.nombre;
        assert.equal(x,"Cortana");
    });
});

describe('Frases', function() {
    it('Crea nuevas frases', function() {
        var Frases1 = new Frases("Mas suerte la proxima!", "Oh Raioz!", "Eres un digno adversario");
        var x = Frases1.empate;
        assert.equal(x, "Eres un digno adversario");
    });
});

describe('Tableros', function() {
    it('Crea diferentes tableros', function() {
        var Tableros1 = new Tableros([5,5],[7,6],[10,12]);
        var x = Tableros1.medium;
    });
});

describe('Ficha', function() {
    it('Establece el color de la ficha', function() {
        var FichaAzul = new Ficha("Azul");
        var x = FichaAzul.color;
        assert.equal(x, "Azul");
    });
});

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

const {PuedeColocarse} = require("../BaseCode");
describe('#PuedeColocarse()', function() {
    it('Verifica si se puede colocar la ficha en la posicion solicitada', function() {
        var tablerotest = [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [2,1,2,1,2,1],
            [1,2,1,2,1,2],
            [1,2,1,2,1,2],
            [1,2,1,2,1,2]
        ];
        var row = tablerotest[2][0];
        var column = tablerotest[0][2];

        var actual = PuedeColocarse(row, column, tablerotest);
        var expected = true;

        assert.equal(actual, expected);
    });
});

const{checkFull} = require("../BaseCode");
describe('#checkFull()', function() {
    it('Retorna false si el tablero esta vacio o true si esta lleno', function() {
        var tablerotest = [
            [1,2,1,2,1,2],
            [2,1,2,1,2,1],
            [2,1,2,1,2,1],
            [2,1,2,1,2,1],
            [1,2,1,2,1,2],
            [1,2,1,2,1,2],
            [1,2,1,2,1,2]
        ];
        
        var actual = checkFull(tablerotest);
        var expected = true;

        assert.equal(actual,expected);
    });
});

describe('#checkWin()', function() {
    it('Verifica si se gano en alguna fila o columna', function() {
        ;
    });
});

const {checkWinHorizontal} = require("../BaseCode");
describe('#checkWinHorizontal()', function() {
    it('Verifica si se gano en alguna fila', function() {
        var tablerotest = [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [2,2,2,0,0,0],
            [1,1,1,1,0,0]
        ];

        var row = tablerotest[6][0];
        var turno = 0;
        var actual = checkWinHorizontal(row, turno, tablerotest);
        var expected = true;

        assert.equal(actual,expected);
    });
});

const {checkWinVertical} = require("../BaseCode");
describe('#checkWinVertical()', function() {
    it('Verifica si se gano en alguna columna', function() {
        var tablerotest = [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0],
            [1,0,0,0,0,0],
            [1,2,2,2,0,0]
        ];
        
        var column = tablerotest[0][0];
        var turno = 0;
        var actual = checkWinVertical(column, turno, tablerotest);
        var expected = true;

        assert.equal(actual,expected);
    });
});

const {checkWinDiagonal} = require("../BaseCode");
describe('#checkWinDiagonal()', function() {
    it('Verifica si se gano en alguna diagonal', function() {
        var tablerotest = [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,1,0,0],
            [0,0,1,2,0,0],
            [1,1,1,2,0,0],
            [1,2,2,2,0,0]
        ];
        
        var turno = 0;
        var actual = checkWinDiagonal(turno, tablerotest);
        var expected = true;

        assert.equal(actual,expected);
    });
});

const {resetGame} = require("../BaseCode");
describe('#resetGame()', function() {
    it('Reinicia el juego', function() {
        var tablerotest = [
            [0,0,0,0,0,0],
            [2,1,2,1,2,1]
        ];

        var tablerotest2 = [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ];

        var actual = resetGame(tablerotest);
        var expected = tablerotest2;

        // Hacer un ciclo
        for(i=0; i<=2; i++){
            assert.equal(actual, expected);
        }
    });
});
