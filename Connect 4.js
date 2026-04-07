updateGameStatus("Player 1's turn");
const pieces = document.getElementsByClassName("piece");
const columns = [6, 6, 6, 6, 6, 6, 6];
let player1Turn = true, freeCells = 42, currentColor = "rgb(201, 26, 9)", over = false;

function updateGameStatus(message) {
    document.querySelector("p").innerText = message;
}  

function endGameOrContinue(maxConsecutivePieces) {
    if (maxConsecutivePieces >= 4) {
        over = true; 
        if(player1Turn) {
            updateGameStatus("Player 1 wins");
        } else { 
            updateGameStatus("Player 2 wins");
        }
    }
} 

function verifyVictory(column) {
    const currentPiece = column * 6 + columns[column] - 1; 
    let rowBegin = currentPiece, columnBegin = currentPiece, firstDiagonalBegin = currentPiece, secondDiagonalBegin = currentPiece, consecutivePieces = 1, maxConsecutivePieces = 1;
    while (rowBegin >= 6) {
        rowBegin -= 6;
    }   
    for (let i = 0; i < 6; ++i) {
        if (String(pieces[rowBegin].style.backgroundColor) === currentColor && String(pieces[rowBegin + 6].style.backgroundColor) === currentColor) {
            ++consecutivePieces;  
            if (consecutivePieces > maxConsecutivePieces) {
                maxConsecutivePieces = consecutivePieces;   
            } 
        } else {
            consecutivePieces = 1;   
        }  
        rowBegin += 6;
    }
    consecutivePieces = 1;
    while (columnBegin % 6) {  
        --columnBegin;   
    }
    for (let i = 0; i < 5; ++i) {
         if (String(pieces[columnBegin].style.backgroundColor) === currentColor && String(pieces[columnBegin + 1].style.backgroundColor) === currentColor) {
            ++consecutivePieces;  
            if (consecutivePieces > maxConsecutivePieces) {
                maxConsecutivePieces = consecutivePieces;   
            }  
        } else {
            consecutivePieces = 1;   
        } 
        ++columnBegin;
    } 
    consecutivePieces = 1; 
    while ((firstDiagonalBegin + 1) % 6 !== 0 && firstDiagonalBegin < 36) {
        firstDiagonalBegin += 7;
    }
    while (firstDiagonalBegin % 6 !== 0 && firstDiagonalBegin > 5) {
        if (String(pieces[firstDiagonalBegin].style.backgroundColor) === currentColor && String(pieces[firstDiagonalBegin - 7].style.backgroundColor) === currentColor) {
            ++consecutivePieces;  
            if (consecutivePieces > maxConsecutivePieces) {
                maxConsecutivePieces = consecutivePieces;    
            }    
        } else {     
            consecutivePieces = 1;     
        }  
        firstDiagonalBegin -= 7;    
    } 
    consecutivePieces = 1;
    while (secondDiagonalBegin > 5 && (secondDiagonalBegin + 1) % 6 !== 0) {
        secondDiagonalBegin -= 5;  
    }   
    while (secondDiagonalBegin % 6 !== 0 && secondDiagonalBegin < 36) {
        if (String(pieces[secondDiagonalBegin].style.backgroundColor) === currentColor && String(pieces[secondDiagonalBegin + 5].style.backgroundColor) === currentColor) {
            ++consecutivePieces;  
            if (consecutivePieces > maxConsecutivePieces) {
                maxConsecutivePieces = consecutivePieces;    
            }     
        } else {      
            consecutivePieces = 1;     
        }  
        secondDiagonalBegin += 5;   
    } 
    consecutivePieces = 1; 
    updateGameStatus(maxConsecutivePieces);   
    endGameOrContinue(maxConsecutivePieces);  
}  
    
function dropPiece(column) { 
    if (columns[column] > 0 && !over) { 
        pieces[column * 6 + columns[column] - 1].style.backgroundColor = currentColor;
        verifyVictory(column);
        --columns[column]; 
        --freeCells;
        if (!over && freeCells) {
            switchTurns();
        } else if (!freeCells) {  
            updateGameStatus("Draw");
        }   
    }     
}         
 
function switchTurns() {
    if (player1Turn) { 
        currentColor = "rgb(0, 85, 191)";
        updateGameStatus("Player 2's turn");
        player1Turn = false;
    } else {  
        currentColor = "rgb(201, 26, 9)";   
        updateGameStatus("Player 1's turn");   
        player1Turn = true; 
    } 
}       