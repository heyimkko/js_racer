class CreateGamesTable < ActiveRecord::Migration
  def change
    create_table :games do |c|
      c.integer :winner_id
      c.integer :time
      c.timestamps
    end
  end
end
