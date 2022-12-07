import { Contract, utils } from "ethers";
import {
  BINGO_DEX_CONTRACT_ABI,
  BINGO_DEX_CONTRACT_ADDRESS,
  BINGO_TOKEN_CONTRACT_ABI,
  BINGO_TOKEN_CONTRACT_ADDRESS,
} from "../constants";

export var SWAP_HASH;

export const getAmountOfTokensReceivedFromSwap = async (
  swapAmountWei,
  provider,
  ethSelected,
  ethBalance,
  reservedBingoToken
) => {
  const dexContract = new Contract(
    BINGO_DEX_CONTRACT_ADDRESS,
    BINGO_DEX_CONTRACT_ABI,
    provider
  );
  let amountOfTokens;
  
  if (ethSelected) {
    amountOfTokens = await dexContract.getAmountOfTokens(
      swapAmountWei,
      ethBalance,
      reservedBingoToken
    );
  } else {
    
    amountOfTokens = await dexContract.getAmountOfTokens(
      swapAmountWei,
      reservedBingoToken,
      ethBalance,
      );
  }

  return amountOfTokens;
};

export const swapTokens = async (
  signer,
  swapAmountWei,
  tokenToBeReceivedAfterSwap,
  ethSelected
) => {

  const dexContract = new Contract(
    BINGO_DEX_CONTRACT_ADDRESS,
    BINGO_DEX_CONTRACT_ABI,
    signer
  );

  const tokenContract = new Contract(
    BINGO_TOKEN_CONTRACT_ADDRESS,
    BINGO_TOKEN_CONTRACT_ABI,
    signer
  );

  let tx;
  if (ethSelected) {
    tx = await dexContract.ethToBingoToken(
      tokenToBeReceivedAfterSwap,
      {
        value: swapAmountWei,
      }
    );
  } else {

    tx = await tokenContract.approve(
      BINGO_DEX_CONTRACT_ADDRESS,
      swapAmountWei.toString()
    );

    await tx.wait();
    
    tx = await dexContract.bingoTokenToEth(
      swapAmountWei,
      tokenToBeReceivedAfterSwap
      );
    }
    
    await tx.wait();
    SWAP_HASH = tx.hash;
};
