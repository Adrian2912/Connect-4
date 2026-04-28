updateGameStatus("Red's turn");
window.onload = generateBoard;
const pieces = [];
const rows = [5, 5, 5, 5, 5, 5, 5];
let player1Turn = true, freeCells = 42, currentColor = "rgb(201, 26, 9)", over = false;

function generateBoard() {
  for (let i = 0; i < 7; ++i) {
    let temporaryColumn = document.createElement("div");
    document.getElementById("mainGrid").appendChild(temporaryColumn);
    temporaryColumn.classList.add("column");
    temporaryColumn.addEventListener("click", () => {dropPiece(i)});
    for (let j = 0; j < 6; ++j) {
      let temporaryPiece = document.createElement("div");
      temporaryColumn.appendChild(temporaryPiece);
      temporaryPiece.classList.add("piece");
    }
  }
  const piecesGenerator = document.getElementsByClassName("piece");
  for (let i = 0; i < 6; ++i) {
    pieces.push([]);
    for (let j = 0; j < 7; ++j) {
      pieces[i].push(piecesGenerator[j * 6 + i]);
    }
  }
} 

function updateGameStatus(message) {
  document.querySelector("p").innerText = message;
}  

function endGameOrContinue(maxConsecutivePieces) {
  if (maxConsecutivePieces >= 4) {
      over = true; 
      if(player1Turn) {
          updateGameStatus("Red wins");
      } else { 
          updateGameStatus("Blue wins");
    }
  }
}

function countPieces(x, y, directionX, directionY) {
  let tiles = 0, consecutivePieces = 0;
  while (tiles < 4 && x < 6 && y < 7 && x >= 0 && y >= 0) {
    if (String(pieces[x][y].style.backgroundColor) === currentColor) {
      ++consecutivePieces;
    }
    x += directionX;
    y += directionY;
    ++tiles;
  }
  return consecutivePieces;
}

function verifyVictory() {
  for (let i = 0; i < 6; ++i) {
    for (let j = 0; j < 7; ++j) {
      endGameOrContinue(countPieces(i, j, 0, 1));
      endGameOrContinue(countPieces(i, j, 1, 0));
      endGameOrContinue(countPieces(i, j, 1, 1));
      endGameOrContinue(countPieces(i, j, -1, 1));
    }
  }
}

function dropPiece(column) { 
    if (rows[column] >= 0 && !over) { 
      pieces[rows[column]][column].style.backgroundColor = currentColor;
      verifyVictory();
      --rows[column]; 
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
      updateGameStatus("Blue's turn");
      player1Turn = false;
    } else {  
      currentColor = "rgb(201, 26, 9)";   
      updateGameStatus("Red's turn");   
      player1Turn = true; 
    } 
}       