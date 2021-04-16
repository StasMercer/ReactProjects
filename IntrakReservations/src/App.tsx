import React, { useContext } from "react";

import "./App.css";
import { Main } from "./components/Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import { Context } from "./utils/store";

function App() {
  const {state} = useContext(Context)
  
  
  return (
    
      <Router basename='/frontend'>
        <Switch>
          <Route path='/'>
            {state.token ? <Main /> : <Login />}
          </Route>
        </Switch>
      </Router>
    
  );
}

export default App;
