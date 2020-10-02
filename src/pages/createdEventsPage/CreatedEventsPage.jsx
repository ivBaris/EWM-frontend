import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../util/httpHook";

import EventCard from "../../components/cards/eventCard/EventCard.Component";

import Typography from "@material-ui/core/Typography";
import ownStyles from "../../util/Styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const CreatedEventsPage = () => {
  const classes = ownStyles();
  const userId = useParams().userId;
  const { isLoading, sendRequest } = useHttpClient();
  const [loadCreatedEvents, setLoadCreatedEvents] = useState();

  useEffect(() => {
    const fetchCreatedEvents = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/events/${userId}/created-events`
        );
        setLoadCreatedEvents(responseData.events);
      } catch (err) {}
    };
    fetchCreatedEvents();
  }, [sendRequest, userId]);

  // const deletedEventHandler = (deletedEventId) => {
  //   setLoadCreatedEvents((events) =>
  //     events.filter((event) => event.id !== deletedEventId)
  //   );
  // };

  return (
    <div className="CreatedEventsPage page-inverted">
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
        {loadCreatedEvents && loadCreatedEvents.length} erstellte
        Veranstaltungen
      </Typography>

      {loadCreatedEvents &&
        loadCreatedEvents.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            kategory={event.kategory}
            location={event.location}
            creatorId={event.creatorId}
            date={event.date}
            image={event.image}
            creator={true}
            participant={false}
          />
        ))}
    </div>
  );
};

export default CreatedEventsPage;
