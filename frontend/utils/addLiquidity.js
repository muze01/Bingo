import { Contract, utils } from "ethers";
import {
  BINGO_DEX_CONTRACT_ADDRESS,
  BINGO_DEX_CONTRACT_ABI,
  BINGO_TOKEN_CONTRACT_ADDRESS,
  BINGO_TOKEN_CONTRACT_ABI,
} from "../constants";

export var LIQUIDITY_HASH;
export const addLiquidity = async (
  signer,
  bingoAmountWei,
  EtherAmountWei
) => {
  try {
    
    const bingoTokenContract = new Contract(
      BINGO_TOKEN_CONTRACT_ADDRESS,
      BINGO_TOKEN_CONTRACT_ABI,
      signer
    );

    const dexContract = new Contract(
      BINGO_DEX_CONTRACT_ADDRESS,
      BINGO_DEX_CONTRACT_ABI,
      signer
    );

    let tx = await bingoTokenContract.approve(
      BINGO_DEX_CONTRACT_ADDRESS,
      bingoAmountWei.toString()
    );
    await tx.wait();
    
    tx = await dexContract.addLiquidity(
      bingoAmountWei, 
      {
      value: EtherAmountWei,
    });
    await tx.wait();
    LIQUIDITY_HASH = tx.hash;
    
  } catch (err) {
    console.error(err);
  }
};

export const amountBingoTokenToPool = async (
  etherToAdd = "0",
  etherBalInContract,
  bingoTokenReserve
) => {

  const etherAmountWei = utils.parseEther(etherToAdd);

  const bingoTokenAmount = etherAmountWei
    .mul(bingoTokenReserve)
    .div(etherBalInContract);
  return bingoTokenAmount;
};