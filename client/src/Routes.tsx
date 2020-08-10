import React from "react";
import { Switch, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Note from "./components/Note";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/note/:id">
        <Note />
      </Route>
      <Route path="/">
        <Welcome />
      </Route>
    </Switch>
  );
}
