import React, { useState, useContext, useEffect } from "react";
const AppContext = React.createContext();

import { chains } from "../utils/data";
import { back } from "../utils/data";
import { useProvider, useSigner, useAccount } from "wagmi";

const AppProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [alerts, setAlerts] = useState({ show: true, type: "", msg: "" });
  const [loading, setLoading] = useState(false);
  const web3Provider = useProvider();
  const { data: signer } = useSigner();
  const { isConnected, isDisconnected, address } = useAccount();

  const [chainID, setChainID] = useState("0x5");
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


  const getId = (e) => {
    let id = e.target.id;
    if (id === "pink") {
      setBackId(id);
    } else if (id === "dark") {
      setBackId(id);
    } else if (id === "light") {
      setBackId(id);
    }
  };

  return (
    <AppContext.Provider
      value={{
        connected,
        setConnected,
        showAlert,
        setLoading,
        getId,
        address,
        loading,
        isConnected,
        isDisconnected,
        chainID,
        chains,
        alerts,
        backIMG,
        backId,
        web3Provider,
        signer,

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
