import React from 'react';

class SMSSubMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SMSName: '',
      SMSEmail: '',
      SMSPhoneNum: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [`${name}`]: target.value
    })
  }

  resetForm() {
    this.setState({
      SMSName: '',
      SMSEmail: '',
      SMSPhoneNum: ''
    })
  }

  render() {
    return (

      <form className="sub-menu">
        <label className="sub-menu-content">Name:<input name="SMSName" onChange={this.handleInputChange} value={this.state.SMSName} /></label>
        <label className="sub-menu-content">Email:<input name="SMSEmail" type='email' onChange={this.handleInputChange} value={this.state.SMSEmail} /></label>
        <label className="sub-menu-content">Phone Number:<input name="SMSPhoneNum" onChange={this.handleInputChange} value={this.state.SMSPhoneNum} /></label>
        <input type="submit" className='chart-close' onClick={(event) => { this.props.handleSMS(event, this.state.SMSName, this.state.SMSEmail, this.state.SMSPhoneNum); this.resetForm() }} disabled={(this.state.SMSPhoneNum === '' || this.state.SMSEmail === '' ||  this.SMSName === '') ? true : false}></input>
      </form>

    )
  }
}


export default SMSSubMenu