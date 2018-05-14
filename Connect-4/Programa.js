// onunload="PageClose()"
// window.onunload = function PageClose(){
//    var result = confirm("Realmente quieres salir de esta pagina?");
//    if (result == true) {
//    alert("Gracias por jugar");
//    }
//    else {
//    alert("Quieres la revancha verdad?");
//    }
// };

function Alert(){
    alert("Juega\nConecta con tus amigos!");
}

function Prompt(){
    var nombre = prompt("Ingresa tu nombre jugador");
    var edad = prompt("Ingresa tu edad jugador");
    var frase = prompt("Ingresa tu grito de batalla jugador");
    var Player1 = new Jugador(edad, nombre, frase);
    return Player1;
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

var Compu = new IA("Cortana", 10, "Chief, can u hear me?");

var enabledClick = true;
var gameover = false;
var CompuYaJugo = false;

var lastPlayerRow = 0;
var lastPlayerColumn = 0;

var lastCompuRow = 0;
var lastCompuColumn = 0;

// turno = indica quién está jugando (si es el turno del jugador 1, cambia == 0,
//                                    si la computadora está encendida, cambia == 1)
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
            if(turno==0){
                tablero[i][column]=1;   // escribe 1 si es el turno del jugador 1
            }else{
                tablero[i][column]=2;   // escribe 2 si es el turno de la computadora
            }

            insertarFicha(i, column, turno);
            if(turno==0 && !gameover){
                setTimeout(Computurno,1000);
            }else{
                if(gameover){
                    enabledClick = false;
                }else{
                    enabledClick=true;
                }
            }
            return; 
        }
    }

    if(turno!=0){
        randomTurno();
    }
    enabledClick=true;
}

// La propiedad innerHTML establece o devuelve el contenido HTML de un elemento.
// getElementById encuentra elemento por id

    function insertarFicha(row, column, turno){
        var finalID = row.toString().concat(column.toString());
        var x = document.getElementById(finalID);
        if(turno==0){
            x.innerHTML="<img src='Resource/blue.png' class='ficha'>";
            lastPlayerRow = row;
            lastPlayerColumn = column;           
        }else{
            x.innerHTML="<img src='Resource/red.png' class='ficha'>";
            lastCompuRow = row;
            lastCompuColumn = column;            
        }
        Audio.blopSound.play();

        gameover=checkWin(row, column, turno);

        if(row==0){
            gameover=checkFull();
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

    function ObtenerFila(column){
        for(i=6; i>=0; i--)
        {
            if (tablero[i][column]==0) {
                return i;
            }
        } 
        return 0;
    }

    function JugadorGanaArriba(row,column){
        if (row==0){
            return false;
        }
        var JugadorPuedeGanar = JugadorPuedeGanarSi(row-1,column);
        return JugadorPuedeGanar;
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

    function CompuPuedeGanarSi(row,column){
        tablero[row][column]=2;

        var count = 0; // Se debe llegar a 4 fichas consecutivas
            
        // Horizontal
        for(i=0; i<6; i++){
            if(tablero[row][i]==2){
                count++;
                if(count==4){
                    tablero[row][column]=0;
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
                    tablero[row][column]=0;
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
        while (i<=6 && j<=5){
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
        while (i>=0 && j<=5){
            diagonal2.push(tablero[i][j]);
            i--;
            j++;
        }
            
        // Comprueba si tenemos cuatro fichas consecutivas en la primera diagonal
        for(q=0; q<diagonal1.length; q++){
            if(diagonal1[q]==2){
                count++;
                if(count==4){
                    tablero[row][column]=0;
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
                    tablero[row][column]=0;
                    return true;
                }
            }else{
                count = 0;
            }
        }

        tablero[row][column]=0;
        return false;
    }

    function JugadorPuedeGanarSi(){
        tablero[row][column]=1;

        var count = 0; // Se debe llegar a 4 fichas consecutivas
            
        // Horizontal
        for(i=0; i<6; i++){
            if(tablero[row][i]==1){
                count++;
                if(count==4){
                    tablero[row][column]=0;
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
                    tablero[row][column]=0;
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
        while (i<=6 && j<=5){
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
        while (i>=0 && j<=5){
            diagonal2.push(tablero[i][j]);
            i--;
            j++;
        }
            
        // Comprueba si tenemos cuatro fichas consecutivas en la primera diagonal
        for(q=0; q<diagonal1.length; q++){
            if(diagonal1[q]==1){
                count++;
                if(count==4){
                    tablero[row][column]=0;
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
                    tablero[row][column]=0;
                    return true;
                }
            }else{
                count = 0;
            }
        }

        tablero[row][column]=0;
        return false;
    }

    /*------------------------------------------ COMIENZA LA INTELIGENCIA ARTIFICIAL -----------------------------------------*/
    function CompuTurno(){
        if(!CompuYaJugo){
            randomTurno();
            CompuYaJugo = true;
            return;
        }

        // PRUEBA SI LA COMPUTADORA PUEDE GANAR, RESPUESTA DE <<PRIORIDAD MÁXIMA>>
        for(w=6; w>=0; w--)
        {
            for(x=5; x>=0; x--)
            {
                if(tablero[w][x]==0){
                    if(CompuPuedeGanarSi(w,x) && PuedeColocarse(w,x)){
                        colocarFicha(x,1);
                        return;
                    }
                }
            }
        }

        // EVITA QUE EL JUGADOR GANE
        for(w=6; w>=0; w--)
        {
            for(x=0; x<6; x++)
            {
                if(tablero[w][x]==0){
                    if(JugadorPuedeGanarSi(w,x) && PuedeColocarse(w,x)){
                        colocarFicha(x,1);
                        return;
                    }
                }
            }
        }
        
        // PREVIENE EL TRUCO DE 3 FICHAS SUCESIVAS, EN UN CAMPO DE AMBOS LADOS (TANTO IZQUIERDO Y DERECHO)
        var trickCount = 0;
        var LadoIzq = 0;
        var LadoDer = 0;

        var trickFound = false;

        for(i=1; i<5; i++)
        {
            if(tablero[lastPlayerRow][i]==1){
                if(LadoIzq==0){
                    LadoIzq = i;
                }
                trickCount++;
                if(trickCount==2){
                    LadoDer = i;
                    trickFound = true;
                    break;
                }
            }else{
                LadoIzq = 0;
                trickCount = 0;
            }
        }
        if(trickFound){
            if(tablero[lastPlayerRow][LadoIzq-1]==0 && tablero[lastPlayerRow][LadoDer+1]==0 && tablero[lastPlayerRow][LadoDer+2]==0)
            {
                colocarFicha(LadoIzq-1,1);
                return;
            }
            if(tablero[lastPlayerRow][LadoIzq-1]==0 && tablero[lastPlayerRow][LadoDer+1]==0 && tablero[lastPlayerRow][LadoDer+2]==0)
            {
                colocarFicha(LadoIzq-1);
                return;
            }                
        }

        // FILA DE FICHAS HORIZONTAL
        if(lastCompuColumn<5){                                // a la derecha
            if(tablero[lastCompuRow][lastCompuColumn+1]==0){
                if(JugadorGanaArriba(ObtenerFila(lastCompuColumn+1),lastCompuColumn+1)){
                    randomTurno();
                    return;
                } // ¿Permitirá la computadora que el jugador gane con este movimiento? Si es así, lo evitamos y hacemos un movimiento aleatorio con randomTurn();
                
                colocarFicha(lastCompuColumn+1,1);
                return;
            }
        }

        for(i=lastCompuColumn-1; i>=0; i--)                   // Si no es posible, entonces a la izquierda
        {
            if(tablero[lastCompuRow][i]==0){
                if(JugadorGanaArriba(ObtenerFila(i),i)){
                    randomTurno();
                    return;
                }

                colocarFicha(i,1);
                return;
            }
        }

        randomTurno();
    }
    /*------------------------------------------ FINALIZA LA INTELIGENCIA ARTIFICIAL -----------------------------------------*/    

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

        // ------------------------ SI EL JUGADOR 1 GANO ------------------------------
        if(turno==0)
        {
            // Horizontal
            for(i=0; i<6; i++){
                if(tablero[row][i]==1){
                    count++;
                    if(count==4){
                        var x = document.getElementById("gameover");
                        x.classList.add("win");
                        x.innerHTML= Player1.nombre + "gano!";
                        Audio.winSound.play();
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
                        x.innerHTML= Player1.nombre + "gano!";
                        Audio.winSound.play();
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
                        x.innerHTML= Player1.nombre + "gano!";
                        Audio.winSound.play();
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
                        x.innerHTML= Player1.nombre + "gano!";
                        Audio.winSound.play();
                        return true;
                    }
                }else{
                    count = 0;
                }
            }            
        }

        // ------------------------ SI LA IA GANO ------------------------------
        else
        {
            // Horizontal
            for(i=0; i<6; i++){
                if(tablero[row][i]==2){
                    count++;
                    if(count==4){
                        var x = document.getElementById("gameover");
                        x.classList.add("lose");
                        x.innerHTML= Compu.nombre + "gano!";
                        Audio.loseSound.play();
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
                        x.innerHTML= Compu.nombre + "gano";
                        Audio.loseSound.play();
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
                        x.innerHTML= Compu.nombre + "gano!";
                        Audio.loseSound.play();
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
                        x.innerHTML= Compu.nombre + "gano!";
                        Audio.loseSound.play();
                        return true;
                    }
                }else{
                    count = 0;
                }
            }
        }        
    }

    function Multiplayer(){
        resetGame();
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
        enabledClick = true;
        CompuYaJugo = false;

        var x = document.getElementById("gameover");
        x.innerHTML = " ";
        x.classList.remove("win");
        x.classList.remove("lose");
        x.classList.remove("draw");
        // winSound.pause();
        Audio.winSound.pause();
        // loseSound.pause();
        Audio.loseSound.pause();
        // winSound.currentTime = 0;
        Audio.winSound.currentTime = 0;
        // loseSound.currentTime = 0;
        Audio.loseSound.currentTime = 0;
    }

/* _____________________________________________ FIN DE SOLOGAME _____________________________________________ */