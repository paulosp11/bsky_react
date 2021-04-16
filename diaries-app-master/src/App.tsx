import React from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { GET_AUTH } from "./features/authSlice/authSlice";
import { Login } from "./components/login/login";
import { Routes } from "react-router-dom";
import { SignUp } from "./components/signUp/signup";
import Home from "./components/Home/home";
import { Entry } from "./components/entry/entry";
import { PublicRoute } from "./components/routes/publicRoute";
import { PrivateRoute } from "./components/routes/privateRoute";

const App = () => {
  const auth = useSelector(GET_AUTH);
  const { isAuthenticate } = useSelector(GET_AUTH);
  console.log("auth", auth);

  return (
    <div>
      <Routes>
        <PrivateRoute
          path="/"
          component={Home}
          isAuthenticated={isAuthenticate}
        />
        <PrivateRoute
          path = "/:id/entry"
          component ={Entry}
          isAuthenticated={isAuthenticate}
        />
        <PublicRoute
          path="/login"
          component={Login}
          isAuthenticated={isAuthenticate}
        />
        <PublicRoute
          path="/signUp"
          component={SignUp}
          isAuthenticated={isAuthenticate}
        />
      </Routes>
    </div>
  );
};

export default App