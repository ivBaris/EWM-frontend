import React from "react";
import Link from "react-router-dom/Link";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./HomeNotLoggedIn.Styles.scss";

const HomeNotLoggedIn = () => {
  return (
    <div className="HomeNotLoggedIn">
      <div className="HomeNotLoggedIn--info">
        <img
          src={require("../../assets/images/Logo.png")}
          alt="event-with-me"
        />
        <Typography className="HomeNotLoggedIn--info-text" variant="body1">
          Erstelle Veranstaltungen wie Geburtstage, Partys, Grillabende,
          Essensverabredungen oder auch Urlaube und füge deine Freunde hinzu
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/auth"
        >
          Plane Los !
        </Button>
      </div>
    </div>
  );
};

export default HomeNotLoggedIn;
