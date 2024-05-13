import { createWalletClient, http, publicActions } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import Example from "../artifacts/Example.json";
import dotenv from "dotenv";

dotenv.config();

const { abi, bin } = Example["contracts"]["contracts/RockPaperScissors.sol:RockPaperScissors"];

const privateKey = process.env.PRIVATE_KEY;
const account = privateKeyToAccount(privateKey);

(async () => {
	const client = createWalletClient({
		account,
		chain: sepolia,
		transport: http(process.env.API_URL),
	}).extend(publicActions);

	const hash = await client.deployContract({
		abi,
		bytecode: `0x${bin}`,
	});

	const receipt = await client.getTransactionReceipt({ hash });
	console.log(receipt);
})();