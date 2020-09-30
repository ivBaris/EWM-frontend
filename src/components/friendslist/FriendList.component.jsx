import React from "react";
import List from "@material-ui/core/List";
import UserCard from "../cards/userCard/UserCard.Component";

const FriendsList = ({ items }) => {
  return (
    <List>
      {items.friends.map((friend) => (
        <li key={friend._id}>
          <UserCard
            key={friend._id}
            id={friend._id}
            name={friend.name}
            email={friend.email}
          />
        </li>
      ))}
    </List>
  );
};

export default FriendsList;
