import React from 'react'
import { LoginComp } from './components/login';
import { Provider } from './Provider/provider';
import { Post } from './components/post';
import { LogOutComp } from './components/logout';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css'
const App = () => {
  return (
    <Provider>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/">
              <LoginComp />
            </Route>
            <Route path="/home">
              <LogOutComp />
              <Post />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
