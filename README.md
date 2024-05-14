# Rock Paper Scissors

The deployed contract can be found at https://sepolia.etherscan.io/address/0xde8997ee54a18d1e952e818f635e1b278f38b687

## Requirement

- **Node**: This project requires Node.js, a JavaScript runtime. You can download it from [here](https://nodejs.org/). Check your Node version by running `node -v` in your terminal. This project uses v18.17.1.

- **Hardhat**: Hardhat is a development environment for compiling, deploying, testing, and debugging Ethereum software. Install it globally on your machine with `npm install --global hardhat`.

- **solc**: The Solidity compiler, solc, is required to compile the Solidity contract in this project. You can install it using the instructions provided [here](https://docs.soliditylang.org/en/latest/installing-solidity.html). This project uses solc 0.8.25.

## Structure
- `contracts/`: Contains the Solidity contract `RockPaperScissors.sol`.
- `src/`: Contains JavaScript files for interacting with the contract.
- `test/`: Contains test files for the contract.
- `ignition/`: Contains deployment module for the contract.
- `artifacts/`: Contains ABI of the compiled contract.

## Setup
Install dependencies with `npm install`

Create `.env` from example.env

## How to Deploy
1. Compile the contract:
```
solc --optimize --combined-json abi,bin contracts/RockPaperScissors.sol > artifacts/RockPaperScissors.json
```
2. Deploy the contract to sepolia:
```
npx hardhat ignition deploy ignition/modules/RockPaperScissors.js --network sepolia --verify
```

## Interacting with the deployed contract
1. Send funds to the created AA account to cover the entry fee:
```
node src/fundClient.js
```

2. Play the game:
```
node src/playGame.js <pose>
```
Replace `<pose>` with your selection. The options are `0` for Rock, `1` for Paper, and `2` for Scissors. If you don't provide a pose, the script will randomly select one for you.

## Testing
Run the tests for the contract with `npx hardhat test`

## References
Alchemy

- [Modular Account](https://accountkit.alchemy.com/smart-accounts/modular-account/)

- [Sending User Operation](https://accountkit.alchemy.com/using-smart-accounts/send-user-operations.html)

- [Gas Manager](https://accountkit.alchemy.com/using-smart-accounts/sponsoring-gas/gas-manager.html#how-to-sponsor-gas)

Hardhat

- [Hardhat Ignition](https://hardhat.org/hardhat-runner/docs/guides/deploying)