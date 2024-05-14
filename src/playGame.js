const { encodeFunctionData } = require("viem");
const RockPaperScissors = require("../artifacts/contracts/RockPaperScissors.sol/RockPaperScissors.json");
const { Utils, Network, Alchemy } = require("alchemy-sdk");
const { createClient } = require("./createClient");
const Game = require("./game");
require("dotenv").config();

const abi = RockPaperScissors["abi"];
const contractInterface = new Utils.Interface(abi)
const contractAddr = "0x17d9477578707fE435A957AffF154EBc175feEf6";
const eventSignature = "0x01de53df2057bbeb7a0f98e9025767c34cee633819f8a361fb431f9d7a95ab8f";
const userPose = process.argv[2] !== undefined ? parseInt(process.argv[2]) : Math.floor(Math.random() * 3);

const alchemy = new Alchemy({
  apiKey: process.env.API_KEY,
  network: Network.ETH_SEPOLIA
});

(async () => {
  const client = await createClient();

  console.log("Playing game...");

  const userOperation = {
    target: contractAddr,
    data: encodeFunctionData({
      abi,
      functionName: "play",
      args: [userPose],
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
      new Game(
        parsedLog.args.gameid,
        parsedLog.args.user_address,
        parsedLog.args.computer_pose,
        parsedLog.args.user_pose,
        parsedLog.args.result
      ).print_details();
    }
  }
})();