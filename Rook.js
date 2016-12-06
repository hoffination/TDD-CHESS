/* jshint esversion: 6, asi: true */
const stampit = require('stampit')
const Piece = require('./Piece')

const Privacy = stampit().init(function() {
  let hasMoved = false;

  this.move = function() {
    hasMoved = true
    return this
  }

  this.movedStatus = function() {
    return hasMoved
  }
})

const State = stampit({
  methods: {
    canMove({board, pos1, pos2}) {
      if (!board || !pos1 || !pos2)
        return false

      let vDist = Math.abs(pos2.row - pos1.row)
      let hDist = this.columnDist(pos1.column, pos2.column)
      if (vDist > 0 && hDist > 0) {
        return false
      }
      // look for pieces that are in the way
      let rangeStart = (vDist ? pos1.row : pos1.column.charCodeAt(0)) + 1
      let rangeEnd = (vDist ? pos2.row : pos2.column.charCodeAt(0))
      while (rangeStart !== rangeEnd) {
        console.log(String.fromCharCode(rangeStart));
        if (vDist && board[pos1.column][rangeStart].piece) {
          return false
        } else if (hDist && board[String.fromCharCode(rangeStart)][pos1.row].piece) {
          return false
        }
        rangeStart++;
      }

      if (!board[pos2.column][pos2.row].piece) {
        return true
      }
      if (board[pos2.column][pos2.row].piece && board[pos2.column][pos2.row].piece.owner !== this.owner) {
        return true;
      }
      return false;
    }
  },
  properties: {
    name: 'ROOK',
    renderChar: 'R'
  }
})

const Rook = Piece.compose(Privacy, State)

module.exports = Rook
