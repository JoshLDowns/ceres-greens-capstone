import React from 'react';
import { Route } from 'react-router-dom';
import StaticData from './StaticData.js';
import UserData from './UserData.js';
import '../styles/App.css';
import HomeHeader from './HomeHeader.js';
import SideDrawer from './SideDrawer/SideDrawer.js'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      ranges: {}
    }
  }

  handleSubmit = (event, critLow, warnLow, norm, warnHigh, zone=false) => {
    event.preventDefault()
    let range = zone ? `${zone}${event.target.id}` : event.target.id;
    let rangeObj = {
      criticalLow: critLow,
      warningLow: warnLow,
      normal: norm,
      warningHigh: warnHigh
    }
    fetch((`/changeRanges:${range}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({update: rangeObj})
    }).then(res=>res.json()).then((object) => {
      this.setState({
        ranges: object.ranges
      })
    })
  }

  handleSMSSubmit = (event, name, email, number) => {
    event.preventDefault()
    let smsObject = {
      name: name,
      email: email,
      number: number
    }
    fetch('/changeSMS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({newSMS: smsObject})
    }).then(res=>res.json()).then((object) => {
      this.setState({
        smsData: object.numbers
      })
    })
  }

  componentDidMount() {
    fetch('/getRanges').then(res => res.json()).then((obj) => {
        this.setState({
            ranges: obj
        })
    })
  }

  render() {
    return (
      <div id='body'>
        {/* anything static to the page will go here */}
        <div id='header' >
          <HomeHeader />
          
        </div>
        
        <div>
        <SideDrawer handleSubmit={this.handleSubmit} handleSMS={this.handleSMSSubmit}/>
          <Route exact path='/' >
            <UserData ranges={this.state.ranges}/>
          </Route>
          <Route exact path='/static' >
            <StaticData ranges={this.state.ranges}/>
          </Route>
        </div>
      </div>
    );
  }
}

export default App;
