const readlineSync = require('readline-sync');

class CreateShip {
  constructor(size) {
    this.location = this.generateLocation(3);
    this.size = size;
  }
  generateLocation(grid) {
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0,grid).split('');
    let randomLetter = letters[Math.floor(Math.random() * letters.length)];
    let randomNumber = Math.floor(Math.random() * grid) + 1;
    return randomLetter + randomNumber;
  }
}

class Battleship {
  constructor() {
    this.ships = [1,1].map((item) => new CreateShip(item))
    this.guesses = [];
    this.remainingShips = this.ships.length;
  }

  play() {
    while (this.remainingShips > 0) {
      console.log(this.ships[0].location, this.ships[1].location);

      let guess = readlineSync.question("Enter a location to strike ie 'A2': ").toUpperCase();
      // Check if location has already been guessed
      if (this.guesses.includes(guess)) {
          console.log("You have already picked this location. Miss!");
      } else {
        this.guesses.push(guess);
        // Check if location has a ship
        let hit = this.ships.find(ship => ship.location === guess) !== undefined;
        if (hit) {
          this.remainingShips--;
          console.log(`Hit. You have sunk a battleship. ${this.remainingShips} ship(s) remaining.`);
        } else {
          console.log("You have missed!");
        }
      }
    }
    console.log("You have destroyed all battleships.");
    this.playAgain()
  }
  playAgain() {
    if (readlineSync.keyInYN('Would you like to play again?')) {
      const newGame = new Battleship();
      newGame.play();
    } else {
      console.log("Thanks for playing!");
    }
  }
}

console.log("Press any key to start the game.");
readlineSync.question();

const startGame = new Battleship();
startGame.play();
