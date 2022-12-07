import { BigNumber, Contract, utils } from "ethers";
import {
  BINGO_TOKEN_CONTRACT_ADDRESS,
  BINGO_TOKEN_CONTRACT_ABI,
} from "../constants";

export var BUY_HASH;

export const PurchaseToken = async (signer, amount) => {
  const bingoTokenContract = new Contract(
    BINGO_TOKEN_CONTRACT_ADDRESS,
    BINGO_TOKEN_CONTRACT_ABI,
    signer
  );

  try {
    const tokenAmount = (0.001 * amount).toString();
    const price = utils.parseEther(tokenAmount);
    
    const tx = await bingoTokenContract.mint(
      amount.toString(),
      {
      value: price.toString(),
    });

    await tx.wait();
    BUY_HASH = tx.hash;
  } catch (error) {
    console.error(error);
  }
};
