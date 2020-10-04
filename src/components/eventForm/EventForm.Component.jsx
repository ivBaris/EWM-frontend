import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useHttpClient } from "../../util/httpHook";

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
import ownStyles from "../../util/Styles";

const EventForm = () => {
  const classes = ownStyles();

  const { register, handleSubmit, setValue, errors } = useForm();
  const [category, setCategory] = useState("");
  const [loadedFriends, setLoadedFriends] = useState();
  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now() - 0 * 24 * 60 * 60 * 1000)
  );
  const { error, sendRequest } = useHttpClient();
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

  const registerBackgroundSync = async () => {
    const registration = await navigator.serviceWorker.ready;

    await registration.sync.register("addEvent");
    console.log("background sync");
  };

  const addEvent = async (event) => {
    // try {
    //   await sendRequest(
    //     process.env.REACT_APP_BACKEND_URL + "/events",
    //     "POST",
    //     JSON.stringify({
    //       title: event.title,
    //       description: event.description,
    //       category: event.category,
    //       location: event.location,
    //       date: event.date,
    //       creatorId: auth.userId,
    //       image: event.image,
    //       potParticipants: event.potParticipants,
    //     }),
    //     {
    //       "Content-Type": "application/json",
    //     }
    //   );
    //   history.push(`/${auth.userId}/profile`);
    // } catch (err) {}
    setIsHereLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: event.title,
            description: event.description,
            category: event.category,
            location: event.location,
            date: event.date,
            creatorId: auth.userId,
            image: event.image,
            potParticipants: event.potParticipants,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsHereLoading(false);
      history.push(`/${auth.userId}/profile`);
    } catch (err) {
      setIsHereLoading(false);
      setErrorMessage(err.message || "Something went wrong, please try again.");
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
          inputRef={register({ required: true, maxLength: 200 })}
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
