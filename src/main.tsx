import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import App from './App.tsx';
import '@rainbow-me/rainbowkit/styles.css';
import './index.css';

const { chains, publicClient } = configureChains(
  [arbitrum],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Stylus Challenges',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </StrictMode>
);