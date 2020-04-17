import React from 'react';
import { Route } from 'react-router-dom';
import StaticData from './StaticData.js';
import UserData from './UserData.js';
import '../styles/App.css';
import HomeHeader from './HomeHeader.js';
import SideDrawer from './SideDrawer/SideDrawer.js'


class App extends React.Component {

  render() {
    return (
      <div id='body'>
        {/* anything static to the page will go here */}
        <div id='header' >
          <HomeHeader />
          
        </div>
        
        <div>
        <SideDrawer/>
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
