let Bishop = require('../Bishop')
const helpers = require('../test/helpers');

describe('Bishop >', () => {
  describe('Initialization >', () => {
    it('should be able to initialize a Bishop', () => {
      let myBishop = Bishop();

      expect(myBishop.owner).toEqual('WHITE')
      expect(myBishop.name).toEqual('BISHOP')
      expect(myBishop.renderChar).toEqual('B')
    })
  })

  describe('Movement >', () => {
    it('should be able to move diagonally into an empty space', () => {
      helpers.singleSpaceMovementDiagonally(Bishop(), true)
      helpers.manySpaceMovementDiagonally(Bishop(), true)
    })

    it('should not be able to move into its own space', () => {
      let myBishop = Bishop();
      let positions = {'A': {1: {piece: myBishop, row: 1, column: 'A'}}}
      let bishopStart = {row: 1, column: 'A'}

      expect(myBishop.canMove({board: positions, pos1: bishopStart, pos2: bishopStart})).toEqual(false)
    })

    it('should not be able to move diagonally into a space occupied by a friendly piece', () => {
      let myBishop = Bishop();
      let otherPiece = Bishop();
      let positions = {
        'A': {1: {piece: myBishop, row: 1, column: 'A'}},
        'B': {2: {piece: otherPiece, row: 2, column: 'B'}}
      }
      let bishopStart = {row: 1, column: 'A'}
      let near = {row: 2, column: 'B'}

      expect(myBishop.canMove({board: positions, pos1: bishopStart, pos2: near})).toEqual(false)
    })

    it('should be able to move diagonally into a space occupied by a enemy piece', () => {
      let myBishop = Bishop();
      let otherPiece = Bishop({owner: 'BLACK'});
      let positions = {
        'A': {1: {piece: myBishop, row: 1, column: 'A'}},
        'B': {2: {piece: otherPiece, row: 2, column: 'B'}}
      }
      let bishopStart = {row: 1, column: 'A'}
      let near = {row: 2, column: 'B'}

      expect(myBishop.canMove({board: positions, pos1: bishopStart, pos2: near})).toEqual(true)
    })

    it('should not be able to move diagonally over another piece into an empty space', () => {
      let myBishop = Bishop();
      let otherPiece = Bishop();
      let positions = {
        'A': {1: {piece: myBishop, row: 1, column: 'A'}},
        'B': {2: {piece: otherPiece, row: 2, column: 'B'}},
        'C': {3: {row: 3, column: 'C'}}
      }
      let bishopStart = {row: 1, column: 'A'}
      let near = {row: 2, column: 'B'}
      let far = {row: 3, column: 'C'}

      expect(myBishop.canMove({board: positions, pos1: bishopStart, pos2: far})).toEqual(false)
    })

    it('should not be able to move horizontally or vertically', () => {
      helpers.singleSpaceMovementVertical(Bishop(), false)
      helpers.manySpaceMovementHorizontal(Bishop(), false)
      helpers.singleSpaceMovementHorizontal(Bishop(), false)
      helpers.manySpaceMovementVertical(Bishop(), false)
    })
  })
})
