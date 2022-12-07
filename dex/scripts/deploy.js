const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  const bingoTokenAddress = "0xcAe7Ab715c4D290B4665172426Fe440753ccD534";

  const bingDexContract = await ethers.getContractFactory("BingoDex");

  const deployedbingDexContract = await bingDexContract.deploy(
    bingoTokenAddress
  );
  await deployedbingDexContract.deployed();

  console.log("Bingo Dex Contract Address:", deployedbingDexContract.address);

  console.log("Sleeping.....");

  await sleep(40000);

  await hre.run("verify:verify", {
    address: deployedbingDexContract.address,
    constructorArguments: [
      bingoTokenAddress
    ],
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
