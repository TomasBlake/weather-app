import React from 'react';
import './Day.css';

const day = (props) => {
    return (<div className='day' onClick={props.clicked}>
                <div className='title'>
                    <h1>{props.nameShortcut}</h1>
                </div>
                <div className='icon-div'>
                    <img src={props.weather} alt='weather image' className='icon-img' />
                </div>
                <div className='temperatures'>
                    <div className='day-temperature'>
                        {props.temperatureMax + '°'}
                    </div>
                    <div className='night-temperature'>
                        {props.temperatureMin + '°'}
                    </div>
                </div>
            </div>);
}

export default day;