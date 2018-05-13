// /*-------------------------------------------------- REFERENCIAS -------------------------------------------------*/
// http://www.chaijs.com/
// https://mochajs.org/

// const {Algo} = require('../Programa');
//describe('Nombre del Metodo()', function() {
//   it('Descripcion de su proposito', function() {
//       assert.equal(actual,expected);
//    });
//});

var mocha = require('mocha');
var assert = require('assert');

/*-------------------------------------------------- TESTS DE INTERFAZ -------------------------------------------------*/

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

/*-------------------------------------------------- TESTS DE FUNCIONES -------------------------------------------------*/

const {colocarFicha} = require("../BaseCode");
describe('#colocarFicha()', function() {
    it('Si el jugador esta habilitado permite colocar una ficha', function() {
        var tablerotest = [
            [0,0,0,0,0,0],  // <-- Con el jugador habilitado se busca colocar la ficha del jugador en
            [2,1,2,1,2,1],  //     el quinto elemento de este arreglo
            [2,1,2,1,2,1],
            [2,1,2,1,2,1],
            [1,2,1,2,1,2],
            [1,2,1,2,1,2],
            [1,2,1,2,1,2]
        ];

        enabledClicktest = true;
        var columntest = 4;
        var turnotest = 0;
        colocarFicha(columntest, turnotest, tablerotest, enabledClicktest);

        var actual = tablerotest[0][4];
        var expected = 1;

        assert.equal(actual, expected);
    });
});

const {ObtenerFila} = require("../BaseCode");
describe('#ObtenerFila()', function() {
    it('Solicita una fila disponible para que la IA pueda realizar su turno', function() {
        var tablerotest = [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [2,1,0,1,2,1],  // <-- Se busca obtener esta fila como disponible para colocar la ficha del turno de la IA
            [1,2,1,2,1,2],
            [1,2,1,2,1,2],
            [1,2,1,2,1,2]
        ];

        var columntest = 2;
        var actual = ObtenerFila(columntest, tablerotest);
        var expected = 3;

        assert.equal(actual, expected);
    });
});

const {PuedeColocarse} = require("../BaseCode");
describe('#PuedeColocarse()', function() {
    it('Verifica si se puede colocar la ficha en la posicion solicitada', function() {
        var tablerotest = [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0], // <-- Se busca verificar el tercer elemento de este arreglo
            [2,1,2,1,2,1],
            [1,2,1,2,1,2],
            [1,2,1,2,1,2],
            [1,2,1,2,1,2]
        ];
        
        var rowtest = 2;
        var columntest = 2;
        var actual = PuedeColocarse(rowtest, columntest, tablerotest);
        var expected = true;

        assert.equal(actual, expected);
    });
});

const {JugadorPuedeGanarSi} = require("../BaseCode");
describe('#JugadorPuedeGanarSi()', function() {
    it('Verifica si el jugador puede llegar a ganar si se realiza algun turno especifico', function() {
        var tablerotest = [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,2],
            [0,0,0,0,0,1],
            [0,2,2,2,1,1],  // <-- Se busca verificar que el Jugador al mover en el 
            [1,1,2,2,2,1]   //     primer elemento de esta fila no gana
        ];

        var rowtest = 6;
        var columntest = 0;
        turnotest = 0;
        var actual = JugadorPuedeGanarSi(rowtest, columntest, turnotest, tablerotest);
        var expected = false;
        assert.equal(actual, expected);        
    });
});

const {CompuPuedeGanarSi} = require("../BaseCode");
describe('#CompuPuedeGanarSi()', function() {
    it('Verifica si la computadora puede llegar a ganar si se realiza algun turno especifico', function() {
        var tablerotest = [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [1,2,1,1,1,0],  // <-- Se busca verificar que la Computadora al mover en el
            [2,1,2,2,2,1]   //     ultimo elemento de esta fila no gana
        ];

        var rowtest = 5;
        var columntest = 5;
        turnotest = 1;
        var actual = CompuPuedeGanarSi(rowtest, columntest, turnotest, tablerotest);
        var expected = false;
        assert.equal(actual, expected);
    });
});

const{checkFull} = require("../BaseCode");
describe('#checkFull()', function() {
    it('Verifica si el tablero esta lleno o si aun hay elementos vacios', function() {
        var tablerotest = [
            [1,2,1,2,1,2],  // <-- Se busca verificar que en efecto, el tablero esta lleno
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
            [1,1,1,1,0,0]   // <-- Se busca verificar que en esta fila ya se consiguio la victoria
        ];

        var rowtest = 6;
        var turnotest = 0;
        var actual = checkWinHorizontal(rowtest, turnotest, tablerotest);
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
            [1,0,0,0,0,0],  // <-- Se busca verificar que en la primera columna ya se consiguio la victoria
            [1,0,0,0,0,0],
            [1,0,0,0,0,0],
            [1,2,2,2,0,0]
        ];
        
        var columntest = 0;
        var turnotest = 0;
        var actual = checkWinVertical(columntest, turnotest, tablerotest);
        var expected = true;

        assert.equal(actual,expected);
    });
});

const {checkWinDiagonal} = require("../BaseCode");
describe('#checkWinDiagonal()', function() {
    it('Verifica si se gano en la primera diagonal', function() {
        var tablerotest = [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,1,0,0],  // <-- Se busca verificar que en la primera diagonal ya se consiguio la victoria
            [0,0,1,2,0,0],
            [1,1,1,2,0,0],
            [1,2,2,2,0,0]
        ];
        
        var rowtest = 6;
        var columntest = 0;
        var turnotest = 0;
        var actual = checkWinDiagonal(rowtest, columntest, turnotest, tablerotest);
        var expected = true;

        assert.equal(actual,expected);
    });
});

describe('#checkWinDiagonal() 2', function() {
    it('Verifica si se gano en la segunda diagonal', function() {
        var tablerotest = [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,1,0,0,0],  // <-- Se busca verificar que en la segunda diagonal ya se consiguio la victoria
            [0,0,2,1,0,0],
            [0,0,2,1,1,1],
            [0,0,2,2,2,1]
        ];
        
        var rowtest = 6;
        var columntest = 5;
        var turnotest = 0;
        var actual = checkWinDiagonal(rowtest, columntest, turnotest, tablerotest);
        var expected = true;

        assert.equal(actual,expected);
    });
});

const {resetGame} = require("../BaseCode");
describe('#resetGame()', function() {
    it('Reinicia el juego', function() {
        var tablerotest = [
            [0,0,0,0,0,0],
            [2,1,2,1,2,1],
            [2,1,2,1,2,1],
            [2,1,2,1,2,1],
            [1,2,1,2,1,2],
            [1,2,1,2,1,2],  // <-- Se busca convertir nuevamente todos los elementos de los arreglos a 0,
            [1,2,1,2,1,2]   //     como en el tablero demostrado a continuacion
        ];

        var tableroExpected = [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ];

        var reset = resetGame(tablerotest);
        var expected = true;
        var actual;

        // Verifica que cada valor de tablero sea igual a 0
        for(i=0; i<7; i++){
            for(j=0; j<6; j++){
                if(reset[i][j] == 0){
                    actual = true;
                }else{
                    actual = false;
                }
            }
        }

        assert.equal(actual,expected);
    });
});
