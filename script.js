// Variabilele pentru tabla
let tableSize = 9; // Marimea tablei
let cellSize = 50; // Marimea unei celule
let tableOffset = 150; // Offset-ul tablei

let squares = [];
let wallsVertical = [];
let wallsHorizontal = [];
let miniSquares = [];


const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");

const player1NameElement = document.getElementById("player1-name");
const player2NameElement = document.getElementById("player2-name");


// Setarea numelor jucătorilor
function setPlayerNames() {
  player1NameElement.textContent = player1Input.value;
  player2NameElement.textContent = player2Input.value;
}

// Desenarea jocului pe canvas
function drawGame() {
  // Verifică dacă jucătorul 1 a ajuns în capătul opus
  if (player1Position[1] === tableSize - 1) {
    // Actualizează variabila isPlaying
    isPlaying = false;

    // Afiseaza mesajul pentru jucătorul 1
    let message = "Felicitări, " + player1Name + "! Ai câștigat!";
    fill('black');
    textSize(30);
    textAlign(CENTER, BOTTOM);
    text(message, width / 2, tableOffset - 90);
    noLoop(); // Oprește desenarea jocului
    return; // Ieși din funcție pentru a nu afișa mesajul de rând al jucătorului
  }

  // Verifică dacă jucătorul 2 a ajuns în capătul opus
  if (player2Position[1] === 0) {
    // Actualizează variabila isPlaying
    isPlaying = false;

    // Afiseaza mesajul pentru jucătorul 2
    message = "Felicitări, " + player2Name + "! Ai câștigat!";
    fill('black');
    textSize(30);
    textAlign(CENTER, TOP);
    text(message, width / 2, height - tableOffset + 90);
    noLoop(); // Oprește desenarea jocului
    return; // Ieși din funcție pentru a nu afișa mesajul de rând al jucătorului
  }
 
  // Afișează mesajul pentru rândul fiecăruia
  if (currentPlayer === 1) {
    message =  player1Name + ", e rândul tău!";
    fill('black');
    textSize(30);
    textAlign(CENTER, BOTTOM);
    text(message, width / 2, tableOffset - 90);
  }

  if (currentPlayer === 2) {
    message =  player2Name + ", e rândul tău!";
    fill('black');
    textSize(30);
    textAlign(CENTER, TOP);
    text(message, width / 2, height - tableOffset + 90);
  }

}

let isPlaying = true;

// Variabilele pentru jucatori
let player1Position = [4, 0]; // Pozitia jucatorului 1
let player2Position = [4, 8]; // Pozitia jucatorului 2
let currentPlayer = 1; // Jucătorul curent (1 sau 2)



// Initializarea tabelului
function setup() {
  player1Name = prompt("Introduceți numele jucătorului 1:"); // Prompt pentru numele jucătorului 1
  player2Name = prompt("Introduceți numele jucătorului 2:"); // Prompt pentru numele jucătorului 2

  createCanvas(tableOffset * 2 + cellSize * tableSize, tableOffset * 2 + cellSize * tableSize);
  createBoard();

  // Adaugam butonul de resetare
  let resetButton = createButton('Reset');
  resetButton.position(tableOffset * 2 + cellSize * tableSize - 60, 10);
  resetButton.mousePressed(resetBoard);

}


// Desenarea tabelului
function draw() {
  background(245);
  setPlayerNames();
  showBoard();
  drawGame();


  // Desenarea celulelor
  noStroke();
  // strokeWeight(10);iop

}

function mouseClicked() {
  for (let i = 0; i < wallsVertical.length; i++) {
    for (let j = 0; j < wallsVertical[i].length; j++) {
      let wall = wallsVertical[i][j];
      if (
        mouseX > wall.x && mouseX < wall.x + 10 && mouseY > wall.y && mouseY < wall.y + cellSize
      ) { wall.color = "black"; wallsVertical[i + 1][j].color = 'black'; miniSquares[i][j].color='black';}
    }
  }

  for (let i = 0; i < wallsHorizontal.length; i++) {
    for (let j = 0; j < wallsHorizontal[i].length; j++) {
      let wall = wallsHorizontal[i][j];
      if (
        mouseX > wall.x && mouseX < wall.x + cellSize && mouseY > wall.y && mouseY < wall.y + 10
      ) { wall.color = "black"; wallsHorizontal[i][j+1].color='black'; miniSquares[i][j].color='black';}
    }
  }
}


function createBoard() {
  for (let i = 0; i < tableSize; i++) {
    squares.push([]);
    for (let j = 0; j < tableSize; j++) {
      squares[i].push({
        x: j * (cellSize + 10) + tableOffset / 1.5,
        y: i * (cellSize + 10) + tableOffset / 1.5,
        color: "#318247"
      });
    }
  }
  let range = tableSize - 1;
  for (let i = 0; i < tableSize - 1; i++) {
    wallsHorizontal.push([]);
    for (let j = 0; j < tableSize; j++) {
      wallsHorizontal[i].push({
        x: j * 60 + 100,
        y: i * 60 + 150,
        color: "white"
      });
    }
  }

  for (let i = 0; i < tableSize; i++) {
    wallsVertical.push([]);
    for (let j = 0; j < tableSize - 1; j++) {
      wallsVertical[i].push({
        x: j * 60 + 150,
        y: i * 60 + 100,
        color: "white"
      });
    }
  }
  for (let i = 0; i < tableSize - 1; i++) {
    miniSquares.push([]);
    for (let j = 0; j < tableSize -1; j++) {
      miniSquares[i].push({
        x: j * 60 + 150,
        y: i * 60 + 100+50,
        color: "white",
      });
    }
  }
}


function showBoard() {
  for (let i = 0; i < tableSize; i++) {
    for (let j = 0; j < tableSize; j++) {
      fill(squares[i][j].color);
      rect(squares[i][j].x, squares[i][j].y, cellSize, cellSize);
    }
  }

  for (let i = 0; i < tableSize; i++) {
    for (let j = 0; j < tableSize - 1; j++) {
      fill(wallsVertical[i][j].color);
      rect(wallsVertical[i][j].x, wallsVertical[i][j].y, 10, cellSize);
    }
  }

  for (let i = 0; i < tableSize - 1; i++) {
    for (let j = 0; j < tableSize; j++) {
      fill(wallsHorizontal[i][j].color);
      rect(wallsHorizontal[i][j].x, wallsHorizontal[i][j].y, cellSize, 10);
    }
  }

  for (let i = 0; i < tableSize -1 ; i++) {
    for (let j = 0; j < tableSize -1; j++) {
      fill(miniSquares[i][j].color);
      rect(miniSquares[i][j].x, miniSquares[i][j].y, 10, 10);
    }
  }



  // Desenează numele jucătorului 1 în partea de sus
  fill(0);
  textSize(25);
  textAlign(CENTER, BOTTOM);
  noStroke();
  text(player1Name, width / 2, tableOffset - 50);


  // Desenează numele jucătorului 2 în partea de jos
  fill(0);
  textSize(25);
  textAlign(CENTER, BOTTOM);
  noStroke();
  text(player2Name, width / 2, height - 80);

}


// Resetarea tablei de joc la pozitia initiala
function resetBoard() {
  player1Position = [4, 0];
  player2Position = [4, 8];


  // Resetează culorile celulelor
  for (let i = 0; i < tableSize; i++) {
    for (let j = 0; j < tableSize; j++) {
      squares[i][j].color = '#318247';
    }
  }

  // Resetarea culorilor peretilor verticali
  for (let i = 0; i < tableSize; i++) {
    for (let j = 0; j < tableSize - 1; j++) {
      wallsVertical[i][j].color = 'white';
    }
  }

  // Resetarea culorilor peretilor orizontali
  for (let i = 0; i < tableSize - 1; i++) {
    for (let j = 0; j < tableSize; j++) {
      wallsHorizontal[i][j].color = 'white';
    }
  }

  // Resetarea culorilor pătrățelelor mici
  for (let i = 0; i < tableSize - 1; i++) {
    for (let j = 0; j < tableSize -1 ; j++) {
     miniSquares[i][j].color = 'white';
    }
  }

  isPlaying = true;
  loop(); // Reluează desenarea jocului
}

function startComputerGame() {
  againstComputer = true; // Setează o variabilă pentru a indica jocul împotriva computerului
  makeMoveComputer(); // Inițiază prima mutare a computerului
}


// Mutarea jucatorilor
function keyPressed() {
  // Verifică dacă jocul s-a încheiat
  if (!isPlaying) {
    return; // Nu face nimic dacă jocul s-a încheiat
  }

  if (currentPlayer === 1) {
    if (keyCode === UP_ARROW && player1Position[1] > 0) {
      if (wallsHorizontal[player1Position[1]-1][player1Position[0]].color == "white") {
        if (squares[player1Position[1] - 1][player1Position[0]].color != 'red') {
          squares[player1Position[1]][player1Position[0]].color = '#318247';
          player1Position[1]--;
          squares[player1Position[1]][player1Position[0]].color = 'blue';
          currentPlayer = 2;
        } else if (player1Position[1] > 1) {
          squares[player1Position[1]][player1Position[0]].color = '#318247';
          player1Position[1] -= 2;
          squares[player1Position[1]][player1Position[0]].color = 'blue';
          currentPlayer = 2;
          makeMoveComputer();
        }
      }
    } else if (keyCode === DOWN_ARROW && player1Position[1] < tableSize - 1) {
      if (wallsHorizontal[player1Position[1]][player1Position[0]].color == "white") {
        if (squares[player1Position[1] + 1][player1Position[0]].color !== 'red') {
          squares[player1Position[1]][player1Position[0]].color = '#318247';
          player1Position[1]++;
          squares[player1Position[1]][player1Position[0]].color = 'blue';
          currentPlayer = 2;
        } else if (player1Position[1] < tableSize - 2) {
          squares[player1Position[1]][player1Position[0]].color = '#318247';
          player1Position[1] += 2;
          squares[player1Position[1]][player1Position[0]].color = 'blue';
          currentPlayer = 2;
          makeMoveComputer();
        }
      }
    } else if (keyCode === LEFT_ARROW && player1Position[0] > 0) {
      if (wallsVertical[player1Position[1]][player1Position[0] - 1].color !== 'black') {
        if (squares[player1Position[1]][player1Position[0] - 1].color !== 'red') {
          squares[player1Position[1]][player1Position[0]].color = '#318247';
          player1Position[0]--;
          squares[player1Position[1]][player1Position[0]].color = 'blue';
          currentPlayer = 2;
        } else if (player1Position[0] > 1) {
          squares[player1Position[1]][player1Position[0]].color = '#318247';
          player1Position[0] -= 2;
          squares[player1Position[1]][player1Position[0]].color = 'blue';
          currentPlayer = 2;
          makeMoveComputer();

      }
     }
    } else if (keyCode === RIGHT_ARROW && player1Position[0] < tableSize - 1) {
      if (wallsVertical[player1Position[1]][player1Position[0]].color !== 'black') {
        if (squares[player1Position[1]][player1Position[0] + 1].color !== 'red') {
          squares[player1Position[1]][player1Position[0]].color = '#318247';
          player1Position[0]++;
          squares[player1Position[1]][player1Position[0]].color = 'blue';
          currentPlayer = 2;
        } else if (player1Position[0] < tableSize - 2) {
          squares[player1Position[1]][player1Position[0]].color = '#318247';
          player1Position[0] += 2;
          squares[player1Position[1]][player1Position[0]].color = 'blue';
          currentPlayer = 2;
          makeMoveComputer();
        }
      }
    }
  } else if (currentPlayer === 2) {
    if (key === 'w' && player2Position[1] > 0) {
      if (wallsHorizontal[player2Position[1] - 1][player2Position[0]].color !== 'black') {
        if (squares[player2Position[1] - 1][player2Position[0]].color !== 'blue') {
          squares[player2Position[1]][player2Position[0]].color = '#318247';
          player2Position[1]--;
          squares[player2Position[1]][player2Position[0]].color = 'red';
          currentPlayer = 1;
        } else if (player2Position[1] > 1) {
          squares[player2Position[1]][player2Position[0]].color = '#318247';
          player2Position[1] -= 2;
          squares[player2Position[1]][player2Position[0]].color = 'red';
          currentPlayer = 1;
        }
      }
    } else if (key === 's' && player2Position[1] < tableSize - 1) {
      if (wallsHorizontal[player2Position[1]][player2Position[0]].color !== 'black') {
        if (squares[player2Position[1] + 1][player2Position[0]].color !== 'blue') {
          squares[player2Position[1]][player2Position[0]].color = '#318247';
          player2Position[1]++;
          squares[player2Position[1]][player2Position[0]].color = 'red';
          currentPlayer = 1;
        } else if (player2Position[1] < tableSize - 2) {
          squares[player2Position[1]][player2Position[0]].color = '#318247';
          player2Position[1] += 2;
          squares[player2Position[1]][player2Position[0]].color = 'red';
          currentPlayer = 1;
        }
      }
    } else if (key === 'a' && player2Position[0] > 0) {
      if (wallsVertical[player2Position[1]][player2Position[0] - 1].color !== 'black') {
        if (squares[player2Position[1]][player2Position[0] - 1].color !== 'blue') {
          squares[player2Position[1]][player2Position[0]].color = '#318247';
          player2Position[0]--;
          squares[player2Position[1]][player2Position[0]].color = 'red';
          currentPlayer = 1;
        } else if (player2Position[0] > 1) {
          squares[player2Position[1]][player2Position[0]].color = '#318247';
          player2Position[0] -= 2;
          squares[player2Position[1]][player2Position[0]].color = 'red';
          currentPlayer = 1;
        }
      }
    } else if (key === 'd' && player2Position[0] < tableSize - 1) {
      if (wallsVertical[player2Position[1]][player2Position[0]].color !== 'black') {
        if (squares[player2Position[1]][player2Position[0] + 1].color !== 'blue') {
          squares[player2Position[1]][player2Position[0]].color = '#318247';
          player2Position[0]++;
          squares[player2Position[1]][player2Position[0]].color = 'red';
          currentPlayer = 1;
        } else if (player2Position[0] < tableSize - 2) {
          squares[player2Position[1]][player2Position[0]].color = '#318247';
          player2Position[0] += 2;
          squares[player2Position[1]][player2Position[0]].color = 'red';
          currentPlayer = 1;
        }
      }
    }
  }
}

function makeMoveComputer() {
  if (currentPlayer === 2 && isPlaying) {
    let validMoves = getValidMoves(player2Position[0], player2Position[1]);
    if (validMoves.length > 0) {
      let randomMove = random(validMoves);
      let newX = randomMove[0];
      let newY = randomMove[1];
      movePlayer(player2Position[0], player2Position[1], newX, newY);
      currentPlayer = 1;
    }
  }
   // Randomly choose a wall to place
   let wallType = Math.random() < 0.5 ? "horizontal" : "vertical";
   let wallIndex = Math.floor(Math.random() * (tableSize - 1));
 
   // Check if the chosen wall is already placed
   let wall;
   if (wallType === "horizontal") {
     wall = wallsHorizontal[wallIndex][player2Position[0]];
   } else {
     wall = wallsVertical[player2Position[1]][wallIndex];
   }
   if (wall.color === "black") {
     // The chosen wall is already placed, make another move
     makeMoveComputer();
     return;
   }
 
   // Place the chosen wall
   wall.color = "black";
 
   // Update the mini-squares
   if (wallType === "horizontal") {
     miniSquares[wallIndex][player2Position[0]].color = "black";
   } else {
     miniSquares[player2Position[1]][wallIndex].color = "black";
   }
 
   // Switch the current player
   currentPlayer = 1;
 }


function getValidMoves(x, y) {
  let validMoves = [];

  if (x > 0 && wallsVertical[y][x - 1].color !== 'black') {
    validMoves.push([x - 1, y]);
  }
  if (x < tableSize - 1 && wallsVertical[y][x].color !== 'black') {
    validMoves.push([x + 1, y]);
  }
  if (y > 0 && wallsHorizontal[y - 1][x].color !== 'black') {
    validMoves.push([x, y - 1]);
  }
  if (y < tableSize - 1 && wallsHorizontal[y][x].color !== 'black') {
    validMoves.push([x, y + 1]);
  }

  return validMoves;
}

function movePlayer(currentX, currentY, newX, newY) {
  squares[currentY][currentX].color = '#318247';
  squares[newY][newX].color = 'red';
  player2Position = [newX, newY];
}
