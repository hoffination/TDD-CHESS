const stampit = require('stampit')
const Piece = require('./Piece')

const Privacy = stampit().init(function() {})

const State = stampit({
  methods: {
    canMove({board, pos1, pos2}) {
      let vDist = pos2.row - pos1.row
      let hDist = this.columnDist(pos2.column, pos1.column)
      if (Math.abs(vDist) - Math.abs(hDist) !== 0 || vDist === 0)
        return false

      let vDirection = vDist / Math.abs(vDist)
      let hDirection = hDist / Math.abs(hDist)
      let current = {vPos: pos1.row + vDirection, hPos: pos1.column.charCodeAt(0) + hDirection}
      // Check to see if there are any other pieces along the path to the second location
      while(current.vPos !== pos2.row) {
        if (board[String.fromCharCode(current.hPos)][current.vPos].piece)
          return false
        current.vPos += vDirection
        current.hPos += hDirection
      }
      if (!board[pos2.column][pos2.row].piece || board[pos2.column][pos2.row].piece.owner !== this.owner) {
        return true
      }
      return false
    }
  },
  properties: {
    name: 'BISHOP',
    renderChar: 'B'
  }
})

const Bishop = Piece.compose(Privacy, State)

module.exports = Bishop
