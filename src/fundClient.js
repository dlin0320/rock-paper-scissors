const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");
const { createClient } = require("./createClient");
require("dotenv").config();

const wallet = new Wallet(process.env.PRIVATE_KEY);
const alchemy = new Alchemy({
  apiKey: process.env.API_KEY,
  network: Network.ETH_SEPOLIA
});

(async () => {
  const client = await createClient();

  const nonce = await alchemy.core.getTransactionCount(wallet.address, "latest");

  let txn = {
    to: client.getAddress(),
    value: Utils.parseEther("0.05"),
    gasLimit: "100000",
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