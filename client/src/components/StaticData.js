import React from 'react'
import Gauge from 'react-svg-gauge'
import tempsym from '../styles/images/tempsymbol.png'
import humsym from '../styles/images/humsymbol.png'
import phsym from '../styles/images/phsymbol.png'
import ecsym from '../styles/images/ecsymbol.png'

//main farm display page that shows sensors in the worst condition
//does not display in mobile formats

class StaticData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ranges: {},
            sensor1: {
                num: undefined,
                temperature: undefined,
                tempColor: undefined,
                EC: undefined,
                ECColor: undefined,
                trendOne: undefined,
                humidity: undefined,
                humColor: undefined,
                pH: undefined,
                pHColor: undefined,
                trendTwo: undefined
            },
            sensor2: {
                num: undefined,
                temperature: undefined,
                tempColor: undefined,
                EC: undefined,
                ECColor: undefined,
                trendOne: undefined,
                humidity: undefined,
                humColor: undefined,
                pH: undefined,
                pHColor: undefined,
                trendTwo: undefined
            },
            sensor3: {
                num: undefined,
                temperature: undefined,
                tempColor: undefined,
                EC: undefined,
                ECColor: undefined,
                trendOne: undefined,
                humidity: undefined,
                humColor: undefined,
                pH: undefined,
                pHColor: undefined,
                trendTwo: undefined
            },
            sensor4: {
                num: undefined,
                temperature: undefined,
                tempColor: undefined,
                EC: undefined,
                ECColor: undefined,
                trendOne: undefined,
                humidity: undefined,
                humColor: undefined,
                pH: undefined,
                pHColor: undefined,
                trendTwo: undefined
            },
            sensor5: {
                num: undefined,
                temperature: undefined,
                tempColor: undefined,
                EC: undefined,
                ECColor: undefined,
                trendOne: undefined,
                humidity: undefined,
                humColor: undefined,
                pH: undefined,
                pHColor: undefined,
                trendTwo: undefined
            },
            sensor6: {
                num: undefined,
                temperature: undefined,
                tempColor: undefined,
                EC: undefined,
                ECColor: undefined,
                trendOne: undefined,
                humidity: undefined,
                humColor: undefined,
                pH: undefined,
                pHColor: undefined,
                trendTwo: undefined
            },
            intervalSensors: undefined,
            intervalMachines: undefined,
            previousData: undefined,
            fans: undefined,
            lighting: undefined,
            pumps: undefined
        }
    }

    //on mount, it fetches initial sensor data, ranges, and machine states
    componentDidMount() {
        fetch('/getRanges').then(res => res.json()).then((obj) => {
            this.setState({
                ranges: obj
            })
        })
        fetch('/api').then(res => res.json()).then((data) => {
            let sensorObjMount = this.buildSensors(data)
            this.setState({
                sensor1: {
                    num: sensorObjMount.sensor1.num,
                    temperature: sensorObjMount.sensor1.temperature ? sensorObjMount.sensor1.temperature : undefined,
                    tempColor: sensorObjMount.sensor1.temperature ? this.determineTempColor(sensorObjMount.sensor1.temperature) : undefined,
                    EC: sensorObjMount.sensor1.EC ? sensorObjMount.sensor1.EC : undefined,
                    ECColor: sensorObjMount.sensor1.EC ? this.determineECColor(sensorObjMount.sensor1.EC, sensorObjMount.sensor1.originalKey) : undefined,
                    humidity: sensorObjMount.sensor1.humidity ? sensorObjMount.sensor1.humidity : undefined,
                    humColor: sensorObjMount.sensor1.humidity ? this.determineHumColor(sensorObjMount.sensor1.humidity) : undefined,
                    pH: sensorObjMount.sensor1.pH ? sensorObjMount.sensor1.pH : undefined,
                    pHColor: sensorObjMount.sensor1.pH ? this.determinePHColor(sensorObjMount.sensor1.pH, sensorObjMount.sensor1.originalKey) : undefined,
                },
                sensor2: {
                    num: sensorObjMount.sensor2.num,
                    temperature: sensorObjMount.sensor2.temperature ? sensorObjMount.sensor2.temperature : undefined,
                    tempColor: sensorObjMount.sensor2.temperature ? this.determineTempColor(sensorObjMount.sensor2.temperature) : undefined,
                    EC: sensorObjMount.sensor2.EC ? sensorObjMount.sensor2.EC : undefined,
                    ECColor: sensorObjMount.sensor2.EC ? this.determineECColor(sensorObjMount.sensor2.EC, sensorObjMount.sensor2.originalKey) : undefined,
                    humidity: sensorObjMount.sensor2.humidity ? sensorObjMount.sensor2.humidity : undefined,
                    humColor: sensorObjMount.sensor2.humidity ? this.determineHumColor(sensorObjMount.sensor2.humidity) : undefined,
                    pH: sensorObjMount.sensor2.pH ? sensorObjMount.sensor2.pH : undefined,
                    pHColor: sensorObjMount.sensor2.pH ? this.determinePHColor(sensorObjMount.sensor2.pH, sensorObjMount.sensor2.originalKey) : undefined,
                },
                sensor3: {
                    num: sensorObjMount.sensor3.num,
                    temperature: sensorObjMount.sensor3.temperature ? sensorObjMount.sensor3.temperature : undefined,
                    tempColor: sensorObjMount.sensor3.temperature ? this.determineTempColor(sensorObjMount.sensor3.temperature) : undefined,
                    EC: sensorObjMount.sensor3.EC ? sensorObjMount.sensor3.EC : undefined,
                    ECColor: sensorObjMount.sensor3.EC ? this.determineECColor(sensorObjMount.sensor3.EC, sensorObjMount.sensor3.originalKey) : undefined,
                    humidity: sensorObjMount.sensor3.humidity ? sensorObjMount.sensor3.humidity : undefined,
                    humColor: sensorObjMount.sensor3.humidity ? this.determineHumColor(sensorObjMount.sensor3.humidity) : undefined,
                    pH: sensorObjMount.sensor3.pH ? sensorObjMount.sensor3.pH : undefined,
                    pHColor: sensorObjMount.sensor3.pH ? this.determinePHColor(sensorObjMount.sensor3.pH, sensorObjMount.sensor3.originalKey) : undefined,
                },
                sensor4: {
                    num: sensorObjMount.sensor4.num,
                    temperature: sensorObjMount.sensor4.temperature ? sensorObjMount.sensor4.temperature : undefined,
                    tempColor: sensorObjMount.sensor4.temperature ? this.determineTempColor(sensorObjMount.sensor4.temperature) : undefined,
                    EC: sensorObjMount.sensor4.EC ? sensorObjMount.sensor4.EC : undefined,
                    ECColor: sensorObjMount.sensor4.EC ? this.determineECColor(sensorObjMount.sensor4.EC, sensorObjMount.sensor4.originalKey) : undefined,
                    humidity: sensorObjMount.sensor4.humidity ? sensorObjMount.sensor4.humidity : undefined,
                    humColor: sensorObjMount.sensor4.humidity ? this.determineHumColor(sensorObjMount.sensor4.humidity) : undefined,
                    pH: sensorObjMount.sensor4.pH ? sensorObjMount.sensor4.pH : undefined,
                    pHColor: sensorObjMount.sensor4.pH ? this.determinePHColor(sensorObjMount.sensor4.pH, sensorObjMount.sensor4.originalKey) : undefined,
                },
                sensor5: {
                    num: sensorObjMount.sensor5.num,
                    temperature: sensorObjMount.sensor5.temperature ? sensorObjMount.sensor5.temperature : undefined,
                    tempColor: sensorObjMount.sensor5.temperature ? this.determineTempColor(sensorObjMount.sensor5.temperature) : undefined,
                    EC: sensorObjMount.sensor5.EC ? sensorObjMount.sensor5.EC : undefined,
                    ECColor: sensorObjMount.sensor5.EC ? this.determineECColor(sensorObjMount.sensor5.EC, sensorObjMount.sensor5.originalKey) : undefined,
                    humidity: sensorObjMount.sensor5.humidity ? sensorObjMount.sensor5.humidity : undefined,
                    humColor: sensorObjMount.sensor5.humidity ? this.determineHumColor(sensorObjMount.sensor5.humidity) : undefined,
                    pH: sensorObjMount.sensor5.pH ? sensorObjMount.sensor5.pH : undefined,
                    pHColor: sensorObjMount.sensor5.pH ? this.determinePHColor(sensorObjMount.sensor5.pH, sensorObjMount.sensor5.originalKey) : undefined,
                },
                sensor6: {
                    num: sensorObjMount.sensor6.num,
                    temperature: sensorObjMount.sensor6.temperature ? sensorObjMount.sensor6.temperature : undefined,
                    tempColor: sensorObjMount.sensor6.temperature ? this.determineTempColor(sensorObjMount.sensor6.temperature) : undefined,
                    EC: sensorObjMount.sensor6.EC ? sensorObjMount.sensor6.EC : undefined,
                    ECColor: sensorObjMount.sensor6.EC ? this.determineECColor(sensorObjMount.sensor6.EC, sensorObjMount.sensor6.originalKey) : undefined,
                    humidity: sensorObjMount.sensor6.humidity ? sensorObjMount.sensor6.humidity : undefined,
                    humColor: sensorObjMount.sensor6.humidity ? this.determineHumColor(sensorObjMount.sensor6.humidity) : undefined,
                    pH: sensorObjMount.sensor6.pH ? sensorObjMount.sensor6.pH : undefined,
                    pHColor: sensorObjMount.sensor6.pH ? this.determinePHColor(sensorObjMount.sensor6.pH, sensorObjMount.sensor6.originalKey) : undefined,
                },
                previousData: data
            })
        })
        fetch('/manage').then(res => res.json()).then((obj) => {
            this.setState({
                fans: obj.fans,
                lighting: obj.lighting,
                pumps: obj.pumps
            })
        })
        //sets the interval to poll the data base every 10 seconds and update state with current ranges
        let sensInt = setInterval(() => {
            fetch('/api').then(res => res.json()).then((data) => {
                let sensorObjInt = this.buildSensors(data, this.state.previousData)
                this.setState({
                    sensor1: {
                        num: sensorObjInt.sensor1.num,
                        temperature: sensorObjInt.sensor1.temperature ? sensorObjInt.sensor1.temperature : undefined,
                        tempColor: sensorObjInt.sensor1.temperature ? this.determineTempColor(sensorObjInt.sensor1.temperature) : undefined,
                        EC: sensorObjInt.sensor1.EC ? sensorObjInt.sensor1.EC : undefined,
                        ECColor: sensorObjInt.sensor1.EC ? this.determineECColor(sensorObjInt.sensor1.EC, sensorObjInt.sensor1.originalKey) : undefined,
                        trendOne: sensorObjInt.sensor1.trendOne,
                        humidity: sensorObjInt.sensor1.humidity ? sensorObjInt.sensor1.humidity : undefined,
                        humColor: sensorObjInt.sensor1.humidity ? this.determineHumColor(sensorObjInt.sensor1.humidity) : undefined,
                        pH: sensorObjInt.sensor1.pH ? sensorObjInt.sensor1.pH : undefined,
                        pHColor: sensorObjInt.sensor1.pH ? this.determinePHColor(sensorObjInt.sensor1.pH, sensorObjInt.sensor1.originalKey) : undefined,
                        trendTwo: sensorObjInt.sensor1.trendTwo
                    },
                    sensor2: {
                        num: sensorObjInt.sensor2.num,
                        temperature: sensorObjInt.sensor2.temperature ? sensorObjInt.sensor2.temperature : undefined,
                        tempColor: sensorObjInt.sensor2.temperature ? this.determineTempColor(sensorObjInt.sensor2.temperature) : undefined,
                        EC: sensorObjInt.sensor2.EC ? sensorObjInt.sensor2.EC : undefined,
                        ECColor: sensorObjInt.sensor2.EC ? this.determineECColor(sensorObjInt.sensor2.EC, sensorObjInt.sensor2.originalKey) : undefined,
                        trendOne: sensorObjInt.sensor2.trendOne,
                        humidity: sensorObjInt.sensor2.humidity ? sensorObjInt.sensor2.humidity : undefined,
                        humColor: sensorObjInt.sensor2.humidity ? this.determineHumColor(sensorObjInt.sensor2.humidity) : undefined,
                        pH: sensorObjInt.sensor2.pH ? sensorObjInt.sensor2.pH : undefined,
                        pHColor: sensorObjInt.sensor2.pH ? this.determinePHColor(sensorObjInt.sensor2.pH, sensorObjInt.sensor2.originalKey) : undefined,
                        trendTwo: sensorObjInt.sensor2.trendTwo
                    },
                    sensor3: {
                        num: sensorObjInt.sensor3.num,
                        temperature: sensorObjInt.sensor3.temperature ? sensorObjInt.sensor3.temperature : undefined,
                        tempColor: sensorObjInt.sensor3.temperature ? this.determineTempColor(sensorObjInt.sensor3.temperature) : undefined,
                        EC: sensorObjInt.sensor3.EC ? sensorObjInt.sensor3.EC : undefined,
                        ECColor: sensorObjInt.sensor3.EC ? this.determineECColor(sensorObjInt.sensor3.EC, sensorObjInt.sensor3.originalKey) : undefined,
                        trendOne: sensorObjInt.sensor3.trendOne,
                        humidity: sensorObjInt.sensor3.humidity ? sensorObjInt.sensor3.humidity : undefined,
                        humColor: sensorObjInt.sensor3.humidity ? this.determineHumColor(sensorObjInt.sensor3.humidity) : undefined,
                        pH: sensorObjInt.sensor3.pH ? sensorObjInt.sensor3.pH : undefined,
                        pHColor: sensorObjInt.sensor3.pH ? this.determinePHColor(sensorObjInt.sensor3.pH, sensorObjInt.sensor3.originalKey) : undefined,
                        trendTwo: sensorObjInt.sensor3.trendTwo
                    },
                    sensor4: {
                        num: sensorObjInt.sensor4.num,
                        temperature: sensorObjInt.sensor4.temperature ? sensorObjInt.sensor4.temperature : undefined,
                        tempColor: sensorObjInt.sensor4.temperature ? this.determineTempColor(sensorObjInt.sensor4.temperature) : undefined,
                        EC: sensorObjInt.sensor4.EC ? sensorObjInt.sensor4.EC : undefined,
                        ECColor: sensorObjInt.sensor4.EC ? this.determineECColor(sensorObjInt.sensor4.EC, sensorObjInt.sensor4.originalKey) : undefined,
                        trendOne: sensorObjInt.sensor4.trendOne,
                        humidity: sensorObjInt.sensor4.humidity ? sensorObjInt.sensor4.humidity : undefined,
                        humColor: sensorObjInt.sensor4.humidity ? this.determineHumColor(sensorObjInt.sensor4.humidity) : undefined,
                        pH: sensorObjInt.sensor4.pH ? sensorObjInt.sensor4.pH : undefined,
                        pHColor: sensorObjInt.sensor4.pH ? this.determinePHColor(sensorObjInt.sensor4.pH, sensorObjInt.sensor4.originalKey) : undefined,
                        trendTwo: sensorObjInt.sensor4.trendTwo
                    },
                    sensor5: {
                        num: sensorObjInt.sensor5.num,
                        temperature: sensorObjInt.sensor5.temperature ? sensorObjInt.sensor5.temperature : undefined,
                        tempColor: sensorObjInt.sensor5.temperature ? this.determineTempColor(sensorObjInt.sensor5.temperature) : undefined,
                        EC: sensorObjInt.sensor5.EC ? sensorObjInt.sensor5.EC : undefined,
                        ECColor: sensorObjInt.sensor5.EC ? this.determineECColor(sensorObjInt.sensor5.EC, sensorObjInt.sensor5.originalKey) : undefined,
                        trendOne: sensorObjInt.sensor5.trendOne,
                        humidity: sensorObjInt.sensor5.humidity ? sensorObjInt.sensor5.humidity : undefined,
                        humColor: sensorObjInt.sensor5.humidity ? this.determineHumColor(sensorObjInt.sensor5.humidity) : undefined,
                        pH: sensorObjInt.sensor5.pH ? sensorObjInt.sensor5.pH : undefined,
                        pHColor: sensorObjInt.sensor5.pH ? this.determinePHColor(sensorObjInt.sensor5.pH, sensorObjInt.sensor5.originalKey) : undefined,
                        trendTwo: sensorObjInt.sensor5.trendTwo
                    },
                    sensor6: {
                        num: sensorObjInt.sensor6.num,
                        temperature: sensorObjInt.sensor6.temperature ? sensorObjInt.sensor6.temperature : undefined,
                        tempColor: sensorObjInt.sensor6.temperature ? this.determineTempColor(sensorObjInt.sensor6.temperature) : undefined,
                        EC: sensorObjInt.sensor6.EC ? sensorObjInt.sensor6.EC : undefined,
                        ECColor: sensorObjInt.sensor6.EC ? this.determineECColor(sensorObjInt.sensor6.EC, sensorObjInt.sensor6.originalKey) : undefined,
                        trendOne: sensorObjInt.sensor6.trendOne,
                        humidity: sensorObjInt.sensor6.humidity ? sensorObjInt.sensor6.humidity : undefined,
                        humColor: sensorObjInt.sensor6.humidity ? this.determineHumColor(sensorObjInt.sensor6.humidity) : undefined,
                        pH: sensorObjInt.sensor6.pH ? sensorObjInt.sensor6.pH : undefined,
                        pHColor: sensorObjInt.sensor6.pH ? this.determinePHColor(sensorObjInt.sensor6.pH, sensorObjInt.sensor6.originalKey) : undefined,
                        trendTwo: sensorObjInt.sensor6.trendTwo
                    },
                    previousData: data
                })
            })
        }, 10000)
        //sets the interval to check machine state and update state
        let machInt = setInterval(() => {
            fetch('/manage').then(res => res.json()).then((obj) => {
                this.setState({
                    fans: obj.fans,
                    lighting: obj.lighting,
                    pumps: obj.pumps
                })
            })
        }, 60000)
        this.setState({
            intervalSensors: sensInt,
            intervalMachines: machInt
        })
    }

    //parses the incoming sensor data into the top 6 sensors based on ones in critical and warning ranges
    buildSensors = (data, oldData) => {
        let newSensorObj = {
            sensor1: {},
            sensor2: {},
            sensor3: {},
            sensor4: {},
            sensor5: {},
            sensor6: {}
        }
        let dataKeys = Object.keys(data);
        let modKeys = dataKeys.map((key) => {
            if (key.includes('sensor')) {
                return `Sensor ${key[6]}${key[7] ? key[7] : ''}`
            } else if (key.includes('germRm')) {
                return 'Germ Room'
            } else {
                return `Zone ${key[4]}`
            }
        })
        let criticalArray = []
        let warningArray = []
        let normalArray = []
        let orderArray = []
        let count = 0
        //first builds an array of all sensors in each range
        for (let sensor in data) {
            if (data[sensor].temperature) {
                if ((data[sensor].temperature <= this.state.ranges.tempRanges.normal && data[sensor].temperature > this.state.ranges.tempRanges.warningLow) && (data[sensor].humidity <= this.state.ranges.humRanges.normal && data[sensor].humidity > this.state.ranges.humRanges.warningLow)) {
                    normalArray.push(count)
                } else if (data[sensor].temperature <= this.state.ranges.tempRanges.criticalLow || data[sensor].temperature > this.state.ranges.tempRanges.warningHigh) {
                    criticalArray.push(count)
                } else if (data[sensor].humidity <= this.state.ranges.humRanges.criticalLow || data[sensor].humidity > this.state.ranges.humRanges.warningHigh) {
                    criticalArray.push(count)
                } else {
                    warningArray.push(count)
                }
            } else {
                if (this.state.ranges[`${sensor}ECRanges`]) {
                    if ((data[sensor].EC <= this.state.ranges[`${sensor}ECRanges`].normal && data[sensor].EC > this.state.ranges[`${sensor}ECRanges`].warningLow) && (data[sensor].pH <= this.state.ranges[`${sensor}pHRanges`].normal && data[sensor].pH > this.state.ranges[`${sensor}pHRanges`].warningLow)) {
                        normalArray.push(count)
                    } else if (data[sensor].EC <= this.state.ranges[`${sensor}ECRanges`].criticalLow || data[sensor].EC > this.state.ranges[`${sensor}ECRanges`].warningHigh) {
                        criticalArray.push(count)
                    } else if (data[sensor].pH <= this.state.ranges[`${sensor}pHRanges`].criticalLow || data[sensor].pH > this.state.ranges[`${sensor}pHRanges`].warningHigh) {
                        criticalArray.push(count)
                    } else {
                        warningArray.push(count)
                    }
                }
            }
            count++
        }
        //orders the sensors from critical to warning to normal ranges
        criticalArray.forEach(i => orderArray.push(i))
        warningArray.forEach(i => orderArray.push(i))
        normalArray.forEach(i => orderArray.push(i))
        //sort ordered array into six most important sensors
        for (let i = 0; i < 6; i++) {
            newSensorObj[`sensor${i + 1}`].num = modKeys[orderArray[i]]
            if (data[dataKeys[orderArray[i]]].temperature) {
                newSensorObj[`sensor${i + 1}`].originalKey = dataKeys[orderArray[i]]
                newSensorObj[`sensor${i + 1}`].temperature = data[dataKeys[orderArray[i]]].temperature
                if (oldData) {
                    newSensorObj[`sensor${i + 1}`].trendOne = data[dataKeys[orderArray[i]]].temperature === oldData[dataKeys[orderArray[i]]].temperature ? 'equal' : data[dataKeys[orderArray[i]]].temperature > oldData[dataKeys[orderArray[i]]].temperature ? 'up' : 'down'
                }
                newSensorObj[`sensor${i + 1}`].humidity = data[dataKeys[orderArray[i]]].humidity
                if (oldData) {
                    newSensorObj[`sensor${i + 1}`].trendTwo = data[dataKeys[orderArray[i]]].humidity === oldData[dataKeys[orderArray[i]]].humidity ? 'equal' : data[dataKeys[orderArray[i]]].humidity > oldData[dataKeys[orderArray[i]]].humidity ? 'up' : 'down'
                }
            } else {
                newSensorObj[`sensor${i + 1}`].originalKey = dataKeys[orderArray[i]]
                newSensorObj[`sensor${i + 1}`].EC = data[dataKeys[orderArray[i]]].EC
                if (oldData) {
                    newSensorObj[`sensor${i + 1}`].trendOne = data[dataKeys[orderArray[i]]].EC === oldData[dataKeys[orderArray[i]]].EC ? 'equal' : data[dataKeys[orderArray[i]]].EC > oldData[dataKeys[orderArray[i]]].EC ? 'up' : 'down'
                }
                newSensorObj[`sensor${i + 1}`].pH = data[dataKeys[orderArray[i]]].pH
                if (oldData) {
                    newSensorObj[`sensor${i + 1}`].trendTwo = data[dataKeys[orderArray[i]]].pH === oldData[dataKeys[orderArray[i]]].pH ? 'equal' : data[dataKeys[orderArray[i]]].pH > oldData[dataKeys[orderArray[i]]].pH ? 'up' : 'down'
                }
            }
        }
        return newSensorObj;
    }

    // ------------------ functions to determine the color of text and guages based on state of the sensor ------------------- //
    determineTempColor = (temp) => {
        if (temp > this.state.ranges.tempRanges.warningLow && temp <= this.state.ranges.tempRanges.normal) {
            return 'rgb(10, 222, 7)'//green//
        } else if (temp > this.state.ranges.tempRanges.normal && temp <= this.state.ranges.tempRanges.warningHigh) {
            return 'rgb(237, 237, 7)'//yellow//
        } else if (temp > this.state.ranges.tempRanges.warningHigh) {
            return 'rgb(237, 7, 7)'//red//
        } else if (temp <= this.state.ranges.tempRanges.warningLow && temp > this.state.ranges.tempRanges.criticalLow) {
            return 'rgb(197, 7, 222)'//purple//
        } else if (temp <= this.state.ranges.tempRanges.criticalLow) {
            return 'rgb(0, 199, 254)' //blue//
        }

    }

    determineHumColor = (hum) => {
        if (hum > this.state.ranges.humRanges.warningLow && hum <= this.state.ranges.humRanges.normal) {
            return 'rgb(10, 222, 7)'//green//
        } else if (hum > this.state.ranges.humRanges.normal && hum <= this.state.ranges.humRanges.warningHigh) {
            return 'rgb(237, 237, 7)'//yellow//
        } else if (hum > this.state.ranges.humRanges.warningHigh) {
            return 'rgb(237, 7, 7)'//red//
        } else if (hum <= this.state.ranges.humRanges.warningLow && hum > this.state.ranges.humRanges.criticalLow) {
            return 'rgb(197, 7, 222)'//purple//
        } else if (hum <= this.state.ranges.humRanges.criticalLow) {
            return 'rgb(0, 199, 254)' //blue//
        }

    }

    determineECColor = (EC, name) => {
        if (EC > this.state.ranges[`${name}ECRanges`].warningLow && EC <= this.state.ranges[`${name}ECRanges`].normal) {
            return 'rgb(10, 222, 7)' //green//
        } else if (EC > this.state.ranges[`${name}ECRanges`].normal && EC <= this.state.ranges[`${name}ECRanges`].warningHigh) {
            return 'rgb(237, 237, 7)' //yellow//
        } else if (EC > this.state.ranges[`${name}ECRanges`].warningHigh) {
            return 'rgb(237, 7, 7)' //red//
        } else if (EC <= this.state.ranges[`${name}ECRanges`].warningLow && EC > this.state.ranges[`${name}ECRanges`].criticalLow) {
            return 'rgb(197, 7, 222)'//purple//
        } else if (EC <= this.state.ranges[`${name}ECRanges`].criticalLow)
            return 'rgb(0, 199, 254)' //blue//

    }

    determinePHColor = (pH, name) => {
        if (pH > this.state.ranges[`${name}pHRanges`].warningLow && pH <= this.state.ranges[`${name}pHRanges`].normal) {
            return 'rgb(10, 222, 7)'//green//
        } else if (pH > this.state.ranges[`${name}pHRanges`].normal && pH <= this.state.ranges[`${name}pHRanges`].warningHigh) {
            return 'rgb(237, 237, 7)'//yellow//
        } else if (pH > this.state.ranges[`${name}pHRanges`].warningHigh) {
            return 'rgb(237, 7, 7)'//red//
        } else if (pH <= this.state.ranges[`${name}pHRanges`].warningLow && pH > this.state.ranges[`${name}pHRanges`].criticalLow) {
            return 'rgb(197, 7, 222)'//purple//
        } else if (pH <= this.state.ranges[`${name}pHRanges`].criticalLow) {
            return 'rgb(0, 199, 254)' //blue//
        }

    }

    // ------------------------------------------------------------------------------------------------------------------------------- //

    //on update, checks if the ranges have been updated in the database (from state of App.js), and updates the ranges if need be
    componentDidUpdate() {
        let objectOne = this.state.ranges;
        let objectTwo = this.props.ranges;
        if (this.props.ranges.tempRanges && JSON.stringify(objectOne) !== JSON.stringify(objectTwo)) {
            this.setState({
                ranges: this.props.ranges
            })
        }
    }

    //on unmount, clears the polling intervals and sets a short timeout to allow for any extranious fetch to finish
    componentWillUnmount() {
        clearInterval(this.state.intervalMachines)
        clearInterval(this.state.intervalSensors)
        setTimeout(()=>{},250)
    }

    render() {

        return (
            <div id='static'>
                <div id='sensors'>
                    <div id='sensor-top'>
                        <div id='sensor-critical'>
                            {this.state.sensor1.num ? <SensorOne sensor={this.state.sensor1} /> : <p>...Loading</p>}
                        </div>
                        <div id='sensor-mid'>
                            <div className='mid-sensors' id='sensor-mid-1'>
                                {this.state.sensor2.num ? <SensorTwo sensor={this.state.sensor2} /> : <p>...Loading</p>}
                            </div>
                            <div className='mid-sensors' id='sensor-mid-2'>
                                {this.state.sensor3.num ? <SensorThree sensor={this.state.sensor3} /> : <p>...Loading</p>}
                            </div>
                        </div>
                    </div>
                    <div id='sensor-bottom'>
                        <div className='bottom-sensors' id='sensor-bottom-1'>
                            {this.state.sensor4.num ? <SensorFour sensor={this.state.sensor4} /> : <p>...Loading</p>}
                        </div>
                        <div className='bottom-sensors' id='sensor-bottom-2'>
                            {this.state.sensor5.num ? <SensorFive sensor={this.state.sensor5} /> : <p>...Loading</p>}
                        </div>
                        <div className='bottom-sensors' id='sensor-bottom-3'>
                            {this.state.sensor6.num ? <SensorSix sensor={this.state.sensor6} /> : <p>...Loading</p>}
                        </div>
                    </div>
                </div>
                <div id='white-bar-break'></div>
                <div id='manage'>
                    <div id='fans' className='manage-cell'>
                        <div className='manage-header'>
                            <h2>Fans</h2>
                        </div>
                        {this.state.fans ? this.state.fans.map((fan, i) => (<p className='manage-data' key={i} style={{color: fan.includes('off') ? 'rgb(237, 7, 7)' : 'rgb(10, 222, 7)'}}>{fan}</p>)) : <p>...Loading</p>}
                    </div>
                    <div id='lights' className='manage-cell'>
                        <div className='manage-header'>
                            <h2>Lighting</h2>
                        </div>
                        {this.state.lighting ? this.state.lighting.map((light, i) => (<p className='manage-data' key={i} style={{color: light.includes('off') ? 'rgb(237, 7, 7)' : 'rgb(10, 222, 7)'}}>{light}</p>)) : <p>...Loading</p>}
                    </div>
                    <div id='pumps' className='manage-cell'>
                        <div className='manage-header'>
                            <h2>Pumps</h2>
                        </div>
                        {this.state.pumps ? this.state.pumps.map((pump, i) => (<p className='manage-data' key={i} style={{color: pump.includes('off') ? 'rgb(237, 7, 7)' : 'rgb(10, 222, 7)'}}>{pump}</p>)) : <p>...Loading</p>}
                    </div>
                </div>
            </div>
        )
    }
}

//determines the trends of sensor data, and returns correct arrow to render
function determineTrends(one, two) {
    let trendOne;
    let trendTwo;
    if (one === 'up') {
        trendOne = '⬆'
    } else if (one === 'down') {
        trendOne = '⬇'
    } else {
        trendOne = ''
    }

    if (two === 'up') {
        trendTwo = '⬆'
    } else if (two === 'down') {
        trendTwo = '⬇'
    } else {
        trendTwo = ''
    }

    return [trendOne, trendTwo]
}

// -------------- functional components for each sensor ----------------//

function SensorOne(props) {
    let trends = determineTrends(props.sensor.trendOne, props.sensor.trendTwo)
    let trendOne = trends[0];
    let trendTwo = trends[1];
    if (props.sensor.temperature) {

        return (
            <div className='dashboard-cell'>
                <div className='sensor-header'>
                    <h2>{props.sensor.num}</h2>
                    <div className='symbol-wrapper'>
                        <div className='temp-sym'>
                            <img src={tempsym} className='symbol-image' alt='temp-symbol' />
                        </div>
                        <div className='hum-sym'>
                            <img src={humsym} className='symbol-image' alt='humidity-symbol' />
                        </div>
                    </div>
                </div>
                <div className='gauges'>
                    <Gauge id='s1-temp' min={62} max={74} color={props.sensor.tempColor} backgroundColor={'black'} value={parseFloat(props.sensor.temperature)} width={325} height={275} label={''} />
                    <Gauge id='s1-hum' min={46} max={62} color={props.sensor.humColor} backgroundColor={'black'} value={parseFloat(props.sensor.humidity)} width={325} height={275} label={''} />
                </div>
                <div className='sensor-text-wrapper-123'>
                    <h3><span style={{ color: props.sensor.tempColor }}>{props.sensor.temperature}°F {trendOne}</span></h3>
                    <div className='white-bar'></div>
                    <h3><span style={{ color: props.sensor.humColor }}>{props.sensor.humidity}% rh {trendTwo}</span></h3>
                </div>

            </div>
        )
    } else {
        return (
            <div className='dashboard-cell'>
                <div className='sensor-header'>
                    <h2>{props.sensor.num}</h2>
                    <div className='symbol-wrapper'>
                        <div className='ec-sym'>
                            <img src={ecsym} className='symbol-image' alt='EC-symbol' />
                        </div>
                        <div className='ph-sym'>
                            <img src={phsym} className='symbol-image' alt='pH-symbol' />
                        </div>
                    </div>
                </div>
                <div className='gauges'>
                    <Gauge id='s1-EC' min={0} max={3} color={props.sensor.ECColor} backgroundColor={'black'} value={parseFloat(props.sensor.EC)} width={325} height={175} label={''} />
                    <Gauge id='s1-pH' min={4} max={8} color={props.sensor.pHColor} backgroundColor={'black'} value={parseFloat(props.sensor.pH)} width={325} height={175} label={''} />
                </div>
                <div className='sensor-text-wrapper-123'>
                    <h3><span style={{ color: props.sensor.ECColor }}>{props.sensor.EC} EC {trendOne}</span></h3>
                    <div className='white-bar'></div>
                    <h3><span style={{ color: props.sensor.pHColor }}>{props.sensor.pH} pH {trendTwo}</span></h3>
                </div>
            </div>
        )
    }
}

function SensorTwo(props) {
    let trends = determineTrends(props.sensor.trendOne, props.sensor.trendTwo)
    let trendOne = trends[0];
    let trendTwo = trends[1];
    if (props.sensor.temperature) {

        return (
            <div className='dashboard-cell'>
                <div className='sensor-header'>
                    <h2>{props.sensor.num}</h2>
                    <div className='symbol-wrapper'>
                        <div className='temp-sym'>
                            <img src={tempsym} className='symbol-image' alt='temp-symbol' />
                        </div>
                        <div className='hum-sym'>
                            <img src={humsym} className='symbol-image' alt='humidity-symbol' />
                        </div>
                    </div>
                </div>
                <div className='sideGauges'>
                    <Gauge id='s2-temp' min={62} max={74} color={props.sensor.tempColor} backgroundColor='black' value={parseFloat(props.sensor.temperature)} width={175} height={125} label={''} />
                    <Gauge id='s2-hum' min={46} max={62} color={props.sensor.humColor} backgroundColor='black' value={parseFloat(props.sensor.humidity)} width={175} height={125} label={''} />
                </div>
                <div className='sensor-text-wrapper-123'>
                    <h3><span style={{ color: props.sensor.tempColor }}>{props.sensor.temperature}°F {trendOne}</span></h3>
                    <div className='white-bar'></div>
                    <h3><span style={{ color: props.sensor.humColor }}>{props.sensor.humidity}% rh {trendTwo}</span></h3>
                </div>
            </div>
        )
    } else {
        return (
            <div className='dashboard-cell'>
                <div className='sensor-header'>
                    <h2>{props.sensor.num}</h2>
                    <div className='symbol-wrapper'>
                        <div className='ec-sym'>
                            <img src={ecsym} className='symbol-image' alt='EC-symbol' />
                        </div>
                        <div className='ph-sym'>
                            <img src={phsym} className='symbol-image' alt='pH-symbol' />
                        </div>
                    </div>
                </div>
                <div className='sideGauges'>
                    <Gauge id='s2-EC' min={0} max={3} color={props.sensor.ECColor} value={parseFloat(props.sensor.EC)} backgroundColor='black' width={175} height={125} label={''} />
                    <Gauge id='s2-pH' min={4} max={8} color={props.sensor.pHColor} value={parseFloat(props.sensor.pH)} backgroundColor='black' width={175} height={125} label={''} />
                </div>
                <div className='sensor-text-wrapper-123'>
                    <h3><span style={{ color: props.sensor.ECColor }}>{props.sensor.EC} EC {trendOne}</span></h3>
                    <div className='white-bar'></div>
                    <h3><span style={{ color: props.sensor.pHColor }}>{props.sensor.pH} pH {trendTwo}</span></h3>
                </div>
            </div>
        )
    }
}

function SensorThree(props) {
    let trends = determineTrends(props.sensor.trendOne, props.sensor.trendTwo)
    let trendOne = trends[0];
    let trendTwo = trends[1];
    if (props.sensor.temperature) {

        return (
            <div className='dashboard-cell'>
                <div className='sensor-header'>
                    <h2>{props.sensor.num}</h2>
                    <div className='symbol-wrapper'>
                        <div className='temp-sym'>
                            <img src={tempsym} className='symbol-image' alt='temp-symbol' />
                        </div>
                        <div className='hum-sym'>
                            <img src={humsym} className='symbol-image' alt='humidity-symbol' />
                        </div>
                    </div>
                </div>
                <div className='sideGauges'>
                    <Gauge id='s3-temp' min={62} max={74} color={props.sensor.tempColor} backgroundColor='black' value={parseFloat(props.sensor.temperature)} width={175} height={125} label={''} />
                    <Gauge id='s3-hum' min={46} max={62} color={props.sensor.humColor} backgroundColor='black' value={parseFloat(props.sensor.humidity)} width={175} height={125} label={''} />
                </div>
                <div className='sensor-text-wrapper-123'>
                    <h3><span style={{ color: props.sensor.tempColor }}>{props.sensor.temperature}°F {trendOne}</span></h3>
                    <div className='white-bar'></div>
                    <h3><span style={{ color: props.sensor.humColor }}>{props.sensor.humidity}% rh {trendTwo}</span></h3>
                </div>
            </div>
        )
    } else {
        return (
            <div className='dashboard-cell'>
                <div className='sensor-header'>
                    <h2>{props.sensor.num}</h2>
                    <div className='symbol-wrapper'>
                        <div className='ec-sym'>
                            <img src={ecsym} className='symbol-image' alt='EC-symbol' />
                        </div>
                        <div className='ph-sym'>
                            <img src={phsym} className='symbol-image' alt='pH-symbol' />
                        </div>
                    </div>
                </div>
                <div className='sideGauges'>
                    <Gauge id='s3-EC' min={0} max={3} color={props.sensor.ECColor} value={parseFloat(props.sensor.EC)} backgroundColor='black' width={175} height={125} label={''} />
                    <Gauge id='s3-pH' min={4} max={8} color={props.sensor.pHColor} value={parseFloat(props.sensor.pH)} backgroundColor='black' width={175} height={125} label={''} />
                </div>
                <div className='sensor-text-wrapper-123'>
                    <h3><span style={{ color: props.sensor.ECColor }}>{props.sensor.EC} EC {trendOne}</span></h3>
                    <div className='white-bar'></div>
                    <h3><span style={{ color: props.sensor.pHColor }}>{props.sensor.pH} pH {trendTwo}</span></h3>
                </div>
            </div>
        )
    }
}

function SensorFour(props) {
    let trends = determineTrends(props.sensor.trendOne, props.sensor.trendTwo)
    let trendOne = trends[0];
    let trendTwo = trends[1];
    if (props.sensor.temperature) {

        return (
            <div className='dashboard-cell'>
                <div className='sensor-header'>
                    <h2>{props.sensor.num}</h2>
                    <div className='symbol-wrapper'>
                        <div className='temp-sym'>
                            <img src={tempsym} className='symbol-image' alt='temp-symbol' />
                        </div>
                        <div className='hum-sym'>
                            <img src={humsym} className='symbol-image' alt='humidity-symbol' />
                        </div>
                    </div>
                </div>
                <div className='sideGauges'>
                    <Gauge id='s4-temp' min={62} max={74} color={props.sensor.tempColor} backgroundColor='black' value={parseFloat(props.sensor.temperature)} width={145} height={75} label={''} />
                    <Gauge id='s4-hum' min={46} max={62} color={props.sensor.humColor} backgroundColor='black' value={parseFloat(props.sensor.humidity)} width={145} height={75} label={''} />
                </div>
                <div className='sensor-text-wrapper-456'>
                    <h3><span style={{ color: props.sensor.tempColor }}>{props.sensor.temperature}°F {trendOne}</span></h3>
                    <div className='white-bar'></div>
                    <h3><span style={{ color: props.sensor.humColor }}>{props.sensor.humidity}% rh {trendTwo}</span></h3>
                </div>
            </div>
        )
    } else {
        return (
            <div className='dashboard-cell'>
                <div className='sensor-header'>
                    <h2>{props.sensor.num}</h2>
                    <div className='symbol-wrapper'>
                        <div className='ec-sym'>
                            <img src={ecsym} className='symbol-image' alt='EC-symbol' />
                        </div>
                        <div className='ph-sym'>
                            <img src={phsym} className='symbol-image' alt='pH-symbol' />
                        </div>
                    </div>
                </div>
                <div className='sideGauges'>
                    <Gauge id='s4-EC' min={0} max={3} color={props.sensor.ECColor} value={parseFloat(props.sensor.EC)} backgroundColor='black' width={145} height={125} label={''} />
                    <Gauge id='s4-pH' min={4} max={8} color={props.sensor.pHColor} value={parseFloat(props.sensor.pH)} backgroundColor='black' width={145} height={125} label={''} />
                </div>
                <div className='sensor-text-wrapper-456'>
                    <h3><span style={{ color: props.sensor.ECColor }}>{props.sensor.EC} EC {trendOne}</span></h3>
                    <div className='white-bar'></div>
                    <h3><span style={{ color: props.sensor.pHColor }}>{props.sensor.pH} pH {trendTwo}</span></h3>
                </div>
            </div>
        )
    }
}

function SensorFive(props) {
    let trends = determineTrends(props.sensor.trendOne, props.sensor.trendTwo)
    let trendOne = trends[0];
    let trendTwo = trends[1];
    if (props.sensor.temperature) {

        return (
            <div className='dashboard-cell'>
                <div className='sensor-header'>
                    <h2>{props.sensor.num}</h2>
                    <div className='symbol-wrapper'>
                        <div className='temp-sym'>
                            <img src={tempsym} className='symbol-image' alt='temp-symbol' />
                        </div>
                        <div className='hum-sym'>
                            <img src={humsym} className='symbol-image' alt='humidity-symbol' />
                        </div>
                    </div>
                </div>
                <div className='sideGauges'>
                    <Gauge id='s5-temp' min={62} max={75} color={props.sensor.tempColor} backgroundColor='black' value={parseFloat(props.sensor.temperature)} width={145} height={75} label={''} />
                    <Gauge id='s5-hum' min={46} max={62} color={props.sensor.humColor} backgroundColor='black' value={parseFloat(props.sensor.humidity)} width={145} height={75} label={''} />
                </div>
                <div className='sensor-text-wrapper-456'>
                    <h3><span style={{ color: props.sensor.tempColor }}>{props.sensor.temperature}°F {trendOne}</span></h3>
                    <div className='white-bar'></div>
                    <h3><span style={{ color: props.sensor.humColor }}>{props.sensor.humidity}% rh {trendTwo}</span></h3>
                </div>
            </div>
        )
    } else {
        return (
            <div className='dashboard-cell'>
                <div className='sensor-header'>
                    <h2>{props.sensor.num}</h2>
                    <div className='symbol-wrapper'>
                        <div className='ec-sym'>
                            <img src={ecsym} className='symbol-image' alt='EC-symbol' />
                        </div>
                        <div className='ph-sym'>
                            <img src={phsym} className='symbol-image' alt='pH-symbol' />
                        </div>
                    </div>
                </div>
                <div className='sideGauges'>
                    <Gauge id='s5-EC' min={0} max={3} color={props.sensor.ECColor} value={parseFloat(props.sensor.EC)} backgroundColor='black' width={145} height={125} label={''} />
                    <Gauge id='s5-pH' min={4} max={8} color={props.sensor.pHColor} value={parseFloat(props.sensor.pH)} backgroundColor='black' width={145} height={125} label={''} />
                </div>
                <div className='sensor-text-wrapper-456'>
                    <h3><span style={{ color: props.sensor.ECColor }}>{props.sensor.EC} EC {trendOne}</span></h3>
                    <div className='white-bar'></div>
                    <h3><span style={{ color: props.sensor.pHColor }}>{props.sensor.pH} pH {trendTwo}</span></h3>
                </div>
            </div>
        )
    }
}

function SensorSix(props) {
    let trends = determineTrends(props.sensor.trendOne, props.sensor.trendTwo)
    let trendOne = trends[0];
    let trendTwo = trends[1];
    if (props.sensor.temperature) {

        return (
            <div className='dashboard-cell'>
                <div className='sensor-header'>
                    <h2>{props.sensor.num}</h2>
                    <div className='symbol-wrapper'>
                        <div className='temp-sym'>
                            <img src={tempsym} className='symbol-image' alt='temp-symbol' />
                        </div>
                        <div className='hum-sym'>
                            <img src={humsym} className='symbol-image' alt='humidity-symbol' />
                        </div>
                    </div>
                </div>
                <div className='sideGauges'>
                    <Gauge id='s6-temp' min={62} max={76} color={props.sensor.tempColor} backgroundColor='black' value={parseFloat(props.sensor.temperature)} width={145} height={75} label={''} />
                    <Gauge id='s6-hum' min={46} max={62} color={props.sensor.humColor} backgroundColor='black' value={parseFloat(props.sensor.humidity)} width={145} height={75} label={''} />
                </div>
                <div className='sensor-text-wrapper-456'>
                    <h3><span style={{ color: props.sensor.tempColor }}>{props.sensor.temperature}°F {trendOne}</span></h3>
                    <div className='white-bar'></div>
                    <h3><span style={{ color: props.sensor.humColor }}>{props.sensor.humidity}% rh {trendTwo}</span></h3>
                </div>
            </div>
        )
    } else {
        return (
            <div className='dashboard-cell'>
                <div className='sensor-header'>
                    <h2>{props.sensor.num}</h2>
                    <div className='symbol-wrapper'>
                        <div className='ec-sym'>
                            <img src={ecsym} className='symbol-image' alt='EC-symbol' />
                        </div>
                        <div className='ph-sym'>
                            <img src={phsym} className='symbol-image' alt='pH-symbol' />
                        </div>
                    </div>
                </div>
                <div className='sideGauges'>
                    <Gauge id='s6-EC' min={0} max={3} color={props.sensor.ECColor} value={parseFloat(props.sensor.EC)} backgroundColor='black' width={145} height={125} label={''} />
                    <Gauge id='s6-pH' min={4} max={8} color={props.sensor.pHColor} value={parseFloat(props.sensor.pH)} backgroundColor='black' width={145} height={125} label={''} />
                </div>
                <div className='sensor-text-wrapper-456'>
                    <h3><span style={{ color: props.sensor.ECColor }}>{props.sensor.EC} EC {trendOne}</span></h3>
                    <div className='white-bar'></div>
                    <h3><span style={{ color: props.sensor.pHColor }}>{props.sensor.pH} pH {trendTwo}</span></h3>
                </div>
            </div>
        )
    }
}
// ---------------------------------------------------------------------//

export default StaticData