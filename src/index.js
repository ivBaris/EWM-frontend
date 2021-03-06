import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

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

registerServiceWorker();
