// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract RockPaperScissors {
    uint256 public gameid;
    address public owner;
    uint256 public constant ENTRY_FEE = 0.05 ether;

    event GameResult(
        uint256 indexed gameid,
        address indexed user_address,
        uint8 computer_pose,
        uint8 user_pose,
        uint8 result // 0 - win, 1 - lose, 2 - draw
    );

    constructor() {
        owner = msg.sender;
        gameid = 0;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    function play(uint8 _user_pose) public payable {
        require(msg.value == ENTRY_FEE, "Please send 0.05 ether to play");
        require(_user_pose >= 0 && _user_pose <= 2, "Invalid pose");

        uint8 _computer_pose = uint8(random() % 3);
        uint8 result = 0;

        if (_user_pose == _computer_pose) {
            result = 2;
            payable(msg.sender).transfer(ENTRY_FEE);
        } else if (
            (_user_pose == 0 && _computer_pose == 2) ||
            (_user_pose == 1 && _computer_pose == 0) ||
            (_user_pose == 2 && _computer_pose == 1)
        ) {
            result = 0;
            payable(msg.sender).transfer(ENTRY_FEE);
        } else {
            result = 1;
        }

        emit GameResult(gameid, msg.sender, _user_pose, _computer_pose, result);
        gameid++;
    }

    function random() internal view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(
        tx.origin,
        blockhash(block.number - 1),
        block.timestamp
    )));
  }
}