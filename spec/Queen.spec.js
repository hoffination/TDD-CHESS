let Queen = require('../Queen')

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
      let myQueen = Queen();
      let positions = {'D': {1: {row: 1, column: 'D'}, 2: {piece: myQueen, row: 2, column: 'D'}, 3: {row: 3, column: 'D'}}}
      let pos1 = {row: 2, column: 'D'}
      let pos2 = {row: 3, column: 'D'}
      let pos3 = {row: 1, column: 'D'}

      let canItMove = myQueen.canMove({board: positions, pos1: pos1, pos2: pos2})
      expect(canItMove).toEqual(true)

      canItMove = myQueen.canMove({board: positions, pos1: pos1, pos2: pos3})
      expect(canItMove).toEqual(true)
    })

    it('should be able to move forward or backward across the board into an empty space', () => {
      let myQueen = Queen();
      let positions = {'D': {
        1: {row: 1, column: 'D'},
        2: {row: 2, column: 'D'},
        3: {row: 3, column: 'D'},
        4: {piece: myQueen, row: 4, column: 'D'},
        5: {row: 5, column: 'D'},
        6: {row: 6, column: 'D'},
        7: {row: 7, column: 'D'},
        8: {row: 8, column: 'D'}}
      }
      let pos1 = {row: 4, column: 'D'}
      let pos2 = {row: 1, column: 'D'}
      let pos3 = {row: 8, column: 'D'}

      let canItMove = myQueen.canMove({board: positions, pos1: pos1, pos2: pos2})
      expect(canItMove).toEqual(true)

      canItMove = myQueen.canMove({board: positions, pos1: pos1, pos2: pos3})
      expect(canItMove).toEqual(true)
    })

    it('should be able to move left or right into an empty space', () => {
      let myQueen = Queen();
      let positions = {
        'C': {2: {row: 2, column: 'C'}},
        'D': {2: {piece: myQueen, row: 2, column: 'D'}},
        'E': {2: {row: 2, column: 'E'}}
      }
      let pos1 = {row: 2, column: 'D'}
      let pos2 = {row: 2, column: 'C'}
      let pos3 = {row: 2, column: 'E'}

      let canItMove = myQueen.canMove({board: positions, pos1: pos1, pos2: pos2})
      expect(canItMove).toEqual(true)

      canItMove = myQueen.canMove({board: positions, pos1: pos1, pos2: pos3})
      expect(canItMove).toEqual(true)
    })

    it('should be able to move left or right across the board into an empty space', () => {
      let myQueen = Queen();
      let positions = {
        'A': {2: {row: 2, column: 'A'}},
        'B': {2: {row: 2, column: 'B'}},
        'C': {2: {row: 2, column: 'C'}},
        'D': {2: {piece: myQueen, row: 2, column: 'D'}},
        'E': {2: {row: 2, column: 'E'}},
        'F': {2: {row: 2, column: 'F'}},
        'G': {2: {row: 2, column: 'G'}},
        'H': {2: {row: 2, column: 'H'}}
      }
      let pos1 = {row: 2, column: 'D'}
      let pos2 = {row: 2, column: 'A'}
      let pos3 = {row: 2, column: 'H'}

      let canItMove = myQueen.canMove({board: positions, pos1: pos1, pos2: pos2})
      expect(canItMove).toEqual(true)

      canItMove = myQueen.canMove({board: positions, pos1: pos1, pos2: pos3})
      expect(canItMove).toEqual(true)
    })

    it('should be able to move diagonally into an empty space', () => {
      let myQueen = Queen();
      let positions = {
        'C': {1: {row: 1, column: 'C'}, 3: {row: 3, column: 'C'}},
        'D': {2: {piece: myQueen, row: 2, column: 'D'}},
        'E': {1: {row: 1, column: 'E'}, 3: {row: 3, column: 'E'}}
      }
      let pos1 = {row: 2, column: 'D'}
      let pos2 = {row: 1, column: 'C'}
      let pos3 = {row: 1, column: 'E'}
      let pos4 = {row: 3, column: 'C'}
      let pos5 = {row: 3, column: 'E'}

      let canItMove = myQueen.canMove({board: positions, pos1: pos1, pos2: pos2})
      expect(canItMove).toEqual(true)

      canItMove = myQueen.canMove({board: positions, pos1: pos1, pos2: pos3})
      expect(canItMove).toEqual(true)

      canItMove = myQueen.canMove({board: positions, pos1: pos1, pos2: pos4})
      expect(canItMove).toEqual(true)

      canItMove = myQueen.canMove({board: positions, pos1: pos1, pos2: pos5})
      expect(canItMove).toEqual(true)
    })
  })

  it('should be able to move diagonally across the board into an empty space', () => {
    let myQueen = Queen();
    let positions = {
      'A': {1: {row: 1, column: 'A'}, 7: {row: 7, column: 'A'}},
      'B': {2: {row: 2, column: 'B'}, 6: {row: 6, column: 'B'}},
      'C': {3: {row: 3, column: 'C'}, 5: {row: 5, column: 'C'}},
      'D': {4: {piece: myQueen, row: 4, column: 'D'}},
      'E': {3: {row: 3, column: 'E'}, 5: {row: 5, column: 'E'}},
      'F': {2: {row: 2, column: 'F'}, 6: {row: 6, column: 'F'}},
      'G': {1: {row: 1, column: 'G'}, 7: {row: 7, column: 'G'}},
      'H': {8: {row: 8, column: 'H'}}
    }
    let pos1 = {row: 4, column: 'D'}
    let pos2 = {row: 1, column: 'A'}
    let pos3 = {row: 1, column: 'G'}
    let pos4 = {row: 7, column: 'A'}
    let pos5 = {row: 8, column: 'H'}

    let canItMove = myQueen.canMove({board: positions, pos1: pos1, pos2: pos2})
    expect(canItMove).toEqual(true)

    canItMove = myQueen.canMove({board: positions, pos1: pos1, pos2: pos3})
    expect(canItMove).toEqual(true)

    canItMove = myQueen.canMove({board: positions, pos1: pos1, pos2: pos4})
    expect(canItMove).toEqual(true)

    canItMove = myQueen.canMove({board: positions, pos1: pos1, pos2: pos5})
    expect(canItMove).toEqual(true)
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
