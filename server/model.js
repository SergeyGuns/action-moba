const throttle = require('../utils').throttle

class Model {
  constructor(emiter) {
    this._width = 1000
    this._height= 1000
    this._emiter = emiter
    this._gameIsPause=false
    this._players = [
 
    ]
  }

  addPlayer(player) {
    this._players.push(player)
  }

  loop() {
    
    if(this._gameIsPause) return;
    this.transitePlayers(this._players, this._width, this._height)
    if(this._emiter) 
      this._emiter.emit('SEND_STATE', this._players);
  }

  setEmiter(emiter) {
    this._emiter = emiter
  }

  setPlayerTarget(playerIndex, target) {
    this._players[playerIndex].target = [target]
  }

  transitePlayers(players, _width, _height) {
    if(players.length === 0) return;
    players.map(player => {
      if(player.target.length === 0) return;
      if(player.x < player.target[0].x) {
        player.x = player.x + player.speed
      } else if (player.x > player.target[0].x) {
        player.x = player.x - player.speed
      }

      if(player.y < player.target[0].y) {
        player.y = player.y + player.speed
      } else if (player.y > player.target[0].y) {
        player.y = player.y - player.speed
      }
      return player
    })
  }

}

module.exports = {
  Model
}