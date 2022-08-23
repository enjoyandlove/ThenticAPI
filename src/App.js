import React from 'react';
import './App.css';

import {
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import Mint from './components/Mint';
import CreateNFT from './components/CreateNFT';
import Transfer from './components/Transfer';

const App = () => {

  return (
    <div className="App">
      <div className="menu">
        <ul>
          <li> <Link to="/">CreateNFT</Link> </li>
          <li> <Link to="/transfer">Transfer</Link> </li>
          <li> <Link to="/mint">Mint</Link> </li>
        </ul>
      </div>
      <div className="App-intro">
        <Switch>
          <Route exact path="/"><CreateNFT /></Route>
          <Route path="/transfer"><Transfer /></Route>
          <Route path="/mint"><Mint /></Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
