const { ethers } = require("hardhat");
const hre = require("hardhat");
const { expect } = require("chai");
// const contract = hre.artifacts.readArtifact("contracts/Bingo.sol: BingoV1");
// const ERC20 = hre.artifacts.readArtifact("contracts/Bingo.sol: ERC20");

// note that each test doesn't carryover to the next, so either join them or redo in the new test
// ideas of describe blocks: DEPLOYMENT, TRANSACTIONS, ADMIN CALLS

// 1. DEPLOY FIRST THEN MINT THEN TRY TO USE ANOTHER ACCOUNT TO MINT, CHECK BALANCE OF THE ACCOUNT WHEN YOU MINT.. note that you're minting to the deployed smart contract..so (deployedbingo.address)

// try to use the addr1 address to mint and call other admin functions and see that they fail...if they pass then contract faulty....

// THIS IS A TEST TO SIMULATE A SWAP..BY SO DOING, WE'RE TESTING OUR SWAP FUNCTION IN THE BINGO CONTRACT..
describe("Testing Uniswap Swap Function", function () {
  const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const WETH_9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  // const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
  // const DAI_WHALE = "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE";
  let deployBingoV1;
  let accounts;
  let dai;
  let weth;
  // let addr1;
  // a million dai
  // const amount_in = ethers.utils.parseEther("1000000");
  // const amount_out = 1;
  // const to = accounts[0];
  
  // here we're getting the dai and wbtc contracts and we'll deploy the bingo contract.
  it(" should swap", async () => {
    
    accounts = await ethers.getSigners();
    
    weth = await ethers.getContractFactory("IWETH", WETH_9);
    dai = await ethers.getContractFactory("ERC20", DAI);

    // DEPLOY
    const BINGO = await ethers.getContractFactory("BingoV1");
    deployBingoV1 = await BINGO.deploy();
    await deployBingoV1.deployed();
    console.log("deployed");
  });
  
  it("should swap", async () => {
    // approve the bingo contract to spend a million dai, tx should be sent from the whale..
    const amount_in = ethers.utils.parseEther("1000000");
    const amount_out = 1;
    await weth.connect(accounts[0]).deposit({value: amount_in});
    await weth.connect(accounts[0]).approve(deployBingoV1.address, amount_in);

    await deployBingoV1.swap(
      amount_in,
      amount_out
    )

    console.log(`out ${await dai.balanceOf(accounts[0].address)}`);

  });
  // beforeEach(async () => {
  //   const BingoV1 = await ethers.getContractFactory("BingoV1");
  //   deployBingoV1 = await BingoV1.deploy();
  //   await deployBingoV1.deployed();

  //   [owner, addr1] = await ethers.getSigners();
});
