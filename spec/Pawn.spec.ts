import Pawn from '../src/piece/Pawn'
import { Player } from '../src/enums/Player'
import { BoardSpace } from '../src/interface/BoardSpace'

describe('Pawn >', () => {
  describe('Initialization > ', () => {
    it('should be able to initialize a Pawn', () => {
      let whitePawn = new Pawn(Player.WHITE);
      let myPawn = new Pawn(Player.BLACK);

      expect(whitePawn.owner).toEqual(Player.WHITE)
      expect(myPawn.owner).toEqual(Player.BLACK)
      expect(myPawn.movedStatus()).toEqual(false)
      expect(myPawn.name).toEqual('PAWN')
      expect(myPawn.renderChar).toEqual('P')
    })
  })

  describe('Movement >', () => {
    it('should be able to move forward if unhindered', () => {
      let myPawn = new Pawn(Player.WHITE);
      let positions = {'A': {2: {piece: myPawn, row: 2, column: 'A'}, 3: {row: 3, column: 'A'}}}
      let pos1 = {column: 'A', row: 2}
      let pos2 = {column: 'A', row: 3}

      let canItMove = myPawn.canMove(positions, pos1, pos2);
      expect(canItMove).toEqual(true)
    })

    it('should not be able to move backwards into a lower row if white', () => {
      let myPawn = new Pawn(Player.WHITE);
      let positions = {'A': {1: {row: 1, column: 'A'}, 2: {piece: myPawn, row: 2, column: 'A'}}}
      let pos1 = {column: 'A', row: 2}
      let pos2 = {column: 'A', row: 1}

      let canItMove = myPawn.canMove(positions, pos1, pos2);
      expect(canItMove).toEqual(false)
    })

    it('should not be able to move backwards into lower row if black', () => {
      let myPawn = new Pawn(Player.BLACK);
      let positions = {'A': {7: {piece: myPawn, row: 7, column: 'A'}, 8: {row: 8, column: 'A'}}}
      let pos1 = {column: 'A', row: 7}
      let pos2 = {column: 'A', row: 8}

      let canItMove = myPawn.canMove(positions, pos1, pos2);
      expect(canItMove).toEqual(false)
    })

    it('should not be able to move forward if there is already piece in that space', () => {
      let myPawn = new Pawn(Player.WHITE);
      let otherPawn = new Pawn(Player.WHITE);

      let positions = {'A': {2: {piece: myPawn, row: 2, column: 'A'}, 3: {piece: otherPawn, row: 3, column: 'A'}}}
      let pos1 = {column: 'A', row: 2}
      let pos2 = {column: 'A', row: 3}

      let canItMove = myPawn.canMove(positions, pos1, pos2);
      expect(canItMove).toEqual(false)
    })

    it('should be able to move forward two spaces if unhindered and if it has not moved', () => {
      let myPawn = new Pawn(Player.WHITE);
      let positions = {'A': {2: {piece: myPawn, row: 2, column: 'A'}, 3: {row: 3, column: 'A'}, 4: {row: 3, column: 'A'}}}
      let pos1 = {column: 'A', row: 2}
      let pos2 = {column: 'A', row: 4}

      let canItMove = myPawn.canMove(positions, pos1, pos2);
      expect(canItMove).toEqual(true)
    })

    it('should not be able to move forward two spaces if it has already moved', () => {
      let myPawn = new Pawn(Player.WHITE);
      let positions = {'A': {3: {piece: myPawn, row: 3, column:'A'}, 5: {row: 5, column: 'A'}}}
      let pos1 = {column: 'A', row: 3}
      let pos2 = {column: 'A', row: 5}

      myPawn.move(pos1, pos2)
      myPawn.turnUpdate()
      let canItMove = myPawn.canMove(positions, pos1, pos2);
      expect(canItMove).toEqual(false)
    })

    it('should not be able to jump over a piece to an unobscured space two spaces away', () => {
      let myPawn = new Pawn(Player.WHITE);
      let otherPawn = new Pawn(Player.WHITE);

      let positions = {'A': {2: {piece: myPawn, row: 2, column: 'A'}, 3: {piece: otherPawn, row: 3, column: 'A'}, 4: {row: 4, column: 'A'}}}
      let pos1 = {column: 'A', row: 2}
      let pos2 = {column: 'A', row: 4}

      let canItMove = myPawn.canMove(positions, pos1, pos2);
      expect(canItMove).toEqual(false)
    })

    it('should not be able to move diagonally without a piece there', () => {
      let myPawn = new Pawn(Player.WHITE);
      let positions = {'A': {3: {row: 3, column: 'A'}}, 'B': {2: {piece: myPawn, row: 2, column: 'B'}}}
      let pos1 = {column: 'B', row: 2}
      let pos2 = {column: 'A', row: 3}

      let canItMove = myPawn.canMove(positions, pos1, pos2);
      expect(canItMove).toEqual(false)
    })

    it('should be able to move diagonally if taking an enemy piece', () => {
      let myPawn = new Pawn(Player.WHITE);
      let otherPawn = new Pawn(Player.BLACK)
      let positions = {'A': {3: {piece: otherPawn, row: 3, column: 'A'}}, 'B': {2: {piece: myPawn, row: 2, column: 'B'}}}
      let pos1 = {column: 'B', row: 2}
      let pos2 = {column: 'A', row: 3}

      let canItMove = myPawn.canMove(positions, pos1, pos2);
      expect(canItMove).toEqual(true)
    })

    it('should not be able to move diagonally to take a friendly piece', () => {
      let myPawn = new Pawn(Player.WHITE)
      let otherPawn = new Pawn(Player.WHITE)
      let positions = {'A': {3: {piece: otherPawn, row: 3, column: 'A'}}, 'B': {2: {piece: myPawn, row: 2, column: 'B'}}}
      let pos1 = {column: 'B', row: 2}
      let pos2 = {column: 'A', row: 3}

      let canItMove = myPawn.canMove(positions, pos1, pos2);
      expect(canItMove).toEqual(false)
    })

    it('should not be able to move horizontally', () => {
      let myPawn = new Pawn(Player.WHITE);
      let positions = {'A': {3: {row: 3, column: 'A'}}, 'B': {3: {piece: myPawn, row: 3, column: 'B'}}}
      let pos1 = {column: 'B', row: 3}
      let pos2 = {column: 'A', row: 3}

      let canItMove = myPawn.canMove(positions, pos1, pos2);
      expect(canItMove).toEqual(false)
    })

    it('should not be able to move as a knight would', () => {
      let myPawn = new Pawn(Player.WHITE);
      let positions = {'A': {5: {row: 5, column: 'A'}}, 'B': {3: {piece: myPawn, row: 3, column: 'B'}}}
      let pos1 = {column: 'B', row: 3}
      let pos2 = {column: 'A', row: 5}

      let canItMove = myPawn.canMove(positions, pos1, pos2);
      expect(canItMove).toEqual(false)
    })

    it('should not be able to move diagonally more than one space', () => {
      let myPawn = new Pawn(Player.WHITE)
      let otherPawn = new Pawn(Player.BLACK)
      let positions = {'B': {3: {piece: otherPawn, row: 2, column: 'A'}}, 'D': {4: {piece: myPawn, row: 4, column: 'B'}}}
      let pos1 = {column: 'B', row: 2}
      let pos2 = {column: 'D', row: 4}

      let canItMove = myPawn.canMove(positions, pos1, pos2);
      expect(canItMove).toEqual(false)
    })

    it('should be able to take another pawn en Passant on the turn after a pawn moves two spaces forwards', () => {
      let myPawn = new Pawn(Player.WHITE)
      let otherPawn = new Pawn(Player.BLACK)
      let positions: {[key:string]:{[key:number]:BoardSpace}} = {
        'A': {2: {piece: otherPawn, row: 2, column: 'A'}, 3: {row: 3, column: 'A'}, 4: {row: 4, column: 'A'}},
        'B': {4: {piece: myPawn, row: 4, column: 'B'}}
      }
      let pos1 = {column: 'A', row: 2}
      let pos2 = {column: 'A', row: 4}

      myPawn.move(pos1, pos2)
      myPawn.turnUpdate()
      expect(myPawn.canBeTakenEnPassant()).toEqual(true)
      delete positions['A'][2].piece
      positions['A'][4].piece = myPawn

      pos1 = {column: 'B', row: 4}
      pos2 = {column: 'A', row: 3}
      let canItMove = otherPawn.canMove(positions, pos1, pos2)
      expect(canItMove).toEqual(true)
    })

    it('should not be able to take another pawn en Passant more than one turn after a pawn moves two spaces forwards', () => {
      let myPawn = new Pawn(Player.WHITE)
      let otherPawn = new Pawn(Player.BLACK)
      let positions: {[key:string]:{[key:number]:BoardSpace}} = {
        'A': {2: {piece: otherPawn, row: 2, column: 'A'}, 3: {row: 3, column: 'A'}, 4: {row: 4, column: 'A'}},
        'B': {4: {piece: myPawn, row: 4, column: 'B'}}
      }
      let pos1 = {column: 'A', row: 2}
      let pos2 = {column: 'A', row: 4}

      myPawn.move(pos1, pos2)
      myPawn.turnUpdate()
      expect(myPawn.canBeTakenEnPassant()).toEqual(true)
      delete positions['A'][2].piece
      positions['A'][4].piece = myPawn

      myPawn.turnUpdate()
      myPawn.turnUpdate()

      pos1 = {column: 'B', row: 4}
      pos2 = {column: 'A', row: 3}
      let canItMove = otherPawn.canMove(positions, pos1, pos2)
      expect(canItMove).toEqual(false)
    })

    it('should not be able to move into its own space', () => {
      let myPawn = new Pawn(Player.WHITE);
      let positions = {'A': {1: {piece: myPawn, row: 1, column: 'A'}}}
      let start = {row: 1, column: 'A'}

      expect(myPawn.canMove(positions, start, start)).toEqual(false)
    })
  })
})
