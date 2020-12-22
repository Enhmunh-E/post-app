import React from 'react'
import { LoginComp } from './components/login';
import { Provider } from './Provider/provider';
import { Post } from './components/post';
import { LogOutComp } from './components/logout';
import './App.css'
const App = () => {
  return (
    <Provider>
      <div className="App">
        <LoginComp />
        <LogOutComp />
        <Post />
      </div>
    </Provider>
  );
}

export default App;
