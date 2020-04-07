import React from 'react'

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
            sensor: {
                temperature: undefined,
                tempColor: 'green',
                humidity: undefined,
                humColor: 'green'
            },
            sensor2: {
                temperature: undefined,
                tempColor: 'green',
                humidity: undefined,
                humColor: 'green'
            },
            sensor3: {
                temperature: undefined,
                tempColor: 'green',
                humidity: undefined,
                humColor: 'green'
            },
            sensor4: {
                temperature: undefined,
                tempColor: 'green',
                humidity: undefined,
                humColor: 'green'
            },
            sensor5: {
                temperature: undefined,
                tempColor: 'green',
                humidity: undefined,
                humColor: 'green'
            },
            sensor6: {
                temperature: undefined,
                tempColor: 'green',
                humidity: undefined,
                humColor: 'green'
            },
            sensorArrayOrdered: []
        }
    }
    
    componentDidMount() {
        fetch('/api').then(res=>res.json()).then((data)=> {
            this.setState({
                sensor: {
                    temperature: data.sensor.temperature,
                    tempColor: this.determineTempColor(data.sensor.temperature),
                    humidity: data.sensor.humidity,
                    humColor: this.determineHumColor(data.sensor.humidity)
                },
                sensor2: {
                    temperature: data.sensor2.temperature,
                    tempColor: this.determineTempColor(data.sensor2.temperature),
                    humidity: data.sensor2.humidity,
                    humColor: this.determineHumColor(data.sensor2.humidity)
                },
                sensor3: {
                    temperature: data.sensor3.temperature,
                    tempColor: this.determineTempColor(data.sensor3.temperature),
                    humidity: data.sensor3.humidity,
                    humColor: this.determineHumColor(data.sensor3.humidity)
                },
                sensor4: {
                    temperature: data.sensor4.temperature,
                    tempColor: this.determineTempColor(data.sensor4.temperature),
                    humidity: data.sensor4.humidity,
                    humColor: this.determineHumColor(data.sensor4.humidity)
                },
                sensor5: {
                    temperature: data.sensor5.temperature,
                    tempColor: this.determineTempColor(data.sensor5.temperature),
                    humidity: data.sensor5.humidity,
                    humColor: this.determineHumColor(data.sensor5.humidity)
                },
                sensor6: {
                    temperature: data.sensor6.temperature,
                    tempColor: this.determineTempColor(data.sensor6.temperature),
                    humidity: data.sensor6.humidity,
                    humColor: this.determineHumColor(data.sensor6.humidity)
                },
                sensorArrayOrdered: this.orderSensors(data)
            })
        })
        setInterval(()=> {
            fetch('/api').then(res=>res.json()).then((data)=> {
                this.setState({
                    sensor: {
                        temperature: data.sensor.temperature,
                        tempColor: this.determineTempColor(data.sensor.temperature),
                        humidity: data.sensor.humidity,
                        humColor: this.determineHumColor(data.sensor.humidity)
                    },
                    sensor2: {
                        temperature: data.sensor2.temperature,
                        tempColor: this.determineTempColor(data.sensor2.temperature),
                        humidity: data.sensor2.humidity,
                        humColor: this.determineHumColor(data.sensor2.humidity)
                    },
                    sensor3: {
                        temperature: data.sensor3.temperature,
                        tempColor: this.determineTempColor(data.sensor3.temperature),
                        humidity: data.sensor3.humidity,
                        humColor: this.determineHumColor(data.sensor3.humidity)
                    },
                    sensor4: {
                        temperature: data.sensor4.temperature,
                        tempColor: this.determineTempColor(data.sensor4.temperature),
                        humidity: data.sensor4.humidity,
                        humColor: this.determineHumColor(data.sensor4.humidity)
                    },
                    sensor5: {
                        temperature: data.sensor5.temperature,
                        tempColor: this.determineTempColor(data.sensor5.temperature),
                        humidity: data.sensor5.humidity,
                        humColor: this.determineHumColor(data.sensor5.humidity)
                    },
                    sensor6: {
                        temperature: data.sensor6.temperature,
                        tempColor: this.determineTempColor(data.sensor6.temperature),
                        humidity: data.sensor6.humidity,
                        humColor: this.determineHumColor(data.sensor6.humidity)
                    },
                    sensorArrayOrdered: this.orderSensors(data)
                })
            })
        }, 10000)
    }

    orderSensors = (obj) => {
        let criticalArray = []
        let warningArray = []
        let normalArray = []
        let orderArray = []
        let count = 0
        for (let sensor in obj) {
            console.log(this.state.tempRanges.warningHigh)
            if ((obj[sensor].temperature <= this.state.tempRanges.normal && obj[sensor].temperature > this.state.tempRanges.warningLow) && (obj[sensor].humidity <= this.state.humRanges.normal && obj[sensor].humidity > this.state.humRanges.warningLow)) {
                normalArray.push(count)
            } else if (obj[sensor].temperature <= this.state.tempRanges.criticalLow || obj[sensor].temperature > this.state.tempRanges.warningHigh) {
                criticalArray.push(count)
            } else if (obj[sensor].humidity <= this.state.humRanges.criticalLow || obj[sensor].humidity > this.state.humRanges.warningHigh) {
                criticalArray.push(count)
            } else {
                warningArray.push(count)
            }
            count++
        }
        criticalArray.forEach(i => orderArray.push(i))
        warningArray.forEach(i => orderArray.push(i))
        normalArray.forEach(i => orderArray.push(i))
        console.log(orderArray)
        return orderArray;
    }

    determineTempColor = (temp) => {
        if (temp > this.state.tempRanges.warningLow && temp <= this.state.tempRanges.normal) {
            return 'green'
        } else if ((temp > this.state.tempRanges.normal && temp <= this.state.tempRanges.warningHigh) || (temp <= this.state.tempRanges.warningLow && temp > this.state.tempRanges.criticalLow)) {
            return 'yellow'
        } else if (temp > this.state.tempRanges.warningHigh || temp <= this.state.tempRanges.criticalLow) {
            return 'red'
        }

    }

    determineHumColor = (hum) => {
        if (hum > this.state.humRanges.warningLow && hum <= this.state.humRanges.normal) {
            return 'green'
        } else if ((hum > this.state.humRanges.normal && hum <= this.state.humRanges.warningHigh) || (hum <= this.state.humRanges.warningLow && hum > this.state.humRanges.criticalLow)) {
            return 'yellow'
        } else if (hum > this.state.humRanges.warningHigh || hum <= this.state.humRanges.criticalLow) {
            return 'red'
        }

    }

    render () {
        let divArray = [<SensorOne tempColor={this.state.sensor.tempColor} temperature={this.state.sensor.temperature} humColor={this.state.sensor.humColor} humidity={this.state.sensor.humidity} />,
            <SensorTwo tempColor={this.state.sensor2.tempColor} temperature={this.state.sensor2.temperature} humColor={this.state.sensor2.humColor} humidity={this.state.sensor2.humidity} />,
            <SensorThree tempColor={this.state.sensor3.tempColor} temperature={this.state.sensor3.temperature} humColor={this.state.sensor3.humColor} humidity={this.state.sensor3.humidity} />,
            <SensorFour tempColor={this.state.sensor4.tempColor} temperature={this.state.sensor4.temperature} humColor={this.state.sensor4.humColor} humidity={this.state.sensor4.humidity} />,
            <SensorFive tempColor={this.state.sensor5.tempColor} temperature={this.state.sensor5.temperature} humColor={this.state.sensor5.humColor} humidity={this.state.sensor5.humidity} />,
            <SensorSix tempColor={this.state.sensor6.tempColor} temperature={this.state.sensor6.temperature} humColor={this.state.sensor6.humColor} humidity={this.state.sensor6.humidity} />]
        return (
            <div id='static'>
                {divArray[this.state.sensorArrayOrdered[0]] || <p>...Loading</p>}
                {divArray[this.state.sensorArrayOrdered[1]] || <p>...Loading</p>}
                {divArray[this.state.sensorArrayOrdered[2]] || <p>...Loading</p>}
                {divArray[this.state.sensorArrayOrdered[3]] || <p>...Loading</p>}
                {divArray[this.state.sensorArrayOrdered[4]] || <p>...Loading</p>}
                {divArray[this.state.sensorArrayOrdered[5]] || <p>...Loading</p>}
            </div>
        )
    }
}

// -------------- functional components for each sensor ----------------//

function SensorOne(props) {
    return (
        <div className='dashboard-cell'>
            <h2>Sensor 1:</h2>
                <h3>Temperature: <span style={{color: props.tempColor}}>{props.temperature}</span> Humidity: <span style={{color: props.humColor}}>{props.humidity}</span></h3>
        </div>
    )
}

function SensorTwo(props) {
    return (
        <div className='dashboard-cell'>
            <h2>Sensor 2:</h2>
                <h3>Temperature: <span style={{color: props.tempColor}}>{props.temperature}</span> Humidity: <span style={{color: props.humColor}}>{props.humidity}</span></h3>
        </div>
    )
}

function SensorThree(props) {
    return (
        <div className='dashboard-cell'>
            <h2>Sensor 3:</h2>
                <h3>Temperature: <span style={{color: props.tempColor}}>{props.temperature}</span> Humidity: <span style={{color: props.humColor}}>{props.humidity}</span></h3>
        </div>
    )
}

function SensorFour(props) {
    return (
        <div className='dashboard-cell'>
            <h2>Sensor 4:</h2>
                <h3>Temperature: <span style={{color: props.tempColor}}>{props.temperature}</span> Humidity: <span style={{color: props.humColor}}>{props.humidity}</span></h3>
        </div>
    )
}

function SensorFive(props) {
    return (
        <div className='dashboard-cell'>
            <h2>Sensor 5:</h2>
                <h3>Temperature: <span style={{color: props.tempColor}}>{props.temperature}</span> Humidity: <span style={{color: props.humColor}}>{props.humidity}</span></h3>
        </div>
    )
}

function SensorSix(props) {
    return (
        <div className='dashboard-cell'>
            <h2>Sensor 6:</h2>
                <h3>Temperature: <span style={{color: props.tempColor}}>{props.temperature}</span> Humidity: <span style={{color: props.humColor}}>{props.humidity}</span></h3>
        </div>
    )
}
// ---------------------------------------------------------------------//
 
export default StaticData