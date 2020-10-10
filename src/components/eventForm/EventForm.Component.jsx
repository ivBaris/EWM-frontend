import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useHttpClient } from "../../util/httpHook";
import axios from "axios";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import "date-fns";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import DateFnsUtils from "@date-io/date-fns";
import CloseIcon from "@material-ui/icons/Close";
import CategorySelector from "../../components/categorySelector/CategorySelector.Component";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import ownStyles from "../../Styles/Styles";

const EventForm = () => {
  const classes = ownStyles();

  const { register, handleSubmit, setValue, errors } = useForm();
  const [category, setCategory] = useState("");
  const [loadedFriends, setLoadedFriends] = useState();
  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now() - 0 * 24 * 60 * 60 * 1000)
  );
  const { sendRequest } = useHttpClient();
  const [isHereLoading, setIsHereLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const auth = useContext(AuthContext);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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

  const handleParticipant = (e, value) => {
    setValue(
      "potParticipants",
      value.map((userId) => {
        return userId._id;
      })
    );
  };

  useEffect(() => {
    setValue("category", category);
  }, [category, setValue]);

  useEffect(() => {
    register("potParticipants");
    register("category");
  }, [register]);

  const history = useHistory();

  const vapidPublicKey =
    "BKkzdu1noK_Q8XSyHQufHi1lBoIw8IOB91HHpN3fjwrPaoIDNnK-NWIfc3OVQxX_D-fnc2B6cx7Cu8X1q0pe0tI";

  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);

    const base64 = (base64String + padding) // eslint-disable-next-line
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  const notificationHandler = async (title) => {
    await Notification.requestPermission(function (status) {
      console.log("Notification permission status:", status);

      if (status === "granted") {
        navigator.serviceWorker.ready.then((registration) => {
          if (!registration.pushManager) {
            alert("Du wirst nicht benachrichtigt werden");
            return;
          }
          console.log("bin hier");
          registration.pushManager
            .subscribe({
              userVisibleOnly: true, //Always display notifications
              applicationServerKey: convertedVapidKey,
            })
            .then((subscription) =>
              axios.post(`${process.env.REACT_APP_BACKEND_URL}/events/notify`, {
                title,
                subscription,
              })
            )
            .catch((err) => console.error("Push subscription error: ", err));
        });
      }
    });
  };

  const addEvent = async (event) => {
    setIsHereLoading(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/events`;
    try {
      await axios.post(url, {
        title: event.title,
        description: event.description,
        category: event.category,
        location: event.location,
        date: event.date,
        creatorId: auth.userId,
        image: event.image,
        potParticipants: event.potParticipants,
      });
      setIsHereLoading(false);
      notificationHandler(event.title);
      history.push(`/${auth.userId}/profile`);
    } catch (err) {
      setIsHereLoading(false);
      // notificationHandler(event.title);
      setErrorMessage(err.message || "Ein Problem ist aufgetreten");
    }
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <div className={classes.EventForm}>
      {isHereLoading && (
        <div className="loading-modal">
          <CircularProgress />
        </div>
      )}
      <Typography
        className={classes.EventFormTitle}
        component="h5"
        variant="h5"
        color="primary"
      >
        Neues Event
      </Typography>
      <form
        key="addEvent"
        id="addEvent"
        autoComplete="off"
        className={classes.Form}
        onSubmit={handleSubmit(addEvent)}
      >
        <TextField
          className={classes.FieldMargin}
          id="event-name"
          name="title"
          label="Name des Events"
          inputRef={register({ required: true, minLength: 3, maxLength: 20 })}
          error={errors.title}
          helperText={errors.title && "Name des Events min=3 max=20"}
        />
        <TextField
          className={classes.FieldMargin}
          id="event-location"
          name="location"
          label="Standort"
          inputRef={register({ required: true, minLength: 3, maxLength: 20 })}
          error={errors.location}
          helperText={errors.location && "Bitte Standort angeben"}
        />
        <MuiPickersUtilsProvider
          className={classes.FieldMargin}
          utils={DateFnsUtils}
        >
          <KeyboardDatePicker
            disablePast={true}
            className={classes.FieldMargin}
            margin="normal"
            name="date"
            inputRef={register({ required: true })}
            id="date-picker-dialog"
            label="Date picker dialog"
            format="dd/MM/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <TextField
          className={classes.FieldMargin}
          id="event-description"
          label="Beschreibung"
          name="description"
          inputRef={register({ required: true, minLength: 6, maxLength: 200 })}
          multiline
          rows={5}
          rowsMax={5}
          variant="outlined"
          error={errors.description}
          helperText={
            errors.description &&
            "Bitte eine Beschreibung angeben max 200 Wörter"
          }
        />
        <CategorySelector value={category} setCategory={setCategory} />
        <Autocomplete
          name="availableParticipants"
          onChange={handleParticipant}
          className={classes.FieldMargin}
          multiple
          id="checkboxes-tags-demo"
          options={loadedFriends ? loadedFriends.friends : ""}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                checked={selected}
              />
              {option.name}
            </React.Fragment>
          )}
          style={{ color: "red" }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Freunde"
              placeholder="Freunde"
            />
          )}
        />
        {errorMessage && (
          <div>
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
              {errorMessage}
            </Alert>
            <Alert
              severity="info"
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
              Falls Sie Chrome Verwenden wird ihre Veranstaltong erzeugt sobald
              sie wieder Online sind
            </Alert>
          </div>
        )}
        <div className={classes.ButtonsGrouped}>
          <Button
            component={Link}
            to={`/${auth.userId}/profile`}
            variant="outlined"
            color="primary"
            className={classes.CancelButton}
            startIcon={<CloseIcon />}
          >
            Abbrechen
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.CreateButton}
            startIcon={<AddCircleOutlineIcon />}
          >
            Erstellen
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
