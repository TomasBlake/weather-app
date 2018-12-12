import React from 'react';
import {withRouter} from 'react-router-dom';
import Hours from '../../components/Hours/Hours';
import {connect} from 'react-redux';

class timesIntervalsQue extends React.Component {   
    render () {
    return (
            <>
            {this.props.containers.find(container => { 
                console.log('[TEST]',this.props.match.params.nameOfDay.toLowerCase());
                return container.shortName.toLowerCase() === this.props.match.params.nameOfDay.toLowerCase()
                })
            .timeIntervals.map(interval => {
                return <Hours 
                            key={interval.timeInterval}
                            time={interval.timeInterval}
                            weather={interval.weatherIcon} 
                            maxTemp={interval.maxTemp}
                            minTemp={interval.minTemp} />
            })}
            </>
            );
    }
}

const mapStateToProps = state => ({
containers: state.forecastContainers
});

export default connect(mapStateToProps, null)(withRouter(timesIntervalsQue));