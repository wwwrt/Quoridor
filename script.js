// Variabilele pentru tabla
let tableSize = 9; // Marimea tablei
let cellSize = 50; // Marimea unei celule
let tableOffset = 100; // Offset-ul tablei


let squares = []; 

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
  if (player1Position[0] === tableSize - 1) {
    // Actualizează variabila isPlaying
    isPlaying = false;

   // Afiseaza mesajul pentru jucătorul 1
let message = "Felicitări, " + player1Name + "! Ai câștigat!";
fill('black');
textSize(30);
textAlign(CENTER, BOTTOM);
text(message, width / 2, tableOffset - 60);
    noLoop(); // Oprește desenarea jocului
    return; // Ieși din funcție pentru a nu afișa mesajul de rând al jucătorului
  }

  // Verifică dacă jucătorul 2 a ajuns în capătul opus
  if (player2Position[0] === 0) {
    // Actualizează variabila isPlaying
    isPlaying = false;

 // Afiseaza mesajul pentru jucătorul 2
message = "Felicitări, " + player2Name + "! Ai câștigat!";
fill('black');
textSize(30);
textAlign(CENTER, TOP);
text(message, width / 2, height - tableOffset + 60);
    noLoop(); // Oprește desenarea jocului
    return; // Ieși din funcție pentru a nu afișa mesajul de rând al jucătorului
  }
  // Afișează mesajul corespunzător
  // displayMessage();


}
  
let isPlaying = true;

// Variabilele pentru jucatori
let player1Position = [0, 4]; // Pozitia jucatorului 1
let player2Position = [8, 4]; // Pozitia jucatorului 2
let currentPlayer = 1; // Jucătorul curent (1 sau 2)

// Variabilele pentru ziduri
let walls = []; // Lista cu toate zidurile
let currentWall = null; // Zidul curent


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
  stroke(5);
  strokeWeight(10);
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
     // Desenează numele jucătorului 1 în partea de sus
  fill(0);
  textSize(25);
  textAlign(CENTER, BOTTOM);
  noStroke();
  text(player1Name, width / 2, tableOffset - 10);
 

  // Desenează numele jucătorului 2 în partea de jos
  fill(0);
  textSize(25);
  textAlign(CENTER, BOTTOM);
  noStroke();
  text(player2Name, width / 2, height - 70);
}

function displayMessage() {
  let message = "";
  if (currentPlayer === 1) {
    message = player1NameElement.textContent + ", este rândul tău!"; // Mesaj pentru jucătorul 1
  } else if (currentPlayer === 2) {
    message = player2NameElement.textContent + ", este rândul tău!"; // Mesaj pentru jucătorul 2
  }
  fill(255);
  textSize(20);
  text(message, 10, height + 40);
}



// Resetarea tablei de joc la pozitia initiala
function resetBoard() {
  player1Position = [0, 4];
  player2Position = [8, 4];
  walls = [];
  
  // Resetează culorile celulelor
  for (let i = 0; i < tableSize; i++) {
    for (let j = 0; j < tableSize; j++) {
      squares[i][j].color = '#318247';
    }
  }
  isPlaying = true;
  loop(); // Reluează desenarea jocului
}


// Adaugarea zidurilor
function mouseClicked() {
  if (currentWall === null) {
    // Daca nu exista un zid curent, creaza unul nou
    let x = Math.floor(mouseX / cellSize);
    let y = Math.floor(mouseY / cellSize);
    currentWall = [x, y];
  } else {
    // Daca exista deja un zid curent, finalizeaza-l
    let x = Math.floor(mouseX / cellSize);
    let y = Math.floor(mouseY / cellSize);
    let newWall = [currentWall[0], currentWall[1], x, y];
    if (!wallExists(newWall[0], newWall[1], newWall[2], newWall[3])) {
      // Daca zidul nu exista deja, adauga-l in lista de ziduri
      walls.push(newWall);
    }
    currentWall = null;
  }
}


// Mutarea jucatorilor
function keyPressed() {
    // Verifică dacă jocul s-a încheiat
    if (!isPlaying) {
      return; // Nu face nimic dacă jocul s-a încheiat
    }
  if (currentPlayer === 1) {
    displayMessage();
    if (key === 'a' && player1Position[1] > 0 && !wallExists(player1Position[0], player1Position[1]-1, player1Position[0], player1Position[1])) {
      squares[player1Position[1]][player1Position[0]].color = '#318247';
      player1Position[1]--;
      squares[player1Position[1]][player1Position[0]].color = 'blue';
      currentPlayer = 2; // Schimbă jucătorul curent la 2
    } else if (key === 'd' && player1Position[1] < tableSize - 1 && !wallExists(player1Position[0], player1Position[1], player1Position[0], player1Position[1]+1)) {
      squares[player1Position[1]][player1Position[0]].color = '#318247';
      player1Position[1]++;
      squares[player1Position[1]][player1Position[0]].color = 'blue';
      currentPlayer = 2; // Schimbă jucătorul curent la 2
    } else if (key === 'w' && player1Position[0] > 0 && !wallExists(player1Position[0]-1, player1Position[1], player1Position[0], player1Position[1])) {
      squares[player1Position[1]][player1Position[0]].color = '#318247';
      player1Position[0]--;
      squares[player1Position[1]][player1Position[0]].color = 'blue';
      currentPlayer = 2; // Schimbă jucătorul curent la 2
    } else if (key === 's' && player1Position[0] < tableSize - 1 && !wallExists(player1Position[0], player1Position[1], player1Position[0]+1, player1Position[1])) {
      squares[player1Position[1]][player1Position[0]].color = '#318247';
      player1Position[0]++;
      squares[player1Position[1]][player1Position[0]].color = 'blue';
      currentPlayer = 2; // Schimbă jucătorul curent la 2
    }
  } else if (currentPlayer === 2) {
    displayMessage();
    if (key === 'j' && player2Position[1] > 0 && !wallExists(player2Position[0], player2Position[1]-1, player2Position[0], player2Position[1])) {
      squares[player2Position[1]][player2Position[0]].color = '#318247';
      player2Position[1]--;
      squares[player2Position[1]][player2Position[0]].color = 'red';
      currentPlayer = 1; // Schimbă jucătorul curent la 1
    } else if (key === 'l' && player2Position[1] < tableSize - 1 && !wallExists(player2Position[0], player2Position[1], player2Position[0], player2Position[1]+1)) {
      squares[player2Position[1]][player2Position[0]].color = '#318247';
      player2Position[1]++;
      squares[player2Position[1]][player2Position[0]].color = 'red';
      currentPlayer = 1; // Schimbă jucătorul curent la 1
    } else if (key === 'i' && player2Position[0] > 0 && !wallExists(player2Position[0]-1, player2Position[1], player2Position[0], player2Position[1])) {
      squares[player2Position[1]][player2Position[0]].color = '#318247';
      player2Position[0]--;
      squares[player2Position[1]][player2Position[0]].color = 'red';
      currentPlayer = 1; // Schimbă jucătorul curent la 1
    } else if (key == 'k' && player2Position[0] < tableSize - 1 && !wallExists(player2Position[0], player2Position[1], player2Position[0]+1, player2Position[1])) {
      squares[player2Position[1]][player2Position[0]].color='#318247';
      player2Position[0]++;
      squares[player2Position[1]][player2Position[0]].color='red';
      currentPlayer = 1; // Schimbă jucătorul curent la 1
    }
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


