import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../util/httpHook";

import EventCard from "../../components/cards/eventCard/EventCard.Component";

import Typography from "@material-ui/core/Typography";
import ownStyles from "../../Styles/Styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const ParticipationPage = () => {
  const classes = ownStyles();
  const userId = useParams().userId;
  const { isLoading, sendRequest } = useHttpClient();
  const [loadParticipateEvents, setLoadParticipateEvents] = useState();

  useEffect(() => {
    const fetchParticipateEvents = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/events/${userId}/participant`
        );
        setLoadParticipateEvents(responseData.participateEvents);
      } catch (err) {}
    };
    fetchParticipateEvents();
  }, [sendRequest, userId]);

  return (
    <div className="ParticipationPage page-inverted">
      {isLoading && (
        <div className="loading-modal">
          <CircularProgress />
        </div>
      )}
      <Typography
        gutterBottom
        variant="body1"
        color="primary"
        className={classes.EventCounter}
        component="h6"
      >
        Teilnahme an {loadParticipateEvents && loadParticipateEvents.length}{" "}
        Veranstaltungen
      </Typography>

      {loadParticipateEvents &&
        loadParticipateEvents.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            kategory={event.kategory}
            location={event.location}
            creatorId={event.creatorId}
            date={event.date}
            image={event.image}
            creator={false}
            participant={true}
          />
        ))}
    </div>
  );
};

export default ParticipationPage;
