import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../util/httpHook";

import EventDetailCard from "../../components/cards/eventDetailCard/EventDetailCard.Component";

import CircularProgress from "@material-ui/core/CircularProgress";

const EventDetailPage = (detailId) => {
  const eventId = useParams().eventId;
  const [eventDetail, setEventDetail] = useState();
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchEventById = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/events/event/${eventId}`
        );
        setEventDetail(responseData.event);
      } catch (err) {}
    };
    fetchEventById();
  }, [sendRequest, eventId]);

  return (
    <div className="page">
      {isLoading && (
        <div className="loading-modal">
          <CircularProgress />
        </div>
      )}
      {eventDetail && (
        <EventDetailCard
          id={eventDetail.id}
          title={eventDetail.title}
          category={eventDetail.category}
          location={eventDetail.location}
          createdBy={eventDetail.createdBy}
          date={eventDetail.date}
          image={eventDetail.image}
          potParticipants={eventDetail.potParticipants.length + 1}
          participants={eventDetail.participants.length + 1}
          description={eventDetail.description}
        />
      )}
    </div>
  );
};

export default EventDetailPage;
