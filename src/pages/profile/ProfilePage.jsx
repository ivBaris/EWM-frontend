import React, { useEffect, useState } from "react";
import Link from "react-router-dom/Link";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../util/httpHook";

import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ownStyles from "../../util/Styles";

import UserCard from "../../components/cards/userCard/UserCard.Component";

const ProfilePage = () => {
  const classes = ownStyles();
  const [loggedInUser, setLoggedInUser] = useState();
  const { sendRequest } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`
        );

        setLoggedInUser(responseData);
      } catch (err) {}
    };
    fetchUser();
  }, [sendRequest, userId]);

  return (
    <div className={classes.ProfilePage}>
      {loggedInUser && (
        <UserCard
          key={loggedInUser.user.id}
          id={loggedInUser.user.id}
          name={loggedInUser.user.name}
          email={loggedInUser.user.email}
        />
      )}
      <div className={classes.NavigationButtonsGroup}>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          component={Link}
          to={`/${userId}/my-events`}
          size="large"
        >
          Erstellte Events
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          component={Link}
          to={`/${userId}/participation`}
          size="large"
        >
          Teilnahmen
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          component={Link}
          to={`/${userId}/friends`}
          size="large"
        >
          Freunde
        </Button>
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.ctaButton}
        startIcon={<AddCircleOutlineIcon />}
        size="large"
        component={Link}
        to={`/event/new`}
      >
        Event erstellen
      </Button>
    </div>
  );
};

export default ProfilePage;
