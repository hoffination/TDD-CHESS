import Bishop from '../src/piece/Bishop'
import { Player } from '../src/enums/Player'
import Helpers from '../test/helpers'

describe('Bishop >', () => {
  describe('Initialization >', () => {
    it('should be able to initialize a Bishop', () => {
      let myBishop = new Bishop(Player.WHITE);

      expect(myBishop.owner).toEqual(Player.WHITE)
      expect(myBishop.name).toEqual('BISHOP')
      expect(myBishop.renderChar).toEqual('B')
    })
  })

  describe('Movement >', () => {
    it('should be able to move diagonally into an empty space', () => {
      Helpers.singleSpaceMovementDiagonally(new Bishop(Player.WHITE), true)
      Helpers.manySpaceMovementDiagonally(new Bishop(Player.WHITE), true)
    })

    it('should not be able to move into its own space', () => {
      let myBishop = new Bishop(Player.WHITE);
      let positions = {'A': {1: {piece: myBishop, row: 1, column: 'A'}}}
      let bishopStart = {row: 1, column: 'A'}

      expect(myBishop.canMove(positions, bishopStart, bishopStart)).toEqual(false)
    })

    it('should not be able to move diagonally into a space occupied by a friendly piece', () => {
      let myBishop = new Bishop(Player.WHITE);
      let otherPiece = new Bishop(Player.WHITE);
      let positions = {
        'A': {1: {piece: myBishop, row: 1, column: 'A'}},
        'B': {2: {piece: otherPiece, row: 2, column: 'B'}}
      }
      let bishopStart = {row: 1, column: 'A'}
      let near = {row: 2, column: 'B'}

      expect(myBishop.canMove(positions, bishopStart, near)).toEqual(false)
    })

    it('should be able to move diagonally into a space occupied by a enemy piece', () => {
      let myBishop = new Bishop(Player.WHITE);
      let otherPiece = new Bishop(Player.BLACK);
      let positions = {
        'A': {1: {piece: myBishop, row: 1, column: 'A'}},
        'B': {2: {piece: otherPiece, row: 2, column: 'B'}}
      }
      let bishopStart = {row: 1, column: 'A'}
      let near = {row: 2, column: 'B'}

      expect(myBishop.canMove(positions, bishopStart, near)).toEqual(true)
    })

    it('should not be able to move diagonally over another piece into an empty space', () => {
      let myBishop = new Bishop(Player.WHITE);
      let otherPiece = new Bishop(Player.WHITE);
      let positions = {
        'A': {1: {piece: myBishop, row: 1, column: 'A'}},
        'B': {2: {piece: otherPiece, row: 2, column: 'B'}},
        'C': {3: {row: 3, column: 'C'}}
      }
      let bishopStart = {row: 1, column: 'A'}
      let near = {row: 2, column: 'B'}
      let far = {row: 3, column: 'C'}

      expect(myBishop.canMove(positions, bishopStart, far)).toEqual(false)
    })

    it('should not be able to move horizontally or vertically', () => {
      Helpers.singleSpaceMovementVertical(new Bishop(Player.WHITE), false)
      Helpers.manySpaceMovementHorizontal(new Bishop(Player.WHITE), false)
      Helpers.singleSpaceMovementHorizontal(new Bishop(Player.WHITE), false)
      Helpers.manySpaceMovementVertical(new Bishop(Player.WHITE), false)
    })
  })
})
