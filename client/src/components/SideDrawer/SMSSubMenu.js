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
    
        
        
      }
    
    render() {
    return(
      
            <form className="sub-menu">
                <label className="sub-menu-content">Name:<input name="SMSName" onChange={this.handleInputChange}/></label>
                <label className="sub-menu-content">Email:<input name="SMSEmail" onChange={this.handleInputChange}/></label>
                <label className="sub-menu-content">Phone Number:<input name="SMSPhoneNum" onChange={this.handleInputChange}/></label>
                <input type="submit" value="Submit"></input>
            </form>

    )
    }
}


export default SMSSubMenu