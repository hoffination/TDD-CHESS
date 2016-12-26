const stampit = require('stampit')
const Piece = require('./Piece')

const Privacy = stampit().init(function() {
});

const State = stampit({
  methods: {
    canMove({board, pos1, pos2}) {
      if (!board || !pos1 || !pos2)
        return false

      let vDist = pos2.row - pos1.row
      let hDist = this.columnDist(pos2.column, pos1.column)
      let destination = board[pos2.column][pos2.row];

      if (!destination.piece || destination.piece.owner !== this.owner) {
        let vDirection = Math.abs(vDist) / vDist || 0;
        let hDirection = Math.abs(hDist) / hDist || 0;
        let curr = {row: pos1.row + vDirection, column: String.fromCharCode(pos1.column.charCodeAt(0) + hDirection)};

        while (curr.row !== pos2.row || curr.column !== pos2.column) {
          if (board[curr.column][curr.row].piece) {
            return false
          }
          curr.row += vDirection;
          curr.column = String.fromCharCode(curr.column.charCodeAt(0) + hDirection);
        }

        return true
      }
      
      return false;
    }
  },
  properties: {
    name: 'QUEEN',
    renderChar: 'Q'
  }
})

const Queen = Piece.compose(Privacy, State)

module.exports = Queen
