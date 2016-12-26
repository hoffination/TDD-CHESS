const stampit = require('stampit')
const Piece = require('./Piece')
const Rook = require('./Rook');

let rookName = Rook().name

const Privacy = stampit().init(function() {
  let hasMoved = false

  this.move = () => {
    hasMoved = true;
  }

  this.movedStatus = function() {
    return hasMoved
  }
});

const State = stampit({
  methods: {
    canMove({board, pos1, pos2}) {
      if (!board || !pos1 || !pos2)
        return false

      let vDist = pos2.row - pos1.row
      let hDist = this.columnDist(pos2.column, pos1.column)

      if (Math.abs(vDist) === 1 || Math.abs(hDist) === 1) {
        if(board[pos2.column][pos2.row].piece && board[pos2.column][pos2.row].piece.owner === this.owner) {
          return false
        }
        return true
      }

      // Check for castling
      if (Math.abs(hDist) === 2 && !this.movedStatus()) {
        let cornerRookPosition = hDist === -2 ? board.A[1] : board.H[1]
        if (cornerRookPosition.piece && cornerRookPosition.piece.name === rookName && !cornerRookPosition.piece.movedStatus()) {
          return true
        }
      }

      return false
    }
  },
  properties: {
    name: 'KING',
    renderChar: 'K'
  }
})

const King = Piece.compose(Privacy, State)

module.exports = King;
