import Board from '../src/logic/Board'
import { PieceType } from '../src/enums/PieceType'

describe('Board >', () => {
  describe('Initialization >', () => {
    it('should correctly create a new Board', () => {

      let myBoard = new Board()

      expect(myBoard.positions.A[1].piece.type).toEqual(PieceType.ROOK)
      expect(myBoard.getTurn()).toEqual(0)
    })

    it('should create a new Board with positions given on construction', () => {
      let myBoard = new Board({ positions: {} })
    })
  })

  describe('Moving Pieces >', () => {
    it('should correctly throw if it is not currently that players turn', () => {

      let myBoard = new Board()

      expect(function () {
        myBoard.move(1, { column: 'A', row: 2 }, { column: 'A', row: 4 })
      }).toThrow('player moving is not the player whos turn it is')
    })

    it('should change turns if a player moves', () => {

      let myBoard = new Board()
      myBoard.move(0, { column: 'A', row: 2 }, { column: 'A', row: 4 })

      expect(myBoard.getTurn()).toEqual(1)
    })
  })

  describe('Rendering >', () => {
    it('should correctly render a new Board', () => {
      spyOn(console, 'log').and.callThrough()

      let myBoard = new Board()
      myBoard.renderBoard()

      expect(console.log).toHaveBeenCalled()
    })
  })

})
