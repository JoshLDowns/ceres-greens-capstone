import React from 'react'
import Gauge from 'react-svg-gauge'

class StaticData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tempRanges: {
                criticalLow: 64,
                warningLow: 66,
                normal: 70,
                warningHigh: 72
            },
            humRanges: {
                criticalLow: 50,
                warningLow: 52,
                normal: 56,
                warningHigh: 58
            },
            sensor1: {
                num: undefined,
                temperature: undefined,
                tempColor: 'green',
                tempTrend: undefined,
                humidity: undefined,
                humColor: 'green',
                humTrend: undefined
            },
            sensor2: {
                num: undefined,
                temperature: undefined,
                tempColor: 'green',
                tempTrend: undefined,
                humidity: undefined,
                humColor: 'green',
                humTrend: undefined
            },
            sensor3: {
                num: undefined,
                temperature: undefined,
                tempColor: 'green',
                tempTrend: undefined,
                humidity: undefined,
                humColor: 'green',
                humTrend: undefined
            },
            sensor4: {
                num: undefined,
                temperature: undefined,
                tempColor: 'green',
                tempTrend: undefined,
                humidity: undefined,
                humColor: 'green',
                humTrend: undefined
            },
            sensor5: {
                num: undefined,
                temperature: undefined,
                tempColor: 'green',
                tempTrend: undefined,
                humidity: undefined,
                humColor: 'green',
                humTrend: undefined
            },
            sensor6: {
                num: undefined,
                temperature: undefined,
                tempColor: 'green',
                tempTrend: undefined,
                humidity: undefined,
                humColor: 'green',
                humTrend: undefined
            },
            previousData: undefined,
            fans: undefined,
            lighting: undefined,
            pumps: undefined
        }
    }

    componentDidMount() {
        fetch('/api').then(res => res.json()).then((data) => {
            let sensorObjMount = this.buildSensors(data)
            this.setState({
                sensor1: {
                    num: sensorObjMount.sensor1.num,
                    temperature: sensorObjMount.sensor1.temperature,
                    tempColor: this.determineTempColor(sensorObjMount.sensor1.temperature),
                    humidity: sensorObjMount.sensor1.humidity,
                    humColor: this.determineHumColor(sensorObjMount.sensor1.humidity)
                },
                sensor2: {
                    num: sensorObjMount.sensor2.num,
                    temperature: sensorObjMount.sensor2.temperature,
                    tempColor: this.determineTempColor(sensorObjMount.sensor2.temperature),
                    humidity: sensorObjMount.sensor2.humidity,
                    humColor: this.determineHumColor(sensorObjMount.sensor2.humidity)
                },
                sensor3: {
                    num: sensorObjMount.sensor3.num,
                    temperature: sensorObjMount.sensor3.temperature,
                    tempColor: this.determineTempColor(sensorObjMount.sensor3.temperature),
                    humidity: sensorObjMount.sensor3.humidity,
                    humColor: this.determineHumColor(sensorObjMount.sensor3.humidity)
                },
                sensor4: {
                    num: sensorObjMount.sensor4.num,
                    temperature: sensorObjMount.sensor4.temperature,
                    tempColor: this.determineTempColor(sensorObjMount.sensor4.temperature),
                    humidity: sensorObjMount.sensor4.humidity,
                    humColor: this.determineHumColor(sensorObjMount.sensor4.humidity)
                },
                sensor5: {
                    num: sensorObjMount.sensor5.num,
                    temperature: sensorObjMount.sensor5.temperature,
                    tempColor: this.determineTempColor(sensorObjMount.sensor5.temperature),
                    humidity: sensorObjMount.sensor5.humidity,
                    humColor: this.determineHumColor(sensorObjMount.sensor5.humidity)
                },
                sensor6: {
                    num: sensorObjMount.sensor6.num,
                    temperature: sensorObjMount.sensor6.temperature,
                    tempColor: this.determineTempColor(sensorObjMount.sensor6.temperature),
                    humidity: sensorObjMount.sensor6.humidity,
                    humColor: this.determineHumColor(sensorObjMount.sensor6.humidity)
                },
                previousData: data
            })
        })
        fetch('/manage').then(res => res.json()).then((obj) => {
            console.log(obj)
            this.setState({
                fans: obj.fans,
                lighting: obj.lighting,
                pumps: obj.pumps
            })
        })
        setInterval(() => {
            fetch('/api').then(res => res.json()).then((data) => {
                let sensorObjInt = this.buildSensors(data, this.state.previousData)
                this.setState((prevState) => ({
                    sensor1: {
                        num: sensorObjInt.sensor1.num,
                        temperature: sensorObjInt.sensor1.temperature,
                        tempColor: this.determineTempColor(sensorObjInt.sensor1.temperature),
                        tempTrend: sensorObjInt.sensor1.tempTrend,
                        humidity: sensorObjInt.sensor1.humidity,
                        humColor: this.determineHumColor(sensorObjInt.sensor1.humidity),
                        humTrend: sensorObjInt.sensor1.humTrend
                    },
                    sensor2: {
                        num: sensorObjInt.sensor2.num,
                        temperature: sensorObjInt.sensor2.temperature,
                        tempColor: this.determineTempColor(sensorObjInt.sensor2.temperature),
                        tempTrend: sensorObjInt.sensor2.tempTrend,
                        humidity: sensorObjInt.sensor2.humidity,
                        humColor: this.determineHumColor(sensorObjInt.sensor2.humidity),
                        humTrend: sensorObjInt.sensor2.humTrend
                    },
                    sensor3: {
                        num: sensorObjInt.sensor3.num,
                        temperature: sensorObjInt.sensor3.temperature,
                        tempColor: this.determineTempColor(sensorObjInt.sensor3.temperature),
                        tempTrend: sensorObjInt.sensor3.tempTrend,
                        humidity: sensorObjInt.sensor3.humidity,
                        humColor: this.determineHumColor(sensorObjInt.sensor3.humidity),
                        humTrend: sensorObjInt.sensor3.humTrend
                    },
                    sensor4: {
                        num: sensorObjInt.sensor4.num,
                        temperature: sensorObjInt.sensor4.temperature,
                        tempColor: this.determineTempColor(sensorObjInt.sensor4.temperature),
                        tempTrend: sensorObjInt.sensor4.tempTrend,
                        humidity: sensorObjInt.sensor4.humidity,
                        humColor: this.determineHumColor(sensorObjInt.sensor4.humidity),
                        humTrend: sensorObjInt.sensor4.humTrend
                    },
                    sensor5: {
                        num: sensorObjInt.sensor5.num,
                        temperature: sensorObjInt.sensor5.temperature,
                        tempColor: this.determineTempColor(sensorObjInt.sensor5.temperature),
                        tempTrend: sensorObjInt.sensor5.tempTrend,
                        humidity: sensorObjInt.sensor5.humidity,
                        humColor: this.determineHumColor(sensorObjInt.sensor5.humidity),
                        humTrend: sensorObjInt.sensor5.humTrend
                    },
                    sensor6: {
                        num: sensorObjInt.sensor6.num,
                        temperature: sensorObjInt.sensor6.temperature,
                        tempColor: this.determineTempColor(sensorObjInt.sensor6.temperature),
                        tempTrend: sensorObjInt.sensor6.tempTrend,
                        humidity: sensorObjInt.sensor6.humidity,
                        humColor: this.determineHumColor(sensorObjInt.sensor6.humidity),
                        humTrend: sensorObjInt.sensor6.humTrend
                    },
                    previousData: data
                }))
            })
        }, 10000)
        setInterval(() => {
            fetch('/manage').then(res => res.json()).then((obj) => {
                this.setState({
                    fans: obj.fans,
                    lighting: obj.lighting,
                    pumps: obj.pumps
                })
            })
        }, 60000)
    }

    buildSensors = (data, oldData) => {
        let newSensorObj = {
            sensor1: { num: undefined, temperature: undefined, tempTrend: undefined, humidity: undefined, humTrend: undefined },
            sensor2: { num: undefined, temperature: undefined, tempTrend: undefined, humidity: undefined, humTrend: undefined },
            sensor3: { num: undefined, temperature: undefined, tempTrend: undefined, humidity: undefined, humTrend: undefined },
            sensor4: { num: undefined, temperature: undefined, tempTrend: undefined, humidity: undefined, humTrend: undefined },
            sensor5: { num: undefined, temperature: undefined, tempTrend: undefined, humidity: undefined, humTrend: undefined },
            sensor6: { num: undefined, temperature: undefined, tempTrend: undefined, humidity: undefined, humTrend: undefined }
        }
        let dataKeys = Object.keys(data);
        let modKeys = dataKeys.map((key) => {
            return `Sensor ${key[6]}${key[7] ? key[7] : ''}`
        })
        let criticalArray = []
        let warningArray = []
        let normalArray = []
        let orderArray = []
        let count = 0
        for (let sensor in data) {
            if ((data[sensor].temperature <= this.state.tempRanges.normal && data[sensor].temperature > this.state.tempRanges.warningLow) && (data[sensor].humidity <= this.state.humRanges.normal && data[sensor].humidity > this.state.humRanges.warningLow)) {
                normalArray.push(count)
            } else if (data[sensor].temperature <= this.state.tempRanges.criticalLow || data[sensor].temperature > this.state.tempRanges.warningHigh) {
                criticalArray.push(count)
            } else if (data[sensor].humidity <= this.state.humRanges.criticalLow || data[sensor].humidity > this.state.humRanges.warningHigh) {
                criticalArray.push(count)
            } else {
                warningArray.push(count)
            }
            count++
        }
        criticalArray.forEach(i => orderArray.push(i))
        warningArray.forEach(i => orderArray.push(i))
        normalArray.forEach(i => orderArray.push(i))
        //sort ordered array into six most important sensors
        for (let i = 0; i < 6; i++) {
            newSensorObj[`sensor${i + 1}`].num = modKeys[orderArray[i]]
            newSensorObj[`sensor${i + 1}`].temperature = data[dataKeys[orderArray[i]]].temperature
            if (oldData) {
                newSensorObj[`sensor${i + 1}`].tempTrend = data[dataKeys[orderArray[i]]].temperature === oldData[dataKeys[orderArray[i]]].temperature ? 'equal' : data[dataKeys[orderArray[i]]].temperature > oldData[dataKeys[orderArray[i]]].temperature ? 'up' : 'down'
            }
            newSensorObj[`sensor${i + 1}`].humidity = data[dataKeys[orderArray[i]]].humidity
            if (oldData) {
                newSensorObj[`sensor${i + 1}`].humTrend = data[dataKeys[orderArray[i]]].humidity === oldData[dataKeys[orderArray[i]]].humidity ? 'equal' : data[dataKeys[orderArray[i]]].humidity > oldData[dataKeys[orderArray[i]]].humidity ? 'up' : 'down'
            }
        }
        return newSensorObj;
    }

    determineTempColor = (temp) => {
        if (temp > this.state.tempRanges.warningLow && temp <= this.state.tempRanges.normal) {
            return 'rgb(75,190,50)'
        } else if ((temp > this.state.tempRanges.normal && temp <= this.state.tempRanges.warningHigh) || (temp <= this.state.tempRanges.warningLow && temp > this.state.tempRanges.criticalLow)) {
            return 'rgb(210, 200, 75)'
        } else if (temp > this.state.tempRanges.warningHigh || temp <= this.state.tempRanges.criticalLow) {
            return 'rgb(250, 90, 90)'
        }

    }

    determineHumColor = (hum) => {
        if (hum > this.state.humRanges.warningLow && hum <= this.state.humRanges.normal) {
            return 'rgb(75,190,50)'
        } else if ((hum > this.state.humRanges.normal && hum <= this.state.humRanges.warningHigh) || (hum <= this.state.humRanges.warningLow && hum > this.state.humRanges.criticalLow)) {
            return 'rgb(210, 200, 75)'
        } else if (hum > this.state.humRanges.warningHigh || hum <= this.state.humRanges.criticalLow) {
            return 'rgb(250, 90, 90)'
        }

    }
// Gauge color change functions
    changeGaugeColorTemp = (temp) => {
        if (temp > this.state.tempRanges.warningLow && temp <= this.state.tempRanges.normal) {
            return 'rgb(75,190,50)'
        } else if ((temp > this.state.tempRanges.normal && temp <= this.state.tempRanges.warningHigh) || (temp <= this.state.tempRanges.warningLow && temp > this.state.tempRanges.criticalLow)) {
            return 'rgb(210, 200, 75)'
        } else if (temp > this.state.tempRanges.warningHigh || temp <= this.state.tempRanges.criticalLow) {
            return 'rgb(250, 90, 90)'
        }
    }

    changeGaugeColorHum = (hum) => {
        if (hum > this.state.humRanges.warningLow && hum <= this.state.humRanges.normal) {
            return 'rgb(75,190,50)'
        } else if ((hum > this.state.humRanges.normal && hum <= this.state.humRanges.warningHigh) || (hum <= this.state.humRanges.warningLow && hum > this.state.humRanges.criticalLow)) {
            return 'rgb(210, 200, 75)'
        } else if (hum > this.state.humRanges.warningHigh || hum <= this.state.humRanges.criticalLow) {
            return 'rgb(250, 90, 90)'
        }
    }

    render() {

        return (
            <div id='static'>
                <div id='sensors'>
                    <div id='sensor-top'>
                        <div id='sensor-critical'>
                            <SensorOne sensor={this.state.sensor1.num} tempRanges={this.state.tempRanges} humRanges={this.state.humRanges} tempTrend={this.state.sensor1.tempTrend} tempColor={this.state.sensor1.tempColor} temperature={this.state.sensor1.temperature} humTrend={this.state.sensor1.humTrend} humColor={this.state.sensor1.humColor} humidity={this.state.sensor1.humidity} />
                        </div>
                        <div id='sensor-mid'>
                            <div className='mid-sensors' id='sensor-mid-1'>
                                <SensorTwo sensor={this.state.sensor2.num} tempTrend={this.state.sensor2.tempTrend} tempColor={this.state.sensor2.tempColor} temperature={this.state.sensor2.temperature} humTrend={this.state.sensor2.humTrend} humColor={this.state.sensor2.humColor} humidity={this.state.sensor2.humidity} />
                            </div>
                            <div className='mid-sensors' id='sensor-mid-2'>
                                <SensorThree sensor={this.state.sensor3.num} tempTrend={this.state.sensor3.tempTrend} tempColor={this.state.sensor3.tempColor} temperature={this.state.sensor3.temperature} humTrend={this.state.sensor3.humTrend} humColor={this.state.sensor3.humColor} humidity={this.state.sensor3.humidity} />
                            </div>
                        </div>
                    </div>
                    <div id='sensor-bottom'>
                        <div className='bottom-sensors' id='sensor-bottom-1'>
                            <SensorFour sensor={this.state.sensor4.num} tempTrend={this.state.sensor4.tempTrend} tempColor={this.state.sensor4.tempColor} temperature={this.state.sensor4.temperature} humTrend={this.state.sensor4.humTrend} humColor={this.state.sensor4.humColor} humidity={this.state.sensor4.humidity} />
                        </div>
                        <div className='bottom-sensors' id='sensor-bottom-2'>
                            <SensorFive sensor={this.state.sensor5.num} tempTrend={this.state.sensor5.tempTrend} tempColor={this.state.sensor5.tempColor} temperature={this.state.sensor5.temperature} humTrend={this.state.sensor5.humTrend} humColor={this.state.sensor5.humColor} humidity={this.state.sensor5.humidity} />
                        </div>
                        <div className='bottom-sensors' id='sensor-bottom-3'>
                            <SensorSix sensor={this.state.sensor6.num} tempTrend={this.state.sensor6.tempTrend} tempColor={this.state.sensor6.tempColor} temperature={this.state.sensor6.temperature} humTrend={this.state.sensor6.humTrend} humColor={this.state.sensor6.humColor} humidity={this.state.sensor6.humidity} />
                        </div>
                    </div>
                </div>
                <div id='manage'>
                    <div id='fans' className='manage-cell'>
                        <div className='manage-header'>
                            <h2>Fans</h2>
                        </div>
                        {this.state.fans ? this.state.fans.map((fan, i) => (<p className='manage-data' key={i}>{fan}</p>)) : <p>...Loading</p>}
                    </div>
                    <div id='lights' className='manage-cell'>
                        <div className='manage-header'>
                            <h2>Lighting</h2>
                        </div>
                        {this.state.lighting ? this.state.lighting.map((light, i) => (<p className='manage-data' key={i}>{light}</p>)) : <p>...Loading</p>}
                    </div>
                    <div id='pumps' className='manage-cell'>
                        <div className='manage-header'>
                            <h2>Pumps</h2>
                        </div>
                        {this.state.pumps ? this.state.pumps.map((pump, i) => (<p className='manage-data' key={i}>{pump}</p>)) : <p>...Loading</p>}
                    </div>
                </div>
            </div>
        )
    }
}

function determineTrends(temp, hum) {
    let tempTrend;
    let humTrend;
    if (temp === 'up') {
        tempTrend = '↑'
    } else if (temp === 'down') {
        tempTrend = '↓'
    } else {
        tempTrend = ''
    }

    if (hum === 'up') {
        humTrend = '↑'
    } else if (hum === 'down') {
        humTrend = '↓'
    } else {
        humTrend = ''
    }

    return [tempTrend, humTrend]
}

// -------------- functional components for each sensor ----------------//

function SensorOne(props) {
    let trends = determineTrends(props.tempTrend, props.humTrend)
    let tempTrend = trends[0];
    let humTrend = trends[1];

    return (
        <div className='dashboard-cell'>
            <div className='sensor-header'>
                <h2>{props.sensor}</h2>
            </div>
            <div className='gauges'>
                <Gauge id='s1-temp' min={props.tempRanges.criticalLow - 4} max={props.tempRanges.warningHigh + 4}  value={parseFloat(props.temperature)}  backgroundColor='grey' width={200} height={125} label={`Temperature °F ${tempTrend}`} font-family={'monospace', '0.8rem'} topLabelStyle={'small'}/>
                <Gauge id='s1-hum' min={props.humRanges.criticalLow - 4} max={props.humRanges.warningHigh + 4} value={parseFloat(props.humidity)} backgroundColor='grey' width={200} height={125} label={`Humidity % rh ${humTrend}`} />
            </div>
            <h3><span style={{ color: props.tempColor }}>{props.temperature}°F {tempTrend}</span> <span> - </span> <span style={{ color: props.humColor }}>{props.humidity}% rh {humTrend}</span></h3>
        </div>
    )
}

function SensorTwo(props) {
    let trends = determineTrends(props.tempTrend, props.humTrend)
    let tempTrend = trends[0];
    let humTrend = trends[1];

    return (
        <div className='dashboard-cell'>
            <div className='sensor-header'>
                <h2>{props.sensor}</h2>
            </div>
            <h3><span style={{ color: props.tempColor }}>{props.temperature}°F {tempTrend}</span> <span> - </span> <span style={{ color: props.humColor }}>{props.humidity}% rh {humTrend}</span></h3>
        </div>
    )
}

function SensorThree(props) {
    let trends = determineTrends(props.tempTrend, props.humTrend)
    let tempTrend = trends[0];
    let humTrend = trends[1];

    return (
        <div className='dashboard-cell'>
            <div className='sensor-header'>
                <h2>{props.sensor}</h2>
            </div>
            <h3><span style={{ color: props.tempColor }}>{props.temperature}°F {tempTrend}</span> <span> - </span> <span style={{ color: props.humColor }}>{props.humidity}% rh {humTrend}</span></h3>
        </div>
    )
}

function SensorFour(props) {
    let trends = determineTrends(props.tempTrend, props.humTrend)
    let tempTrend = trends[0];
    let humTrend = trends[1];

    return (
        <div className='dashboard-cell'>
            <div className='sensor-header'>
                <h2>{props.sensor}</h2>
            </div>
            <h3><span style={{ color: props.tempColor }}>{props.temperature}°F {tempTrend}</span> <span> - </span> <span style={{ color: props.humColor }}>{props.humidity}% rh {humTrend}</span></h3>
        </div>
    )
}

function SensorFive(props) {
    let trends = determineTrends(props.tempTrend, props.humTrend)
    let tempTrend = trends[0];
    let humTrend = trends[1];

    return (
        <div className='dashboard-cell'>
            <div className='sensor-header'>
                <h2>{props.sensor}</h2>
            </div>
            <h3><span style={{ color: props.tempColor }}>{props.temperature}°F {tempTrend}</span> <span> - </span> <span style={{ color: props.humColor }}>{props.humidity}% rh {humTrend}</span></h3>
        </div>
    )
}

function SensorSix(props) {
    let trends = determineTrends(props.tempTrend, props.humTrend)
    let tempTrend = trends[0];
    let humTrend = trends[1];

    return (
        <div className='dashboard-cell'>
            <div className='sensor-header'>
                <h2>{props.sensor}</h2>
            </div>
            <h3><span style={{ color: props.tempColor }}>{props.temperature}°F {tempTrend}</span> <span> - </span> <span style={{ color: props.humColor }}>{props.humidity}% rh {humTrend}</span></h3>
        </div>
    )
}
// ---------------------------------------------------------------------//

export default StaticData