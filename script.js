// Variabilele pentru tabla
let tableSize = 9; // Marimea tablei
let cellSize = 50; // Marimea unei celule
let tableOffset = 100; // Offset-ul tablei
let walls = []; // Matricea de ziduri


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
  
// Funcție pentru desenarea zidurilor
function drawWalls() {
  // Parcurge matricea de ziduri și desenează zidurile pe tabla de joc
  for (let i = 0; i < tableSize - 1; i++) {
    for (let j = 0; j < tableSize; j++) {
      // Verifică dacă există un zid orizontal și desenează-l
      if (walls[i][j].horizontal) {
        const x1 = tableOffset + i * cellSize;
        const x2 = x1 + cellSize;
        const y = tableOffset + j * cellSize;
        line(x1, y, x2, y);
      }

      // Verifică dacă există un zid vertical și desenează-l
      if (walls[i][j].vertical) {
        const x = tableOffset + i * cellSize;
        const y1 = tableOffset + j * cellSize;
        const y2 = y1 + cellSize;
        line(x, y1, x, y2);
      }
    }
  }
}

// Funcția pentru plasarea zidurilor la clic
function mouseClicked() {
  // Verifică dacă jocul este în desfășurare și dacă este rândul jucătorului 1
  if (isPlaying && currentPlayer === 1) {
    // Obține coordonatele x și y ale clicului
    const x = mouseX;
    const y = mouseY;
    
    // Plasează zidul
    placeWall(x, y);
  }
}


// Funcție pentru plasarea zidurilor
function placeWall(x, y) {
  // Calcularea poziției celulei în care a fost efectuat clicul
  const i = Math.floor((x - tableOffset) / cellSize);
  const j = Math.floor((y - tableOffset) / cellSize);

  // Verificarea dacă poziția este validă și dacă există deja un zid în acea poziție
  if (
    i >= 0 &&
    i < tableSize - 1 &&
    j >= 0 &&
    j < tableSize &&
    !walls[i][j].horizontal &&
    !walls[i][j].vertical
  ) {
    // Plasarea unui zid în matricea de ziduri
    walls[i][j].horizontal = true;
    walls[i][j].vertical = true;

    // Redesenează tabla de joc pentru a afișa zidurile actualizate
    drawTable();
    drawWalls();
  }
}

let isPlaying = true;

// Variabilele pentru jucatori
let player1Position = [0, 4]; // Pozitia jucatorului 1
let player2Position = [8, 4]; // Pozitia jucatorului 2
let currentPlayer = 1; // Jucătorul curent (1 sau 2)


// Initializarea tabelului
function setup() {
  player1Name = prompt("Introduceți numele jucătorului 1:"); // Prompt pentru numele jucătorului 1
  player2Name = prompt("Introduceți numele jucătorului 2:"); // Prompt pentru numele jucătorului 2

  createCanvas(tableOffset * 2 + cellSize * tableSize, tableOffset * 2 + cellSize * tableSize);
  
  // Inițializarea matricei de ziduri
for (let i = 0; i < tableSize - 1; i++) {
  walls[i] = [];
  for (let j = 0; j < tableSize; j++) {
    walls[i][j] = {
      horizontal: false,
      vertical: false,
    };
  }
}


canvas.mouseClicked(placeWall);


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

  
  // Resetează culorile celulelor
  for (let i = 0; i < tableSize; i++) {
    for (let j = 0; j < tableSize; j++) {
      squares[i][j].color = '#318247';
    }
  }
  isPlaying = true;
  loop(); // Reluează desenarea jocului
}


// Mutarea jucatorilor
function keyPressed() {
    // Verifică dacă jocul s-a încheiat
    if (!isPlaying) {
      return; // Nu face nimic dacă jocul s-a încheiat
    }
    if (currentPlayer === 1) {
      if (keyCode === LEFT_ARROW && player1Position[1] > 0) {
        if (player1Position[0] === player2Position[0] && player1Position[1] - 1 === player2Position[1] && player2Position[1] > 0) {
          // Jucătorul 1 sare peste jucătorul 2
          player2Position[1]-2;
        }
        squares[player1Position[1]][player1Position[0]].color = '#318247';
        player1Position[1]--;
        squares[player1Position[1]][player1Position[0]].color = 'blue';
        currentPlayer = 2;
      } else if (keyCode === RIGHT_ARROW && player1Position[1] < tableSize - 1) {
        if (player1Position[0] === player2Position[0] && player1Position[1] + 1 === player2Position[1] && player2Position[1] < tableSize - 1 ) {
          // Jucătorul 1 sare peste jucătorul 2
          player2Position[1]+2;
        }
        squares[player1Position[1]][player1Position[0]].color = '#318247';
        player1Position[1]++;
        squares[player1Position[1]][player1Position[0]].color = 'blue';
        currentPlayer = 2;
      } else if (keyCode === UP_ARROW && player1Position[0] > 0) {
        if (player1Position[0] - 1 === player2Position[0] && player1Position[1] === player2Position[1] && player2Position[0] > 0) {
          // Jucătorul 1 sare peste jucătorul 2
          player2Position[0]-2;
        }
        squares[player1Position[1]][player1Position[0]].color = '#318247';
        player1Position[0]--;
        squares[player1Position[1]][player1Position[0]].color = 'blue';
        currentPlayer = 2;
      } else if (keyCode === DOWN_ARROW && player1Position[0] < tableSize - 1) {
        if (player1Position[0] + 1 === player2Position[0] && player1Position[1] === player2Position[1] && player2Position[0] < tableSize - 1) {
          // Jucătorul 1 sare peste jucătorul 2
          player2Position[0]+2;
        }
        squares[player1Position[1]][player1Position[0]].color = '#318247';
        player1Position[0]++;
        squares[player1Position[1]][player1Position[0]].color = 'blue';
        currentPlayer = 2;
      }
    } else if (currentPlayer === 2) {
      if (key === 'a' && player2Position[1] > 0) {
        if (player2Position[0] === player1Position[0] && player2Position[1] - 1 === player1Position[1] && player1Position[1] > 0) {
          // Jucătorul 2 sare peste jucătorul 1
          player1Position[1]-2;
        }
        squares[player2Position[1]][player2Position[0]].color = '#318247';
        player2Position[1]--;
        squares[player2Position[1]][player2Position[0]].color = 'red';
        currentPlayer = 1;
      } else if (key === 'd' && player2Position[1] < tableSize - 1) {
        if (player2Position[0] === player1Position[0] && player2Position[1] + 1 === player1Position[1] && player1Position[1] < tableSize - 1 ) {
          // Jucătorul 2 sare peste jucătorul 1
          player1Position[1]+2;
        }
        squares[player2Position[1]][player2Position[0]].color = '#318247';
        player2Position[1]++;
        squares[player2Position[1]][player2Position[0]].color = 'red';
        currentPlayer = 1;
      } else if (key === 'w' && player2Position[0] > 0) {
        if (player2Position[0] - 1 === player1Position[0] && player2Position[1] === player1Position[1] && player1Position[0] > 0 ) {
          // Jucătorul 2 sare peste jucătorul 1
          player1Position[0]-2;
        }
        squares[player2Position[1]][player2Position[0]].color = '#318247';
        player2Position[0]--;
        squares[player2Position[1]][player2Position[0]].color = 'red';
        currentPlayer = 1;
      } else if (key === 's' && player2Position[0] < tableSize - 1) {
        if (player2Position[0] + 1 === player1Position[0] && player2Position[1] === player1Position[1] && player1Position[0] < tableSize - 1 ) {
          // Jucătorul 2 sare peste jucătorul 1
          player1Position[0]+2;
        }
        squares[player2Position[1]][player2Position[0]].color = '#318247';
        player2Position[0]++;
        squares[player2Position[1]][player2Position[0]].color = 'red';
        currentPlayer = 1;
      }
    }
  }