import TURN from '../src/logic/Turn';
import { Player } from '../src/enums/Player'

describe('TEST >', () => {
  describe('get()', () => {
    it('should be able to look up the correct color based on index', () => {
      expect(TURN.get(0)).toEqual(Player.WHITE)
      expect(TURN.get(1)).toEqual(Player.BLACK)
    })
  })

  describe('lookup()', () => {
    it('should be able to look up the index of either color', () => {
      expect(TURN.lookup(Player.WHITE)).toEqual(0);
      expect(TURN.lookup(Player.BLACK)).toEqual(1);
    })
  })

  describe('next()', () => {
    it ('should be able to look up the next color index', () => {
      let currentTurn = TURN.lookup(Player.WHITE);
      expect(TURN.next(currentTurn)).toEqual(1);

      currentTurn = TURN.lookup(Player.BLACK);
      expect(TURN.next(currentTurn)).toEqual(0);
    })
  })
});
