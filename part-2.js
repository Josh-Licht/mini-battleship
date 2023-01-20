const readlineSync = require('readline-sync');

class CreateShip {
  constructor(size, gridSize, ships) {
    this.location = this.generateLocation(size, gridSize, ships);
    this.size = size;
    this.name = this.generateName(size);
  }

  generateName(size) {
    switch (size) {
      case 2:
        return "destroyer";
      case 3:
        return "cruiser";
      case 4:
        return "battleship";
      case 5:
        return "aircraft carrier";
      default:
        return "ship";
    }
  }

  generateLocation(size, gridSize, ships) {
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0,gridSize).split('');
    let allLocations = [];
    ships.forEach(ship => allLocations = allLocations.concat(ship.location));
    let locationFound = false;
    let locations;
    while (!locationFound) {
      let randomLetter = letters[Math.floor(Math.random() * letters.length)];
      let randomNumber = Math.floor(Math.random() * (gridSize - size + 1)) + 1;
      let location = randomLetter + randomNumber;
      locations = [location];
      let isHorizontal = Math.random() >= 0.5;
      if(isHorizontal){
        for(let i = 1; i < size; i++) {
          locations.push(String.fromCharCode(location.charCodeAt(0) + i) + (randomNumber))
        }
      }else {
        for(let i = 1; i < size; i++) {
          locations.push(location[0] + (randomNumber + i))
        }
      }
      if (!locations.some(loc => allLocations.includes(loc))) {
        locationFound = true;
      }
    }
    return locations;
  }

}


class Battleship {
  constructor() {
    this.gridSize = this.getGridSize();
    this.ships = [];
    [2,3,3,4,5].forEach((item) => this.ships.push(new CreateShip(item, this.gridSize, this.ships)))
    this.guesses = [];
    this.remainingShips = this.ships.length;
    this.hitShips = new Set();
  }

  getGridSize() {
    return readlineSync.questionInt("Enter grid size (e.g. 4 for 4x4 grid): ");
  }

  play() {
    while (this.remainingShips > 0) {
      console.log("Remaining ships: " + this.remainingShips);
      for (let i = 0; i < this.ships.length; i++) {
        if(!this.ships[i].destroyed) {
          console.log(`${this.ships[i].name} - ${this.ships[i].location.filter(loc => !this.guesses.includes(loc)).join(', ')}`);
        }
      }

      let guess = readlineSync.question("\n Enter a location to strike ie 'A2': ").toUpperCase();
      // Check if location has already been guessed
      if (this.guesses.includes(guess)) {
          console.log("You have already picked this location. Miss!");
      } else {
        this.guesses.push(guess);
        // Check if location has a ship
        let ship = this.ships.find(ship => ship.location.includes(guess));
        if (ship) {
          this.hitShips.add(ship);
          let sunkShip = ship.name;
          let allHit = ship.location.every(loc => this.guesses.includes(loc));
          if(allHit){
            ship.destroyed = true;
            this.remainingShips--;
            console.log(`\u001b[1;36m Hit. You have sunk the ${sunkShip}. ${this.remainingShips} ship(s) remaining. \u001b[0m`);
          } else {
            console.log(`\u001b[1;32m Hit ${sunkShip}. ${ship.location
              .filter(loc => !this.guesses.includes(loc)).length} location(s) remaining. \u001b[0m`);
          }
        } else {
          console.log("\u001b[1;33m You have missed! \u001b[0m");
        }
      }
    }
    console.log("\u001b[1;31m You have destroyed all battleships. \u001b[0m");
    this.playAgain()
  }
  
  remainingLocations() {
    return this.ships.reduce((acc, curr) => acc.concat(curr.location), []).filter(loc => !this.guesses.includes(loc));
  }

  playAgain() {
    if (readlineSync.keyInYN('\u001b[1;33m Would you like to play again? \u001b[0m')) {
      const newGame = new Battleship();
      newGame.play();
    } else {
      console.log("\u001b[1;32m Thanks for playing! \u001b[0m");
    }
  }
}

console.log("\u001b[1;32m Press any key to start the game. \u001b[0m");
readlineSync.question();

const startGame = new Battleship();
startGame.play();
