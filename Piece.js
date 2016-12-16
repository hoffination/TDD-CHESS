const stampit = require('stampit')

const Availability = stampit().init(function() {
  // functions with private data
})

const State = stampit({
  methods: {
    canMove({board, pos1, pos2}) {},
    columnDist(col1, col2) {
      return (col1.charCodeAt(0) - col2.charCodeAt(0))
    }
  },
  properties: {}
})

const Defaults = stampit({
  init({owner}) {
    this.owner = owner || this.owner;
    this.forwardDirection = this.owner === 'WHITE' ? 1 : -1;
  },
  properties: {
    owner: 'WHITE',
    name: '',
    renderChar: ''
  }
})

const Piece = stampit(Defaults, Availability, State);

module.exports = Piece;
