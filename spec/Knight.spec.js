let Knight = require('../Knight')

describe('Knight >', () => {
  describe('Initialization > ', () => {
    it('should be able to initialize a Knight', () => {
      let myKnight = Knight();

      expect(myKnight.owner).toEqual('WHITE')
      expect(myKnight.name).toEqual('KNIGHT')
      expect(myKnight.renderChar).toEqual('K')
    })
  })

  describe('Movement >', () => {
    it('should be able to move forward two right one', () => {
      let myKnight = Knight();
      let positions = {'C': {1: {piece: myKnight, row: 1, column: 'C'}}, 'D': {3: {row: 3, column: 'D'}}}
      let pos1 = {row: 1, column: 'C'}
      let pos2 = {row: 3, column: 'D'}

      expect(myKnight.canMove({board: positions, pos1: pos1, pos2: pos2})).toEqual(true)
    })

    it('should be able to move forward two left one', () => {
      let myKnight = Knight();
      let positions = {'B': {3: {row: 3, column: 'B'}}, 'C': {1: {piece: myKnight, row: 1, column: 'C'}}}
      let pos1 = {row: 1, column: 'C'}
      let pos2 = {row: 3, column: 'B'}

      expect(myKnight.canMove({board: positions, pos1: pos1, pos2: pos2})).toEqual(true)
    })

    it('should not be able to move forward two left two', () => {
      let myKnight = Knight();
      let positions = {'A': {3: {row: 3, column: 'A'}}, 'C': {1: {piece: myKnight, row: 1, column: 'C'}}}
      let pos1 = {row: 1, column: 'C'}
      let pos2 = {row: 3, column: 'A'}

      expect(myKnight.canMove({board: positions, pos1: pos1, pos2: pos2})).toEqual(false)
    })

    it('should not be able to capture friendly pieces', () => {
      let myKnight = Knight();
      let otherKnight = Knight();
      let positions = {'B': {3: {piece: otherKnight, row: 3, column: 'B'}}, 'C': {1: {piece: myKnight, row: 1, column: 'C'}}}
      let pos1 = {row: 1, column: 'C'}
      let pos2 = {row: 3, column: 'B'}

      expect(myKnight.canMove({board: positions, pos1: pos1, pos2: pos2})).toEqual(false)
    })

    it('should be able to capture enemy pieces', () => {
      let myKnight = Knight();
      let otherKnight = Knight({owner: 'BLACK'});
      let positions = {'B': {3: {piece: otherKnight, row: 3, column: 'B'}}, 'C': {1: {piece: myKnight, row: 1, column: 'C'}}}
      let pos1 = {row: 1, column: 'C'}
      let pos2 = {row: 3, column: 'B'}

      expect(myKnight.canMove({board: positions, pos1: pos1, pos2: pos2})).toEqual(true)
    })
  })
})
