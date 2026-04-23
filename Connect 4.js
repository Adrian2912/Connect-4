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

function verifyRow(x) {
  let consecutivePieces = 1, maxConsecutivePieces = 1;
  for (let i = 0; i < 6; ++i) {
    if (String(pieces[x][i].style.backgroundColor) === currentColor && String(pieces[x][i + 1].style.backgroundColor) === currentColor) {
      ++consecutivePieces;
      if (consecutivePieces > maxConsecutivePieces) {
        maxConsecutivePieces = consecutivePieces;
      }
    } else {
      consecutivePieces = 1;
    }
  }
  endGameOrContinue(maxConsecutivePieces);
}

function verifyColumn(y) {
  let consecutivePieces = 1, maxConsecutivePieces = 1;
  for (let i = 5; i > 0; --i) {
    if (String(pieces[i][y].style.backgroundColor) === currentColor && String(pieces[i - 1][y].style.backgroundColor) === currentColor) {
      ++consecutivePieces;
      if (consecutivePieces > maxConsecutivePieces) {
        maxConsecutivePieces = consecutivePieces;
      }
    } else {
      consecutivePieces = 1;
    }
  }
  endGameOrContinue(maxConsecutivePieces);
} 

function verifyFirstDiagonal(x, y) {
  let consecutivePieces = 1, maxConsecutivePieces = 1;
  while (x != 0 && y != 0) {
    --x;
    --y;
  }
  while (x < 5  && y < 6) {
    if (String(pieces[x][y].style.backgroundColor) === currentColor && String(pieces[x + 1][y + 1].style.backgroundColor) === currentColor) {
      ++consecutivePieces;
      if (consecutivePieces > maxConsecutivePieces) {
        maxConsecutivePieces = consecutivePieces;
      }
    } else {
      consecutivePieces = 1;
    }
    ++x;
    ++y
  }
  endGameOrContinue(maxConsecutivePieces);
} 

function verifySecondDiagonal(x, y) {
  let consecutivePieces = 1, maxConsecutivePieces = 1;
  while (x != 0 && y != 6) {
    --x;
    ++y;
  }
  while (x < 5 && y > 0) {
    if (String(pieces[x][y].style.backgroundColor) === currentColor && String(pieces[x + 1][y - 1].style.backgroundColor) === currentColor) {
      ++consecutivePieces;
      if (consecutivePieces > maxConsecutivePieces) {
        maxConsecutivePieces = consecutivePieces;
      }
    } else {
      consecutivePieces = 1;
    }
    ++x;
    --y;
  }
  endGameOrContinue(maxConsecutivePieces);
}

function dropPiece(column) { 
    if (rows[column] >= 0 && !over) { 
      pieces[rows[column]][column].style.backgroundColor = currentColor;
      verifyRow(rows[column]);
      verifyColumn(column);
      verifyFirstDiagonal(rows[column], column);
      verifySecondDiagonal(rows[column], column);
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