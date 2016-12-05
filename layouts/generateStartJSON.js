var k = [];
var columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
for (var i = 0; i < 8; i++) {
  k.push({
    piece: 'PAWN',
    color: 'WHITE',
    column: columns[i],
    row: 2
  })
  k.push({
    piece: 'PAWN',
    color: 'BLACK',
    column: columns[i],
    row: 7
  })
}

k.push({
  piece: 'ROOK',
  color: 'WHITE',
  column: 'A',
  row: 1
})
k.push({
  piece: 'ROOK',
  color: 'WHITE',
  column: 'H',
  row: 1
})
k.push({
  piece: 'ROOK',
  color: 'BLACK',
  column: 'A',
  row: 8
})
k.push({
  piece: 'ROOK',
  color: 'BLACK',
  column: 'H',
  row: 8
})

k.push({
  piece: 'KNIGHT',
  color: 'WHITE',
  column: 'B',
  row: 1
})
k.push({
  piece: 'KNIGHT',
  color: 'WHITE',
  column: 'G',
  row: 1
})
k.push({
  piece: 'KNIGHT',
  color: 'BLACK',
  column: 'B',
  row: 8
})
k.push({
  piece: 'KNIGHT',
  color: 'BLACK',
  column: 'G',
  row: 8
})

k.push({
  piece: 'BISHOP',
  color: 'WHITE',
  column: 'C',
  row: 1
})
k.push({
  piece: 'BISHOP',
  color: 'WHITE',
  column: 'F',
  row: 1
})
k.push({
  piece: 'BISHOP',
  color: 'BLACK',
  column: 'C',
  row: 8
})
k.push({
  piece: 'BISHOP',
  color: 'BLACK',
  column: 'F',
  row: 8
})

k.push({
  piece: 'QUEEN',
  color: 'WHITE',
  column: 'D',
  row: 1
})
k.push({
  piece: 'QUEEN',
  color: 'BLACK',
  column: 'E',
  row: 8
})

k.push({
  piece: 'KING',
  color: 'WHITE',
  column: 'E',
  row: 1
})
k.push({
  piece: 'KING',
  color: 'BLACK',
  column: 'D',
  row: 8
})

console.log(JSON.stringify(k))
