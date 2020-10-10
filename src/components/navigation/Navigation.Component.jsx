import React, { useState, useContext, useEffect } from "react";
import Link from "react-router-dom/Link";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import EventIcon from "@material-ui/icons/Event";

import "./Navigation.Style.scss";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    zIndex: "1",
    bottom: "0",
    background: "##318fb5",
  },
});

const Navigation = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(0);
  }, [auth.logout]);

  return (
    <div className="navi">
      {auth.isLoggedIn && (
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            label="Profil"
            icon={<PersonIcon />}
            component={Link}
            to={`/${auth.userId}/profile`}
          />
          <BottomNavigationAction
            label="Events"
            icon={<EventIcon />}
            component={Link}
            to={`/${auth.userId}/events`}
          />
          <BottomNavigationAction
            label="Logout"
            icon={<ExitToAppIcon />}
            onClick={auth.logout}
          />
        </BottomNavigation>
      )}
    </div>
  );
};

export default withRouter(Navigation);
