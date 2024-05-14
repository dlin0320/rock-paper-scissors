// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract RockPaperScissors {
    uint256 public gameID;
    address public owner;
    uint256 public constant ENTRY_FEE = 0.05 ether;

    event GameResult(
        uint256 indexed gameID,
        address indexed player,
        uint8 playerChoice,
        uint8 houseChoice,
        uint8 result // 0 - win, 1 - lose, 2 - draw
    );

    constructor() {
        owner = msg.sender;
        gameID = 0;
    }

    function play(uint8 _playerChoice) public payable {
        require(msg.value == ENTRY_FEE, "Please send 0.05 ether to play");
        require(_playerChoice >= 0 && _playerChoice <= 2, "Invalid choice");

        uint8 _houseChoice = uint8(random() % 3);
        uint8 result = 0;

        if (_playerChoice == _houseChoice) {
            result = 2;
            payable(msg.sender).transfer(ENTRY_FEE);
        } else if (
            (_playerChoice == 0 && _houseChoice == 2) ||
            (_playerChoice == 1 && _houseChoice == 0) ||
            (_playerChoice == 2 && _houseChoice == 1)
        ) {
            result = 0;
            payable(msg.sender).transfer(ENTRY_FEE);
        } else {
            result = 1;
        }

        emit GameResult(gameID, msg.sender, _playerChoice, _houseChoice, result);
        gameID++;
    }

    function random() internal view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(
        tx.origin,
        blockhash(block.number - 1),
        block.timestamp
    )));
  }
}