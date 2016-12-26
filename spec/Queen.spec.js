let Queen = require('../Queen')
const helpers = require('../test/helpers');

describe('Queen >', () => {
  describe('Initialization >', () => {
    it('should initialize a queen correctly', () => {
      let myQueen = Queen();

      expect(myQueen.owner).toEqual('WHITE')
      expect(myQueen.name).toEqual('QUEEN')
      expect(myQueen.renderChar).toEqual('Q')
    })
  })

  describe('Movement >', () => {
    it('should not be able to move if given bad directions', () => {
      let myQueen = Queen();
      let canItMove = myQueen.canMove({});
      expect(canItMove).toEqual(false)
    })

    it('should be able to move forward or backward into an empty space', () => {
      helpers.singleSpaceMovementVertical(Queen(), true);
    })

    it('should be able to move forward or backward across the board into an empty space', () => {
      helpers.manySpaceMovementHorizontal(Queen(), true)
    })

    it('should be able to move left or right into an empty space', () => {
      helpers.singleSpaceMovementHorizontal(Queen(), true)
    })

    it('should be able to move left or right across the board into an empty space', () => {
      helpers.manySpaceMovementVertical(Queen(), true);
    })

    it('should be able to move diagonally into an empty space', () => {
      helpers.singleSpaceMovementDiagonally(Queen(), true)
    })

    it('should be able to move diagonally across the board into an empty space', () => {
      helpers.manySpaceMovementDiagonally(Queen(), true);
    })

    it('should be able to move to capture an enemy piece', () => {
      let myQueen = Queen();
      let otherQueen = Queen({owner: 'BLACK'});
      let positions = {'D': {2: {piece: myQueen, row: 2, column: 'D'}, 3: {piece: otherQueen, row: 3, column: 'D'}}}
      let pos1 = {row: 2, column: 'D'}
      let pos2 = {row: 3, column: 'D'}

      let canItMove = myQueen.canMove({board: positions, pos1: pos1, pos2: pos2})
      expect(canItMove).toEqual(true)
    })

    it('should not be able to capture a friendly piece', () => {
      let myQueen = Queen();
      let otherQueen = Queen();
      let positions = {'D': {2: {piece: myQueen, row: 2, column: 'D'}, 3: {piece: otherQueen, row: 3, column: 'D'}}}
      let pos1 = {row: 2, column: 'D'}
      let pos2 = {row: 3, column: 'D'}

      let canItMove = myQueen.canMove({board: positions, pos1: pos1, pos2: pos2})
      expect(canItMove).toEqual(false)
    })

    it('should not be able to move into an empty space jumping over a piece piece', () => {
      let myQueen = Queen();
      let otherQueen = Queen();
      let positions = {'D': {
        2: {piece: myQueen, row: 2, column: 'D'},
        3: {piece: otherQueen, row: 3, column: 'D'},
        4: {row: 4, column: 'D'}
      }}
      let pos1 = {row: 2, column: 'D'}
      let pos2 = {row: 4, column: 'D'}

      let canItMove = myQueen.canMove({board: positions, pos1: pos1, pos2: pos2})
      expect(canItMove).toEqual(false)
    })
  })
})
