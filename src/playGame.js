const { encodeFunctionData } = require("viem");
const RockPaperScissors = require("../artifacts/contracts/RockPaperScissors.sol/RockPaperScissors.json");
const { Utils, Contract, Network, Alchemy } = require("alchemy-sdk");
const { createClient } = require("./createClient");
const Game = require("./game");
require("dotenv").config();

const abi = RockPaperScissors["abi"];
const contractInterface = new Utils.Interface(abi)
const eventSignature = "0x01de53df2057bbeb7a0f98e9025767c34cee633819f8a361fb431f9d7a95ab8f";
const contractAddr = "0x98c9794b2faf5C00bEf41252f1a9b9707b6ECA67";
const contract = new Contract(contractAddr, abi);
const playerChoice = Math.floor(Math.random() * 3);
const alchemy = new Alchemy({
  apiKey: process.env.API_KEY,
  network: Network.ETH_SEPOLIA,

});

(async () => {
  const client = await createClient();

  console.log("Playing game...");

  const userOperation = {
    target: contractAddr,
    data: encodeFunctionData({
      abi,
      functionName: "play",
      args: [playerChoice],
    }),
    value: Utils.parseEther("0.05"),
  };

  let retry = 5;
  let txHash = "";
  const result = await client.sendUserOperation({uo: userOperation});
  while (!txHash && retry--) {
    try {
      txHash = await client.waitForUserOperationTransaction(result);
    } catch (error) {
      console.log(`Error: ${error}, retries left: ${retry}`);
    }
  }

  const receipt = await alchemy.core.getTransactionReceipt(txHash);
  for (const log of receipt.logs) {
    if (log.topics[0] === eventSignature) {
      const parsedLog = contractInterface.parseLog(log);
      const game = new Game(
        parsedLog.args.gameID,
        parsedLog.args.player,
        parsedLog.args.playerChoice,
        parsedLog.args.houseChoice,
        parsedLog.args.result
      );
      game.print();
    }
  }
})();