import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../../util/httpHook";
import { useParams } from "react-router-dom";

import ownStyles from "../../../util/Styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";

import "./EventCard.Styles.scss";

const EventCard = (props) => {
  const classes = ownStyles();
  const { isLoading, sendRequest, error } = useHttpClient();
  const [loggedInUserName, setLoggedInUserName] = useState();
  const [participationSuccess, setParticipationSuccess] = useState(false);
  const [rmParticipationSuccess, setRmParticipationSuccess] = useState(false);
  const [deletionSuccess, setDeletionSuccess] = useState(false);
  const userId = useParams().userId;

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${props.creatorId}`
        );

        setLoggedInUserName(responseData.user.name);
      } catch (err) {}
    };
    fetchUserName();
  }, [sendRequest, props.creatorId]);

  const participateOnEvent = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/events/event/${props.id}`,
        "PUT",
        JSON.stringify({
          participants: userId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setParticipationSuccess(true);
    } catch (err) {}
  };

  const removeParticipation = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/events/event/${props.id}`,
        "PATCH",
        JSON.stringify({
          participants: userId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setRmParticipationSuccess(true);
    } catch (err) {}
  };

  const eventDeleteHandler = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/events/event/${props.id}`,
        "DELETE"
      );
      setDeletionSuccess(true);
    } catch (err) {}
  };

  return (
    <div className="event-card">
      {isLoading && (
        <div className="loading-modal">
          <CircularProgress />
        </div>
      )}
      <Card className={classes.CardWrapper}>
        <CardActionArea component={Link} to={`/event/${props.id}`}>
          <div className={classes.CardAction}>
            <CardMedia
              className={classes.CardMedia}
              image={props.image}
              title="Contemplative Reptile"
            />
            <CardContent className={classes.CardContent}>
              <Typography gutterBottom variant="h6" component="h6">
                {props.title}
              </Typography>
              <div className="event-card__info">
                <div className="event-card__info--date">
                  <p className="event-card__info--title">Datum:</p>
                  <p className="event-card__info--value">{props.date}</p>
                </div>
                <div className="event-card__info--location">
                  <p className="event-card__info--title">Ort:</p>
                  <p className="event-card__info--value">{props.location}</p>
                </div>
                <div className="event-card__info--user">
                  <p className="event-card__info--user-title">Erstellt von</p>
                  <p className="event-card__info--user-value">
                    {loggedInUserName && loggedInUserName}
                  </p>
                </div>
              </div>
            </CardContent>
          </div>
        </CardActionArea>
        {rmParticipationSuccess && (
          <Alert severity="success">
            Veranstaltungs Teilnahme zurück genommen
          </Alert>
        )}
        {participationSuccess && (
          <Alert severity="success">
            Teilnahme an Veranstaltung erfolgreich
          </Alert>
        )}
        {error && (
          <Alert severity="warning">
            Offline ist diese funktion nicht Möglich
          </Alert>
        )}
        {deletionSuccess && (
          <Alert severity="success">Veranstaltung wurde gelöscht</Alert>
        )}
        {!props.creator ? (
          props.participant ? (
            <CardActions>
              <Button
                size="small"
                color="primary.dark"
                startIcon={<NotInterestedIcon />}
                onClick={removeParticipation}
                disabled={rmParticipationSuccess}
              >
                Ablehnen
              </Button>
            </CardActions>
          ) : (
            <CardActions>
              <Button
                size="small"
                color="primary"
                startIcon={<FavoriteIcon />}
                onClick={participateOnEvent}
                disabled={participationSuccess}
              >
                Teilnehmen
              </Button>
            </CardActions>
          )
        ) : (
          <CardActions>
            <Button
              disabled={deletionSuccess}
              size="small"
              startIcon={<EditIcon />}
              component={Link}
              to={`/event/${props.id}/update`}
            >
              Bearbeiten
            </Button>
            <Button
              disabled={deletionSuccess}
              size="small"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={eventDeleteHandler}
            >
              Löschen
            </Button>
          </CardActions>
        )}
      </Card>
    </div>
  );
};

export default EventCard;
