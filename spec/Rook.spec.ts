import Rook from '../src/piece/Rook'
import { Player } from '../src/enums/Player'
import { BoardSpace } from '../src/interface/BoardSpace'
import Helpers from '../test/helpers'

describe('Rook >', () => {
  describe('Initialization >', () => {
    it('should correctly initialize a rook', () => {
      let myRook = new Rook(Player.WHITE);

      expect(myRook.movedStatus()).toEqual(false)
    })
  })

  describe('Movement >', () => {
    it('should be able to move into an empty space horizontally', () => {
      Helpers.singleSpaceMovementHorizontal(new Rook(Player.WHITE), true)
      Helpers.manySpaceMovementHorizontal(new Rook(Player.WHITE), true)
    })

    it('should be able to move into an empty space vertically', () => {
      Helpers.singleSpaceMovementVertical(new Rook(Player.WHITE), true)
      Helpers.manySpaceMovementVertical(new Rook(Player.WHITE), true)
    })

    it('should not be able to move into an empty space diagonally', () => {
      let myRook = new Rook(Player.WHITE);
      let positions = {'A': {1: {piece: myRook, row: 1, column: 'A'}}, 'C': {3: {row: 3, column: 'C'}}}
      let pos1 = {column: 'A', row: 1}
      let pos2 = {column: 'C', row: 3}

      expect(myRook.canMove(positions, pos1, pos2)).toEqual(false) // Expected true to equal false
    })

    it('should be able to capture other pieces at any distance vertically or horizontally', () => {
      let myRook1 = new Rook(Player.WHITE);
      let myRook2 = new Rook(Player.WHITE);
      let otherRookV1 = new Rook(Player.BLACK)
      let otherRookV2 = new Rook(Player.BLACK)
      let otherRookH1 = new Rook(Player.BLACK)
      let otherRookH2 = new Rook(Player.BLACK)
      let positions = {
        'A': {
          1: {piece: myRook1, row: 1, column: 'A'},
          2: {piece: otherRookV1, row: 2, column: 'A'}
        },
        'B': {
          1: {piece: otherRookH1, row: 1, column: 'B'},
          2: {piece: myRook2, row: 2, column: 'B'},
          3: {row: 3, column: 'B'},
          4: {row: 4, column: 'B'},
          5: {row: 5, column: 'B'},
          6: {row: 6, column: 'B'},
          7: {row: 7, column: 'B'},
          8: {piece: otherRookV2, row: 8, column: 'B'}
        },
        'C': {2: {row: 2, column: 'C'}},
        'D': {2: {row: 2, column: 'D'}},
        'E': {2: {row: 2, column: 'E'}},
        'F': {2: {row: 2, column: 'F'}},
        'G': {2: {row: 2, column: 'G'}},
        'H': {
          2: {piece: otherRookH2, row: 2, column: 'H'}
        }
      }

      expect(myRook1.canMove(positions, {row: 1, column: 'A'}, {row: 2, column: 'A'})).toEqual(true)
      expect(myRook1.canMove(positions, {row: 1, column: 'A'}, {row: 1, column: 'B'})).toEqual(true)
      expect(myRook1.canMove(positions, {row: 2, column: 'B'}, {row: 8, column: 'B'})).toEqual(true)
      expect(myRook1.canMove(positions, {row: 2, column: 'B'}, {row: 2, column: 'H'})).toEqual(true)
    })

    it('should be unable to capture friendly pieces', () => {
      let myRook = new Rook(Player.WHITE)
      let otherRook = new Rook(Player.WHITE)
      let positions = {'A': {
        1: {piece: myRook, row: 1, column: 'A'},
        2: {row: 2, column: 'A'},
        3: {piece: otherRook, row: 3, column: 'A'}
      }}
      let pos1 = {column: 'A', row: 1}
      let pos2 = {column: 'A', row: 3}

      expect(myRook.canMove(positions, pos1, pos2)).toEqual(false)
    })

    it('should not be able to jump over pieces', () => {
      let myRook = new Rook(Player.WHITE)
      let otherRook = new Rook(Player.WHITE)
      let otherRook2 = new Rook(Player.WHITE)
      let positions = {
        'A': {
          1: {piece: myRook, row: 1, column: 'A'},
          2: {row: 2, column: 'A'},
          3: {piece: otherRook, row: 3, column: 'A'},
          4: {row: 4, column: 'A'}
        },
        'B': {1: {piece: otherRook2, row: 1, column: 'B'}},
        'C': {1: {row: 1, column: 'C'}}
      }
      let pos1 = {column: 'A', row: 1}
      let pos2 = {column: 'A', row: 4}
      let pos3 = {column: 'C', row: 1}

      expect(myRook.canMove(positions, pos1, pos2)).toEqual(false)
      expect(myRook.canMove(positions, pos1, pos3)).toEqual(false)
    })

    it('should change its hasMoved status to true when it moves', () => {
      let myRook = new Rook(Player.WHITE)
      let pos1 = {column: 'A', row: 1}
      let pos2 = {column: 'A', row: 4}
      expect(myRook.movedStatus()).toEqual(false)
      myRook.move(pos1, pos2)
      expect(myRook.movedStatus()).toEqual(true)

      // Check that it is instance specific
      let otherRook = new Rook(Player.WHITE)
      expect(otherRook.movedStatus()).toEqual(false)
      expect(myRook.movedStatus()).toEqual(true)
    })
  })
})
