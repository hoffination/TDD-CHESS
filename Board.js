/* jshint esversion: 6, asi: true */
const stampit = require('stampit')
const TURN = require('./Turn')
const fs = require('fs')

// publicly available methods to act on undelrying functions
const BoardPublic = stampit({
  methods: {
    // Render out board to the system console
    renderBoard() {
      Array.from(Array(8).keys()).forEach(row => {
        let rowText = '';
        Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H').forEach(column =>
          rowText += (this.positions[column][row + 1].piece ? this.positions[column][row + 1].piece.slice(0, 1) : '-'))
        console.log(rowText);
      })
    }
  },
  properties: {}
})

// board privileged methods and private data
const BoardPrivate = stampit().init(function() {
  let currentTurnColor = TURN.lookup({name: 'WHITE'}) // White always starts

  this.positions = {};
  Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H').forEach(column => {
    this.positions[column] = {}
    Array.from(Array(8).keys()).forEach(row => this.positions[column][row+1] = {})
  })

  this.move = function(playerColor, pos1, pos2) {
    if (playerColor !== currentTurnColor) {
      throw 'player moving is not the player whos turn it is'
    }
    currentTurnColor = TURN.next(currentTurnColor)
  }

  this.getTurn = function() {
    return currentTurnColor;
  }
})

const BoardDefaults = stampit({
  init({positions}){
    // if no other layout is given, load the default
    if (!positions) {
      let obj = JSON.parse(fs.readFileSync('layouts/start.json', 'utf8'));
      for(let i in obj) {
        // TODO: actually construct the chess pieces
        this.positions[obj[i].column][obj[i].row] = obj[i]
      }
    } else {
      this.positions = positions
    }
  },
  properties: {}
})

const Board = stampit(BoardPrivate, BoardDefaults, BoardPublic);

// let myboard = Board();
// myboard.renderBoard();

module.exports = Board
