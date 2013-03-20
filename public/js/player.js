function Player(initials){
  this.initials = initials;
  this.position = 0;

  this.update_player_position = function() {
    this.position = this.position + 1;
  }
}

