import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactDOM from'react-dom'



class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.updateTime = props.updateTime || 1000;
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        this.updateTime
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      return (
        <div id="clock">
          <div>{this.state.date.toLocaleTimeString()}</div>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <div>
       <Clock message="Clock Normal"/>
      
    </div>,
    document.getElementById('root')
  );




const HomeHeader = (props) => {
    return (
        <div className="home-header">
            <div className="links">
            {/*<Link to={"/"}>
                <button id="home-button">Home</button>
    </Link>*/}
            <Link to={'/'}>
                <button id="static-button">Static Data</button>
            </Link>
            <Link to={'/user'}>
                <button id="user-button">User Data</button>
            </Link>
            </div>
            <div className="spacer"></div>
            <div className="clock">
                <Clock/>
            </div>
        </div>
    )
}

export default HomeHeader