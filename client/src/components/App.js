import React from 'react';
import { Route, Switch } from 'react-router-dom';
import StaticData from './StaticData.js';
import UserData from './UserData.js';
import '../styles/App.css';
import HomeHeader from './HomeHeader.js';
import SideDrawer from './SideDrawer/SideDrawer.js'
import Backdrop from './Backdrop/Backdrop.js'

class App extends React.Component {
  state = {
    sideDrawerOpen: false
  };
  drawerButtonClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen}
    })
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  }

  render() {
    let sideDrawer = null;
    let backdrop = null;

    if (this.state.sideDrawerOpen) {
      sideDrawer = <SideDrawer />
      backdrop = <Backdrop click={this.backdropClickHandler}/>
    }
    return (
      <div id='body'>
        {/* anything static to the page will go here */}
        <div id='header' >
          <HomeHeader drawerClickHandler={this.drawerButtonClickHandler}/>
        </div>
        
        <div>
          {sideDrawer}
          {backdrop}
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
