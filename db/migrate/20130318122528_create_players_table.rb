class CreatePlayersTable < ActiveRecord::Migration
  def change
    create_table :players do |c|
      c.string :initials
      
      c.timestamps
    end
  end
end
