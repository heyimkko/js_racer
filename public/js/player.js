function Player(initials){
  this.initials = initials
}

Player.prototype.update_player_position = function {
  player.position = player.position + 1
  checkWinner();
}
