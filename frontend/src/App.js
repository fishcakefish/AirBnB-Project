import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from "./components/SpotsIndex";
import SpotShow from "./components/SpotsShow";
import SpotCreate from "./components/SpotsCreate";
import SpotCurrent from "./components/SpotsCurrent";
import SpotEditGet from "./components/SpotsEdit/SpotsEditGet";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
      <Switch>
        <Route exact path='/'>
          <SpotIndex />
        </Route>
        <Route path='/spots/current'>
          <SpotCurrent />
        </Route>
        <Route path='/spots/create'>
          <SpotCreate />
        </Route>
        <Route exact path='/spots/:spotId'>
          <SpotShow />
        </Route>
        <Route exact path='/spots/edit/:spotId'>
          <SpotEditGet />
        </Route>
      </Switch>}
    </>
  );
}

export default App;
