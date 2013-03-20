get '/' do
  if current_users
    redirect '/play'
  else
    erb :index
  end
end

post '/play' do
  
  @player1 = Player.find_or_initialize_by_initials(params[:player1])
  @player2 = Player.find_or_initialize_by_initials(params[:player2])
  
  if @player1.save && @player2.save
    session[:player1] = @player1.id
    session[:player2] = @player2.id
    erb :racer
  else
    redirect '/'
  end
end

get '/play' do
  @player1 = Player.find(session[:player1])
  @player2 = Player.find(session[:player2])

  if current_users
    erb :racer
  else
    redirect '/'
  end
end

post '/save' do
  Game.create time: params[:time],
              winner_id: Player.find_by_initials(params[:winner]).id,
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
  if games_array.empty?
    @best_time = "No Best Time"
  else
    @best_time = games_array.min / 1000.0
  end

  won_array = []
  loss_array = []
  @player.games.each do |game|
    won_array << game.id if game.winner_id == @player.id
    loss_array << game.id if game.winner_id != @player.id
  end

  @record = "#{won_array.length} - #{loss_array.length}"

  erb :profile
end

get '/signout' do
  session.clear
  redirect '/'
end
