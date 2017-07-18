import { Player } from '../enums/Player'
const Turn = {
  options: [Player.WHITE, Player.BLACK],
  get(index: number) {
    return this.options[index]
  },
  lookup(name: Player) {
    return this.options.indexOf(name)
  },
  next(index: number) {
    return (index + 1) % 2
  }
}

export default Turn