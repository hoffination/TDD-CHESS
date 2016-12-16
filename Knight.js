const stampit = require('stampit')
const Piece = require('./Piece')

const Privacy = stampit().init(function() {
})

const State = stampit({
  methods: {
    canMove({board, pos1, pos2}) {
      let vDist = Math.abs(pos1.row - pos2.row)
      let hDist = this.columnDist(pos1.column, pos2.column);
      console.log(hDist, vDist)
      if (vDist > 0 && vDist < 3 && hDist > 0 && hDist < 3 && hDist + vDist === 3) {
        if (board[pos2.column][pos2.row].piece && board[pos2.column][pos2.row].piece.owner === this.owner) {
          return false
        }
        return true
      }

      return false
    }
  },
  properties: {
    name: 'KNIGHT',
    renderChar: 'K'
  }
});

const Knight = Piece.compose(Privacy, State)

module.exports = Knight
