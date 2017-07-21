import King from '../src/piece/King'
import Rook from '../src/piece/Rook'
import { Player } from '../src/enums/Player'
import Helpers from '../test/helpers'

describe('King >', () => {
  describe('Initialization >', () => {
    it('should initialize a queen correctly', () => {
      let myKing = new King(Player.WHITE);

      expect(myKing.owner).toEqual(Player.WHITE)
      expect(myKing.name).toEqual('KING')
      expect(myKing.renderChar).toEqual('K')
    })
  })

  describe('Movement >', () => {
    it('should be able to move forward or backward into an empty space', () => {
      Helpers.singleSpaceMovementVertical(new King(Player.WHITE), true);
    })

    it('should be able to move left or right into an empty space', () => {
      Helpers.singleSpaceMovementHorizontal(new King(Player.WHITE), true)
    })

    it('should not be able to move diagonally into an empty space', () => {
      Helpers.singleSpaceMovementDiagonally(new King(Player.WHITE), true)
    })

    it('should not be able to move forward or backward across the board into an empty space', () => {
      Helpers.manySpaceMovementHorizontal(new King(Player.WHITE), false)
    })

    it('should not be able to move left or right across the board into an empty space', () => {
      Helpers.manySpaceMovementVertical(new King(Player.WHITE), false);
    })

    it('should not be able to move diagonally across the board into an empty space', () => {
      Helpers.manySpaceMovementDiagonally(new King(Player.WHITE), false);
    })

    it('should be able to move to capture an enemy piece', () => {
      let myKing = new King(Player.WHITE);
      let otherKing = new King(Player.BLACK);
      let positions = {'D': {2: {piece: myKing, row: 2, column: 'D'}, 3: {piece: otherKing, row: 3, column: 'D'}}}
      let pos1 = {row: 2, column: 'D'}
      let pos2 = {row: 3, column: 'D'}

      let canItMove = myKing.canMove(positions, pos1, pos2)
      expect(canItMove).toEqual(true)
    })

    it('should not be able to capture a friendly piece', () => {
      let myKing = new King(Player.WHITE)
      let otherKing = new King(Player.WHITE)
      let positions = {'D': {2: {piece: myKing, row: 2, column: 'D'}, 3: {piece: otherKing, row: 3, column: 'D'}}}
      let pos1 = {row: 2, column: 'D'}
      let pos2 = {row: 3, column: 'D'}

      let canItMove = myKing.canMove(positions, pos1, pos2)
      expect(canItMove).toEqual(false)
    })

    it('should updated moved status when it moves', () => {
      let myKing = new King(Player.WHITE)
      let pos1 = {row: 2, column: 'D'}
      let pos2 = {row: 3, column: 'D'}
      expect(myKing.movedStatus()).toEqual(false)
      myKing.move(pos1, pos2)
      expect(myKing.movedStatus()).toEqual(true)
    })

    it('should be able to castle as long as there is an unmoved rook and the way is clear of other pieces', () => {
      let myKing = new King(Player.WHITE)
      let myRook = new Rook(Player.WHITE)
      let myOtherRook = new Rook(Player.WHITE)
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

      let canItMove = myKing.canMove(positions, pos1, pos2)
      expect(canItMove).toEqual(true)

      canItMove = myKing.canMove(positions, pos1, pos2)
      expect(canItMove).toEqual(true)
    })

    // TODO: king cannot castle if pieces are in the way

    it('should not be able to castle if the rook has already moved', () => {
      let myKing = new King(Player.WHITE)
      let myRook = new Rook(Player.WHITE)
      let pos = {row: 1, column: 'E'}
      myRook.move(pos, pos)
      let myOtherRook = new Rook(Player.WHITE)
      myOtherRook.move(pos, pos)
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

      let canItMove = myKing.canMove(positions, pos1, pos2)
      expect(canItMove).toEqual(false)

      canItMove = myKing.canMove(positions, pos1, pos3)
      expect(canItMove).toEqual(false)
    })

    it('should not be able to castle if the king has already moved', () => {
      let myKing = new King(Player.WHITE)
      let pos = {row: 1, column: 'E'}
      myKing.move(pos, pos)
      let myRook = new Rook(Player.WHITE)
      let positions = {
        'A': {1: {piece: myRook, row: 1, column: 'A'}},
        'B': {1: {row: 1, column: 'B'}},
        'C': {1: {row: 1, column: 'C'}},
        'D': {1: {row: 1, column: 'D'}},
        'E': {1: {piece: myKing, row: 1, column: 'E'}},
      }
      let pos1 = {row: 1, column: 'E'}
      let pos2 = {row: 1, column: 'C'}

      let canItMove = myKing.canMove(positions, pos1, pos2)
      expect(canItMove).toEqual(false)
    })
  })
})
