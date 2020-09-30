import React, { useContext } from "react";
import Link from "react-router-dom/Link";
import { AuthContext } from "../../context/AuthContext";

import Button from "@material-ui/core/Button";

import "./HomeLoggedIn.Styles.scss";

const HomeLoggedIn = () => {
  const auth = useContext(AuthContext);
  return (
    <div className="HomeLoggedIn">
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/`}
        size="large"
      >
        Über Uns
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        component={Link}
        to={`/${auth.userId}/profile`}
      >
        Zum Profil
      </Button>
    </div>
  );
};

export default HomeLoggedIn;
