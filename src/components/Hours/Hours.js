import React from 'react';
import './Hours.css';
import {withRouter} from 'react-router-dom';

const hours = (props) => {
    console.log('[HOURSPROPS]', props);
    return (
        <div className='hours'>
            <div className='title'>
                <h1>{props.time}</h1>
            </div>
            <div className='icon-div'>
                <img src={props.weather} alt='weather image' className='icon-img' />
            </div>
            <div className='temperatures'>
                <div className='hours-temperature'>
                        {props.maxTemp + '°'}
                </div>
            </div>
        </div>
    );
}

export default withRouter(hours); 