import React from 'react';

class HumSubMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          humCritLow: null,
          humWarnLow: null,
          humWarnHigh: null,
          humCritHigh: null
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
      }
    
      handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
          [`${name}`]: target.value
        })
        console.log(this.state[`${name}`])
      }
    
    render() {
    return(
      
            <form className="sub-menu">
                <label className="sub-menu-content">Low Critical Hum.:<input name="humCritLow" onChange={this.handleInputChange}/></label>
                <label className="sub-menu-content">Low Warning Hum.:<input name="humWarnLow" onChange={this.handleInputChange}/></label>
                <label className="sub-menu-content">High Warning Hum.:<input name="humWarnHigh" onChange={this.handleInputChange}/></label>
                <label className="sub-menu-content">High Critical Hum.:<input name="humCritHigh" onChange={this.handleInputChange}/></label>
                <input type="submit" className='chart-close'></input>
            </form>

    )
    }
}


export default HumSubMenu