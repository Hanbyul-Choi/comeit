import isPropValid from "@emotion/is-prop-valid";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Portal } from "common/Portal";
import { Dialog } from "components";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { theme } from "styles/theme";
import App from "./App";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StyleSheetManager
      enableVendorPrefixes
      shouldForwardProp={(propName, elementToRendered) => {
        return typeof elementToRendered === "string" ? isPropValid(propName) : true;
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
            <Portal>
              <Dialog />
            </Portal>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </StyleSheetManager>
  </React.StrictMode>
);
