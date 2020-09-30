import React from "react";
import Link from "react-router-dom/Link";

import Button from "@material-ui/core/Button";

import "./Header.Styles.scss";

const Header = (props) => {
  return (
    <div className="header">
      <div className="header--logo">
        <Button color="inherit" component={Link} to="/">
          <img
            src={require("../../assets/images/Logo.png")}
            alt="event-with-me"
          />
        </Button>
      </div>
    </div>
  );
};

export default Header;
