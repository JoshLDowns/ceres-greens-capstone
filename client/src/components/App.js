import React from 'react';
import { Route } from 'react-router-dom';
import StaticData from './StaticData.js';
import UserData from './UserData.js';
import '../styles/App.css';

class App extends React.Component {

  render() {

    return (
      <div id='body'>
        {/* anything static to the page will go here */}
        <h1>I'm The Landing Page!</h1>
        <div>
          <Route exact path='/' >
            <StaticData />
          </Route>
          <Route exact path='/user' >
            <UserData />
          </Route>
        </div>
      </div>
    );
  }
}

export default App;
