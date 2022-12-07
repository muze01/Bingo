import { BigNumber, ethers, Contract, providers, Signer, utils } from "ethers";
import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../utils/context";
import { DiAtom } from "react-icons/di";
import { FaEthereum, FaTimes } from "react-icons/fa";
import {
  addLiquidity,
  amountBingoTokenToPool,
  LIQUIDITY_HASH,
} from "../utils/addLiquidity";
import {
  getBingoTokenBalance,
  getEtherBalance,
  getLPTokenBalance,
  getReserveOfBingoTokens,
  getBalanceOfShares,
} from "../utils/getAmount";
import { PurchaseToken, BUY_HASH } from "../utils/buyToken";
import {
  swapTokens,
  getAmountOfTokensReceivedFromSwap,
  SWAP_HASH,
} from "../utils/swap";
import {
  getTokensAfterRemove,
  removeLiquidity,
  REMOVE_BINGO_AMOUNT,
  REMOVE_ETHER_AMOUNT,
  REMOVE_LIQUIDITY_HASH,
} from "../utils/removeLiquidity";
import {
  BINGO_TOKEN_CONTRACT_ADDRESS,
  BINGO_TOKEN_CONTRACT_ABI,
} from "../constants";
import { CircularProgress } from "@mui/material";

const Dex = () => {
  const zero = BigNumber.from(0);
  const [ethBalance, setEtherBalance] = useState(zero);
  const [txAmount, setTxAmount] = useState("");
  const [reservedBingo, setReservedBingo] = useState(zero);
  const [etherBalanceContract, setEtherBalanceContract] = useState(zero);
  const [liquidity, setLiquidity] = useState(false);
  const [bingoBalance, setBingoBalance] = useState(zero);
  const [lpBalance, setLPBalance] = useState(zero);
  const [removeEther, setRemoveEther] = useState(zero);
  const [txHash, settxHash] = useState(null);
  const [addEther, setAddEther] = useState(zero);
  const [txAddress, setTxAddress] = useState("");
  const [addBingoTokens, setAddBingoTokens] = useState(zero);
  const [removeBingo, setRemoveBingo] = useState(zero);
  const [removeLPTokens, setRemoveLPTokens] = useState("0");
  const [activeBtn, setActiveBtn] = useState("swapone");
  const [swapAmount, setSwapAmount] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [ethSelected, setEthSelected] = useState(true);
  const [tokenToBeReceivedAfterSwap, settokenToBeReceivedAfterSwap] =
    useState(zero);

  const {
    address,
    connectWallet,
    disconnect,
    connected,
    showAlert,
    setLoading,
    chainID,
    chains,
    alerts,
    loading,
    accountChangeHandler,
    chainChangeHandler,
    getProviderOrSigner,
  } = useGlobalContext();

  useEffect(() => {
    window.ethereum.on("accountsChanged", () => {
      accountChangeHandler;
      getAmounts();
    });
    window.ethereum.on("chainChanged", chainChangeHandler);
  });

  // BEGINNING OF FUNCTIONS
  const _swapTokens = async () => {
    try {
      const swapAmountWei = utils.parseEther(swapAmount);

      if (!swapAmountWei.eq(zero)) {
        showAlert(true, "success", "processing");
        const signer = await getProviderOrSigner(true);
        setLoading(true);

        await swapTokens(
          signer,
          swapAmountWei,
          tokenToBeReceivedAfterSwap,
          ethSelected
        );
        setLoading(false);
        await getAmounts();
        showAlert(true, "success", "tokens swapped");
        setSwapAmount("");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setSwapAmount("");
      showAlert(
        true,
        "danger",
        "please be sure parameters are field correctly"
      );
    }
  };

  const _purchaseTokens = async (amount) => {
    try {
      const signer = await getProviderOrSigner(true);
      showAlert(true, "success", "processing");
      setLoading(true);

      await PurchaseToken(signer, amount);

      setLoading(false);
      showAlert(true, "success", "you've successfully purchased bingo tokens");
      await getAmounts();
      setTokenAmount("");
    } catch (error) {
      console.error(error);
      setLoading(false);
      setTokenAmount("");
      showAlert(
        true,
        "danger",
        "please be sure parameters are field correctly"
      );
    }
  };

  const _getAmountOfTokensReceivedFromSwap = async (_swapAmount) => {
    try {
      const _swapAmountWEI = utils.parseEther(_swapAmount.toString());
      if (!_swapAmountWEI.eq(zero)) {
        const provider = await getProviderOrSigner();
        const _ethBalance = await getEtherBalance(provider, null, true);
        const amountOfTokens = await getAmountOfTokensReceivedFromSwap(
          _swapAmountWEI,
          provider,
          ethSelected,
          _ethBalance,
          reservedBingo
        );
        settokenToBeReceivedAfterSwap(amountOfTokens);
      } else {
        settokenToBeReceivedAfterSwap(zero);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const _addLiquidity = async () => {
    try {
      const addEtherWei = utils.parseEther(addEther.toString());
      if (!addBingoTokens.eq(zero) && !addEtherWei.eq(zero)) {
        showAlert(true, "success", "processing");

        const signer = await getProviderOrSigner(true);
        setLoading(true);
        await addLiquidity(signer, addBingoTokens, addEtherWei);
        setAddBingoTokens(zero);
        await getAmounts();
        setLoading(false);
        showAlert(true, "success", "liquidity added 🚀🚀🚀");
      } else {
        setAddBingoTokens(zero);
        showAlert(
          true,
          "danger",
          "please be sure parameters are field correctly"
        );
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setAddBingoTokens(zero);
      showAlert(
        true,
        "danger",
        "please be sure parameters are field correctly"
      );
    }
  };

  const _removeLiquidity = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      showAlert(true, "success", "processing");

      const removeLPTokensWei = utils.parseEther(removeLPTokens);
      setLoading(true);

      await removeLiquidity(signer, removeLPTokensWei);
      setLoading(false);
      await getAmounts();

      setRemoveBingo(zero);
      setRemoveEther(zero);

      showAlert(true, "success", "liquidity removed");
    } catch (err) {
      console.error(err);
      setLoading(false);
      setRemoveBingo(zero);
      setRemoveEther(zero);
      showAlert(
        true,
        "danger",
        "please be sure parameters are field correctly"
      );
    }
  };

  const _getBalanceOfShares = async () => {
    try {
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getAmounts = async () => {
    try {
      const provider = await getProviderOrSigner(false);
      const signer = await getProviderOrSigner(true);
      const address = await signer.getAddress();
      const _ethBalance = await getEtherBalance(provider, address);
      const _bingoBalance = await getBingoTokenBalance(provider, address);
      const _lpBalance = await getLPTokenBalance(provider, address);
      const _reservedBingo = await getReserveOfBingoTokens(provider);
      const _ethBalanceContract = await getEtherBalance(provider, null, true);
      setEtherBalance(_ethBalance);
      setBingoBalance(_bingoBalance);
      setLPBalance(_lpBalance);
      setReservedBingo(_reservedBingo);
      setEtherBalanceContract(_ethBalanceContract);
    } catch (err) {
      console.error(err);
    }
  };

  const _getTokensAfterRemove = async (_removeLPTokens) => {
    try {
      const provider = await getProviderOrSigner();
      const removeLPTokenWei = utils.parseEther(_removeLPTokens).toString();
      const _ethBalance = await getEtherBalance(provider, null, true);
      const bingoTokenReserve = await getReserveOfBingoTokens(provider);
      await getTokensAfterRemove(
        provider,
        removeLPTokenWei,
        _ethBalance,
        bingoTokenReserve
      );

      setRemoveEther(REMOVE_ETHER_AMOUNT);
      setRemoveBingo(REMOVE_BINGO_AMOUNT);
    } catch (err) {
      console.error(err);
    }
  };

  const transferHandler = async () => {
    try {
      const transferAmount = utils.parseEther(txAmount.toString());

      setLoading(true);
      showAlert(true, "success", "processing");
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(
        BINGO_TOKEN_CONTRACT_ADDRESS,
        BINGO_TOKEN_CONTRACT_ABI,
        signer
      );

      const txt = await contract.transfer(txAddress, transferAmount);
      await getAmounts();
      settxHash(txt.hash);
      setLoading(false);
      setTxAmount("");
      setTxAddress("");
      showAlert(
        true,
        "success",
        `${transferAmount} Bingo Tokens transfered to ${txAddress}`
      );
    } catch (error) {
      console.error(error);
      setLoading(false);
      setTxAmount("");
      setTxAddress("");
      showAlert(
        true,
        "danger",
        "please be sure parameters are field correctly"
      );
    }
  };

  // END OF FUNCTIONS

  if (!connected) {
    return (
      <section id="dex">
        <h2>bingo exchange</h2>
        <h5>buy, sell, transfer & swap bingo tokens</h5>

        <main className="notconnected">
          <div className="alert-sec1">
            {alerts.show && (
              <p className={`alert1 alert-${alerts.type}`}>{alerts.msg}</p>
            )}
          </div>

          {/* dex landing */}
          <div className="container">
            <div className="notconnectedcontainer ">
              <div className="dexinfo">
                <h1>TREATS MAKES MY TAIL WAG</h1>
                <h4>
                  Buy $Bingo Token 💰 or Swap $Bingo Token to Goerli ETH 💰
                  <br /> 💰 No registration, no hassle! just connect your wallet
                  and get going.
                </h4>

                {/* dex connect button */}
                <div className="connectbtn">
                  <button
                    className="btn btn1"
                    onClick={async () => {
                      connectWallet;
                      await getAmounts();
                    }}
                  >
                    {connected ? "Disconnect" : "Connect wallet"}
                  </button>
                </div>
              </div>
              <img
                src="./pics/dexlanding.webp"
                alt="crypto"
                className="dexlandingimage"
              />
            </div>

            {/* dexcards */}
            <div className="cardscontainer">
              <div className="card">
                <img src="./pics/tvl.webp" alt="tvl" className="cardimage" />
                <h3>$28,063,554.53</h3>
                <p> TVL </p>
                <small> Total value locked</small>
              </div>

              <div className="card">
                <img
                  src="./pics/trade_light.webp"
                  alt="tvl"
                  className="cardimage"
                />
                <h3>632</h3>
                <p> Swaps </p>
                <small> last 24 hours </small>
              </div>

              <div className="card">
                <img
                  src="./pics/group_light.webp"
                  alt="tvl"
                  className="cardimage"
                />
                <h3>1,641,437</h3>
                <p> BingoToken Holders</p>
                <small>all time </small>
              </div>
            </div>
          </div>
        </main>
      </section>
    );
  }

  return (
    <div id="dex">
      <h2 className="header">bingo exchange</h2>
      <h5 className="dexh5">buy, sell, transfer & swap bingo tokens</h5>

      {/* header buttons */}
      <div className="headerbuttons">
        <button
          className={`${liquidity ? "hidebtn" : "btn btnhover"}`}
          onClick={() => {
            setLiquidity(true);
          }}
        >
          swap tokens & add Liquidity
        </button>

        <button className="btn btnhover" onClick={disconnect}>
          disconnect wallet
        </button>
      </div>

      <main className={`${liquidity ? "exchangecontainer container" : ""}`}>
        {/* BINGO BUY / TRANSFER SECTION */}
        <div
          className={`${liquidity ? "containerdex" : "containerdex container"}`}
        >
          <div className="alert-sec1">
            {alerts.show && (
              <p className={`alert1 alert-${alerts.type}`}>{alerts.msg}</p>
            )}
          </div>

          {/* bingo swap header */}
          <div className="bingoswap">
            <h3>bingo wallet</h3>
          </div>

          {/* WALLET LOGO ANIMATION */}
          <div className="walletanimation">
            <DiAtom size={45} />
            <FaEthereum size={45} className="eth" />{" "}
            <img
              src="./images/icons8-polygon-64.png"
              alt="polygon"
              className="polygon"
            />{" "}
            <img src="./images/binance.png" alt="binance" className="binance" />
            <DiAtom size={45} />
          </div>

          {/* WALLET INFO */}

          {/* account section header */}
          <div className="accountheader">
            <h4>account details</h4>
          </div>

          <div className="walletinfo1">
            {chains.map((item, index) => {
              const { id, image, name } = item;
              let chain = chainID === id;

              return (
                chain && (
                  <div key={index} className="chain-info light">
                    <div>
                      <img src={image} alt={name} className="img" />
                    </div>
                    <h5 className="chainname">{name}</h5>
                  </div>
                )
              );
            })}

            <div className="light">
              <h5 className="address"> {address}</h5>
              <h5 className="addressname">Address</h5>
            </div>
          </div>

          <div className="walletinfo">
            <h5>
              {utils.formatEther(bingoBalance).slice(0, 9)}
              <p>bingo Tokens</p>
            </h5>
            <h5>
              {utils.formatEther(ethBalance).slice(0, 9)}
              <p>Goerli Ether</p>
            </h5>
            <h5>
              {utils.formatEther(lpBalance).slice(0, 9)}
              <p>bingo LP tokens</p>
            </h5>
          </div>

          {/* BUY BINGO SECTION */}
          {/* buybingo header */}
          <div className="accountheader transferheader">
            <h4>
              buy <small>bingo tokens</small>
            </h4>
            <p>
              {" "}
              input amount --&gt; buy (maxPurchase is 6 tokens) --&gt; 1
              BingoToken is 0.001 Eth
            </p>
          </div>

          <div className="buybingosection">
            <input
              type="number"
              placeholder="Enter Amount between 1 to 6..."
              className={BUY_HASH ? "addressInputSuccess" : "addressInput"}
              onChange={(e) => {
                setTokenAmount(BigNumber.from(e.target.value || "0"));
                //
              }}
            />
            <button
              className="transfer-btn swap-btn"
              type="submit"
              disabled={!(tokenAmount > 0) || tokenAmount > 6}
              onClick={() => _purchaseTokens(tokenAmount)}
            >
              {loading ? <CircularProgress size={10} /> : "Buy"}
            </button>

            <br />
            {BUY_HASH && (
              <small>
                <a
                  href={`https://goerli.etherscan.io/tx/${BUY_HASH}`}
                  target="_blank"
                  className="hashlink"
                >
                  Check Your Transaction On The Block Explorer
                </a>
              </small>
            )}
          </div>

          {/* TRANSFER SECTION */}

          {/* transfer header */}
          <div className="accountheader transferheader">
            <h4>
              transfer <small>bingo tokens to a fren</small>
            </h4>

            <p>input address --&gt; input amount --&gt; send</p>
          </div>

          <div className="transfer">
            <div className="transfer-inputs">
              <input
                type="text"
                placeholder="Address...."
                id="address"
                className={txHash ? "addressInputSuccess" : "addressInput"}
                onChange={(e) => {
                  setTxAddress(e.target.value || "0");
                }}
              />
              <input
                type="number"
                placeholder="Amount...."
                id="amount"
                min={0}
                step={0.001}
                className={txHash ? "amountInputSuccess" : "amountInput"}
                onChange={(e) => {
                  setTxAmount(e.target.value || "0");
                }}
              />

              <button
                type="submit"
                className=" transfer-btn swap-btn"
                disabled={!(txAmount > 0)}
                onClick={transferHandler}
              >
                {loading ? <CircularProgress size={10} /> : "Send"}
              </button>
            </div>
            <br />
            {txHash && (
              <small>
                <a
                  href={`https://goerli.etherscan.io/tx/${txHash}`}
                  target="_blank"
                  className="hashlink"
                >
                  Check Your Transaction On The Block Explorer
                </a>
              </small>
            )}
          </div>
        </div>

        {/* LIQUIDITY / SWAP SECTION */}
        <div className={`${liquidity ? "liquidity" : " hideliquidity"}`}>
          {/* swap/liquidity header */}
          <div className="bingoswap">
            <h3>bingo swap & pool </h3>
            <h5>create a liquidity pool </h5>
            {/* ADD ETH TO LIQUIDITY POOL AND GET SHARES */}
          </div>

          <div className="closeliquidity">
            <FaTimes
              className="closebtn"
              onClick={() => {
                setLiquidity(false);
              }}
            />
          </div>

          {/* swap section header */}
          <div className="swapheader">
            <h4>swap tokens</h4>
            <p> click to pick a pair --&gt; input amount --&gt; swap</p>
          </div>

          {/* swap section */}
          <div className="swapcontainer">
            <div className="swapbuttons">
              <button
                onClick={async () => {
                  setEthSelected(true);
                  setActiveBtn("swapone");
                  await _getAmountOfTokensReceivedFromSwap(0);
                  showAlert(true, "success", "ETH/BINGO pair selected");
                  setSwapAmount("");
                }}
                className={
                  activeBtn === "swapone" ? "activeswap" : "btn swapbtn"
                }
              >
                swap eth to bingo token{" "}
              </button>

              <button
                onClick={async () => {
                  setEthSelected(false);
                  setActiveBtn("swaptwo");
                  await _getAmountOfTokensReceivedFromSwap(0);
                  showAlert(true, "success", "BINGO/ETH pair selected");
                  setSwapAmount("");
                }}
                className={
                  activeBtn === "swaptwo" ? "activeswap" : "btn swapbtn"
                }
              >
                swap bingo token to eth
              </button>
            </div>

            <input
              type="number"
              placeholder=" Amount To Swap..."
              onChange={async (e) => {
                setSwapAmount(e.target.value || "");
                await _getAmountOfTokensReceivedFromSwap(e.target.value || "0");
              }}
              value={swapAmount}
              className={SWAP_HASH ? "amountInputSuccess" : "amountInput"}
            />

            <div className="swapdescription">
              {ethSelected
                ? `Based on Your Input You will get ${utils
                    .formatEther(tokenToBeReceivedAfterSwap)
                    .slice(0, 8)} Bingo Tokens`
                : `Based on Your Input You will get ${utils
                    .formatEther(tokenToBeReceivedAfterSwap)
                    .slice(0, 8)} Eth`}
            </div>
            <button className="swap-btn " onClick={_swapTokens}>
              {loading ? <CircularProgress size={10} /> : "Swap"}
            </button>

            <br />
            {SWAP_HASH && (
              <small>
                <a
                  href={`https://goerli.etherscan.io/tx/${SWAP_HASH}`}
                  target="_blank"
                  className="hashlink"
                >
                  Check Your Transaction On The Block Explorer
                </a>
              </small>
            )}
          </div>
          {/* END OF SWAP SECTION*/}

          {/* liquidity section */}
          {/* liquidity center */}
          <div className="liquiditycenter">
            {utils.parseEther(reservedBingo.toString()).eq(zero) ? (
              <div className="liquidityadd">
                {/* addliquidity header */}
                <div className="addliquidityheader">
                  <h4>add liquidity </h4>
                  <p>
                    input amount of goerli eth --&gt; input amount of bingo
                    tokens --&gt; create
                  </p>
                </div>

                <input
                  type="number"
                  placeholder="Amount of Ether..."
                  onChange={(e) => setAddEther(e.target.value || "0")}
                  className=""
                />
                <input
                  type="number"
                  placeholder="Amount Bingo Tokens..."
                  onChange={(e) =>
                    setAddBingoTokens(
                      BigNumber.from(utils.parseEther(e.target.value || "0"))
                    )
                  }
                  className=""
                />
                <button
                  className="transfer-btn swapbtn"
                  onClick={_addLiquidity}
                >
                  {loading ? <CircularProgress size={10} /> : "create"}
                </button>
              </div>
            ) : (
              <div className="etheradd">
                {/* addliquidity header */}
                <div className="addliquidityheader">
                  <h4>
                    add liquidity <small>and get bingoLPTokens</small>{" "}
                  </h4>
                  <p>
                    input amount of goerli eth --&gt; add --&gt;{" "}
                    <small>
                      add amount of eth based on your bingoToken balance
                    </small>
                  </p>
                </div>

                <input
                  type="number"
                  placeholder="Amount of Ether..."
                  onChange={async (e) => {
                    setAddEther(e.target.value || "0");

                    const _addBingoTokens = await amountBingoTokenToPool(
                      e.target.value || "0",
                      etherBalanceContract,
                      reservedBingo
                    );
                    setAddBingoTokens(_addBingoTokens);
                  }}
                  className={
                    LIQUIDITY_HASH ? "amountInputSuccess" : "amountInput"
                  }
                />

                <div className="swapdescription">
                  {`Based on Your Input The Pool Requires ${utils
                    .formatEther(addBingoTokens)
                    .slice(0, 9)} Bingo
                  Tokens & ${addEther} ETH From You`}
                </div>
                <button
                  className="transfer-btn swapbtn"
                  onClick={_addLiquidity}
                >
                  {loading ? <CircularProgress size={10} /> : "Add"}
                </button>

                <br />
                {LIQUIDITY_HASH && (
                  <small>
                    <a
                      href={`https://goerli.etherscan.io/tx/${LIQUIDITY_HASH}`}
                      target="_blank"
                      className="hashlink"
                    >
                      Check Your Transaction On The Block Explorer
                    </a>
                  </small>
                )}
              </div>
            )}

            {/* removeliquidity header */}
            <div className="swapheader">
              <h4>
                remove liquidity<small> and get goerli-Eth back</small>
              </h4>
              <p> input amount of lp tokens to remove --&gt; remove</p>
            </div>
            <div className="removeliquidity">
              <input
                type="number"
                placeholder="Amount of LP Tokens..."
                onChange={async (e) => {
                  setRemoveLPTokens(e.target.value);

                  await _getTokensAfterRemove(e.target.value || "0");
                }}
                className={
                  REMOVE_LIQUIDITY_HASH ? "amountInputSuccess" : "amountInput"
                }
              />
              <div className="swapdescription">
                {`Based On Your Input You will get ${removeBingo} Bingo Tokens and ${removeEther} Eth`}
              </div>
              <button
                className="transfer-btn swapbtn"
                onClick={_removeLiquidity}
              >
                {loading ? <CircularProgress size={10} /> : "Remove"}
              </button>

              <br />
              <br />
              {REMOVE_LIQUIDITY_HASH && (
                <small>
                  <a
                    href={`https://goerli.etherscan.io/tx/${REMOVE_LIQUIDITY_HASH}`}
                    target="_blank"
                    className="hashlink"
                  >
                    Check Your Transaction On The Block Explorer
                  </a>
                </small>
              )}
            </div>
          </div>
        </div>

        {/* END OF LIQUIDITY SECTION */}
      </main>
    </div>
    // END OF DEX WHEEEW!!!!!!!
  );
};

export default Dex;
