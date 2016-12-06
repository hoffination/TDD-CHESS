/* jshint esversion: 6, asi: true */
let TURN = require('../Turn');

describe('TEST >', () => {
  describe('get()', () => {
    it('should be able to look up the correct color based on index', () => {
      expect(TURN.get({index: 0})).toEqual('WHITE')
      expect(TURN.get({index: 1})).toEqual('BLACK')
    })
  })

  describe('lookup()', () => {
    it('should be able to look up the index of either color', () => {
      expect(TURN.lookup({name: 'WHITE'})).toEqual(0);
      expect(TURN.lookup({name: 'BLACK'})).toEqual(1);
    })
  })

  describe('next()', () => {
    it ('should be able to look up the next color index', () => {
      let currentTurn = TURN.lookup({name: 'WHITE'});
      expect(TURN.next(currentTurn)).toEqual(1);

      currentTurn = TURN.lookup({name: 'BLACK'});
      expect(TURN.next(currentTurn)).toEqual(0);
    })
  })
});
