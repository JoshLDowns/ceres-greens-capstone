import React from 'react'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'


//builds clock and renders it to client
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.updateTime = props.updateTime || 1000;
    this.state = { date: new Date() };
  }

  //sets clock interval on mount
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      this.updateTime
    );
  }

  //clears the interval on unmount
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  //updates clock on interval
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
    <Clock message="Clock Normal" />

  </div>,
  document.getElementById('root')
);



//builds the header bar
const HomeHeader = (props) => {
  return (
    <div className="home-header">
      <div className="links">
        <Link to={'/static'}>
          <button id="static-button">Static Data</button>
        </Link>
        <Link to={'/'}>
          <button id="user-button">User Data</button>
        </Link>
      </div>
      <div className="spacer"></div>
      <div className="clock">
        <Clock />
      </div>
    </div>
  )
}

export default HomeHeader