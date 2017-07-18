var k = [];
var columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
for (var i = 0; i < 8; i++) {
  k.push({
    piece: 'PAWN',
    player: 0,
    column: columns[i],
    row: 2
  })
  k.push({
    piece: 'PAWN',
    player: 1,
    column: columns[i],
    row: 7
  })
}

k.push({
  piece: 'ROOK',
  player: 0,
  column: 'A',
  row: 1
})
k.push({
  piece: 'ROOK',
  player: 0,
  column: 'H',
  row: 1
})
k.push({
  piece: 'ROOK',
  player: 1,
  column: 'A',
  row: 8
})
k.push({
  piece: 'ROOK',
  player: 1,
  column: 'H',
  row: 8
})

k.push({
  piece: 'KNIGHT',
  player: 0,
  column: 'B',
  row: 1
})
k.push({
  piece: 'KNIGHT',
  player: 0,
  column: 'G',
  row: 1
})
k.push({
  piece: 'KNIGHT',
  player: 1,
  column: 'B',
  row: 8
})
k.push({
  piece: 'KNIGHT',
  player: 1,
  column: 'G',
  row: 8
})

k.push({
  piece: 'BISHOP',
  player: 0,
  column: 'C',
  row: 1
})
k.push({
  piece: 'BISHOP',
  player: 0,
  column: 'F',
  row: 1
})
k.push({
  piece: 'BISHOP',
  player: 1,
  column: 'C',
  row: 8
})
k.push({
  piece: 'BISHOP',
  player: 1,
  column: 'F',
  row: 8
})

k.push({
  piece: 'QUEEN',
  player: 0,
  column: 'D',
  row: 1
})
k.push({
  piece: 'QUEEN',
  player: 1,
  column: 'E',
  row: 8
})

k.push({
  piece: 'KING',
  player: 0,
  column: 'E',
  row: 1
})
k.push({
  piece: 'KING',
  player: 1,
  column: 'D',
  row: 8
})

console.log(JSON.stringify(k))
