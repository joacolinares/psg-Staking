import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom';

import "./styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "binance";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThirdwebProvider
        clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
        activeChain={activeChain}
      >
        <ChakraProvider>
          <App/>
        </ChakraProvider>
      </ThirdwebProvider>
    </BrowserRouter>
  </React.StrictMode>
);
