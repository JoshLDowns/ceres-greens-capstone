import React from 'react';

class HumSubMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      criticalLow: '',
      warningLow: '',
      normal: '',
      warningHigh: ''
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
      criticalLow: '',
      warningLow: '',
      normal: '',
      warningHigh: ''
    })
  }

  render() {
    return (

      <form className="sub-menu">
        <label className="sub-menu-content">Low Critical Hum.:<input name="criticalLow" onChange={this.handleInputChange} value={this.state.criticalLow} /></label>
        <label className="sub-menu-content">Low Warning Hum.:<input name="warningLow" onChange={this.handleInputChange} value={this.state.warningLow} /></label>
        <label className="sub-menu-content">High Warning Hum.:<input name="normal" onChange={this.handleInputChange} value={this.state.normal} /></label>
        <label className="sub-menu-content">High Critical Hum.:<input name="warningHigh" onChange={this.handleInputChange} value={this.state.warningHigh} /></label>
        <input type="submit" className='chart-close' id='humRanges' onClick={(event) => { this.props.handleSubmit(event, this.state.criticalLow, this.state.warningLow, this.state.normal, this.state.warningHigh); this.resetForm() }}></input>
      </form>

    )
  }
}


export default HumSubMenu