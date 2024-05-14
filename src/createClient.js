const { LocalAccountSigner, sepolia } = require("@alchemy/aa-core");
const { createModularAccountAlchemyClient } = require("@alchemy/aa-alchemy");
require("dotenv").config();

const signer = LocalAccountSigner.privateKeyToAccountSigner(`0x${process.env.PRIVATE_KEY}`);

const createClient = async () => {
  console.log("Creating client...");
  let params;
  if (process.env.POLICY_ID) {
    params = {
      apiKey: process.env.API_KEY,
      chain: sepolia,
      signer,
      gasManagerConfig: {
        policyId: process.env.POLICY_ID,
      },
    };
  } else {
    params = {
      apiKey: process.env.API_KEY,
      chain: sepolia,
      signer,
    };
  }

  client = await createModularAccountAlchemyClient(params);
  console.log("Client address: ", client.getAddress());
  return client;
}

module.exports = { createClient };