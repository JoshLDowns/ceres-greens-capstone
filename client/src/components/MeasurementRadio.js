import React from 'react'

function MeasurementRadio(props) {
    return (
        <div id='measurement-radio'>
            <form id='radio-form'>
                <div className='radio-button'>
                    <label>
                        <input type='radio' value='temperature' disabled={props.sensor && (props.sensor.includes('zone') || props.sensor.includes('germ'))} onChange={props.handleRadio} checked={props.option === 'temperature'} />
                        Temperature
                    </label>    
                </div>
                <div className='radio-button'>
                    <label>
                        <input type='radio' value='humidity' disabled={props.sensor && (props.sensor.includes('zone') || props.sensor.includes('germ'))} onChange={props.handleRadio} checked={props.option === 'humidity'} />
                        Humidity
                    </label>    
                </div>
                <div className='radio-button'>
                    <label>
                        <input type='radio' value='EC' disabled={props.sensor && props.sensor.includes('sensor')} onChange={props.handleRadio} checked={props.option === 'EC'} />
                        EC
                    </label>
                </div>
                <div className='radio-button'>
                    <label>
                        <input type='radio' value='pH' disabled={props.sensor && props.sensor.includes('sensor')} onChange={props.handleRadio} checked={props.option === 'pH'} />
                        pH
                    </label>
                </div>
            </form>
        </div>
    )
}

export default MeasurementRadio