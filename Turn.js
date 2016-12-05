/* jshint esversion: 6, asi: true */
module.exports = {
  options: ['WHITE', 'BLACK'],
  get({index}) {
    return this.options[index]
  },
  lookup({name}) {
    return this.options.indexOf(name.toUpperCase())
  },
  next(index) {
    return (index + 1) % 2
  }
}
