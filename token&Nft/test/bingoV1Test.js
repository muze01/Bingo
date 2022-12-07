const { ethers } = require("hardhat");
// const hre = require("hardhat");
const { expect } = require("chai");

// HAVE BEEN TESTED USING REMIX-IDE...

describe("DEPLOYING CONTRACT", async () => {
  let BingoV1;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async () => {
    const contract = await ethers.getContractFactory("BingoV1");
    BingoV1 = await contract.deploy();
    await BingoV1.deployed();

    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("TEST1: Should successfully deploy", async () => {
    console.log("<------------- TEST 1 ------------->");
    console.log(`DEPLOYED AT --> ${BingoV1.address}`);
  });

  it("TEST2: Owner of contract Should have 10 Million minted tokens", async () => {
    console.log("<------------- TEST 2 ------------->");
    const balance = await BingoV1.balanceOf(owner.address);
    console.log(`Owner Balance --> ${ethers.utils.formatEther(balance)}`);
  });

  // TESTING TRANSFER FUNCTION
  it("TEST3: Should be able to TRANSFER tokens to another address with Fees(burn and marketing) being subtracted", async function () {
    console.log("<------------- TEST 3 ------------->");
    await BingoV1.transfer(addr2.address, ethers.utils.parseEther("1"));
    expect(await BingoV1.balanceOf(addr2.address)).to.equal(
      ethers.utils.parseEther("0.98901")
    );
  });

  it("TEST4: Should be able to give approval to an address to send on your behalf", async () => {
    console.log("<------------- TEST 4 ------------->");
    await BingoV1.connect(addr1).approve(
      owner.address,
      ethers.utils.parseEther("1")
    );

    await BingoV1.transfer(
      addr1.address, 
      ethers.utils.parseEther("1")
    );

    await BingoV1.transferFrom(
      addr1.address,
      addr2.address,
      ethers.utils.parseEther("1")
    );

    expect(await BingoV1.balanceOf(addr2.address)).to.equal(
      ethers.utils.parseEther("0.98901")
    );
  });
});
