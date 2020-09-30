import React from "react";

import ownStyles from "../../../util/Styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const EventCard = (props) => {
  const classes = ownStyles();

  return (
    <div className="user-card">
      <Card className={classes.CardWrapper}>
        <CardContent className={classes.UserCardContent}>
          <Avatar
            src={"https://robohash.org/" + props.name}
            className={classes.Avatar}
          ></Avatar>
          <div className={classes.UserCardText}>
            <Typography>{props.name}</Typography>
            <Typography>{props.email}</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventCard;
