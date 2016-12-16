let Pawn = require('../Pawn')

describe('Pawn >', () => {
  describe('Initialization > ', () => {
    it('should be able to initialize a Pawn', () => {
      let whitePawn = Pawn();
      let myPawn = Pawn({owner: 'BLACK'});

      expect(whitePawn.owner).toEqual('WHITE')
      expect(myPawn.owner).toEqual('BLACK')
      expect(myPawn.movedStatus()).toEqual(false)
      expect(myPawn.name).toEqual('PAWN')
      expect(myPawn.renderChar).toEqual('P')
    })
  })

  describe('Movement >', () => {
    it('should not be able to move if given bad directions', () => {
      let myPawn = Pawn();
      let canItMove = myPawn.canMove({});
      expect(canItMove).toEqual(false)
    })

    it('should be able to move forward if unhindered', () => {
      let myPawn = Pawn();
      let positions = {'A': {2: {piece: myPawn, row: 2, column: 'A'}, 3: {row: 3, column: 'A'}}}
      let pos1 = {column: 'A', row: 2}
      let pos2 = {column: 'A', row: 3}

      let canItMove = myPawn.canMove({board: positions, pos1: pos1, pos2: pos2});
      expect(canItMove).toEqual(true)
    })

    it('should not be able to move backwards into a lower row if white', () => {
      let myPawn = Pawn();
      let positions = {'A': {1: {row: 1, column: 'A'}, 2: {piece: myPawn, row: 2, column: 'A'}}}
      let pos1 = {column: 'A', row: 2}
      let pos2 = {column: 'A', row: 1}

      let canItMove = myPawn.canMove({board: positions, pos1: pos1, pos2: pos2});
      expect(canItMove).toEqual(false)
    })

    it('should not be able to move backwards into lower row if black', () => {
      let myPawn = Pawn({owner: 'BLACK'});
      let positions = {'A': {7: {piece: myPawn, row: 7, column: 'A'}, 8: {row: 8, column: 'A'}}}
      let pos1 = {column: 'A', row: 7}
      let pos2 = {column: 'A', row: 8}

      let canItMove = myPawn.canMove({board: positions, pos1: pos1, pos2: pos2});
      expect(canItMove).toEqual(false)
    })

    it('should not be able to move forward if there is already piece in that space', () => {
      let myPawn = Pawn();
      let otherPawn = Pawn();

      let positions = {'A': {2: {piece: myPawn, row: 2, column: 'A'}, 3: {piece: otherPawn, row: 3, column: 'A'}}}
      let pos1 = {column: 'A', row: 2}
      let pos2 = {column: 'A', row: 3}

      let canItMove = myPawn.canMove({board: positions, pos1: pos1, pos2: pos2});
      expect(canItMove).toEqual(false)
    })

    it('should be able to move forward two spaces if unhindered and if it has not moved', () => {
      let myPawn = Pawn();
      let positions = {'A': {2: {piece: myPawn, row: 2, column: 'A'}, 3: {row: 3, column: 'A'}, 4: {row: 3, column: 'A'}}}
      let pos1 = {column: 'A', row: 2}
      let pos2 = {column: 'A', row: 4}

      let canItMove = myPawn.canMove({board: positions, pos1: pos1, pos2: pos2});
      expect(canItMove).toEqual(true)
    })

    it('should not be able to move forward two spaces if it has already moved', () => {
      let myPawn = Pawn();
      let positions = {'A': {3: myPawn, 5: {}}}
      let pos1 = {column: 'A', row: 3}
      let pos2 = {column: 'A', row: 5}

      myPawn.move()
      let canItMove = myPawn.canMove({board: positions, pos1: pos1, pos2: pos2});
      expect(canItMove).toEqual(false)
    })

    it('should not be able to jump over a piece to an unobscured space two spaces away', () => {
      let myPawn = Pawn();
      let otherPawn = Pawn();

      let positions = {'A': {2: {piece: myPawn, row: 2, column: 'A'}, 3: {piece: otherPawn, row: 3, column: 'A'}, 4: {row: 4, column: 'A'}}}
      let pos1 = {column: 'A', row: 2}
      let pos2 = {column: 'A', row: 4}

      let canItMove = myPawn.canMove({board: positions, pos1: pos1, pos2: pos2});
      expect(canItMove).toEqual(false)
    })

    it('should not be able to move diagonally without a piece there', () => {
      let myPawn = Pawn();
      let positions = {'A': {3: {}}, 'B': {2: {piece: myPawn, row: 2, column: 'B'}}}
      let pos1 = {column: 'B', row: 2}
      let pos2 = {column: 'A', row: 3}

      let canItMove = myPawn.canMove({board: positions, pos1: pos1, pos2: pos2});
      expect(canItMove).toEqual(false)
    })

    it('should be able to move diagonally if taking an enemy piece', () => {
      let myPawn = Pawn();
      let otherPawn = Pawn({owner: 'BLACK'})
      let positions = {'A': {3: {piece: otherPawn, row: 3, column: 'A'}}, 'B': {2: {piece: myPawn, row: 2, column: 'B'}}}
      let pos1 = {column: 'B', row: 2}
      let pos2 = {column: 'A', row: 3}

      let canItMove = myPawn.canMove({board: positions, pos1: pos1, pos2: pos2});
      expect(canItMove).toEqual(true)
    })

    it('should not be able to move diagonally to take a friendly piece', () => {
      let myPawn = Pawn()
      let otherPawn = Pawn()
      let positions = {'A': {3: {piece: otherPawn, row: 3, column: 'A'}}, 'B': {2: {piece: myPawn, row: 2, column: 'B'}}}
      let pos1 = {column: 'B', row: 2}
      let pos2 = {column: 'A', row: 3}

      let canItMove = myPawn.canMove({board: positions, pos1: pos1, pos2: pos2});
      expect(canItMove).toEqual(false)
    })

    it('should not be able to move horizontally', () => {
      let myPawn = Pawn();
      let positions = {'A': {3: {}}, 'B': {3: {piece: myPawn, row: 3, column: 'B'}}}
      let pos1 = {column: 'B', row: 3}
      let pos2 = {column: 'A', row: 3}

      let canItMove = myPawn.canMove({board: positions, pos1: pos1, pos2: pos2});
      expect(canItMove).toEqual(false)
    })

    it('should not be able to move as a knight would', () => {
      let myPawn = Pawn();
      let positions = {'A': {5: {}}, 'B': {3: {piece: myPawn, row: 3, column: 'B'}}}
      let pos1 = {column: 'B', row: 3}
      let pos2 = {column: 'A', row: 5}

      let canItMove = myPawn.canMove({board: positions, pos1: pos1, pos2: pos2});
      expect(canItMove).toEqual(false)
    })

    it('should not be able to move diagonally more than one space', () => {
      let myPawn = Pawn()
      let otherPawn = Pawn({owner: 'BLACK'})
      let positions = {'B': {3: {piece: otherPawn, row: 2, column: 'A'}}, 'D': {4: {piece: myPawn, row: 4, column: 'B'}}}
      let pos1 = {column: 'B', row: 2}
      let pos2 = {column: 'D', row: 4}

      let canItMove = myPawn.canMove({board: positions, pos1: pos1, pos2: pos2});
      expect(canItMove).toEqual(false)
    })
  })
})
