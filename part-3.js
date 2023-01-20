const readlineSync = require('readline-sync');

class CreateShip {
  constructor(size) {
    this.location = this.generateLocation();
    this.size = size;
  }
  generateLocation(ships) {
    let letters = 'ABCDEFGHIJ'.split('');
    let randomLetter;
    let randomNumber;
    let valid = false;
    while(!valid) {
      randomLetter = letters[Math.floor(Math.random() * letters.length)];
      randomNumber = Math.floor(Math.random() * 10) + 1;
      // check if the location is within the grid boundaries
      if(randomLetter >= 'A' && randomLetter <= 'J' && randomNumber >= 1 && randomNumber <= 10) {
        let location = randomLetter + randomNumber;
        let occupied = false;
        // check if the location is already occupied by another ship
        ships.forEach((ship) => {
            if (ship.location === location) occupied = true;
        });
        if(!occupied) valid = true;
      }
    }
    return randomLetter + randomNumber;
  }
}

class Battleship {
  constructor() {
    this.grid = buildGrid(10);
    this.ships = [
      new CreateShip(2),
      new CreateShip(3),
      new CreateShip(3),
      new CreateShip(4),
      new CreateShip(5)
    ];
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

const buildGrid = (size) => {
  let grid = [];
  let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (let i = 0; i < size; i++) {
      let row = [];
      for (let j = 0; j < size; j++) {
          if(i === 0 && j === 0) row.push(" ")
          else if(i === 0) row.push(j)
          else if(j === 0) row.push(letters[i-1])
          else row.push("0");
      }
      grid.push(row);
  }
  return grid;
}


console.log("Press any key to start the game.");
readlineSync .question();

const startGame = new Battleship();
startGame.play();
