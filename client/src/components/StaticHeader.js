import React from 'react'
import ReactDOM from 'react-dom' 
import { Link } from 'react-router-dom'


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

function StaticHeader(props) {
    return (
        
        <div id="static-header">
            <Clock/>
        </div>
    )
}

export default StaticHeader