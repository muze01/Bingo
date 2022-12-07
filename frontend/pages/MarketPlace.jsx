import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../utils/context";
import { Purchase, BUY_NFT_HASH } from "../utils/buyNft";
import { CircularProgress } from "@mui/material";

const MarketPlace = () => {
  const [alerts, setAlerts] = useState({ show: true, type: "", msg: "" });

  const showAlert = (show = false, type = "", msg = "") => {
    setAlerts({ show, type, msg });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 4000);
    return () => {
      clearTimeout(timeout);
    };
  }, [alerts.show]);

  const {
    address,
    connectWallet,
    getProviderOrSigner,
    disconnect,
    connected,
    balance,
    txAddress,
  } = useGlobalContext();

  const [loading0, setLoading0] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);

  const buyNFT = async (nftID) => {
    const signer = await getProviderOrSigner(true);
    showAlert(true, "success", "processing transaction");
    await Purchase(signer, nftID);
  };

  return (
    <section id="marketplace">
      <h2>bingo nft's</h2>
      <h5>buy bingo nft's to support our community</h5>

      <main className="marketcontainer container">
        {/* marketplace info */}
        <div className="marketplaceinfo">
          <p>
            Shelters around the world are seeing a surge in dogs being abandoned
            and harmed in recent years. Protecting these dogs is a big task, but
            it is one we are committed to achieving by working with our partners
            at ASPCA, BEST FRIENDS ORGANIZATION, HUMANE SOCIETY AND NORTH SHORE
            ANIMAL LEAGUE.
          </p>

          <p>
            Everytime you engage with bingo token community, either by buying
            tokens, holding an NFT e.t.c, you are directly supporting us and our
            partners to save dogs and provide them with a better life. CONNECT
            YOUR WALLET BELOW TO PURCHASE AS MANY NFT's AS YOU PLEASE.
          </p>
        </div>

        {/* partner images */}
        <div className="marketplaceinfoimages">
          <img src="./pics/animalrescue.avif" alt="paws" />
          <img src="./pics/BF.png" alt="bf" />
          <img src="./pics/furkids.webp" alt="furkids" />
          <img src="./pics/human-society.png" alt="humansociety" />
        </div>

        {/* connect btn */}
        <div className="marketbtn">
          {connected ? (
            <button className="btn " onClick={() => disconnect()}>
              disconnect wallet
            </button>
          ) : (
            <button className="btn " onClick={() => connectWallet()}>
              connect wallet
            </button>
          )}
        </div>

        {/* walletaddress */}
        <div>
          {" "}
          {connected ? (
            <div className="addressmarket">
              <small>{address}</small>
              <div className="marketunderline"></div>
              <div className="marketbalance">
                {" "}
                <img src="./images/Ethereum-Logo-svg.png" alt="ethicon" />{" "}
                <small>{balance}</small>
              </div>
            </div>
          ) : (
            <div className="addressmarket">
              <small>Wallet Address</small>
            </div>
          )}
          <div className="transactionlink">
            {BUY_NFT_HASH && (
              <small>
                <a
                  href={`https://testnets.opensea.io/${txAddress}`}
                  target="_blank"
                  className="hashlink"
                >
                  Check Your Transaction On The Block Explorer
                </a>
              </small>
            )}
          </div>
        </div>

        {/* market center */}
        <div className="marketcenter">
          {/* nft ID 0 */}
          <div className="nft">
            <div className="alert-sec1">
              {alerts.show && (
                <p className={`alert1 alert-${alerts.type}`}>{alerts.msg}</p>
              )}
            </div>
            <img
              src="./pics/nftCollection/0.jpeg"
              alt="id-0"
              className="nftimage"
            />

            <div className="nftinfo">
              {/* nftinfo */}
              <div className="nftsinfo">
                {" "}
                <p>name</p>
                <small>bingo the politician</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>contract address</p>
                <small>0x4b7D...2935</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>price</p>
                <div className="ethicon">
                  {" "}
                  <img
                    src="./images/Ethereum-Logo-svg.png"
                    alt="ethicon"
                  />{" "}
                  <small>0.055</small>{" "}
                </div>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>token ID</p>
                <small>0</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>token standard</p>
                <small>ERC 1155</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>chain</p>
                <small>goerli</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>creator fee</p>
                <small>5%</small>
              </div>
            </div>

            {/* buy btn */}
            {connected ? (
              <button
                className=" transfer-btn swapbtn newbtn"
                onClick={async () => {
                  setLoading0(true);
                  await buyNFT(0);
                  showAlert(
                    true,
                    "success",
                    "congratulations tokenID 0 is yours 🚀🚀"
                  );
                  setLoading0(false);
                }}
              >
                {" "}
                {loading0 ? <CircularProgress size={10} /> : "Purchase"}{" "}
              </button>
            ) : (
              ""
            )}
          </div>

          {/* nft ID 1 */}
          <div className="nft">
            <img
              src="./pics/nftCollection/1.jpeg"
              alt="id-1"
              className="nftimage nftid1"
            />

            <div className="nftinfo">
              {/* nftinfo */}
              <div className="nftsinfo">
                {" "}
                <p>name</p>
                <small>bingo the astronaut</small>
              </div>

              <div className="nftsinfo">
                {" "}
                <p>contract address</p>
                <small>0x4b7D...2935</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>price</p>
                <div className="ethicon">
                  {" "}
                  <img
                    src="./images/Ethereum-Logo-svg.png"
                    alt="ethicon"
                  />{" "}
                  <small>0.055</small>{" "}
                </div>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>token ID</p>
                <small>1</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>token standard</p>
                <small>ERC 1155</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>chain</p>
                <small>goerli</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>creator fee</p>
                <small>5%</small>
              </div>
            </div>

            {/* buy btn */}
            {connected ? (
              <button
                className=" transfer-btn swapbtn"
                onClick={async () => {
                  setLoading1(true);
                  await buyNFT(1);
                  showAlert(
                    true,
                    "success",
                    "congratulations tokenID 1 is yours 🚀🚀"
                  );
                  setLoading1(false);
                }}
              >
                {" "}
                {loading1 ? <CircularProgress size={10} /> : "Purchase"}{" "}
              </button>
            ) : (
              ""
            )}
          </div>

          {/* nft ID 2 */}
          <div className="nft">
            <img
              src="./pics/nftCollection/2.jpeg"
              alt="id-2"
              className="nftimage"
            />
            {/* 0x4b7D...2935 */}
            <div className="nftinfo">
              {/* nftinfo */}
              <div className="nftsinfo">
                {" "}
                <p>name</p>
                <small>bingo the engineer</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>contract address</p>
                <small>0x4b7D...2935</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>price</p>
                <div className="ethicon">
                  {" "}
                  <img
                    src="./images/Ethereum-Logo-svg.png"
                    alt="ethicon"
                  />{" "}
                  <small>0.055</small>{" "}
                </div>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>token ID</p>
                <small>2</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>token standard</p>
                <small>ERC 1155</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>chain</p>
                <small>goerli</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>creator fee</p>
                <small>5%</small>
              </div>
            </div>

            {/* buy btn */}
            {connected ? (
              <button
                className=" transfer-btn swapbtn newbtn"
                onClick={async () => {
                  setLoading2(true);
                  await buyNFT(2);
                  showAlert(
                    true,
                    "success",
                    "congratulations tokenID 2 is yours 🚀🚀"
                  );
                  setLoading2(false);
                }}
              >
                {" "}
                {loading2 ? <CircularProgress size={10} /> : "Purchase"}{" "}
              </button>
            ) : (
              ""
            )}
          </div>

          {/* nft ID 3 */}
          <div className="nft">
            <img
              src="./pics/nftCollection/3.jpeg"
              alt="id-3"
              className="nftimage nftid1"
            />

            <div className="nftinfo">
              {/* nftinfo */}
              <div className="nftsinfo">
                {" "}
                <p>name</p>
                <small>bingo the scientist</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>contract address</p>
                <small>0x4b7D...2935</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>price</p>
                <div className="ethicon">
                  {" "}
                  <img
                    src="./images/Ethereum-Logo-svg.png"
                    alt="ethicon"
                  />{" "}
                  <small>0.055</small>{" "}
                </div>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>token ID</p>
                <small>3</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>token standard</p>
                <small>ERC 1155</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>chain</p>
                <small>goerli</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>creator fee</p>
                <small>5%</small>
              </div>
            </div>

            {/* buy btn */}
            {connected ? (
              <button
                className=" transfer-btn swapbtn"
                onClick={async () => {
                  setLoading3(true);
                  await buyNFT(3);
                  showAlert(
                    true,
                    "success",
                    "congratulations tokenID 3 is yours 🚀🚀"
                  );
                  setLoading3(false);
                }}
              >
                {" "}
                {loading3 ? <CircularProgress size={10} /> : "Purchase"}{" "}
              </button>
            ) : (
              ""
            )}
          </div>

          {/* nft ID 4 */}
          <div className="nft">
            <img
              src="./pics/nftCollection/4.jpeg"
              alt="id-4"
              className="nftimage nftid1"
            />

            <div className="nftinfo">
              {/* nftinfo */}
              <div className="nftsinfo">
                {" "}
                <p>name</p>
                <small>bingo the farmer</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>contract address</p>
                <small>0x4b7D...2935</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>price</p>
                <div className="ethicon">
                  {" "}
                  <img
                    src="./images/Ethereum-Logo-svg.png"
                    alt="ethicon"
                  />{" "}
                  <small>0.055</small>{" "}
                </div>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>token ID</p>
                <small>4</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>token standard</p>
                <small>ERC 1155</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>chain</p>
                <small>goerli</small>
              </div>
              <div className="nftsinfo">
                {" "}
                <p>creator fee</p>
                <small>5%</small>
              </div>
            </div>

            {/* buy btn */}
            {connected ? (
              <button
                className=" transfer-btn swapbtn"
                onClick={async () => {
                  setLoading4(true);
                  await buyNFT(4);
                  showAlert(
                    true,
                    "success",
                    "congratulations tokenID 4 is yours 🚀🚀"
                  );
                  setLoading4(false);
                }}
              >
                {" "}
                {loading4 ? <CircularProgress size={10} /> : "Purchase"}{" "}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        {/*  end of market center */}
      </main>
    </section>
  );
};

export default MarketPlace;
