function Game(player1_initials, player2_initials){
  this.player1 = new Player(player1_initials);
  this.player2 = new Player(player2_initials);
  this.length = 25;


  this.start_game = function() {
    date = new Date();
    time = date.getTime();
    $('button.restart').hide();
    this.set_browser_keyup();
  }

  this.countdown = function() {
    $this = this

    var counter = 3;
    var count_int = setInterval(function() {
      $('#counter').text(counter).show();
      counter--;
      if (counter < 0) {
        clearInterval(count_int);
        $('#counter').hide();
        $this.start_game();
        }
      }, 1000);
  }


  this.set_browser_keyup = function() {
    var game = this;

    $(document).on('keyup', function(event) {
      switch(event.keyCode) {
      case 80:
        game.player2.update_player_position();
        game.checkWinner();
        break;
      case 81:
        game.player1.update_player_position();
        game.checkWinner();
        break;
      }
    })
  }

  this.remove_browser_keyup = function() {
    $(document).unbind('keyup');
  }

  this.checkWinner = function() {
    if (this.player1.position == 25){
      var winner_class = "player1";
      var winner = this.player1;
    } else if (this.player2.position == 25){
      var winner_class = "player2";
      var winner = this.player2;
    } 
    if (winner){
      $('#winner').addClass(winner_class);

      this.remove_browser_keyup();

      player_initials = winner.initials;

      date = new Date();
      time = date.getTime() - time;
      
      $('#winner').append((time / 1000) + " " + "Seconds!")
      
      $.ajax({
        url: '/save',
        type: 'post',
        data: {time: time, winner: player_initials}
      }).done(function(data, status, xhr) {
        $('button.restart').show();
    })
   }   
  }
};



