import React from 'react';

class PHSubMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          pHCritLow: null,
          pHWarnLow: null,
          pHWarnHigh: null,
          pHCritHigh: null, 
          zone: undefined
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
                <label className="sub-menu-content">Low Critical pH:<input name="pHCritLow" onChange={this.handleInputChange}/></label>
                <label className="sub-menu-content">Low Warning pH:<input name="pHWarnLow" onChange={this.handleInputChange}/></label>
                <label className="sub-menu-content">High Warning pH:<input name="pHWarnHigh" onChange={this.handleInputChange}/></label>
                <label className="sub-menu-content">High Critical pH:<input name="pHCritHigh" onChange={this.handleInputChange}/></label>
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
                <input type="submit" value="Submit" className='chart-close'></input>
            </form>

    )
    }
}


export default PHSubMenu