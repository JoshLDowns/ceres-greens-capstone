import React from 'react';

class SMSSubMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          SMSName: null,
          SMSEmail: null,
          SMSPhoneNum: null
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
                <label className="sub-menu-content">Name:<input name="SMSName" onChange={this.handleInputChange} value={this.state.SMSName} /></label>
                <label className="sub-menu-content">Email:<input name="SMSEmail" onChange={this.handleInputChange} value={this.state.SMSEmail} /></label>
                <label className="sub-menu-content">Phone Number:<input name="SMSPhoneNum" onChange={this.handleInputChange} value={this.state.SMSPhoneNum}/></label>
                <input type="submit" value="Submit" className='chart-close'></input>
            </form>

    )
    }
}


export default SMSSubMenu