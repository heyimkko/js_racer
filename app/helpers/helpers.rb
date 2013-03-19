helpers do

  def current_users
    session[:player1] && session[:player2]
  end

end

