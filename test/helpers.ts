import Piece from '../src/interface/Piece';
import { BoardSpace } from '../src/interface/BoardSpace';

export default {
  singleSpaceMovementHorizontal: (testPiece: Piece, expected: boolean) => {
    let positions = {
      'C': {2: {row: 2, column: 'C'}},
      'D': {2: {piece: testPiece, row: 2, column: 'D'}},
      'E': {2: {row: 2, column: 'E'}}
    }
    let pos1 = {row: 2, column: 'D'}
    let pos2 = {row: 2, column: 'C'}
    let pos3 = {row: 2, column: 'E'}

    let canItMove = testPiece.canMove(positions, pos1, pos2)
    expect(canItMove).toEqual(expected)

    canItMove = testPiece.canMove(positions, pos1, pos2)
    expect(canItMove).toEqual(expected)
  },

  manySpaceMovementHorizontal: (testPiece: Piece, expected: boolean) => {
    let positions = {'D': {
      1: {row: 1, column: 'D'},
      2: {row: 2, column: 'D'},
      3: {row: 3, column: 'D'},
      4: {piece: testPiece, row: 4, column: 'D'},
      5: {row: 5, column: 'D'},
      6: {row: 6, column: 'D'},
      7: {row: 7, column: 'D'},
      8: {row: 8, column: 'D'}}
    }
    let pos1 = {row: 4, column: 'D'}
    let pos2 = {row: 1, column: 'D'}
    let pos3 = {row: 8, column: 'D'}

    let canItMove = testPiece.canMove(positions, pos1, pos2)
    expect(canItMove).toEqual(expected)

    canItMove = testPiece.canMove(positions, pos1, pos2)
    expect(canItMove).toEqual(expected)
  },

  singleSpaceMovementVertical: (testPiece: Piece, expected: boolean) => {
    let positions = {'D': {
      1: {row: 1, column: 'D'},
      2: {piece: testPiece, row: 2, column: 'D'},
      3: {row: 3, column: 'D'}
    }}
    let pos1 = {row: 2, column: 'D'}
    let pos2 = {row: 3, column: 'D'}
    let pos3 = {row: 1, column: 'D'}

    let canItMove = testPiece.canMove(positions, pos1, pos2)
    expect(canItMove).toEqual(expected)

    canItMove = testPiece.canMove(positions, pos1, pos2)
    expect(canItMove).toEqual(expected)
  },

  manySpaceMovementVertical: (testPiece: Piece, expected: boolean) => {
    let positions = {
      'A': {2: {row: 2, column: 'A'}},
      'B': {2: {row: 2, column: 'B'}},
      'C': {2: {row: 2, column: 'C'}},
      'D': {2: {piece: testPiece, row: 2, column: 'D'}},
      'E': {2: {row: 2, column: 'E'}},
      'F': {2: {row: 2, column: 'F'}},
      'G': {2: {row: 2, column: 'G'}},
      'H': {2: {row: 2, column: 'H'}}
    }
    let pos1 = {row: 2, column: 'D'}
    let pos2 = {row: 2, column: 'A'}
    let pos3 = {row: 2, column: 'H'}

    let canItMove = testPiece.canMove(positions, pos1, pos2)
    expect(canItMove).toEqual(expected)

    canItMove = testPiece.canMove(positions, pos1, pos3)
    expect(canItMove).toEqual(expected)
  },

  singleSpaceMovementDiagonally: (testPiece: Piece, expected: boolean) => {
    let positions = {
      'C': {1: {row: 1, column: 'C'}, 3: {row: 3, column: 'C'}},
      'D': {2: {piece: testPiece, row: 2, column: 'D'}},
      'E': {1: {row: 1, column: 'E'}, 3: {row: 3, column: 'E'}}
    }
    let pos1 = {row: 2, column: 'D'}
    let pos2 = {row: 1, column: 'C'}
    let pos3 = {row: 1, column: 'E'}
    let pos4 = {row: 3, column: 'C'}
    let pos5 = {row: 3, column: 'E'}

    let canItMove = testPiece.canMove(positions, pos1, pos2)
    expect(canItMove).toEqual(expected)

    canItMove = testPiece.canMove(positions, pos1, pos3)
    expect(canItMove).toEqual(expected)

    canItMove = testPiece.canMove(positions, pos1, pos4)
    expect(canItMove).toEqual(expected)

    canItMove = testPiece.canMove(positions, pos1, pos5)
    expect(canItMove).toEqual(expected)
  },

  manySpaceMovementDiagonally: (testPiece: Piece, expected: boolean) => {
    let positions = {
      'A': {1: {row: 1, column: 'A'}, 7: {row: 7, column: 'A'}},
      'B': {2: {row: 2, column: 'B'}, 6: {row: 6, column: 'B'}},
      'C': {3: {row: 3, column: 'C'}, 5: {row: 5, column: 'C'}},
      'D': {4: {piece: testPiece, row: 4, column: 'D'}},
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

    let canItMove = testPiece.canMove(positions, pos1, pos2)
    expect(canItMove).toEqual(expected)

    canItMove = testPiece.canMove(positions, pos1, pos3)
    expect(canItMove).toEqual(expected)

    canItMove = testPiece.canMove(positions, pos1, pos4)
    expect(canItMove).toEqual(expected)

    canItMove = testPiece.canMove(positions, pos1, pos5)
    expect(canItMove).toEqual(expected)
  }
}
