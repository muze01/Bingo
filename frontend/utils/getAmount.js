import { Contract } from "ethers";
import {
  BINGO_DEX_CONTRACT_ADDRESS,
  BINGO_DEX_CONTRACT_ABI,
  BINGO_TOKEN_CONTRACT_ADDRESS,
  BINGO_TOKEN_CONTRACT_ABI,
} from "../constants";

export const getEtherBalance = async (provider, address, contract = false) => {
  try {
    if (contract) {
      const balance = await provider.getBalance(BINGO_DEX_CONTRACT_ADDRESS);
      return balance;
    } else {
      const balance = await provider.getBalance(address);
      return balance;
    }
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export const getBingoTokenBalance = async (provider, address) => {
  try {
    const bingoTokenContract = new Contract(
      BINGO_TOKEN_CONTRACT_ADDRESS,
      BINGO_TOKEN_CONTRACT_ABI,
      provider
    );

    const balanceOfBingoTokens = await bingoTokenContract.balanceOf(address);
    return balanceOfBingoTokens;
  } catch (err) {
    console.error(err);
  }
};

export const getLPTokenBalance = async (provider, address) => {
  try {
    const dexContract = new Contract(
      BINGO_DEX_CONTRACT_ADDRESS,
      BINGO_DEX_CONTRACT_ABI,
      provider
    );
    
    const balanceOfLPTokens = await dexContract.balanceOf(address);
    return balanceOfLPTokens;
  } catch (err) {
    console.error(err);
  }
};

export const getBalanceOfShares = async (provider, amount) => {
  try {
    const dexContract = new Contract(
      BINGO_DEX_CONTRACT_ADDRESS,
      BINGO_DEX_CONTRACT_ABI,
      provider
    );
    const shares = await dexContract.getBalance(amount);
    return shares;
  } catch (err) {
    console.error(err);
  }
};

export const getReserveOfBingoTokens = async (provider) => {
  try {
    const dexContract = new Contract(
      BINGO_DEX_CONTRACT_ADDRESS,
      BINGO_DEX_CONTRACT_ABI,
      provider
    );
    const reserve = await dexContract.getReserve();
    return reserve;
  } catch (err) {
    console.error(err);
  }
};