class Game {
  constructor(gameid, user_address, computer_pose, user_pose, result) {
    this.gameid = gameid;
    this.user_address = user_address;
    this.computer_pose = this.convert_pose(computer_pose);
    this.user_pose = this.convert_pose(user_pose);
    this.result = this.convert_result(result);
  }

  convert_pose(pose) {
    switch (pose) {
      case 0:
        return "Rock";
      case 1:
        return "Paper";
      case 2:
        return "Scissors";
    }
  }
  
  convert_result(result) {
    switch (result) {
      case 0:
        return "Win";
      case 1:
        return "Lose";
      case 2:
        return "Draw";
    }
  }

  print_details() {
    console.log(`Game ID: ${this.gameid}\n User Address: ${this.user_address}\n User Pose: ${this.user_pose}\n Computer Pose: ${this.computer_pose}\n Result: ${this.result}`);
  }
}

module.exports = Game;