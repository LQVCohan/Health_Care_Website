import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { IntlProvider } from "react-intl";
import App from "./containers/App";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
const locale = navigator.language.split("-")[0];
root.render(
  <QueryClientProvider client={queryClient}>
    <IntlProvider locale={locale}>
      <App />
    </IntlProvider>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
