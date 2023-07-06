"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
//TODO use x and y;
function makeBoard() {
  for (let x = 0; x < HEIGHT; x++) {
    let row = [];
    for (let y = 0; y < WIDTH; y++) {
      row.push(null);
    }
    board.push(row);
  }
  console.log(board);
  console.log(board.length);
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board');

  // Creates the top row and adds an event listener
  const topRow = document.createElement("tr");
  topRow.setAttribute("id", "column-top");
  topRow.addEventListener("click", handleClick);

  // Adds cells to top row
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", `${x}`);
    topRow.append(headCell);
  }
  htmlBoard.append(topRow);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    row.setAttribute("id", `row-${y}`);

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `c-${y}-${x}`);
      row.append(cell);

    }
    htmlBoard.append(row);
  }

}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  for (let i = board.length - 1; i >= 0; i--) {
    if (!(board[i][x])) {
      return i;
    }
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let targetCell = document.getElementById(`c-${y}-${x}`);

  let piece = document.createElement("div");
  piece.setAttribute("class", `piece p${currPlayer}`);

  targetCell.append(piece);
}

function areAllSpotsFilled() {
  let areTheyFilled = false;
  for (let row of board) {
    if (row.every(cell => (cell === null))) {
    }
  }
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = Number(evt.target.id);

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  if (currPlayer === 1) {
    board[y][x] === 1;
  } else {
    board[y][x] === 2;
  }

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  if (currPlayer === 1) {
    currPlayer = 2;
  } else {
    currPlayer = 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player

  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let vertical = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let horizontal;
      let diagDownLeft;
      let diagDownRight;

      // find winner (only checking each win-possibility as needed)
      if (_win(vertical) || _win(horizontal) || _win(diagDownRight) || _win(diagDownLeft)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
