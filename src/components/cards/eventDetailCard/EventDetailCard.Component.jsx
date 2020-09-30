import React, { useState } from "react";
import ownStyles from "../../../util/Styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
import StarRateOutlinedIcon from "@material-ui/icons/StarRateOutlined";
import GroupIcon from "@material-ui/icons/Group";

import "./EventDetailCard.Styles.scss";

const EventDetailCard = (props) => {
  const classes = ownStyles();
  // eslint-disable-next-line no-unused-vars
  const [loggedInUserName, setLoggedInUserName] = useState();

  return (
    <Card className={classes.CardWrapper} key={1}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            color="primary"
            className={classes.Avatar}
          >
            <StarRateOutlinedIcon />
          </Avatar>
        }
        title={props.title}
        subheader={props.date}
      />
      <CardMedia
        className={classes.EventDetailMedia}
        image={props.image}
        title={props.title}
      />
      <CardContent>
        <div className="information">
          <LocationOnIcon color="primary" />
          <div className="text">
            <Typography gutterBottom variant="body1" component="p">
              Standort
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.location}
            </Typography>
          </div>
        </div>
        <Divider />
        <div className="information">
          <EventOutlinedIcon color="primary" />
          <div className="text">
            <Typography gutterBottom variant="body1" component="p">
              Datum
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.date}
            </Typography>
          </div>
        </div>
        <Divider />
        <div className="information">
          <CategoryOutlinedIcon color="primary" />
          <div className="text">
            <Typography gutterBottom variant="body1" component="p">
              Kategorie
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.category}
            </Typography>
          </div>
        </div>
        <Divider />
        <div className="information">
          <DescriptionOutlinedIcon color="primary" />
          <div className="text">
            <Typography gutterBottom variant="body1" component="p">
              Beschreibung
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.description}
            </Typography>
          </div>
        </div>
        <Divider />
        <div className="information">
          <GroupIcon color="primary" />
          <div className="text">
            <Typography gutterBottom variant="body1" component="p">
              Teilnehmer
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.participants + "/" + props.potParticipants}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventDetailCard;
