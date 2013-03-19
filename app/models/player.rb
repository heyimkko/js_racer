class Player < ActiveRecord::Base
  has_and_belongs_to_many :games

  validates :initials, :length => { :maximum => 3 }
  validates :initials, :uniqueness => true

  def wins
    Game.where("winner_id = ?", self.id)
  end
end
