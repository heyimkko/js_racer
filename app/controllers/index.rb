get '/' do

  erb :index
end

get '/play' do

  erb :racer
end

post '/play' do
  @player1 = Player.find_or_create_by_initials(params[:player1])
  @player2 = Player.find_or_create_by_initials(params[:player2])
  session[:player1] = @player1.id
  session[:player2] = @player2.id

  erb :racer
end

post '/save' do
  Game.create time: params[:time], 
              winner_id: params[:winner], 
              players: [Player.find(session[:player1]), Player.find(session[:player2])]
end

get '/games' do
  @games = Game.includes(:players).all
  erb :games
end

get '/games/:id' do
  @game = Game.find(params[:id])
  erb :single_game
end

get '/profile/:initials' do
  @player = Player.includes(:games => :players).find_by_initials(params[:initials])

  games_array = []
  @player.games.each do |game|
    games_array << game.time if game.winner_id == @player.id
  end

  @best_time = games_array.min / 1000.0


  won_array = []
  loss_array = []
  @player.games.each do |game|
    won_array << game.id if game.winner_id == @player.id
    loss_array << game.id if game.winner_id != @player.id
  end

  @record = "#{won_array.length} - #{loss_array.length}"

  erb :profile
end
