import React from 'react'

function SensorWheel(props) {
    let sensors = ['sensor1', 'sensor2', 'sensor3', 'sensor4', 'sensor5', 'sensor6', 'sensor7', 'sensor8', 'sensor9', 'sensor10', 'sensor11', 'sensor12', 'sensor13', 'sensor14', 'sensor15', 'sensor16', 'germRm', 'zone1', 'zone2', 'zone3']
    return (
        <div className='sensor-wheel'>
            <div className='wheel-fade-top'></div>
            <div className='sensor-scroll'>
                {sensors.map((sensor) => (
                    <div key={sensor} id={sensor} className={`sensor-click ${props.sensor === sensor ? 'selected-sensor' : ''}`} onClick={props.handleClick}>
                        <p>{sensor.includes('sensor') ? `Sensor ${sensor[6]}${sensor[7] ? sensor[7] : ''}` : sensor.includes('zone') ? `Zone ${sensor[4]}` : 'Germ Room'}</p>
                    </div>
                ))}
            </div>
            <div className='wheel-fade-bottom'></div>
        </div>
    )
}

export default SensorWheel