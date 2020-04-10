import React from 'react'
import format from 'date-fns/format'
import setHours from 'date-fns/setHours'

function TimeWheel(props) {
    let times = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
    return (
        <div className='time-wheel'>
            <div className='time-scroll'>
                <div className='time-fade-top'></div>
                {times.map((time) => (
                    <div key={time} id={`${props.period}-${time}`} className='time-click' onClick={props.handleClick}>
                        <p>{format(setHours(new Date(), parseFloat(time)), 'hh a')}</p>
                    </div>
                ))}
                <div className='time-fade-bottom'></div>
            </div>
        </div>
    )
}

export default TimeWheel