import isPropValid from "@emotion/is-prop-valid";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OverlayProvider } from "components";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "redux/config/configStore";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { theme } from "styles/theme";
import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <StyleSheetManager
    enableVendorPrefixes
    shouldForwardProp={(propName, elementToRendered) => {
      return typeof elementToRendered === "string" ? isPropValid(propName) : true;
    }}
  >
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <OverlayProvider>
              <App />
            </OverlayProvider>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </QueryClientProvider>
  </StyleSheetManager>
  // </React.StrictMode>
);
