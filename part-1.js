const readlineSync = require('readline-sync');

class CreateShip {
  constructor(size) {
    this.location = this.generateLocation();
    this.size = size;
  }
  generateLocation() {
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let randomLetter = letters[Math.floor(Math.random() * letters.length)];
    let randomNumber = Math.floor(Math.random() * 10) + 1;
    return randomLetter + randomNumber;
  }
}

class Battleship {
  constructor() {
    this.ships = [new CreateShip(1), new CreateShip(1)];
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
readlineSync .question();

const startGame = new Battleship();
startGame.play();
