import React from 'react'

function MeasurementRadio(props) {
    return (
        <div id='measurement-radio'>
            <form>
                <div className='radio-button'>
                    <label>
                        <input type='radio' value='temperature' onChange={props.handleRadio} checked={props.option === 'temperature'} />
                        Temperature
                    </label>    
                </div>
                <div className='radio-button'>
                    <label>
                        <input type='radio' value='humidity' onChange={props.handleRadio} checked={props.option === 'humidity'} />
                        Humidity
                    </label>    
                </div>
            </form>
        </div>
    )
}

export default MeasurementRadio