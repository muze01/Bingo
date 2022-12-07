const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  const BingoV1 = await ethers.getContractFactory("BingoV1");

  const deployedBingoV1Contract = await BingoV1.deploy();

  await deployedBingoV1Contract.deployed();

  console.log(
    "Bingov1 Token Contract Address:",
    deployedBingoV1Contract.address
  );

  console.log("Sleeping.....");

  await sleep(40000);

  await hre.run("verify:verify", {
    address: deployedBingoV1Contract.address,
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
