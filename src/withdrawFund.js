const RockPaperScissors = require("../artifacts/contracts/RockPaperScissors.sol/RockPaperScissors.json");
require("dotenv").config();
const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(process.env.API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = "0xFF69980B3fF004dE6BDDad97D2e140Dba5ABD6C9";
const contractABI = RockPaperScissors["abi"];

(async () => {
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  console.log("Withdrawing...");

  try {
    const tx = await contract.withdraw();
    console.log("Transaction sent:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt.transactionHash);
  } catch (error) {
    console.error("Error:", error);
  }
})();