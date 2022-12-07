const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  const BingoNft = await ethers.getContractFactory("BingoNft");

  const deployedBingoNftContract = await BingoNft.deploy();

  await deployedBingoNftContract.deployed();

  console.log(
    "BingoNft Contract Address:",
    deployedBingoNftContract.address
  );

  console.log("Sleeping.....");

  await sleep(40000);

  await hre.run("verify:verify", {
    address: deployedBingoNftContract.address,
    constructorArguments: [],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
