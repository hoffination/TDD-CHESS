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

      if ((this.forwardDirection > 0 && pos2.row < pos1.row) || (this.forwardDirection < 0 && pos2.row > pos1.row)) {
        return false
      }
      // check verticle move
      let vDist = Math.abs(pos2.row - pos1.row)
      let hDist = this.columnDist(pos1.column, pos2.column)
      if (hDist === 0) {
        if (vDist === 2 && this.movedStatus() || vDist > 2) {
          return false
        }
        if (vDist === 2 && !!board[pos2.column][pos2.row - 1].piece) {
          return false
        }
        // check if space is unobscured
        if (!board[pos2.column][pos2.row].piece) {
          return true
        }
        return false
      } else {
        if (hDist > 1 || vDist > 1 || vDist === 0) {
          return false;
        }
        if (board[pos2.column][pos2.row].piece && board[pos2.column][pos2.row].piece.owner !== this.owner) {
          return true
        }
        return false
      }
    }
  },
  properties: {
    name: 'PAWN',
    renderChar: 'P'
  }
})

const Pawn = Piece.compose(Privacy, State);

module.exports = Pawn;
