playerXYZ = Player.create :initials => 'XYZ'
playerABC = Player.create :initials => 'ABC'

Game.create :winner => 'XYZ',
            :time => 3434,
            :players => [playerXYZ, playerABC]


