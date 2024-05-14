require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");

const API_URL = vars.get("API_URL");
const PRIVATE_KEY = vars.get("PRIVATE_KEY")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  etherscan: {
    apiKey: "632I45FEKX59H4YTQZRBNQV9PE69HAPT5F",
  },
  networks: {
    sepolia: {
      url: API_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};