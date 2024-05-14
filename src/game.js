class Game {
  constructor(gameID, player, playerChoice, houseChoice, result) {
    this.gameID = gameID;
    this.player = player;
    this.playerChoice = this.convert(playerChoice);
    this.houseChoice = this.convert(houseChoice);
    this.result = this.result(playerChoice, houseChoice);
  }

  convert(choice) {
    switch (choice) {
      case 0:
        return "Rock";
      case 1:
        return "Paper";
      case 2:
        return "Scissors";
    }
  }
  
  result(playerChoice, houseChoice) {
    if (playerChoice === houseChoice) {
      return "Tie";
    } else if (
      (playerChoice === 0 && houseChoice === 2) ||
      (playerChoice === 1 && houseChoice === 0) ||
      (playerChoice === 2 && houseChoice === 1)
    ) {
      return "Player Wins";
    } else {
      return "House Wins";
    }
  }

  print() {
    console.log(`Game ID: ${this.gameID}, Player: ${this.player}, Player Choice: ${this.playerChoice}, House Choice: ${this.houseChoice}, Result: ${this.result}`);
  }
}

module.exports = Game;