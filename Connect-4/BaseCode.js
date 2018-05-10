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
module.exports.PuedeColocarse = PuedeColocarse;

function checkFull(tablero){
    for(j=0; j<6; j++){
        if(tablero[0][j]==0){
            return false;
        }
    }
    return true;         
}
module.exports.checkFull = checkFull;

function resetGame(tablero){
    for(i=0; i<2; i++)
    {
        for(j=0; j<6; j++)
        {
            tablero[i][j]=0;
        }
    }
    return tablero;
}
module.exports.resetGame = resetGame;
