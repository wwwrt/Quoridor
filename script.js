// Variabilele pentru tabla
let tableSize = 9; // Marimea tablei
let cellSize = 50; // Marimea unei celule
let tableOffset = 50; // Offset-ul tablei

let squares = []; 

// Variabilele pentru jucatori
let player1Position = [0, 4]; // Pozitia jucatorului 1
let player2Position = [8, 4]; // Pozitia jucatorului 2

// Variabilele pentru ziduri
let walls = []; // Lista cu toate zidurile
let currentWall = null; // Zidul curent


// Initializarea tabelului
function setup() {
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
  showBoard();
  
  // Desenarea celulelor
  stroke(0);
  strokeWeight(10);
}

  function rosu(){
  fill('red');
  rect(tableOffset + player2Position[0] * cellSize, tableOffset + player2Position[1] * cellSize, cellSize, cellSize);
  fill('blue');
  rect(tableOffset + player1Position[0] * cellSize, tableOffset + player1Position[1] * cellSize, cellSize, cellSize);
}

function createBoard() {
  for (let i = 0; i < tableSize; i++) {
    squares.push([]);
    for (let j = 0; j < tableSize; j++) {
      squares[i].push({
        x: tableOffset + i * cellSize,
        y: tableOffset + j * cellSize,
        color: '#318247'
      });
    }
  }
}

function showBoard() {
  for (let i = 0; i < tableSize; i++) {
    for (let j = 0; j < tableSize; j++) {
      fill(squares[i][j].color);
      rect(squares[i][j].x,squares[i][j].y , cellSize, cellSize);
    }
  }
}

// Resetarea tablei de joc la pozitia initiala
function resetBoard() {
  player1Position = [0, 4];
  player2Position = [8, 4];
  walls = [];
  
  // Reseteaza culorile celulelor
  for (let i = 0; i < tableSize; i++) {
    for (let j = 0; j < tableSize; j++) {
      squares[i][j].color = '#318247';
    }
  }
}


// Mutarea jucatorilor
function keyPressed() {
  if (key === 'a' && player1Position[1] > 0 && !wallExists(player1Position[0], player1Position[1]-1, player1Position[0], player1Position[1])) {
    squares[player1Position[1]][player1Position[0]].color = '#318247';
    player1Position[1]--;
    squares[player1Position[1]][player1Position[0]].color = 'blue';
  } else if (key === 'd' && player1Position[1] < tableSize - 1 && !wallExists(player1Position[0], player1Position[1], player1Position[0], player1Position[1]+1)) {
    squares[player1Position[1]][player1Position[0]].color = '#318247';
    player1Position[1]++;
    squares[player1Position[1]][player1Position[0]].color = 'blue';
  } else if (key === 'w' && player1Position[0] > 0 && !wallExists(player1Position[0]-1, player1Position[1], player1Position[0], player1Position[1])) {
    squares[player1Position[1]][player1Position[0]].color = '#318247';
    player1Position[0]--;
    squares[player1Position[1]][player1Position[0]].color = 'blue';
  } else if (key === 's' && player1Position[0] < tableSize - 1 && !wallExists(player1Position[0], player1Position[1], player1Position[0]+1, player1Position[1])) {
    squares[player1Position[1]][player1Position[0]].color = '#318247';
    player1Position[0]++;
    squares[player1Position[1]][player1Position[0]].color = 'blue';
  } else if (key === 'j' && player2Position[1] > 0 && !wallExists(player2Position[0], player2Position[1]-1, player2Position[0], player2Position[1])) {
    squares[player2Position[1]][player2Position[0]].color = '#318247';
    player2Position[1]--;
    squares[player2Position[1]][player2Position[0]].color = 'red';
  } else if (key === 'l' && player2Position[1] < tableSize - 1 && !wallExists(player2Position[0], player2Position[1], player2Position[0], player2Position[1]+1)) {
    squares[player2Position[1]][player2Position[0]].color = '#318247';
    player2Position[1]++;
    squares[player2Position[1]][player2Position[0]].color = 'red';
  } else if (key === 'i' && player2Position[0] > 0 && !wallExists(player2Position[0]-1, player2Position[1], player2Position[0], player2Position[1])) {
    squares[player2Position[1]][player2Position[0]].color = '#318247';
    player2Position[0]--;
    squares[player2Position[1]][player2Position[0]].color = 'red';
  } else if (key == 'k' && player2Position[0] < tableSize - 1 && !wallExists(player2Position[0], player2Position[1], player2Position[0]+1, player2Position[1])) {
    squares[player2Position[1]][player2Position[0]].color='#318247';
    player2Position[0]++; 
    squares[player2Position[1]][player2Position[0]].color='red';
    
  }
}

// Verifica daca un zid exista intre doua celule
function wallExists(x1, y1, x2, y2) {
  for (let wall of walls) {
    if ((wall[0][0] == x1 && wall[0][1] == y1 && wall[1][0] == x2 && wall[1][1] == y2) ||
    (wall[0][0] == x2 && wall[0][1] == y2 && wall[1][0] == x1 && wall[1][1] == y1)) {
     return true;
   }
  }
  return false;
}


