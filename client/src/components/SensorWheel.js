import React from 'react'

function SensorWheel(props) {
    let sensors = ['sensor1', 'sensor2', 'sensor3', 'sensor4', 'sensor5', 'sensor6', 'sensor7', 'sensor8', 'sensor9', 'sensor10']
    return (
        <div className='sensor-wheel'>
            <div className='sensor-scroll'>
                <div className='sensor-fade-top'></div>
                {sensors.map((sensor) => (
                    <div key={sensor} id={sensor} className='sensor-click' onClick={props.handleClick}>
                        <p>{`Sensor ${sensor[6]}${sensor[7] ? sensor[7] : ''}`}</p>
                    </div>
                ))}
                <div className='time-fade-bottom'></div>
            </div>
        </div>
    )
}

export default SensorWheel