import React from 'react';

class TempSubMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          tempCritLow: null,
          tempWarnLow: null,
          tempWarnHigh: null,
          tempCritHigh: null
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
                <label className="sub-menu-content">Low Critical Temp.:<input name="tempCritLow" onChange={this.handleInputChange} value={this.state.tempCritLow} /></label>
                <label className="sub-menu-content">Low Warning Temp.:<input name="tempWarnLow" onChange={this.handleInputChange} value={this.state.tempWarnLow} /></label>
                <label className="sub-menu-content">High Warning Temp.:<input name="tempWarnHigh" onChange={this.handleInputChange} value={this.state.tempWarnHigh} /></label>
                <label className="sub-menu-content">High Critical Temp.:<input name="tempCritHigh" onChange={this.handleInputChange} value={this.state.tempCritHigh} /></label>
                <input type="submit" className='chart-close'></input>
            </form>

    )
    }
}


export default TempSubMenu