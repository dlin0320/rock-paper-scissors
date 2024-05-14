const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");
const { createClient } = require("./createClient");
require("dotenv").config();

const settings = {
  apiKey: process.env.API_KEY,
  network: Network.ETH_SEPOLIA,
}
const alchemy = new Alchemy(settings);
let wallet = new Wallet(process.env.PRIVATE_KEY);

(async () => {
  const client = await createClient();

  const nonce = await alchemy.core.getTransactionCount(wallet.address, "latest");

  let txn = {
    to: client.getAddress(),
    value: Utils.parseEther("0.05"),
    gasLimit: "21000",
    maxPriorityFeePerGas: Utils.parseUnits("50", "gwei"),
    maxFeePerGas: Utils.parseUnits("500", "gwei"),
    nonce: nonce,
    type: 2,
    chainId: 11155111,
  };

  const signedTxn = await wallet.signTransaction(txn);
  const txResponse = await alchemy.core.sendTransaction(signedTxn);
  console.log(txResponse);
})();