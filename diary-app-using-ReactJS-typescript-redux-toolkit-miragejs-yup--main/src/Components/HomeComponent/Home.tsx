import React from "react";
import { Route, Switch } from "react-router-dom";
import DiaryMain from "../DiaryComponents/Diary";
import DiaryEntries from "../DiaryComponents/DiaryEntries";
import Editor from "../DiaryComponents/Editor";

const Home = () => {
  return (
    <div style={{ height: "80vh" }}>
      <div className="d-flex align-items-start">
        <DiaryMain />
        <Editor />
      </div>
      <div>
        <Switch>
          <Route path="/diaries/:id">
            <DiaryEntries />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Home;
