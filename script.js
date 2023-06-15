// Variabilele pentru tabla
let tableSize = 9; // Marimea tablei
let cellSize = 50; // Marimea unei celule
let tableOffset = 150; // Offset-ul tablei



let squares = []; 
let wallsVertical = [];
let wallsHorizontal = [];

let showWalls = true;

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
  // Afișează mesajul corespunzător
  // displayMessage();


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
  stroke(1);
  // strokeWeight(10);iop

}


function createBoard() {
  for (let i = 0; i < tableSize; i++) {
    squares.push([]);
    for (let j = 0; j < tableSize; j++) {
      squares[i].push({
        x: j * (cellSize+10) + tableOffset/1.5,
        y: i * (cellSize+10) + tableOffset/1.5,
        color: '#318247'
      });
    }
  }
  let range = tableSize -1;
  for (let i = 0; i < tableSize; i++) {
    wallsHorizontal.push([]);
    for (let j = 0; j < tableSize; j++) {
      wallsHorizontal[i].push({
        x: j * 60 + 100,
        y: i * 60 + 150,
        color: 'red'
      });
    }
  }

  for (let i = 0; i < tableSize; i++) {
    wallsVertical.push([]);
    for (let j = 0; j < tableSize ; j++) {
      wallsVertical[i].push({
        x: j * 60 + 150,
        y: i * 60 + 100,
        color: 'red'
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

  for (let i = 0; i < tableSize; i++) {
    for (let j = 0; j < tableSize; j++) {
      fill(wallsVertical[i][j].color);
      rect(wallsVertical[i][j].x,wallsVertical[i][j].y , 10, cellSize);
    }
  }

  for (let i = 0; i < tableSize; i++) {
    for (let j = 0; j < tableSize; j++) {
      fill(wallsHorizontal[i][j].color);
      rect(wallsHorizontal[i][j].x,wallsHorizontal[i][j].y , cellSize, 10);
    }
  }

  if (showWalls) {
    // Desenează zidurile verticale
    for (let i = 0; i < tableSize; i++) {
      for (let j = 0; j < tableSize; j++) {
        fill(wallsVertical[i][j].color);
        rect(wallsVertical[i][j].x, wallsVertical[i][j].y, 10, cellSize);
      }
    }

    // Desenează zidurile orizontale
    for (let i = 0; i < tableSize; i++) {
      for (let j = 0; j < tableSize; j++) {
        fill(wallsHorizontal[i][j].color);
        rect(wallsHorizontal[i][j].x, wallsHorizontal[i][j].y, cellSize, 10);
      }
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

function mouseClicked() {
  if (mouseX > tableOffset && mouseX < tableOffset + cellSize * tableSize && mouseY > tableOffset && mouseY < tableOffset + cellSize * tableSize) {
    let i = Math.floor((mouseY - tableOffset) / cellSize);
    let j = Math.floor((mouseX - tableOffset) / cellSize);

    if (mouseButton === LEFT) {
      // Adaugă zidul vertical
      if (j < tableSize - 1) {
        wallsVertical[i][j].color = showWalls ? 'red' : 'white';
      }
    } else if (mouseButton === RIGHT) {
      // Adaugă zidul orizontal
      if (i < tableSize - 1) {
        wallsHorizontal[i][j].color = showWalls ? 'red' : 'white';
      }
    }
  }
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
  player1Position = [4, 0];
  player2Position = [4, 8];

  
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
      if (keyCode === UP_ARROW && player1Position[1] > 0) {
        if (player1Position[0] === player2Position[0] && player1Position[1] - 1 === player2Position[1] && player2Position[1] > 0) {
          // Jucătorul 1 sare peste jucătorul 2
          player2Position[1]-2;
        }
        squares[player1Position[1]][player1Position[0]].color = '#318247';
        player1Position[1]--;
        squares[player1Position[1]][player1Position[0]].color = 'blue';
        currentPlayer = 2;
      } else if (keyCode === DOWN_ARROW && player1Position[1] < tableSize - 1) {
        if (player1Position[0] === player2Position[0] && player1Position[1] + 1 === player2Position[1] && player2Position[1] < tableSize - 1 ) {
          // Jucătorul 1 sare peste jucătorul 2
          player2Position[1]+2;
        }
        squares[player1Position[1]][player1Position[0]].color = '#318247';
        player1Position[1]++;
        squares[player1Position[1]][player1Position[0]].color = 'blue';
        currentPlayer = 2;
      } else if (keyCode === LEFT_ARROW && player1Position[0] > 0) {
        if (player1Position[0] - 1 === player2Position[0] && player1Position[1] === player2Position[1] && player2Position[0] > 0) {
          // Jucătorul 1 sare peste jucătorul 2
          player2Position[0]-2;
        }
        squares[player1Position[1]][player1Position[0]].color = '#318247';
        player1Position[0]--;
        squares[player1Position[1]][player1Position[0]].color = 'blue';
        currentPlayer = 2;
      } else if (keyCode === RIGHT_ARROW && player1Position[0] < tableSize - 1) {
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
      if (key === 'w' && player2Position[1] > 0) {
        if (player2Position[0] === player1Position[0] && player2Position[1] - 1 === player1Position[1] && player1Position[1] > 0) {
          // Jucătorul 2 sare peste jucătorul 1
          player1Position[1]-2;
        }
        squares[player2Position[1]][player2Position[0]].color = '#318247';
        player2Position[1]--;
        squares[player2Position[1]][player2Position[0]].color = 'red';
        currentPlayer = 1;
      } else if (key === 's' && player2Position[1] < tableSize - 1) {
        if (player2Position[0] === player1Position[0] && player2Position[1] + 1 === player1Position[1] && player1Position[1] < tableSize - 1 ) {
          // Jucătorul 2 sare peste jucătorul 1
          player1Position[1]+2;
        }
        squares[player2Position[1]][player2Position[0]].color = '#318247';
        player2Position[1]++;
        squares[player2Position[1]][player2Position[0]].color = 'red';
        currentPlayer = 1;
      } else if (key === 'a' && player2Position[0] > 0) {
        if (player2Position[0] - 1 === player1Position[0] && player2Position[1] === player1Position[1] && player1Position[0] > 0 ) {
          // Jucătorul 2 sare peste jucătorul 1
          player1Position[0]-2;
        }
        squares[player2Position[1]][player2Position[0]].color = '#318247';
        player2Position[0]--;
        squares[player2Position[1]][player2Position[0]].color = 'red';
        currentPlayer = 1;
      } else if (key === 'd' && player2Position[0] < tableSize - 1) {
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