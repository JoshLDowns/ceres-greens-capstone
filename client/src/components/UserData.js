import React from 'react'
import CalendarSelect from './CalendarSelect.js'
import set from 'date-fns/set'
import format from 'date-fns/format'
import setHours from 'date-fns/setHours'
import { Line } from 'react-chartjs-2'
import TimeWheel from './TimeWheel.js'
import SensorWheel from './SensorWheel.js'
import MeasurementRadio from './MeasurementRadio.js'

class UserData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: undefined,
            endDate: undefined,
            startTime: undefined,
            endTime: undefined,
            query: undefined,
            data: undefined,
            measurement: '',
            sensor: undefined,
            chart: false
        }
    }

    submitQuery = () => {
        let tempXAr;
        let tempYAr;
        let queryString = this.buildQueryString()
        let queryObj = {
            sensor: `Sensor ${this.state.sensor[6]}${this.state.sensor[7] ? this.state.sensor[7] : ''}`,
            measurement: `${this.state.measurement[0].toUpperCase()}${this.state.measurement.slice(1)}`,
            x: [],
            y: []
        }
        fetch('/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ queryString: queryString, sensor: `${this.state.sensor}`, measurement: `${this.state.measurement}` })
        }).then(res => res.json()).then((obj) => {
            obj.forEach((item) => {
                queryObj.x.push(format(new Date(item['_time']), 'MM/dd/yyyy HH:mm:ss'))
                queryObj.y.push(item['_value'])
            })
            if (queryObj.x.length > 2016) {

            } else if (queryObj.x.length > 288) {

            } else if (queryObj.x.length > 24) {
                
            } else {
                this.setState({
                    data: queryObj,
                    chartModal: true
                })
            }
        })
    }

    handleRadio = (event) => {
        this.setState({
            measurement: event.target.value
        })
    }

    handleStartDayClick = (day, modifiers = {}) => {
        if (modifiers.disabled) {
            return;
        }
        this.setState({
            startDate: modifiers.selected ? undefined : day,
        });
    }

    handleEndDayClick = (day, modifiers = {}) => {
        if (modifiers.disabled) {
            return;
        }
        this.setState({
            endDate: modifiers.selected ? undefined : day,
        });
    }

    handleStartTimeClick = (event) => {
        this.setState({
            startTime: event.target.id
        })
    }

    handleEndTimeClick = (event) => {
        this.setState({
            endTime: event.target.id
        })
    }

    handleSensorClick = (event) => {
        this.setState({
            sensor: event.target.id
        })
    }

    closeModal = () => {
        this.setState({
            chartModal: false
        })
    }

    buildQueryString = () => {
        let startDate = this.state.startDate;
        let endDate = this.state.endDate;
        let startTime = this.state.startTime;
        let endTime = this.state.endTime;

        let string = `start: ${format(set(startDate, { hours: parseInt(startTime.slice(6)) }), "yyyy-MM-dd'T'HH:mm:ss")}Z, stop: ${format(set(endDate, { hours: parseInt(endTime.slice(4)) }), "yyyy-MM-dd'T'HH:mm:ss")}Z`
        console.log(string)
        return string
    }

    componentDidMount() {
        let date = new Date()
        this.setState({
            startDate: date,
            endDate: date
        })
    }

    render() {
        return (
            <div id='user'>
                <div id='query-form'>
                    <div id='query-params'>
                        <div id='query-dates' className='query-field'>
                            <p>Start Date: {this.state.startDate && (this.state.startDate).toLocaleDateString()}</p>
                            <p>End Date: {this.state.endDate && (this.state.endDate).toLocaleDateString()}</p>
                        </div>
                        <div id='query-times' className='query-field'>
                            <p>Start Time: {this.state.startTime && format(setHours(new Date(), parseFloat(this.state.startTime.slice(6))), 'hh a')}</p>
                            <p>End Time: {this.state.endTime && format(setHours(new Date(), parseFloat(this.state.endTime.slice(4))), 'hh a')}</p>
                        </div>
                        <div id='query-measurements' className='query-field'>
                            <p>Sensor: {this.state.sensor}</p>
                            <p>Measurement: {this.state.measurement}</p>
                        </div>
                        <button onClick={this.submitQuery}>Submit</button>
                    </div>
                    <div id='calendar-time'>
                        <div id='range-start' className='cal-time'>
                            <h2>Start Date</h2>
                            <CalendarSelect handleDayClick={this.handleStartDayClick} disabled={[{ after: new Date }]} />
                            <TimeWheel period='start' handleClick={this.handleStartTimeClick} />
                        </div>
                        <div id='range-start' className='cal-time'>
                            <h2>End Date</h2>
                            <CalendarSelect handleDayClick={this.handleEndDayClick} disabled={[{ before: this.state.startDate, after: new Date }]} />
                            <TimeWheel period='end' handleClick={this.handleEndTimeClick} />
                        </div>
                    </div>
                    <div id='form-measurements'>
                        <SensorWheel handleClick={this.handleSensorClick} />
                        <MeasurementRadio handleRadio={this.handleRadio} option={this.state.measurement} />
                    </div>
                </div>
                <div id='test-query'>
                    {this.state.chartModal && <ChartModal data={this.state.data} closeModal={this.closeModal} />}
                </div>
            </div >
        )
    }
}

function ChartModal(props) {

    return (
        <div id='chart-modal'>
            <Line options={{ responsive: true }} data={{ labels: props.data.x, datasets: [{ label: `${props.data.sensor}: ${props.data.measurement}`, backgroundColor: "slategrey", data: props.data.y }] }} />
            <button onClick={props.closeModal}>Close</button>
        </div>
    )
}

export default UserData
