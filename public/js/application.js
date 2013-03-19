var Game = function Game($, args) {
  this.args = args ? args : {};
  this.players = [];
  this.start_time;
  this.track_length = this.args.track_length;

  _this = this;

  this.getTime = function() {
    var date = new Date();
    return date.getTime();
  }

  this.add_players = function(players) {
    $(players).each(function(key, player) {
      _this.add_player(player);
    });
  }

  this.add_player = function(player) {
    var Player = function Player(player) {
      this.id = player.id;
      this.key = player.key;
      this.track_id = player.track_id

      this.reset = function() {
        this.place = 0;
      }
      this.reset();
    }

    _this.players.push(new Player(player));
  }

  this.countdown = function(args) {
    if (_this.players.length > 1) {
      var args = args ? args : {start: 3};
      var count_int = setInterval(function() {
        if (args.interval) {
          args.interval(args.start);
        }
        args.start--;
        if (args.start < 0) {
          clearInterval(count_int);
          if (args.finish) {
            args.finish();
          }
          _this.start();
        }
      }, 1000);
    } else {
      console.warn("Game countdown initialized without players")
    }
  }

  this.start = function() {
    if (_this.players.length > 1) {
      _this.add_controls();
      _this.start_time = _this.getTime();
    } else {
      console.warn("Game started without players")
    }
  }

  this.add_controls = function() {
    $(document).on('keyup', function(event) {
      var player;
      $(_this.players).each(function(key, player) {
        if (event.keyCode == player.key) {
          player.place += 1;
          if (_this.args.player_move) {
            _this.args.player_move(player.track_id, player.place);
          }
        }
      });

      _this.check_win();
    });
  }

  this.check_win = function() {
    $(_this.players).each(function(key, player) {
      if (player.place == _this.track_length -1) {
        _this.finish(player);
      }
    })
  }

  this.finish = function(player) {
    _this.remove_controls();
    if (_this.args.player_win) {
      var finish_time = _this.getTime();
      _this.args.player_win(player.track_id, finish_time - _this.start_time);
    }
  }

  this.remove_controls = function() {
    $(document).unbind('keyup');
  }

  this.reset = function() {
    $(_this.players).each(function(key, player) {
      player.reset();
    });
  }
}

$(document).ready(function() {
  $('button.restart').hide();

  function start_game() {
    $('#counter').hide();
  }

  function countdown(n) {
    $('#counter').text(n).show();
  }

  function move(track, position) {
    $track = $('#track_' + track);
    $track.find('td.active').removeClass('active');
    $track.find('td:eq(' + position + ')').addClass('active');
  }

  function win(track, time) {
    $('#winner').addClass("player_" + track);
    $('#winner').append((time / 1000) + " " + "Seconds!");

    $.ajax({
      url: '/save',
      type: 'post',
      data: {time: time, winner: track}
    }).done(function(data, status, xhr) {
      // console.log(data, status, xhr);
      $('button.restart').show();
    });
  }

  $('button.restart').click(function(e) {
    $('td').removeClass('active');
    $('td:first-child').addClass('active');
    $('#winner').empty().removeClass();
    $(this).hide();

    game.reset();
    game.countdown({start: 3, interval: countdown, finish: start_game});
  });

  var track_length = $('.racer_table tr:first-child td').length;
  var player1_id = $('#track_1').attr('data-player');
  var player2_id = $('#track_2').attr('data-player');
  var game = new Game($, {track_length: track_length, player_move: move, player_win: win});
  game.add_players([{id: player1_id, key: 81, track_id: 1}, {id: player2_id, key: 80, track_id: 2}]);
  game.countdown({start: 3, interval: countdown, finish: start_game});
});
