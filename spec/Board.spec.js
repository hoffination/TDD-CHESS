let fs = require('fs')
let obj = `[{"piece":"PAWN","color":"WHITE","column":"A","row":2},{"piece":"PAWN","color":"BLACK","column":"A","row":7},{"piece":"PAWN","color":"WHITE","column":"B","row":2},{"piece":"PAWN","color":"BLACK","column":"B","row":7},{"piece":"PAWN","color":"WHITE","column":"C","row":2},{"piece":"PAWN","color":"BLACK","column":"C","row":7},{"piece":"PAWN","color":"WHITE","column":"D","row":2},{"piece":"PAWN","color":"BLACK","column":"D","row":7},{"piece":"PAWN","color":"WHITE","column":"E","row":2},{"piece":"PAWN","color":"BLACK","column":"E","row":7},{"piece":"PAWN","color":"WHITE","column":"F","row":2},{"piece":"PAWN","color":"BLACK","column":"F","row":7},{"piece":"PAWN","color":"WHITE","column":"G","row":2},{"piece":"PAWN","color":"BLACK","column":"G","row":7},{"piece":"PAWN","color":"WHITE","column":"H","row":2},{"piece":"PAWN","color":"BLACK","column":"H","row":7},{"piece":"ROOK","color":"WHITE","column":"A","row":1},{"piece":"ROOK","color":"WHITE","column":"H","row":1},{"piece":"ROOK","color":"BLACK","column":"A","row":8},{"piece":"ROOK","color":"BLACK","column":"H","row":8},{"piece":"KNIGHT","color":"WHITE","column":"B","row":1},{"piece":"KNIGHT","color":"WHITE","column":"G","row":1},{"piece":"KNIGHT","color":"BLACK","column":"B","row":8},{"piece":"KNIGHT","color":"BLACK","column":"G","row":8},{"piece":"BISHOP","color":"WHITE","column":"C","row":1},{"piece":"BISHOP","color":"WHITE","column":"F","row":1},{"piece":"BISHOP","color":"BLACK","column":"C","row":8},{"piece":"BISHOP","color":"BLACK","column":"F","row":8},{"piece":"QUEEN","color":"WHITE","column":"D","row":1},{"piece":"QUEEN","color":"BLACK","column":"E","row":8},{"piece":"KING","color":"WHITE","column":"E","row":1},{"piece":"KING","color":"BLACK","column":"D","row":8}]`
let board = require('../Board')

describe('Board >', () => {
  describe('Initialization >', () => {
    it('should correctly create a new board', () => {
      spyOn(fs, 'readFileSync').and.returnValue(obj)

      let myBoard = board()

      expect(myBoard.positions['A'][1].piece).toEqual('ROOK')
      expect(myBoard.getTurn()).toEqual(0)
    })

    it('should create a new board with positions given on construction', () => {
      spyOn(fs, 'readFileSync')

      let myBoard = board({positions: {}})

      expect(fs.readFileSync).not.toHaveBeenCalled()
    })
  })

  describe('Moving Pieces >', () => {
    it('should correctly throw if it is not currently that players turn', () => {
      spyOn(fs, 'readFileSync').and.returnValue(obj)

      let myBoard = board()

      expect(function() {
        myBoard.move(1, {column: 'A', row: 2}, {column: 'A', row: 4})
      }).toThrow('player moving is not the player whos turn it is')
    })

    it('should change turns if a player moves', () => {
      spyOn(fs, 'readFileSync').and.returnValue(obj)

      let myBoard = board()
      myBoard.move(0, {column: 'A', row: 2}, {column: 'A', row: 4})

      expect(myBoard.getTurn()).toEqual(1)
    })
  })

  describe('Rendering >', () => {
    it('should correctly render a new board', () => {
      spyOn(console, 'log').and.callThrough()
      spyOn(fs, 'readFileSync').and.returnValue(obj)

      let myBoard = board()
      myBoard.renderBoard()

      expect(console.log).toHaveBeenCalled()

      output = console.log.calls.all().map(call => call.args[0]);
      expect(output[0]).toEqual('RKBQKBKR');
      expect(output[1]).toEqual('PPPPPPPP');
      expect(output[2]).toEqual('--------');
      expect(output[3]).toEqual('--------');
      expect(output[4]).toEqual('--------');
      expect(output[5]).toEqual('--------');
      expect(output[6]).toEqual('PPPPPPPP');
      expect(output[7]).toEqual('RKBKQBKR');
    })
  })

})
