import { Contract, utils } from "ethers";
import {
  BINGO_DEX_CONTRACT_ABI,
  BINGO_DEX_CONTRACT_ADDRESS,
} from "../constants";

export var REMOVE_ETHER_AMOUNT;
export var REMOVE_BINGO_AMOUNT;
export var REMOVE_LIQUIDITY_HASH;

export const removeLiquidity = async (signer, removeLPTokensWei) => {
  const dexContract = new Contract(
    BINGO_DEX_CONTRACT_ADDRESS,
    BINGO_DEX_CONTRACT_ABI,
    signer
  );

  const tx = await dexContract.removeLiquidity(removeLPTokensWei);
  await tx.wait();
  REMOVE_LIQUIDITY_HASH = tx.hash;
};

export const getTokensAfterRemove = async (
  provider,
  removeLPTokenWei,
  ethBalance,
  bingoTokenReserve
) => {
  try {
    const dexContract = new Contract(
      BINGO_DEX_CONTRACT_ADDRESS,
      BINGO_DEX_CONTRACT_ABI,
      provider
    );

    const _totalSupply = await dexContract.totalSupply();
    const removeEtherAmount = ethBalance
      .mul(removeLPTokenWei)
      .div(_totalSupply);
    const removeBingoTokenAmount = bingoTokenReserve
      .mul(removeLPTokenWei)
      .div(_totalSupply);

      const formattedEther = utils.formatEther(removeEtherAmount);
      const formattedBingo = utils.formatEther(removeBingoTokenAmount);

      REMOVE_ETHER_AMOUNT = formattedEther.slice(0, 8);
      REMOVE_BINGO_AMOUNT = formattedBingo.slice(0, 8);

    return {
      removeEtherAmount,
      removeBingoTokenAmount,
    };
  } catch (err) {
    console.error(err);
  }
};
