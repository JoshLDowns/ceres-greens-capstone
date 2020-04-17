import React from 'react'
import CalendarSelect from './CalendarSelect.js'
import set from 'date-fns/set'
import format from 'date-fns/format'
import setHours from 'date-fns/setHours'
import { Line } from 'react-chartjs-2'
import TimeWheel from './TimeWheel.js'
import SensorWheel from './SensorWheel.js'
import MeasurementRadio from './MeasurementRadio.js'
//import isAfter from 'date-fns/isAfter'

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
            allSensorData: undefined,
            prevSensorData: undefined,
            measurement: '',
            sensor: undefined,
            chartModal: false,
            clickChartModal: false,
            ranges: {},
            interval: undefined
        }
    }

    clickQuery = (event) => {
        if (event.target.id.includes('sensor')) {
            let queryObj = {
                sensor: `Sensor ${event.target.id[6]}${event.target.id[7] ? event.target.id[7] : ''}`,
                labels: ['Temperature', 'Humidity'],
                x: [],
                yTemp: [],
                yHum: []
            }
            fetch('/clickQuery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sensor: `${event.target.id}`, type: 'tempHum' })
            }).then(res => res.json()).then((obj) => {
                obj.forEach((item) => {
                    if (item['_field'] === 'temperature') {
                        queryObj.yTemp.push(item['_value'])
                        queryObj.x.push(format(new Date(item['_time']), 'MM/dd/yyyy HH:mm:ss'))
                    } else {
                        queryObj.yHum.push(item['_value'])
                    }
                })
                this.setState({
                    data: queryObj,
                    clickChartModal: true
                })
            })
        } else {
            let queryObj = {
                sensor: event.target.id.includes('zone') ? `Zone ${event.target.id[4]}` : 'Germ Room',
                labels: ['pH', 'EC'],
                x: [],
                ypH: [],
                yEC: []
            }
            fetch('/clickQuery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sensor: `${event.target.id}`, type: 'ECpH' })
            }).then(res => res.json()).then((obj) => {
                obj.forEach((item) => {
                    if (item['_field'] === 'pH') {
                        queryObj.ypH.push(item['_value'])
                        queryObj.x.push(format(new Date(item['_time']), 'MM/dd/yy HH:mm:ss'))
                    } else {
                        queryObj.yEC.push(item['_value'])
                    }
                })
                this.setState({
                    data: queryObj,
                    clickChartModal: true
                })
            })
        }
    }

    submitQuery = () => {
        let tempXAr = [];
        let tempYAr = [];
        let tempYLength;
        let queryString = this.buildQueryString()
        let queryObj = {
            sensor: this.state.sensor.includes('sensor') ? `Sensor ${this.state.sensor[6]}${this.state.sensor[7] ? this.state.sensor[7] : ''}` : this.state.sensor.includes('zone') ? `Zone ${this.state.sensor[4]}` : 'Germ Room',
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
            let newObj = queryObj
            return newObj
        }).then((obj) => {
            let lastDivisor;
            if (obj.x.length > 2016) {
                lastDivisor = obj.x.length % 12
                while (obj.x.length > 0) {
                    tempYLength = obj.y.length;
                    tempYAr.push(parseFloat(((obj.y.splice(0, 12).reduce((a, b) => parseFloat(a) + parseFloat(b))) / (tempYLength >= 12 ? 12 : lastDivisor)).toFixed(2)))
                    tempXAr.push(obj.x.length >= 12 ? obj.x.splice(0, 12)[11] : obj.x.splice(0)[lastDivisor - 1])
                }
                obj.x = tempXAr.map((value) => value)
                obj.y = tempYAr.map((value) => value)
            } else if (obj.x.length > 288) {
                lastDivisor = obj.x.length % 6
                while (obj.x.length > 0) {
                    tempYLength = obj.y.length;
                    tempYAr.push(parseFloat(((obj.y.splice(0, 6).reduce((a, b) => parseFloat(a) + parseFloat(b))) / (tempYLength >= 6 ? 6 : lastDivisor)).toFixed(2)))
                    tempXAr.push(obj.x.length >= 6 ? obj.x.splice(0, 6)[5] : obj.x.splice(0)[lastDivisor - 1])
                }
                obj.x = tempXAr.map((value) => value)
                obj.y = tempYAr.map((value) => value)
            } else if (obj.x.length > 24) {
                lastDivisor = obj.x.length % 3
                while (obj.x.length > 0) {
                    tempYLength = obj.y.length;
                    tempYAr.push(parseFloat(((obj.y.splice(0, 3).reduce((a, b) => parseFloat(a) + parseFloat(b))) / (tempYLength >= 3 ? 3 : lastDivisor)).toFixed(2)))
                    tempXAr.push(obj.x.length >= 3 ? obj.x.splice(0, 3)[2] : obj.x.splice(0)[lastDivisor - 1])
                }
                obj.x = tempXAr.map((value) => value)
                obj.y = tempYAr.map((value) => value)
            }
            this.setState({
                data: obj,
                chartModal: true
            })

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
            chartModal: false,
            clickChartModal: false
        })
    }

    buildQueryString = () => {
        let startDate = this.state.startDate;
        let endDate = this.state.endDate;
        let startTime = this.state.startTime;
        let endTime = this.state.endTime;

        let string = `start: ${format(set(startDate, { hours: parseInt(startTime.slice(6)) + 4, minutes: '00', seconds: '00' }), "yyyy-MM-dd'T'HH:mm:ss")}Z, stop: ${format(set(endDate, { hours: parseInt(endTime.slice(4)) + 4, minutes: '00', seconds: '00' }), "yyyy-MM-dd'T'HH:mm:ss")}Z`

        return string
    }

    buildSensors = (data, oldData) => {
        let sensorArray = [];
        let dataKeys = Object.keys(data);
        let count = 0;
        let modKeys = dataKeys.map((key) => {
            if (key.includes('sensor')) {
                return `Sensor ${key[6]}${key[7] ? key[7] : ''}`
            } else if (key.includes('germRm')) {
                return 'Germ Room'
            } else {
                return `Zone ${key[4]}`
            }
        })

        for (let sensor in data) {
            //if (data[sensor].temperature) {
            if (sensor.includes('sensor')) {
                if (!oldData) {
                    sensorArray.push({ sensor: modKeys[count], temperature: data[sensor].temperature, trendOne: undefined, tempColor: this.determineTempColor(data[sensor].temperature), humidity: data[sensor].humidity, trendTwo: undefined, humColor: this.determineHumColor(data[sensor].humidity) })
                    count++;
                } else {
                    let trendOneNow = data[sensor].temperature === oldData[sensor].temperature ? 'equal' : data[sensor].temperature > oldData[sensor].temperature ? 'up' : 'down'
                    let trendTwoNow = data[sensor].humidity === oldData[sensor].humidity ? 'equal' : data[sensor].humidity > oldData[sensor].humidity ? 'up' : 'down'
                    sensorArray.push({ sensor: modKeys[count], temperature: data[sensor].temperature, trendOne: trendOneNow, tempColor: this.determineTempColor(data[sensor].temperature), humidity: data[sensor].humidity, trendTwo: trendTwoNow, humColor: this.determineHumColor(data[sensor].humidity) })
                    count++;
                }
            } else {
                if (!oldData) {
                    sensorArray.push({ sensor: modKeys[count], EC: data[sensor].EC, trendOne: undefined, ECColor: this.determineECColor(data[sensor].EC, dataKeys[count]), pH: data[sensor].pH, trendTwo: undefined, pHColor: this.determinePHColor(data[sensor].pH, dataKeys[count]) })
                    count++;
                } else {
                    let trendOneNow = data[sensor].EC === oldData[sensor].EC ? 'equal' : data[sensor].EC > oldData[sensor].EC ? 'up' : 'down'
                    let trendTwoNow = data[sensor].pH === oldData[sensor].pH ? 'equal' : data[sensor].pH > oldData[sensor].pH ? 'up' : 'down'
                    sensorArray.push({ sensor: modKeys[count], EC: data[sensor].EC, trendOne: trendOneNow, ECColor: this.determineECColor(data[sensor].EC, dataKeys[count]), pH: data[sensor].pH, trendTwo: trendTwoNow, pHColor: this.determinePHColor(data[sensor].pH, dataKeys[count]) })
                    count++;
                }
            }
        }
        return sensorArray;
    }

    determineTempColor = (temp) => {
        if (temp > this.state.ranges.tempRanges.warningLow && temp <= this.state.ranges.tempRanges.normal) {
            return 'rgb(75,190,50)'
        } else if ((temp > this.state.ranges.tempRanges.normal && temp <= this.state.ranges.tempRanges.warningHigh) || (temp <= this.state.ranges.tempRanges.warningLow && temp > this.state.ranges.tempRanges.criticalLow)) {
            return 'rgb(210, 200, 75)'
        } else if (temp > this.state.ranges.tempRanges.warningHigh || temp <= this.state.ranges.tempRanges.criticalLow) {
            return 'rgb(250, 90, 90)'
        }

    }

    determineHumColor = (hum) => {
        if (hum > this.state.ranges.humRanges.warningLow && hum <= this.state.ranges.humRanges.normal) {
            return 'rgb(75,190,50)'
        } else if ((hum > this.state.ranges.humRanges.normal && hum <= this.state.ranges.humRanges.warningHigh) || (hum <= this.state.ranges.humRanges.warningLow && hum > this.state.ranges.humRanges.criticalLow)) {
            return 'rgb(210, 200, 75)'
        } else if (hum > this.state.ranges.humRanges.warningHigh || hum <= this.state.ranges.humRanges.criticalLow) {
            return 'rgb(250, 90, 90)'
        }

    }

    determineECColor = (EC, name) => {
        if (EC > this.state.ranges[`${name}ECRanges`].warningLow && EC <= this.state.ranges[`${name}ECRanges`].normal) {
            return 'rgb(75,190,50)'
        } else if ((EC > this.state.ranges[`${name}ECRanges`].normal && EC <= this.state.ranges[`${name}ECRanges`].warningHigh) || (EC <= this.state.ranges[`${name}ECRanges`].warningLow && EC > this.state.ranges[`${name}ECRanges`].criticalLow)) {
            return 'rgb(210, 200, 75)'
        } else if (EC > this.state.ranges[`${name}ECRanges`].warningHigh || EC <= this.state.ranges[`${name}ECRanges`].criticalLow) {
            return 'rgb(250, 90, 90)'
        }

    }

    determinePHColor = (pH, name) => {
        if (pH > this.state.ranges[`${name}pHRanges`].warningLow && pH <= this.state.ranges[`${name}pHRanges`].normal) {
            return 'rgb(75,190,50)'
        } else if ((pH > this.state.ranges[`${name}pHRanges`].normal && pH <= this.state.ranges[`${name}pHRanges`].warningHigh) || (pH <= this.state.ranges[`${name}pHRanges`].warningLow && pH > this.state.ranges[`${name}pHRanges`].criticalLow)) {
            return 'rgb(210, 200, 75)'
        } else if (pH > this.state.ranges[`${name}pHRanges`].warningHigh || pH <= this.state.ranges[`${name}pHRanges`].criticalLow) {
            return 'rgb(250, 90, 90)'
        }

    }

    isDisabled = () => {
        if (this.state.sensor === undefined || this.state.startTime === undefined || this.state.endTime === undefined || this.state.measurement === '') {
            return true
        }
        return false
    }

    componentDidMount() {
        fetch('/getRanges').then(res => res.json()).then((obj) => {
            this.setState({
                ranges: obj
            })
        })
        let date = new Date()
        fetch('/api').then(res => res.json()).then((data) => {
            let sensorArrayMount = this.buildSensors(data);
            this.setState({
                startDate: date,
                endDate: date,
                allSensorData: sensorArrayMount,
                prevSensorData: data
            })
        })
        let newInt = setInterval(() => {
            fetch('/api').then(res => res.json()).then((data) => {
                let sensorArrayMount = this.buildSensors(data, this.state.prevSensorData);
                this.setState({
                    allSensorData: sensorArrayMount,
                    prevSensorData: data
                })
            })
        }, 10000)
        this.setState({
            interval: newInt
        })
    }

    componentDidUpdate() {
        let objectOne = this.state.ranges;
        let objectTwo = this.props.ranges;
        if (this.props.ranges.tempRanges && JSON.stringify(objectOne) !== JSON.stringify(objectTwo)) {
            this.setState({
                ranges: this.props.ranges
            })
        }
    }
    
    componentWillUnmount() {
        clearInterval(this.state.interval)
        setTimeout(()=>{},100)
    }

    render() {
        return (
            <div id='user'>
                {this.state.clickChartModal && <ClickChartModal data={this.state.data} closeModal={this.closeModal} />}
                {this.state.chartModal && <QueryChartModal data={this.state.data} closeModal={this.closeModal} />}
                <div id='query-form'>
                    <div id='query-params'>
                        <div id='query-dates' className='query-field'>
                            <div className='query-text'>
                                <p>Start Date:</p>
                                <p>{this.state.startDate && (this.state.startDate).toLocaleDateString()}</p>
                            </div>
                            <div className='white-bar-query'></div>
                            <div className='query-text'>
                                <p>End Date:</p>
                                <p>{this.state.endDate && (this.state.endDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div id='query-times' className='query-field'>
                            <div className='query-text'>
                                <p>Start Time:</p>
                                <p>{this.state.startTime && format(setHours(new Date(), parseFloat(this.state.startTime.slice(6))), 'hh a')}</p>
                            </div>
                            <div className='white-bar-query'></div>
                            <div className='query-text'>
                                <p>End Time:</p>
                                <p>{this.state.endTime && format(setHours(new Date(), parseFloat(this.state.endTime.slice(4))), 'hh a')}</p>
                            </div>
                        </div>
                        <div id='query-measurements' className='query-field'>
                            <div className='query-text'>
                                <p>Sensor:</p>
                                <p>{this.state.sensor}</p>
                            </div>
                            <div className='white-bar-query'></div>
                            <div className='query-text'>
                                <p>Measurement:</p>
                                <p>{this.state.measurement}</p>
                            </div>
                        </div>
                        <div id='form-submit-container'>
                            <button id='form-submit' onClick={this.submitQuery} disabled={this.isDisabled()}>Submit</button>
                        </div>
                    </div>
                    <div id='calendar-time'>
                        <div id='range-start' className='cal-time'>
                            <h2>Start Date</h2>
                            <CalendarSelect handleDayClick={this.handleStartDayClick} disabled={[{ after: new Date() }]} />
                            <TimeWheel period='start' start={true} end={false} handleClick={this.handleStartTimeClick} />
                        </div>
                        <div id='range-start' className='cal-time'>
                            <h2>End Date</h2>
                            <CalendarSelect handleDayClick={this.handleEndDayClick} disabled={[{ before: this.state.startDate, after: new Date() }]} />
                            <TimeWheel period='end' start={false} end={true} handleClick={this.handleEndTimeClick} />
                        </div>
                    </div>
                    <div id='form-measurements'>
                        <SensorWheel handleClick={this.handleSensorClick} sensor={this.state.sensor} />
                        <MeasurementRadio handleRadio={this.handleRadio} option={this.state.measurement} sensor={this.state.sensor} />
                    </div>
                </div>
                <div id='all-sensors'>
                    <div id='all-sensor-scroll'>
                        {this.state.allSensorData && this.state.allSensorData.map((obj) => (
                            <div key={obj.sensor} id={obj.sensor.includes('Sensor') ? `sensor${obj.sensor[7]}${obj.sensor[8] ? obj.sensor[8] : ''}` : obj.sensor.includes('Zone') ? `zone${obj.sensor[5]}` : 'germRm'} className='sensor-list-container' onClick={this.clickQuery}>
                                <SensorListItem sensorObj={obj} />
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        )
    }
}

function determineTrends(temp, hum) {
    let tempTrend;
    let humTrend;
    if (temp === 'up') {
        tempTrend = '⬆'
    } else if (temp === 'down') {
        tempTrend = '⬇'
    } else {
        tempTrend = ''
    }

    if (hum === 'up') {
        humTrend = '⬆'
    } else if (hum === 'down') {
        humTrend = '⬇'
    } else {
        humTrend = ''
    }

    return [tempTrend, humTrend]
}


function ClickChartModal(props) {

    return (

        <div id='chart-modal'>
            <div id='chart-head'>
                <h2>{props.data.sensor}</h2>
                <div className='chart-close-container'>
                    <button className='chart-close' onClick={props.closeModal}>Close</button>
                </div>
            </div>
            <div id='chart'>
                <Line options={{ responsive: true, legend: { labels: { fontStyle: 'bold' } }, scales: { xAxes: [{ ticks: { autoSkip: true, maxRotation: 90, minRotation: 90, fontStyle: 'bold' } }] } }} data={{ labels: props.data.x, datasets: [{ label: props.data.labels[1], backgroundColor: "slateBlue", data: props.data.yHum ? props.data.yHum : props.data.yEC }, { label: props.data.labels[0], backgroundColor: "slategrey", data: props.data.yTemp ? props.data.yTemp : props.data.ypH }] }} />
            </div>
        </div>
    )
}

function QueryChartModal(props) {
    return (
        <div id='chart-modal'>
            <div id='chart-head'>
                <h2>{props.data.sensor}: {props.data.measurement}</h2>
                <div className='chart-close-container'>
                    <button className='chart-close' onClick={props.closeModal}>Close</button>
                </div>
            </div>
            <div id='chart'>
                <Line options={{ responsive: true, legend: { labels: { fontStyle: 'bold' } }, scales: { xAxes: [{ ticks: { autoSkip: true, maxRotation: 90, minRotation: 90, fontStyle: 'bold' } }] } }} data={{ labels: props.data.x, datasets: [{ label: `${props.data.sensor}: ${props.data.measurement}`, backgroundColor: "slategrey", data: props.data.y }] }} />
            </div>
        </div>
    )
}

function SensorListItem(props) {
    let trends = determineTrends(props.sensorObj.trendOne, props.sensorObj.trendTwo)
    let trendOne = trends[0];
    let trendTwo = trends[1];

    if (props.sensorObj.temperature) {

        return (
            <div className='sensor-list-item'>
                <h2>{props.sensorObj.sensor}</h2>
                <div className='sensor-item-container'>
                    <div className='sensor-item-measurement'>
                        <p>Temp - {trendOne}</p>
                        <p><span style={{ color: props.sensorObj.tempColor }}>{props.sensorObj.temperature}°F</span></p>
                    </div>
                    <div className='sensor-item-measurement'>
                        <p>Humidity - {trendTwo}</p>
                        <p><span style={{ color: props.sensorObj.humColor }}>{props.sensorObj.humidity}% rh</span></p>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='sensor-list-item'>
                <h2>{props.sensorObj.sensor}</h2>
                <div className='sensor-item-container'>
                    <div className='sensor-item-measurement'>
                        <p>EC - {trendOne}</p>
                        <p><span style={{ color: props.sensorObj.ECColor }}>{props.sensorObj.EC}</span></p>
                    </div>
                    <div className='sensor-item-measurement'>
                        <p>pH - {trendTwo}</p>
                        <p><span style={{ color: props.sensorObj.pHColor }}>{props.sensorObj.pH}</span></p>
                    </div>
                </div>
            </div>
        )
    }

}

export default UserData
