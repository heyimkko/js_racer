$(document).ready(function() {
  // var date = new Date();
  // var time = date.getTime();

  // $('button.restart').hide();
  
  // function start_game() {
  //   date = new Date();
  //   time = date.getTime();
  //   console.log(time)

  //   $(document).on('keyup', function(event) {
  //     switch(event.keyCode) {
  //       case 80:
  //         update_player_position('player2');
  //         break;
  //       case 81:
  //         update_player_position('player1');
  //         break;
  //     }
  //   });
  // }

  // function countdown() {
  //   var counter = 3;
  //   var count_int = setInterval(function() {
  //     $('#counter').text(counter).show();
  //     counter--;
  //     if (counter < 0) {
  //       clearInterval(count_int);
  //       $('#counter').hide();
  //       start_game();
  //     }
  //   }, 1000);
  // }

  countdown();

  // function update_player_position(player) {
  //   $('#' + player + "_strip td.active").removeClass('active').next().addClass('active');
  //   checkWinner();
  // }

  // function checkWinner() {
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
  //       time = date.getTime() - time;
        
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

  $('button.restart').click(function(e) {
    $('td').removeClass('active');
    $('td:first-child').addClass('active');
    $('#winner').empty().removeClass();
    $(this).hide();

    countdown();
  });
});
