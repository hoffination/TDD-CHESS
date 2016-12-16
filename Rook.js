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

      let vDist = pos2.row - pos1.row
      let hDist = this.columnDist(pos2.column, pos1.column)
      if (Math.abs(vDist) > 0 && Math.abs(hDist) > 0) {
        return false
      }
      // look for pieces that are in the way
      let rangeStart = (vDist ? pos1.row : pos1.column.charCodeAt(0))
      let rangeEnd = (vDist ? pos2.row : pos2.column.charCodeAt(0))
      let rangeDirection = vDist ? vDist / Math.abs(vDist) : hDist / Math.abs(hDist);
      rangeStart += rangeDirection;

      while (rangeStart !== rangeEnd) {
        if (vDist && board[pos1.column][rangeStart].piece) {
          return false
        } else if (hDist && board[String.fromCharCode(rangeStart)][pos1.row].piece) {
          return false
        }
        rangeStart += rangeDirection > 0 ? 1 : -1
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
