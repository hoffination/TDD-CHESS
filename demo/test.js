/* jshint esversion: 6, asi: true */

const stampit = require('stampit');
// Some privileged methods with some private data.
const Availability = stampit().init(function() {
  var isOpen = false; // private

  this.open = function open() {
    isOpen = true;
    return this
  };
  this.close = function close() {
    isOpen = false;
    return this;
  };
  this.isOpen = function isOpenMethod() {
    return isOpen;
  };
});

// Here's a stamp with public methods, and some state:
const Membership = stampit({
  methods: {
    add(member) {
      this.members[member.name] = member;
      return this;
    },
    getMember(name) {
      return this.members[name];
    }
  },
  properties: {
    members: {}
  }
});

// Let's set some defaults:
const Defaults = stampit({
  init({name, specials}) {
    this.name = name || this.name;
    this.specials = specials || this.specials;
  },
  properties: {
    name: 'The Saloon',
    specials: 'Whisky, Gin, Tequila'
  }
});

// Classical inheritance has nothing on this.
// No parent/child coupling. No deep inheritance hierarchies.
// Just good, clean code reusability.
const Bar = stampit(Defaults, Availability, Membership);

// Create an object instance
const myBar = Bar({name: 'Moe\'s'});

// Silly, but proves that everything is as it should be.
myBar.add({name: 'Homer'}).open().getMember('Homer');

console.log(myBar);
