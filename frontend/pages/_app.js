import "../styles/globals.css";
import { AppProvider } from "../utils/context";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createClient, WagmiConfig, goerli } from "wagmi";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My Wallet",
  chains,
});

const wagmiclient = createClient({
  provider,
  connectors,
  webSocketProvider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiclient}>
      <RainbowKitProvider chains={chains} modalSize="compact">
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
