function Player(initials){
  this.initials = initials;
  this.position = 0;
}

var update_player_position = function() {
  player.position = player.position + 1;
  checkWinner();
}
