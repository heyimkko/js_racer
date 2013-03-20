$(document).ready(function() {
  $('#index').submit(function(e){
    e.preventDefault();
    if ($(this).serializeArray()[0] == [] || $(this).serializeArray()[1] == []) {
      return false;
    }
    else {
      var data = $(this).serializeArray();

      var player1 = new Player(data[0].value);
      var player2 = new Player(data[1].value);


      game = new Game(player1, player2);
      $.ajax({
        url: '/play',
        type: 'post',
        data: {player1: player1.initials, player2: player2.initials}
      }).done(function(data2) {
        window.location = data2;
      })
      countdown();
    }
  });  


  // $('button.restart').click(function(e) {
  // $('td').removeClass('active');
  // $('td:first-child').addClass('active');
  // $('#winner').empty().removeClass();
  // $(this).hide();
});
