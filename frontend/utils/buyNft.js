import { Contract, utils } from "ethers";
import {
  BINGO_NFT_CONTRACT_ADDRESS,
  BINGO_NFT_CONTRACT_ABI,
} from "../constants";

export var BUY_NFT_HASH;
export const Purchase = async (
    signer, 
    nftId
    ) => {
      
  const bingoNftContract = new Contract(
    BINGO_NFT_CONTRACT_ADDRESS,
    BINGO_NFT_CONTRACT_ABI,
    signer
  );

  const nftQuantity = "1";
  const price = utils.parseEther("0.055");

  try {
    const tx = await bingoNftContract.nftMint(
        nftId, 
        nftQuantity,
        {
      value: price,
        }
    );
    await tx.wait();
    BUY_NFT_HASH = tx.hash;
  } catch (error) {
    console.error(error);
    window.alert("Insufficient Funds, You need to have some Goerli_Ether");
  }
};
