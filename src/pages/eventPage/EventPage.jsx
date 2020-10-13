import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../util/httpHook";

import EventCard from "../../components/cards/eventCard/EventCard.Component";

import { useParams } from "react-router-dom";
import "./EventPage.scss";
import CategorySelector from "../../components/categorySelector/CategorySelector.Component";
import CircularProgress from "@material-ui/core/CircularProgress";

const EventPage = () => {
  const userId = useParams().userId;
  const [category, setCategory] = useState("");
  const { isLoading, sendRequest } = useHttpClient();
  const [loadPotEvents, setLoadPotEvents] = useState();

  useEffect(() => {
    const fetchPotEvents = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/events/${userId}`
        );
        setLoadPotEvents(responseData.potentialEvents);
      } catch (err) {}
    };
    fetchPotEvents();
  }, [sendRequest, userId]);

  const changeParticipation = (pEventId) => {
    setLoadPotEvents((prevEvents) =>
      prevEvents.filter((event) => event.id === pEventId)
    );
  };

  return (
    <div className="EventPage page-inverted">
      {isLoading && (
        <div className="loading-modal">
          <CircularProgress />
        </div>
      )}
      <CategorySelector setCategory={setCategory} />

      {category !== ""
        ? loadPotEvents &&
          loadPotEvents
            .filter((e) => e.category === category)
            .map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                category={event.category}
                location={event.location}
                creatorId={event.creatorId}
                creator={true}
                participant={false}
                date={event.date}
                image={event.image}
                potParticipants={event.potParticipants.length + 1}
                participants={event.participants.length + 1}
                onDelete={changeParticipation()}
              />
            ))
        : loadPotEvents &&
          loadPotEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              kategory={event.kategory}
              location={event.location}
              creatorId={event.creatorId}
              date={event.date}
              image={event.image}
              potParticipants={event.potParticipants.length + 1}
              participants={event.participants.length + 1}
            />
          ))}
    </div>
  );
};

export default EventPage;
