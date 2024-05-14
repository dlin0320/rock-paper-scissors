const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RockPaperScissors", function () {
	let factory, contract;
	let owner, player;
	let ENTRY_FEE;

	beforeEach(async () => {
		ENTRY_FEE = ethers.parseEther("0.05");
		factory = await ethers.getContractFactory("RockPaperScissors");
		[owner, player, ...accounts] = await ethers.getSigners();
		contract = await factory.deploy({ from: owner.address });
		await contract.waitForDeployment();
	});

	it("should be deployed correctly", async () => {
		expect(contract.address).to.not.equal('');
	});

	it("should allow a player to play a game", async () => {
		const userPose = Math.floor(Math.random() * 3);
		const tx = await contract.connect(player).play(userPose, { value: ENTRY_FEE });
		expect(tx).to.emit(contract, 'GameResult');
	});

	it("should emit a GameResult event when a game is played", async () => {
		const userPose = Math.floor(Math.random() * 3);
		const tx = await contract.connect(player).play(userPose, { value: ENTRY_FEE });
		let computerPose;
		await expect(tx)
			.to.emit(contract, 'GameResult')
			.withArgs(
				0, 
				player.address, 
				userPose, 
				(arg) => {
					computerPose = Number(arg);
					const expectedValues = [0, 1, 2];
					return expectedValues.includes(computerPose);
				}, 
				(arg) => {
					const result = Number(arg);
					if (computerPose === userPose) {
						return result === 2;
					} else if (
						(userPose === 0 && computerPose ==2) ||
						(userPose === 1 && computerPose == 0) ||
						(userPose === 2 && computerPose == 1)
					) {
						return result === 0;
					} else {
						return result === 1;
					}
				}
			);
	});

	it("should disallow a player from playing a game without the entry fee", async () => {
		const userPose = Math.floor(Math.random() * 3);
		await expect(contract.connect(player).play(userPose)).to.be.revertedWith("Please send 0.05 ether to play");
	});

	it("should disallow a player from playing a game with an invalid pose", async () => {
		await expect(contract.connect(player).play(3, { value: ENTRY_FEE })).to.be.revertedWith("Invalid pose");
	});

	it("should allow owner to withdraw funds", async () => {
		await contract.connect(owner).withdraw();
	});

	it("should disallow non-owner from withdrawing funds", async () => {
		await expect(contract.connect(player).withdraw()).to.be.revertedWith("Only owner can withdraw");
	});
});