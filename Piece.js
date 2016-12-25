const stampit = require('stampit')

const Availability = stampit().init(function() {
  // functions with private data
})

const State = stampit({
  methods: {
    canMove({board, pos1, pos2}) {},
    columnDist(col1, col2) {
      return (col1.charCodeAt(0) - col2.charCodeAt(0))
    },
    move({pos1, pos2}) {},
    turnUpdate() {}
  },
  properties: {}
})

const Defaults = stampit({
  init({owner}) {
    this.owner = owner || this.owner;
  },
  properties: {
    owner: 'WHITE',
    name: '',
    renderChar: ''
  }
})

const Piece = stampit(Defaults, Availability, State);

module.exports = Piece;
