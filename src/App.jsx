import React from 'react'
import { LoginComp } from './components/login'
import { Provider } from './Provider/provider'
import { Post } from './components/post'
import { SignUpComp } from './components/signup'
import { Nav } from './components/nav'
import { NewPostComp } from './components/newpost'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css'
const App = () => {
  return (
    <Provider>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <LoginComp />
                <SignUpComp />
              </div>
            </Route>
            <Route exact path="/home">
              <Nav />
              <Post />
            </Route>  
            <Route exact path="/newpost">
              <NewPostComp/>
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
