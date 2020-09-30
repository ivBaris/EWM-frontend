import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import HomeLoggedIn from "../../components/islogin/HomeLoggedIn.Component";
import HomeNotLoggedIn from "../../components/islogin/HomeNotLoggedIn.Component";

import "./StartPage.scss";

const StartPage = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="startpage">
      {auth.isLoggedIn ? <HomeLoggedIn /> : <HomeNotLoggedIn />}
    </div>
  );
};

export default StartPage;
