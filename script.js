// Variabilele pentru tabla
let tableSize = 9; // Marimea tablei
let cellSize = 50; // Marimea unei celule
let tableOffset = 50; // Offset-ul tablei

// Variabilele pentru jucatori
let player1Position = [0, 4]; // Pozitia jucatorului 1
let player2Position = [8, 4]; // Pozitia jucatorului 2

// Variabilele pentru ziduri
let walls = []; // Lista cu toate zidurile
let currentWall = null; // Zidul curent

// Initializarea tabelului
function setup() {
  createCanvas(tableOffset * 2 + cellSize * tableSize, tableOffset * 2 + cellSize * tableSize);
}

// Desenarea tabelului
function draw() {
  background(245);
  
  // Desenarea celulelor
  stroke(0);
  strokeWeight(5);
  for (let i = 0; i < tableSize; i++) {
    for (let j = 0; j < tableSize; j++) {
      rect(tableOffset + i * cellSize, tableOffset + j * cellSize, cellSize, cellSize);
    }
  }
  
  // Desenarea jucatorilor
  fill(255, 0, 0);
  rect(tableOffset + player1Position[0] * cellSize, tableOffset + player1Position[1] * cellSize, cellSize, cellSize);
  
  fill(100, 100, 0);
  rect(tableOffset + player2Position[0] * cellSize, tableOffset + player2Position[1] * cellSize, cellSize, cellSize);
  
}

// Mutarea jucatorilor
function keyPressed() {
  if (key == 'w' && player1Position[1] > 0 && !wallExists(player1Position[0], player1Position[1]-1, player1Position[0], player1Position[1])) {
    player1Position[1]--;
  } else if (key == 's' && player1Position[1] < tableSize - 1 && !wallExists(player1Position[0], player1Position[1], player1Position[0], player1Position[1]+1)) {
    player1Position[1]++;
  } else if (key == 'a' && player1Position[0] > 0 && !wallExists(player1Position[0]-1, player1Position[1], player1Position[0], player1Position[1])) {
    player1Position[0]--;
  } else if (key == 'd' && player1Position[0] < tableSize - 1 && !wallExists(player1Position[0], player1Position[1], player1Position[0]+1, player1Position[1])) {
    player1Position[0]++;
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

}
