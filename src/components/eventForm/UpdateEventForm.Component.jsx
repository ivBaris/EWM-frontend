import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useHttpClient } from "../../util/httpHook";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import "date-fns";
import CircularProgress from "@material-ui/core/CircularProgress";
import DateFnsUtils from "@date-io/date-fns";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import ownStyles from "../../util/Styles";

const UpdateEventForm = () => {
  const classes = ownStyles();

  const { register, handleSubmit, errors } = useForm();
  const [loadedEvent, setLoadedEvent] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const eventId = useParams().eventId;

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/events/event/${eventId}`
        );
        setLoadedEvent(responseData.event);
      } catch (err) {}
    };
    fetchEvent();
  }, [sendRequest, eventId]);

  const history = useHistory();
  const onSubmit = async (event) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/events/event/${eventId}/edit`,
        "PATCH",
        JSON.stringify({
          title: event.title,
          description: event.description,
          date: event.date,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push(`/${auth.userId}/profile`);
    } catch (err) {}
  };

  return (
    <div className={classes.EventForm}>
      {isLoading && (
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
        Veranstaltung bearbeiten
      </Typography>
      {loadedEvent && (
        <form
          autoComplete="off"
          className={classes.Form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            className={classes.FieldMargin}
            id="event-name"
            name="title"
            label="Name des Events"
            inputRef={register({ required: true, minLength: 3, maxLength: 20 })}
            error={errors.title}
            helperText={errors.title && "Name des Events min=3 max=20"}
            defaultValue={loadedEvent.title}
          />
          <MuiPickersUtilsProvider
            className={classes.FieldMargin}
            utils={DateFnsUtils}
          >
            <KeyboardDatePicker
              disablePast={Date.now()}
              className={classes.FieldMargin}
              margin="normal"
              name="date"
              inputRef={register({ required: true })}
              id="date-picker-dialog"
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
            defaultValue={loadedEvent.description}
            helperText={
              errors.description &&
              "Bitte eine Beschreibung angeben max 200 Wörter"
            }
          />
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
              Speichern
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateEventForm;
