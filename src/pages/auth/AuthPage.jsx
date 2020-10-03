import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { useHttpClient } from "../../util/httpHook";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LinkTag from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import "./AuthPage.scss";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const handleAuthMode = () => {
    if (isLoginMode) {
      setIsLoginMode(false);
    } else {
      setIsLoginMode(true);
    }
  };

  const onSubmit = async (user) => {
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/login",
          "POST",
          JSON.stringify({
            email: user.email,
            password: user.password,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/signup",
          "POST",
          JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  return (
    <div className="AuthPage">
      {error && (
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
      )}
      {isLoading && (
        <div className="loading-modal">
          <CircularProgress />
        </div>
      )}
      <Typography component="h1" variant="h5" color="primary">
        {isLoginMode ? "Einloggen" : "Registrieren"}
      </Typography>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        {!isLoginMode && (
          <TextField
            id="profile-name"
            label="Name"
            name="name"
            inputRef={register({ required: true, minLength: 2 })}
            error={errors.name}
            helperText={
              errors.name &&
              "Der Name muss aus mindestens zwei Buchstaben bestehen"
            }
          />
        )}
        <TextField
          id="profile-email"
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
        <TextField
          id="profile-passwort"
          label="Passwort"
          name="password"
          type="password"
          inputRef={register({ required: true, minLength: 6 })}
          error={errors.password}
          helperText={
            errors.password && "Das Passwot muss mindestens 7 Zeichen enthalten"
          }
        />

        <Button type="submit" variant="contained" color="primary">
          {isLoginMode ? "Einloggen" : "Registrieren"}
        </Button>
        <Grid container>
          <Grid item>
            <LinkTag variant="body2" onClick={handleAuthMode}>
              {isLoginMode
                ? "Noch kein account? Registrieren"
                : "Bereits Registriert? Login"}
            </LinkTag>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AuthPage;
