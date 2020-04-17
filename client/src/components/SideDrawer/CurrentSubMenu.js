import React from 'react';

class CurrentSubMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            criticalLow: '',
            warningLow: '',
            normal: '',
            warningHigh: '',
            option: 'germRm'
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOption = this.handleOption.bind(this);
        this.resetForm = this.resetForm.bind(this);
      }
    
      handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
          [`${name}`]: target.value
        })
      }

      handleOption(event) {
          this.setState({
              option: event.target.value
          })
      }

      resetForm() {
        this.setState ({
          criticalLow: '',
          warningLow: '',
          normal: '',
          warningHigh: ''
        })
      }
    
    render() {
    return(
      
            <form className="sub-menu">
                <label className="sub-menu-content">Low Critical EC:<input name="criticalLow" onChange={this.handleInputChange} value={this.state.criticalLow} /></label>
                <label className="sub-menu-content">Low Warning EC:<input name="warningLow" onChange={this.handleInputChange} value={this.state.warningLow} /></label>
                <label className="sub-menu-content">High Warning EC:<input name="normal" onChange={this.handleInputChange} value={this.state.normal} /></label>
                <label className="sub-menu-content">High Critical EC:<input name="warningHigh" onChange={this.handleInputChange} value={this.state.warningHigh} /></label>
                <label className="sub-menu-content">
                    Select Zone:
                    <select onChange={this.handleOption}>
                        <option value='germRm'>
                            Germination Room
                        </option>
                        <option value='zone1'>
                            Zone 1
                        </option>
                        <option value='zone2'>
                            Zone 2
                        </option>
                        <option value='zone3'>
                            Zone 3
                        </option>
                    </select>
                </label>
                <input type="submit" className='chart-close' id='ECRanges' onClick={(event)=>{this.props.handleSubmit(event, this.state.criticalLow, this.state.warningLow, this.state.normal, this.state.warningHigh, this.state.option); this.resetForm()}}></input>
            </form>

    )
    }
}


export default CurrentSubMenu