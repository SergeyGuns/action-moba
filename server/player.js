class Player {
  constructor(name) {
    this.name = name
    this.id = Date.now()
    this.x = 0
    this.y = 0
    this.speed = 1
    this.target = []
    this.color = 'red'
  }
}

module.exports = {
  Player
}