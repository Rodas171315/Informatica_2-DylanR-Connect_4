function Alert(){
    alert("Juega\nConecta con tus amigos!");
}

function Prompt(){
    var nombre = prompt("Ingresa tu nombre jugador 1");
    var edad = prompt("Ingresa tu edad jugador 1");
    var frase = prompt("Ingresa tu grito de batalla jugador 1");
    var Player1 = new Jugador(edad, nombre, frase);
    var nombre = prompt("Ingresa tu nombre jugador 2");
    var edad = prompt("Ingresa tu edad jugador 2");
    var frase = prompt("Ingresa tu grito de batalla jugador 2");    
    var Player2 = new Jugador(edad, nombre, frase);
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

var winSound = new Audio('https://raw.githubusercontent.com/Rodas171315/Informatica_2-DylanR-Connect_4/master/Connect-4/Audio/won.mp3');
var loseSound = new Audio('https://raw.githubusercontent.com/Rodas171315/Informatica_2-DylanR-Connect_4/master/Connect-4/Audio/lose.mp3');
var blopSound = new Audio('https://raw.githubusercontent.com/Rodas171315/Informatica_2-DylanR-Connect_4/master/Connect-4/Audio/blop.mp3');

var gameover = false;
var P1YaJugo = false;

var lastPlayer1Row = 0;
var lastPlayer1Column = 0;

var lastPlayer2Row = 0;
var lastPlayer2Column = 0;

// turno = indica quién está jugando (si es el turno del jugador 1, cambia == 0,
//                                    si es el turno del jugador 2, cambia == 1)
// en la matriz "tablero" ---> si la entrada == 0, entonces el lugar está vacío,
//                             si la entrada == 1, está la ficha azul,
//                             si la entrada == 2, está la ficha roja.

function colocarFicha(column, turno){
    if(P1YaJugo==true && turno==0){
        turno = 1;
    }

    P1YaJugo=true;
    
    for(i=6; i>=0; i--){
        if(tablero[i][column]==0){      // cuando el punto mas bajo esta vacio
            if(turno==0){
                tablero[i][column]=1;   // escribe 1 si es el turno del jugador 1
            }else{
                tablero[i][column]=2;   // escribe 2 si es el turno del jugador 2
            }

            insertarFicha(i, column, turno);
            if(turno==0 && !gameover){
                turno = 1;
            }else{
                if(gameover){
                    P1YaJugo=true;
                }else{
                    P1YaJugo=false;
                }
            }            
            return; 
        }
    }

    if(turno!=0){
        P1YaJugo=false;
    }
    P1YaJugo=true;    
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
    }else{
        x.innerHTML="<img src='Resource/red.png' class='ficha'>";
        lastPlayer2Row = row;
        lastPlayer2Column = column;            
    }
    blopSound.play();

    gameover=checkWin(row, column, turno);

    if(row==0){
        gameover=checkFull();
    }
}

function PuedeColocarse(row,column){
    for(i=6; i>=0; i--)
    {
        if (tablero[i][column]==0) {
            if(row==i){
                return true;
            }
            else{
                return false;
            }
        }
    }
    return false;
}

// Comprueba si el tablero ya esta lleno
function checkFull(){
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

// Comprueba si se gano despues de colocar una ficha
function checkWin(row, column, turno){

    var count = 0; // Se debe llegar a 4 fichas consecutivas

    if(turno==0)    // ------------------------ SI EL JUGADOR 1 GANO ------------------------------
    {
        // Horizontal
        for(i=0; i<6; i++){
            if(tablero[row][i]==1){
                count++;
                if(count==4){
                    var x = document.getElementById("gameover");
                    x.classList.add("win");
                    x.innerHTML= "Azules Gano!";
                    winSound.play();
                    return true;
                }
            }else{
                count = 0;
            }
        }

        // Vertical
        count = 0;
        for(i=0; i<7; i++){
            if(tablero[i][column]==1){
                count++;
                if(count==4){
                    var x = document.getElementById("gameover");
                    x.classList.add("win");
                    x.innerHTML= "Azules Gano!";
                    winSound.play();
                    return true;
                }
            }else{
                count=0;
            }
        }

        // Diagonal
        count = 0;
        var diagonal1 = [];
        var diagonal2 = [];

        // Principio de la primera diagonal
        var i = row;
        var j = column;
        while (i>0 && j>0){
            j--;
            i--;
        }
        // Empuja los elementos de la primera diagonal hacia la matriz
        while (i<=6 && j<=5) {
            diagonal1.push(tablero[i][j]);
            i++;
            j++;
        }

        // Principio de la segunda diagonal
        var i = row;
        var j = column;
        while (i<6 && j>0){
            i++;
            j--;
        }
        // Empuja los elementos de la segunda diagonal hacia la matriz
        while (i>=0 && j<=5) {
            diagonal2.push(tablero[i][j]);
            i--;
            j++;
        }
            
        // Comprueba si tenemos cuatro fichas consecutivas en la primera diagonal
        for(q=0; q<diagonal1.length; q++){
            if(diagonal1[q]==1){
                count++;
                if(count==4){
                    var x = document.getElementById("gameover");
                    x.classList.add("win");
                    x.innerHTML= "Azules Gano!";
                    winSound.play();
                    return true;
                }
            }else{
                count = 0;
            }
        }
        // Comprueba si tenemos cuatro fichas consecutivas en la segunda diagonal
        count = 0;
        for(q=0; q<diagonal2.length; q++){
            if(diagonal2[q]==1){
                count++;
                if(count==4){
                    var x = document.getElementById("gameover");
                    x.classList.add("win");
                    x.innerHTML= "Azules Gano!";
                    winSound.play();
                    return true;
                }
            }else{
                count = 0;
            }
        }            
    }else{    // ------------------------ SI EL JUGADOR 2 GANO ------------------------------

        // Horizontal
        for(i=0; i<6; i++){
            if(tablero[row][i]==2){
                count++;
                if(count==4){
                    var x = document.getElementById("gameover");
                    x.classList.add("lose");
                    x.innerHTML= "Rojas Gano!";
                    winSound.play();
                    return true;
                }
            }else{
                count = 0;
            }
        }

        // Vertical
        count = 0;
        for(i=0; i<7; i++){
            if(tablero[i][column]==2){
                count++;
                if(count==4){
                    var x = document.getElementById("gameover");
                    x.classList.add("lose");
                    x.innerHTML= "Rojas Gano!";
                    winSound.play();
                    return true;
                }
            }else{
                count=0;
            }
        }

        // Diagonal
        count = 0;
        var diagonal1 = [];
        var diagonal2 = [];

        // Principio de la primera diagonal
        var i = row;
        var j = column;
        while (i>0 && j>0){
            j--;
            i--;
        }
        // Empuja los elementos de la primera diagonal hacia la matriz
        while (i<=6 && j<=5) {
            diagonal1.push(tablero[i][j]);
            i++;
            j++;
        }

        // Principio de la segunda diagonal
        var i = row;
        var j = column;
        while (i<6 && j>0){
            i++;
            j--;
        }
        // Empuja los elementos de la segunda diagonal hacia la matriz
        while (i>=0 && j<=5) {
            diagonal2.push(tablero[i][j]);
            i--;
            j++;
        }
            
        // Comprueba si tenemos cuatro fichas consecutivas en la primera diagonal
        for(q=0; q<diagonal1.length; q++){
            if(diagonal1[q]==2){
                count++;
                if(count==4){
                    var x = document.getElementById("gameover");
                    x.classList.add("lose");
                    x.innerHTML= "Rojas Gano!";
                    winSound.play();
                    return true;
                }
            }else{
                count = 0;
            }
        }
        // Comprueba si tenemos cuatro fichas consecutivas en la segunda diagonal
        count = 0;
        for(q=0; q<diagonal2.length; q++){
            if(diagonal2[q]==2){
                count++;
                if(count==4){
                    var x = document.getElementById("gameover");
                    x.classList.add("lose");
                    x.innerHTML= "Rojas Gano!";
                    winSound.play();
                    return true;
                }
            }else{
                count = 0;
            }
        }
    }        
}

function resetGame(){
    for(i=0; i<7; i++)
    {
        for(j=0; j<6; j++)
        {
            tablero[i][j]=0;
            var finalID = i.toString().concat(j.toString());
            var x = document.getElementById(finalID);
            x.innerHTML='<img src="Resource/empty.png" class="empty">';
        }
    }
    gameover = false;

    var x = document.getElementById("gameover");
    x.innerHTML = " ";
    x.classList.remove("win");
    x.classList.remove("lose");
    x.classList.remove("draw");
    winSound.pause();
    //Audio.winSound.pause();
    loseSound.pause();
    //Audio.loseSound.pause();
    winSound.currentTime = 0;
    //Audio.winSound.currentTime = 0;
    loseSound.currentTime = 0;
    //Audio.loseSound.currentTime = 0;
}

/* _____________________________________________ FIN DE MULTIPLAYER _____________________________________________ */