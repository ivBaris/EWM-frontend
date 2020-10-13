import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./util/authHook";

import Navigation from "./components/navigation/Navigation.Component";
import StartPage from "./pages/startPage/StartPage";
import AuthPage from "./pages/auth/AuthPage";
import EventPage from "./pages/eventPage/EventPage";
import NewEventPage from "./pages/newEventPage/NewEventPage";
import UpdateEventPage from "./pages/updateEventPage/UpdateEventPage";
import EventDetailPage from "./pages/eventDetailPage/EventDetailPage";
import FriendsPage from "./pages/friendsPage/FriendsPage";
import Header from "./components/header/Header.Component";
import CreatedEventsPage from "./pages/createdEventsPage/CreatedEventsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ParticipationPage from "./pages/participationPage/ParticipationPage";
import aboutPage from "./pages/aboutPage/aboutPage";

import "./App.css";

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact component={StartPage} />
        <Route path="/:userId/profile" exact component={ProfilePage} />
        <Route path="/:userId/my-events" exact component={CreatedEventsPage} />
        <Route path="/:userId/friends" exact component={FriendsPage} />
        <Route path={`/event/new`} exact component={NewEventPage} />
        <Route path={`/about`} exact component={aboutPage} />
        <Route
          path={`/event/:eventId/update`}
          exact
          component={UpdateEventPage}
        />
        <Route path="/:userId/events" exact component={EventPage} />
        <Route path="/event/:eventId" exact component={EventDetailPage} />
        <Route
          path="/:userId/participation"
          exact
          component={ParticipationPage}
        />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={StartPage} />
        <Route path="/auth" exact component={AuthPage} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <Header></Header>
        <main>{routes}</main>
        <Navigation />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
