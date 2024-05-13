const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("RockPaperScissorsModule", (m) => {
  const contract = m.contract("RockPaperScissors");

  return { contract };
});