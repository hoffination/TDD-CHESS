/* jshint esversion: 6, asi: true */
const stampit = require('stampit')

const Availability = stampit().init(function() {
  // functions with private data
})

const State = stampit({
  methods: {
    canMove({board, pos1, pos2}) {}
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
