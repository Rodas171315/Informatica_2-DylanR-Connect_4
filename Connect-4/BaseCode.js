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

    if (turno = 0) {
        // Horizontal
        for (i=0; i<6; i++) {
            if (tablero[row][i] == 1) {
                count++;
                if (count == 4) {
                    return true;
                }
            }else{
                return false;
            }
        }
    }
}
module.exports.checkWinHorizontal = checkWinHorizontal;

function checkWinVertical(column, turno, tablero) {

    var count = 0; // Se debe llegar a 4 fichas consecutivas

    if (turno = 0) {
        // Vertical
        for (i = 0; i < 7; i++) {
            if (tablero[i][column] == 1) {
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
    
    if (turno = 0) {
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
    }
}
module.exports.checkWinDiagonal = checkWinDiagonal;

function resetGame(tablero) {
    for (i=0; i<2; i++) {
        for (j=0; j<6; j++) {
            tablero[i][j] = 0;
        }
    }
    return tablero;
}
module.exports.resetGame = resetGame;