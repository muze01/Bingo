import React, { useState, useContext, useEffect } from "react";
const AppContext = React.createContext();

import { ethers } from "ethers";
import { chains } from "../utils/data";
import { back } from "../utils/data";

const AppProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState(null);
  const [address, setAddress] = useState(null);
  const [alerts, setAlerts] = useState({ show: true, type: "", msg: "" });
  const [loading, setLoading] = useState(false);
  const [chainID, setChainID] = useState(null);
  const [txAddress, setTxAddress] = useState(null);
  const [backIMG, setBackIMG] = useState(back);
  const [backId, setBackId] = useState("light");

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

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setConnected(true);
      showAlert(true, "success", "wallet connected");
    } catch (err) {
      console.error(err);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);

    if (window.ethereum && !connected) {
      const defaultAdd = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      accountChangeHandler(defaultAdd[0]);
      walletAddress(defaultAdd[0]);
      setLoading(false);
      setConnected(true);
      setChainID(window.ethereum.chainId);
      setTxAddress(defaultAdd[0]);

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      if (chainId !== "0x5") {
        showAlert(true, "danger", "please switch network to goerli");
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x5" }],
        });
      }
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else if (!typeof window.ethereum) {
      showAlert(true, "danger", "please install metamask wallet");
      window.alert("please install metamask wallet");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const getAccountBalance = (address) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      .then((balance) => {
        const bal = parseFloat(ethers.utils.formatEther(balance));
        setBalance(bal.toFixed(5));
      });
  };

  const walletAddress = (addr) => {
    Middle(addr);
    return addr;
  };

  function Middle(str) {
    const start = str.slice(0, 5);
    const end = str.slice(str.length - 5, str.length - 0);

    const result = start + "...." + end;
    setAddress(result);
    return result;
  }

  const disconnect = () => {
    if (connected) {
      window.location.reload();
    }
    showAlert(true, "danger", "Wallet Disconnected");
  };

  const accountChangeHandler = (newAcc) => {
    try {
      const stringNewAcc = newAcc.toString();
      getAccountBalance(stringNewAcc);
      setAddress(newAcc);
      getAccountBalance(newAcc);
      walletAddress(Middle(newAcc));
      setChainID(chainID);

      showAlert(true, "success", "Wallet connected");
    } catch (error) {
      console.error(error);
    }
  };

  const chainChangeHandler = (newChain) => {
    window.location.reload();
    setChainID(newChain);
    showAlert(true, "danger", "please switch network to goerli");
  };

  const getId = (e) => {
    let id = e.target.id;
    if (id === "pink") {
      console.log(id, "id pink");
      setBackId(id);
      console.log("back pink");
    } else if (id === "dark") {
      console.log(id, "id dark");
      setBackId(id);
      console.log("back dark");
    } else if (id === "light") {
      console.log(id, "id light");
      setBackId(id);
      console.log("back light");
    }
  };

  return (
    <AppContext.Provider
      value={{
        connected,
        setConnected,
        connectWallet,
        disconnect,
        getProviderOrSigner,
        showAlert,
        setLoading,
        accountChangeHandler,
        chainChangeHandler,
        getId,
        balance,
        address,
        loading,
        chainID,
        chains,
        alerts,
        txAddress,
        backIMG,
        backId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
