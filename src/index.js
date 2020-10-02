import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
// import * as serviceWorker from "./serviceWorker";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#b0cac7",
      main: "#318fb5",
      textPrimary: "#fff",
      dark: "#00416d",
    },
    secondary: {
      light: "#0066ff",
      main: "#ce1126",
      textPrimary: "#fff",
    },
    error: {
      main: "#ce1126",
      textPrimary: "#fff",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: "Nunito Sans",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

export default theme;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
registerServiceWorker();

// function createIndexedDB() {
//   if (!("indexedDB" in window)) {
//     return null;
//   }
//   return idb.open("dashboardr", 1, function (upgradeDb) {
//     if (!upgradeDb.objectStoreNames.contains("events")) {
//       const eventsOS = upgradeDb.createObjectStore("events", { keyPath: "id" });
//     }
//   });
// }

// const dbPromise = createIndexedDB();
