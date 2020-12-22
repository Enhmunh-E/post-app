import React from 'react'
import { Login } from './components/login';
import { Provider } from './Provider/provider'
import { Post } from './components/post'
import './App.css'
const App = () => {
  return (
    <Provider>
      <div className="App">
        <Login/>
        <Post/>
      </div>
    </Provider>
  );
}

export default App;
