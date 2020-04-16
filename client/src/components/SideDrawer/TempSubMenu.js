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
    
        
        
      }
    
    render() {
    return(
      
            <form className="sub-menu">
                <label className="sub-menu-content">Low Critical Temp.:<input name="tempCritLow" onChange={this.handleInputChange}/></label>
                <label className="sub-menu-content">Low Warning Temp.:<input name="tempWarnLow" onChange={this.handleInputChange}/></label>
                <label className="sub-menu-content">High Warning Temp.:<input name="tempWarnHigh" onChange={this.handleInputChange}/></label>
                <label className="sub-menu-content">High Critical Temp.:<input name="tempCritHigh" onChange={this.handleInputChange}/></label>
                <input type="submit"></input>
            </form>

    )
    }
}


export default TempSubMenu