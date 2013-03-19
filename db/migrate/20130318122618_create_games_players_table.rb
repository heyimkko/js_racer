class CreateGamesPlayersTable < ActiveRecord::Migration
  def change
    create_table :games_players do |c|
      c.references :game
      c.references :player
    end
  end
end
