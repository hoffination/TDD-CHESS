let King = require('../King')
let Rook = require('../Rook')
const helpers = require('../test/helpers');

describe('King >', () => {
  describe('Initialization >', () => {
    it('should initialize a queen correctly', () => {
      let myKing = King();

      expect(myKing.owner).toEqual('WHITE')
      expect(myKing.name).toEqual('KING')
      expect(myKing.renderChar).toEqual('K')
    })
  })

  describe('Movement >', () => {
    it('should not be able to move if given bad directions', () => {
      let myKing = King();
      let canItMove = myKing.canMove({});
      expect(canItMove).toEqual(false)
    })

    it('should be able to move forward or backward into an empty space', () => {
      helpers.singleSpaceMovementVertical(King(), true);
    })

    it('should be able to move left or right into an empty space', () => {
      helpers.singleSpaceMovementHorizontal(King(), true)
    })

    it('should not be able to move diagonally into an empty space', () => {
      helpers.singleSpaceMovementDiagonally(King(), true)
    })

    it('should not be able to move forward or backward across the board into an empty space', () => {
      helpers.manySpaceMovementHorizontal(King(), false)
    })

    it('should not be able to move left or right across the board into an empty space', () => {
      helpers.manySpaceMovementVertical(King(), false);
    })

    it('should not be able to move diagonally across the board into an empty space', () => {
      helpers.manySpaceMovementDiagonally(King(), false);
    })

    it('should be able to move to capture an enemy piece', () => {
      let myKing = King();
      let otherKing = King({owner: 'BLACK'});
      let positions = {'D': {2: {piece: myKing, row: 2, column: 'D'}, 3: {piece: otherKing, row: 3, column: 'D'}}}
      let pos1 = {row: 2, column: 'D'}
      let pos2 = {row: 3, column: 'D'}

      let canItMove = myKing.canMove({board: positions, pos1: pos1, pos2: pos2})
      expect(canItMove).toEqual(true)
    })

    it('should not be able to capture a friendly piece', () => {
      let myKing = King()
      let otherKing = King()
      let positions = {'D': {2: {piece: myKing, row: 2, column: 'D'}, 3: {piece: otherKing, row: 3, column: 'D'}}}
      let pos1 = {row: 2, column: 'D'}
      let pos2 = {row: 3, column: 'D'}

      let canItMove = myKing.canMove({board: positions, pos1: pos1, pos2: pos2})
      expect(canItMove).toEqual(false)
    })

    it('should updated moved status when it moves', () => {
      let myKing = King()
      expect(myKing.movedStatus()).toEqual(false)
      myKing.move()
      expect(myKing.movedStatus()).toEqual(true)
    })

    it('should be able to castle as long as there is an unmoved rook and the way is clear of other pieces', () => {
      let myKing = King()
      let myRook = Rook()
      let myOtherRook = Rook()
      let positions = {
        'A': {1: {piece: myRook, row: 1, column: 'A'}},
        'B': {1: {row: 1, column: 'B'}},
        'C': {1: {row: 1, column: 'C'}},
        'D': {1: {row: 1, column: 'D'}},
        'E': {1: {piece: myRook, row: 1, column: 'E'}},
        'F': {1: {row: 1, column: 'F'}},
        'G': {1: {row: 1, column: 'G'}},
        'H': {1: {piece: myOtherRook, row: 1, column: 'H'}},
      }
      let pos1 = {row: 1, column: 'E'}
      let pos2 = {row: 1, column: 'C'}
      let pos3 = {row: 1, column: 'G'}

      let canItMove = myKing.canMove({board: positions, pos1: pos1, pos2: pos2})
      expect(canItMove).toEqual(true)

      canItMove = myKing.canMove({board: positions, pos1: pos1, pos2: pos3})
      expect(canItMove).toEqual(true)
    })

    it('should not be able to castle if the rook has already moved', () => {
      let myKing = King()
      let myRook = Rook()
      myRook.move()
      let myOtherRook = Rook()
      myOtherRook.move()
      let positions = {
        'A': {1: {piece: myRook, row: 1, column: 'A'}},
        'B': {1: {row: 1, column: 'B'}},
        'C': {1: {row: 1, column: 'C'}},
        'D': {1: {row: 1, column: 'D'}},
        'E': {1: {piece: myRook, row: 1, column: 'E'}},
        'F': {1: {row: 1, column: 'F'}},
        'G': {1: {row: 1, column: 'G'}},
        'H': {1: {piece: myOtherRook, row: 1, column: 'H'}},
      }
      let pos1 = {row: 1, column: 'E'}
      let pos2 = {row: 1, column: 'C'}
      let pos3 = {row: 1, column: 'G'}

      let canItMove = myKing.canMove({board: positions, pos1: pos1, pos2: pos2})
      expect(canItMove).toEqual(false)

      canItMove = myKing.canMove({board: positions, pos1: pos1, pos2: pos3})
      expect(canItMove).toEqual(false)
    })

    it('should not be able to castle if the king has already moved', () => {
      let myKing = King()
      myKing.move()
      let myRook = Rook()
      let positions = {
        'A': {1: {piece: myRook, row: 1, column: 'A'}},
        'B': {1: {row: 1, column: 'B'}},
        'C': {1: {row: 1, column: 'C'}},
        'D': {1: {row: 1, column: 'D'}},
        'E': {1: {piece: myRook, row: 1, column: 'E'}},
      }
      let pos1 = {row: 1, column: 'E'}
      let pos2 = {row: 1, column: 'C'}

      let canItMove = myKing.canMove({board: positions, pos1: pos1, pos2: pos2})
      expect(canItMove).toEqual(false)
    })
  })
})
