import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { GithubProvider } from "./githubContext";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <GithubProvider>
      <App />
    </GithubProvider>
  </StrictMode>,
  rootElement
);
