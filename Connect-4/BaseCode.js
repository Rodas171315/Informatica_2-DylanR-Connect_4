function colocarFicha(column, turno, tablero, enabledClick){
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
            return; 
        }
    }
    enabledClick=true;    
}
module.exports.colocarFicha = colocarFicha;

function ObtenerFila(column, tablero){
    for(i=6; i>=0; i--)
    {
        if (tablero[i][column]==0) {
            return i;
        }
    } 
    return 0;
}
module.exports.ObtenerFila = ObtenerFila;

function PuedeColocarse(row, column, tablero) {
    for (i=6; i>=0; i--) {
        if (tablero[i][column] == 0) {
            if (row == i) {
                return true;
            } else {
                return false;
            }
        }
    }
    return false;
}
module.exports.PuedeColocarse = PuedeColocarse;

function JugadorPuedeGanarSi(row, column, turno, tablero){
    tablero[row][column]=1;

    if(checkWinHorizontal(row, turno, tablero) || checkWinVertical(column, turno, tablero) || checkWinDiagonal(row, column, turno, tablero)){
        return true;
    }else{
        return false;
    }

    tablero[row][column]=0;
}
module.exports.JugadorPuedeGanarSi = JugadorPuedeGanarSi;

function CompuPuedeGanarSi(row, column, turno, tablero){
    tablero[row][column]=2;

    if(checkWinHorizontal(row, turno, tablero) || checkWinVertical(column, turno, tablero) || checkWinDiagonal(row, column, turno, tablero)){
        return true;
    }else{
        return false;
    }

    tablero[row][column]=0;
}
module.exports.CompuPuedeGanarSi = CompuPuedeGanarSi;

function checkFull(tablero) {
    for (j=0; j<6; j++) {
        if (tablero[0][j] == 0) {
            return false;
        }
    }
    return true;
}
module.exports.checkFull = checkFull;

function checkWinHorizontal(row, turno, tablero) {

    var count = 0; // Se debe llegar a 4 fichas consecutivas

    if (turno == 0) {
        // Horizontal
        for (i=0; i<6; i++) {
            if (tablero[row][i] == 1) {
                count++;
                if (count == 4) {
                    return true;
                }
            }else{
                count = 0;
            }
        }
    }else{
        // Horizontal
        for (i=0; i<6; i++) {
            if (tablero[row][i] == 2) {
                count++;
                if (count == 4) {
                    return true;
                }
            }else{
                count = 0;
            }
        }        
    }
}
module.exports.checkWinHorizontal = checkWinHorizontal;

function checkWinVertical(column, turno, tablero) {

    var count = 0; // Se debe llegar a 4 fichas consecutivas

    if (turno == 0) {
        // Vertical
        for (i=0; i<7; i++) {
            if (tablero[i][column] == 1) {
                count++;
                if (count == 4) {
                    return true;
                }
            }else{
                count = 0;
            }
        }
    }else{
        // Vertical
        for (i=0; i<7; i++) {
            if (tablero[i][column] == 2) {
                count++;
                if (count == 4) {
                    return true;
                }
            }else{
                count = 0;
            }
        }        
    }
}
module.exports.checkWinVertical = checkWinVertical;

function checkWinDiagonal(row, column, turno, tablero) {
    
    if (turno == 0) {
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
    }else{
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
    }
}
module.exports.checkWinDiagonal = checkWinDiagonal;

function resetGame(tablero) {
    for (i=0; i<7; i++) {
        for (j=0; j<6; j++) {
            tablero[i][j] = 0;
        }
    }
    return tablero;
}
module.exports.resetGame = resetGame;