/* jshint esversion: 6, asi: true */
let Rook = require('../Rook')

describe('Rook >', () => {
  describe('Initialization >', () => {
    it('should correctly initialize a rook', () => {
      let myRook = Rook();

      expect(myRook.movedStatus()).toEqual(false)
      expect(myRook.name).toEqual('ROOK')
      expect(myRook.renderChar).toEqual('R')
    })
  })

  describe('Movement >', () => {
    it('should not be able to move if given bad directions', () => {
      let rook = Rook();
      let canItMove = rook.canMove({});
      expect(canItMove).toEqual(false)
    })

    it('should be able to move into an empty space vertically', () => {
      let myRook = Rook();
      let positions = {'A': {1: {piece: myRook, row: 1, column: 'A'}, 2: {row: 2, column: 'A'}, 3: {row: 3, column: 'A'}}}
      let pos1 = {column: 'A', row: 1}
      let pos2 = {column: 'A', row: 3}

      expect(myRook.canMove({board: positions, pos1: pos1, pos2: pos2})).toEqual(true)
    })

    it('should be able to move into an empty space horizontally', () => {
      let myRook = Rook();
      let positions = {'A': {1: {piece: myRook, row: 1, column: 'A'}}, 'B': {1: {row: 1, column: 'B'}}, 'C': {1: {row: 1, column: 'C'}}}
      let pos1 = {column: 'A', row: 1}
      let pos2 = {column: 'C', row: 1}

      expect(myRook.canMove({board: positions, pos1: pos1, pos2: pos2})).toEqual(true)
    })

    it('should not be able to move into an empty space diagonally', () => {
      let myRook = Rook();
      let positions = {'A': {1: {piece: myRook, row: 1, column: 'A'}}, 'C': {3: {row: 3, column: 'C'}}}
      let pos1 = {column: 'A', row: 1}
      let pos2 = {column: 'C', row: 3}

      expect(myRook.canMove({board: positions, pos1: pos1, pos2: pos2})).toEqual(false) // Expected true to equal false
    })

    it('should be able to capture other pieces at any distance vertically or horizontally', () => {
      let myRook1 = Rook();
      let myRook2 = Rook();
      let otherRookV1 = Rook({owner: 'BLACK'})
      let otherRookV2 = Rook({owner: 'BLACK'})
      let otherRookH1 = Rook({owner: 'BLACK'})
      let otherRookH2 = Rook({owner: 'BLACK'})
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

      expect(myRook1.canMove({board: positions, pos1: {row: 1, column: 'A'}, pos2: {row: 2, column: 'A'}})).toEqual(true)
      expect(myRook1.canMove({board: positions, pos1: {row: 1, column: 'A'}, pos2: {row: 1, column: 'B'}})).toEqual(true)
      expect(myRook1.canMove({board: positions, pos1: {row: 2, column: 'B'}, pos2: {row: 8, column: 'B'}})).toEqual(true)
      expect(myRook1.canMove({board: positions, pos1: {row: 2, column: 'B'}, pos2: {row: 2, column: 'H'}})).toEqual(true)
    })

    it('should be unable to capture friendly pieces', () => {
      let myRook = Rook()
      let otherRook = Rook()
      let positions = {'A': {
        1: {piece: myRook, row: 1, column: 'A'},
        2: {row: 2, column: 'A'},
        3: {piece: otherRook, row: 3, column: 'A'}
      }}
      let pos1 = {column: 'A', row: 1}
      let pos2 = {column: 'A', row: 3}

      expect(myRook.canMove({board: positions, pos1: pos1, pos2: pos2})).toEqual(false)
    })

    it('should not be able to jump over pieces', () => {
      let myRook = Rook()
      let otherRook = Rook()
      let otherRook2 = Rook()
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

      expect(myRook.canMove({board: positions, pos1: pos1, pos2: pos2})).toEqual(false)
      expect(myRook.canMove({board: positions, pos1: pos1, pos2: pos3})).toEqual(false)
    })

    it('should change its hasMoved status to true when it moves', () => {
      let myRook = Rook()
      expect(myRook.movedStatus()).toEqual(false)
      myRook.move()
      expect(myRook.movedStatus()).toEqual(true)
    })
  })
})
