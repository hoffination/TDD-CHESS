const stampit = require('stampit')
const Piece = require('./Piece')

const Privacy = stampit().init(function() {
  let hasMoved = false
  let enPassantable = false
  let turnsSinceLastMove = null

  this.forwardDirection = this.owner === 'WHITE' ? 1 : -1;

  this.move = ({pos1, pos2}) => {
    hasMoved = true
    if (Math.abs(pos1.row - pos2.row) == 2) {
      enPassantable = true
    }
    turnsSinceLastMove = 0
    return this
  }

  this.movedStatus = function() {
    return hasMoved
  }

  this.canBeTakenEnPassant = function() {
    return enPassantable
  }

  this.enPassantPassed = function() {
    enPassantable = false
  }

  this.turnUpdate =  function() {
    console.log(turnsSinceLastMove)
    if (turnsSinceLastMove !== null)
      turnsSinceLastMove++
    if (turnsSinceLastMove === 2 && this.canBeTakenEnPassant())
      this.enPassantPassed()
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
        // Check for en Passant
        if (hDist === 1 && vDist === 1) {
          let enPassantPosition = board[pos2.column][pos2.row - this.forwardDirection];
          if (!board[pos2.column][pos2.row].piece && enPassantPosition && enPassantPosition.piece) {
            let piece = enPassantPosition.piece
            if (piece.owner != this.owner && piece.canBeTakenEnPassant()) {
              return true;
            }
          }
        }
        return false
      }
    },
  },
  properties: {
    name: 'PAWN',
    renderChar: 'P'
  }
})

const Pawn = Piece.compose(Privacy, State);

module.exports = Pawn;
