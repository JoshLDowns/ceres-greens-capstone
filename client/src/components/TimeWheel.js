import React from 'react'
import format from 'date-fns/format'
import setHours from 'date-fns/setHours'

//builds the scrollable time wheels for the query form
class TimeWheel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            start: undefined,
            end: undefined,
            startTime: undefined,
            endTime: undefined,
            times: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
        }
    }

    setTime = (event) => {
        if (this.state.start) {
            this.setState({
                startTime: event.target.id
            })
        } else if (this.state.end) {
            this.setState({
                endTime: event.target.id
            })
        }
    }

    componentDidMount() {
        this.setState({
            start: this.props.start,
            end: this.props.end
        })
    }


    render() {

        return (
            <div className='time-wheel'>
                <div className='wheel-fade-top'></div>
                <div className='time-scroll'>
                    {this.state.times.map((time) => (
                        <div key={time} id={`${this.props.period}-${time}`} className={`time-click ${(this.state.startTime === `${this.props.period}-${time}` && this.state.start) || (this.state.endTime === `${this.props.period}-${time}` && this.state.end) ? 'selected-time' : null}`} onClick={(event) => { this.props.handleClick(event); this.setTime(event); }}>
                            <p>{format(setHours(new Date(), parseFloat(time)), 'hh a')}</p>
                        </div>
                    ))}
                </div>
                <div className='wheel-fade-bottom'></div>
            </div>
        )
    }
}

export default TimeWheel