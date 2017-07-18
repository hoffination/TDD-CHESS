import Queen from '../src/piece/Queen'
import { Player } from '../src/enums/Player'
import { BoardSpace } from '../src/interface/BoardSpace'
import Helpers from '../test/Helpers'

describe('Queen >', () => {
  describe('Initialization >', () => {
    it('should initialize a queen correctly', () => {
      let myQueen = new Queen(Player.WHITE);

      expect(myQueen.owner).toEqual(Player.WHITE)
      expect(myQueen.name).toEqual('QUEEN')
      expect(myQueen.renderChar).toEqual('Q')
    })
  })

  describe('Movement >', () => {
    it('should be able to move forward or backward into an empty space', () => {
      Helpers.singleSpaceMovementVertical(new Queen(Player.WHITE), true);
    })

    it('should be able to move forward or backward across the board into an empty space', () => {
      Helpers.manySpaceMovementHorizontal(new Queen(Player.WHITE), true)
    })

    it('should be able to move left or right into an empty space', () => {
      Helpers.singleSpaceMovementHorizontal(new Queen(Player.WHITE), true)
    })

    it('should be able to move left or right across the board into an empty space', () => {
      Helpers.manySpaceMovementVertical(new Queen(Player.WHITE), true);
    })

    it('should be able to move diagonally into an empty space', () => {
      Helpers.singleSpaceMovementDiagonally(new Queen(Player.WHITE), true)
    })

    it('should be able to move diagonally across the board into an empty space', () => {
      Helpers.manySpaceMovementDiagonally(new Queen(Player.WHITE), true);
    })

    it('should be able to move to capture an enemy piece', () => {
      let myQueen = new Queen(Player.WHITE);
      let otherQueen = new Queen(Player.BLACK);
      let positions = {'D': {2: {piece: myQueen, row: 2, column: 'D'}, 3: {piece: otherQueen, row: 3, column: 'D'}}}
      let pos1 = {row: 2, column: 'D'}
      let pos2 = {row: 3, column: 'D'}

      let canItMove = myQueen.canMove(positions, pos1, pos2)
      expect(canItMove).toEqual(true)
    })

    it('should not be able to capture a friendly piece', () => {
      let myQueen = new Queen(Player.WHITE);
      let otherQueen = new Queen(Player.WHITE);
      let positions = {'D': {2: {piece: myQueen, row: 2, column: 'D'}, 3: {piece: otherQueen, row: 3, column: 'D'}}}
      let pos1 = {row: 2, column: 'D'}
      let pos2 = {row: 3, column: 'D'}

      let canItMove = myQueen.canMove(positions, pos1, pos2)
      expect(canItMove).toEqual(false)
    })

    it('should not be able to move into an empty space jumping over a piece piece', () => {
      let myQueen = new Queen(Player.WHITE);
      let otherQueen = new Queen(Player.WHITE);
      let positions = {'D': {
        2: {piece: myQueen, row: 2, column: 'D'},
        3: {piece: otherQueen, row: 3, column: 'D'},
        4: {row: 4, column: 'D'}
      }}
      let pos1 = {row: 2, column: 'D'}
      let pos2 = {row: 4, column: 'D'}

      let canItMove = myQueen.canMove(positions, pos1, pos2)
      expect(canItMove).toEqual(false)
    })
  })
})
