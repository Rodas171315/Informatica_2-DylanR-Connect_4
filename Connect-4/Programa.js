function Jugador(edad, nombre, frase){
    this.edad = edad;
    this.nombre = nombre;
    this.frase = frase;
}
module.exports.Jugador = Jugador;

function IA(nombre, dificultad, frase){
    this.nombre = nombre;
    this.dificultad = dificultad;
    this.frase = frase;
}
module.exports.IA = IA;

function Frases(ganadoras, perdedoras, empate){
    this.ganadoras = ganadoras;
    this.perdedoras = perdedoras;
    this.empate = empate;
}
module.exports.Frases = Frases;

function Tableros(small, medium, big){
    this.small = small;
    this.medium = medium;
    this.big = big;
}
module.exports.Tableros = Tableros;

function Ficha(color){
    this.color = color;
}
module.exports.Ficha = Ficha;

alert("Juega\nConecta con tus amigos!");

var Player1 = prompt("Ingresa tu nombre jugador 1");
var Player2 = prompt("Ingresa tu nombre jugador 2");
var Compu = "Cortana";

// onunload="PageClose()"
function PageClose(){
    var result = confirm("Realmente quieres salir de esta pagina?");
    if (result == true) {
    alert("Gracias por jugar");
    }
    else {
    alert("Quieres la revancha verdad?");
    }
};

var tablero = [
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

var enabledClick = true;
var gameover = false;
var CompuYaJugo = false;

var lastPlayer1Row = 0;
var lastPlayer1Column = 0;

var lastPlayer2Row = 0;
var lastPlayer2Column = 0;

var lastCompuRow = 0;
var lastCompuColumn = 0;

  // turno = indica quién está jugando (si es el turno del jugador 1, cambia == 0, 
  //                                    si es el turno del jugador 2, cambia == 1,
  //                                    si la computadora está encendida, cambia == 2)
  // en la matriz "tablero" ---> si la entrada == 0, entonces el lugar está vacío,
  //                             si la entrada == 1, está la ficha azul,
  //                             si la entrada == 2, está la ficha roja.

    function colocarFicha(column, turno){
        if(enabledClick==false && turno==0){
            return;
        }
    
        enabledClick=false;

        for(i=6; i>=0; i--){
            if(tablero[i][column]==0){      // cuando el punto mas bajo esta vacio
                if(turno=0){
                    tablero[i][column]=1;   // escribe 1 si es el turno del jugador 1
                }else if(turno=1){
                    tablero[i][column]=2;   // escribe 2 si es el turno del jugador 2
                }else{
                tablero[i][column]=3;    // escribe 3 si es el turno de la computadora
                }

                insertarFicha(i, column, turno);{
                    if(turno==0 && !gameover){
                        setTimeout(computurno,1000);
                    }else{
                        if(gameover){
                            enabledClick = false;
                        }else{
                            enabledClick=true;
                        }
                    }
                }
                return;
            }

            if(turno!=0){
                randomTurno();
            }
            enabledClick=true;
        }

    }

    // La propiedad innerHTML establece o devuelve el contenido HTML de un elemento.
    // getElementById encuentra elemento por id

    function insertarFicha(row, column, turno){
        var finalID = row.toString().concat(column.toString());
        var x = document.getElementById(finalID);
        if(turno==0){
            x.innerHTML="<img src='Resource/blue.png' class='ficha'>";
            lastPlayer1Row = row;
            lastPlayer1Column = column;
        }else if(turno==1){
            x.innerHTML="<img src='Resource/red.png' class='ficha'>";
            lastPlayer2Row = row;
            lastPlayer2Column = column;            
        }else{
            x.innerHTML="<img src='Resource/red.png' class='ficha'>";
            lastCompuRow = row;
            lastCompuColumn = column;            
        }
        blopSound.play();

        gameover=checkWin(row, column, turno);

        if(row==0){
            gameover=checkifFull();
        }
    }

    //Realiza un turno aleatoriamente para la computadora
    function randomTurno(){
        var randomColumn = Math.floor(Math.random()*6);
        if(JugadorGanaArriba(ObtenerFila(randomColumn), randomColumn)){
            randomTurno();
            return;
        }
        colocarFicha(randomColumn, 1);
    }

    function checkifFull(){
        for(j=0; j<6; j++){
            if(tablero[0][j]==0){
                return false;
            }
        }

        var x = document.getElementById("gameover");
        x.innerHTML="Empate!";
        x.classList.add("draw");
        return true;
    }

    function ObtenerFila(column){
        for(i=6; i>=0; i--)
        {
            if (tablero[i][column]==0) {
                return i;
            }
            return 0;
        }
    }

    function JugadorGanaArriba(row,column){
        if (row==0){
            return false;
        }
        var JugadorPuedeGanar = JugadorGanariaSi(row-1,column);
        return JugadorPuedeGanar;
    }

    function PuedeColocarse(row,column){
        for(i=6; i>=0; i--)
        {
            if (tablero[i][column]==0) {
                if (row==i) {
                    return true;
                }
                else{
                    return false;
                }
            }
            return false;
        }
    }

    //Comprueba si se gano despues de colocar una ficha
    function checkWin(row, column, turno){

        var count = 0; // Se debe llegar a 4 fichas consecutivas

        // ------------------------ SI EL JUGADOR 1 GANO ------------------------------
        if(turno=0)
        {
            // Horizontal
            for(i=0; i<6; i++){
                if(tablero[row][i]==1){
                    count++;
                    if(count==4){
                        var x = document.getElementById("gameover");
                        x.classList.add("win");
                        x.innerHTML= Player1 + "gano!";
                        winSound.play();
                        return true;
                    }
                }else{
                    count = 0;
                }
            }

            //Vertical
            count = 0;
            for(i=0; i<7; i++){
                if(tablero[i][column]==1){
                    count++;
                    if(count==4){
                        var x = document.getElementById("gameover");
                        x.classList.add("win");
                        x.innerHTML= Player1 + "gano!";
                        winSound.play();
                        return true;
                    }else{
                        count=0;
                    }
                }
            }
        }

        // ------------------------ SI EL JUGADOR 2 GANO ------------------------------
        if(turno=1)
        {
            // Horizontal
            for(i=0; i<6; i++){
                if(tablero[row][i]==1){
                    count++;
                    if(count==4){
                        var x = document.getElementById("gameover");
                        x.classList.add("win");
                        x.innerHTML= Player2 + "gano!";
                        winSound.play();
                        return true;
                    }
                }else{
                    count = 0;
                }
            }

            //Vertical
            count = 0;
            for(i=0; i<7; i++){
                if(tablero[i][column]==1){
                    count++;
                    if(count==4){
                        var x = document.getElementById("gameover");
                        x.classList.add("win");
                        x.innerHTML= Player2 + "gano";
                        winSound.play();
                        return true;
                    }else{
                        count=0;
                    }
                }
            }
        }
    }