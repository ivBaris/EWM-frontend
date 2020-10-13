import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useHttpClient } from "../../util/httpHook";
import { AuthContext } from "../../context/AuthContext";

import ownStyles from "../../Styles/Styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";

import FriendsList from "../../components/friendslist/FriendList.component";

const FriendsPage = () => {
  const classes = ownStyles();
  const [searchedFriend, setSearchedFriend] = useState(false);
  const [loadedFriends, setLoadedFriends] = useState();
  const { register, handleSubmit, errors } = useForm();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userId}/friends`
        );

        setLoadedFriends(responseData);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, auth.userId]);

  const onSubmit = async (friend) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users//${auth.userId}/friends`,
        "PATCH",
        JSON.stringify({
          email: friend.email,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setSearchedFriend(true);
    } catch (err) {}
  };

  return (
    <div className="FriendsPage page-inverted">
      <form className={classes.Search} onSubmit={handleSubmit(onSubmit)}>
        {searchedFriend ? (
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setSearchedFriend(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Benutzer wurde gefunden
          </Alert>
        ) : (
          ""
        )}{" "}
        {error ? (
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={clearError}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {error}
          </Alert>
        ) : (
          ""
        )}
        <TextField
          id="profile-email"
          className={classes.SearchInput}
          label="E-Mail"
          name="email"
          inputRef={register({
            required: true,
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
            },
          })}
          error={errors.email}
          type="email"
          helperText={errors.email && "Invalide Email Adresse"}
        />
        <Button
          type="submit"
          className={classes.SearchButton}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SearchIcon />}
        >
          Freunde hinzufügen
        </Button>
      </form>

      {/* <FriendsList items={loadedFriends} /> */}
      {!isLoading && loadedFriends && <FriendsList items={loadedFriends} />}
    </div>
  );
};

export default FriendsPage;
