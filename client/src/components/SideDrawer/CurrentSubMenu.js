import React from 'react';

class CurrentSubMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          CurrentCritLow: null,
          CurrentWarnLow: null,
          CurrentWarnHigh: null,
          CurrentCritHigh: null
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
                <label className="sub-menu-content">Low Critical Current:<input name="currentCritLow" onChange={this.handleInputChange}/></label>
                <label className="sub-menu-content">Low Warning Current:<input name="currentWarnLow" onChange={this.handleInputChange}/></label>
                <label className="sub-menu-content">High Warning Current:<input name="currentWarnHigh" onChange={this.handleInputChange}/></label>
                <label className="sub-menu-content">High Critical Current:<input name="currentCritHigh" onChange={this.handleInputChange}/></label>
                <label className="sub-menu-content">
                    Select Zone:
                    <select>
                        <option>
                            Germination Room
                        </option>
                        <option>
                            Zone 1
                        </option>
                        <option>
                            Zone 2
                        </option>
                        <option>
                            Zone 3
                        </option>
                    </select>
                </label>
                <input type="submit" value="Submit"></input>
            </form>

    )
    }
}


export default CurrentSubMenu