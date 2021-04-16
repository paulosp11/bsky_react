import React, { FC, lazy, Suspense } from "react";
import "./App.css";
import { Spinner } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./RootReducer";

const Login = lazy(() => import("./Components/LoginComponent/login"));
const Home = lazy(() => import("./Components/HomeComponent/Home"));

const App: FC = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Suspense fallback={<Spinner animation="grow" />}>
              {isLoggedIn ? <Home /> : <Login />}
            </Suspense>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
