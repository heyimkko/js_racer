function Game(player1_initials, player2_initials){
  this.player1 = new Player(player1_initials);
  this.player2 = new Player(player2_initials);
  this.length = 25;

  this.countdown = function() {
    var counter = 3;
    var count_int = setInterval(function() {
      $('#counter').text(counter).show();
      counter--;
      if (counter < 0) {
        clearInterval(count_int);
        $('#counter').hide();
        }
      }, 1000);
  }

  this.checkWinner = function() {
    console.log("NO WINNER");
  }

  this.start_game = function() {
    date = new Date();
    time = date.getTime();
    $('button.restart').hide();
    this.set_browser_keyup();
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
};

// Game.prototype.render = function() {
//   // redraw
// }


// var new_game = function() {
//   countdown();
//   start_game();
// }

// var checkWinner = function() {
//   //if player1 or player2 position === length of board (25)
//   var $winning_cell = $('td:last-child.active');
//   var $winning_row = $winning_cell.parent('tr');
//   if ($winning_cell) {
//     var player_strip_id = $winning_row.attr('id');
//     if (player_strip_id) {
//       var player_id = player_strip_id.substr(0, player_strip_id.indexOf('_'));
//       $('#winner').addClass(player_id);


//       $(document).unbind('keyup');

//       player_id = $winning_row.attr('data-player');

//       date = new Date();
//       time = date.getTime() - time; // 'time' Scope prob broken in SaneJS
      
//       $('#winner').append((time / 1000) + " " + "Seconds!")
      
//       $.ajax({
//         url: '/save',
//         type: 'post',
//         data: {time: time, winner: player_id}
//       }).done(function(data, status, xhr) {
//         $('button.restart').show();
//       })
//     }
//   }
// }




