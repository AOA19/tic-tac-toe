let square = document.querySelectorAll(".square"); // This is a static NodeList that has a length of 9
const winningMsg = document.querySelector("#winningMsg");
const resetBtn = document.querySelector("#resetBtn");

class TicTacToe {
  constructor() {
    this.currentPlayer = "X"; // will track the current player. First player is X
    this.square = Array.from(square); // Converts the Nodelist into an array [0-8]
    this.message = winningMsg;
    this.startGame();
  }
  startGame() {
    // Add an event listnener to each square
    this.square.forEach((square) => {
      square.addEventListener("click", () => this.handleTurn(square));
    });

    // Add event listener to reset button and restart the game
    resetBtn.addEventListener("click", () => this.restartGame());
  }

  // Handle player's turn
  handleTurn(square) {
    // prevent selecting square that has already been clicked
    if (square.innerText !== "") {
      return;
    } else {
      square.innerText = this.currentPlayer;

      // Check if someone wins or ties
      this.checkWin();
      this.checkTie();

      // Switch player's turn
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";

      if (this.currentPlayer !== "X") {
        square.style.backgroundColor = "#4eb690";
      } else {
        square.style.backgroundColor = "#ED6A5A";
      }
    }
  }

  //Check if there was a tie
  checkTie() {
    const tie = this.square.every((square) => square.innerText === "X" || square.innerText === "O");

    if (tie) {
      this.message.innerText = "It's a tie!";
    }
  }

  // check if player won
  checkWin() {
    const winningCombos = [
      [0, 1, 2], // rows
      [3, 4, 5], // rows
      [6, 7, 8], // rows
      [0, 3, 6], // columns
      [1, 4, 7], // columns
      [2, 5, 8], // columns
      [0, 4, 8], // diagonals
      [2, 4, 6], // diagonals
    ];

    //Check the winning combo
    winningCombos.forEach((combo) => {
      const [tic, tac, toe] = combo;

      if (this.square[tic].innerText === this.currentPlayer && this.square[tac].innerText === this.currentPlayer && this.square[toe].innerText === this.currentPlayer) {
        this.message.innerText = `Player ${this.currentPlayer} is the winner!`;
        this.disableBoard();
      }
    });
  }

  //Disable board when player wins
  disableBoard() {
    this.square.forEach((square) => square.removeEventListener("click", this.handleTurn));
  }

  restartGame() {
    window.location.reload();
  }
}

const newGame = new TicTacToe();
