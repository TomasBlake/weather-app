import React, {Component} from 'react';
import './WeatherQue.css'
import Day from '../../components/Day/Day';
import {Route, Switch, withRouter} from 'react-router-dom';
import TimesIntervalsQue from '../TimesIntervalsQue/TimesIntervalsQue';
import {connect} from 'react-redux';
import * as actionCreators from '../../actionCreators';

class WeatherQue extends Component {
    state = {
        forecastDays: true,
        currentDay: '',
    }

    onClickHandler = (id) => {
        this.setState({
            forecastDays: !this.state.forecastDays,
            currentDay: id
        });
        this.props.history.push('/' + id);
    }

    // Fetchuje data o počasí z open weather api na 5 dní v 3 hodinových intervalech od posledního měření
    componentDidMount () {
        this.props.onFetchApiData();
    }

    componentDidUpdate() {
        if (this.props.apiDataAvailable) {
            this.props.onTransformData(this.props.apiData);
          }
    }

    render () {
        let days;
        if (this.props.forecastContainers[0].date) {
            days = this.props.forecastContainers.map(day => {
                return <Day
                        key={day.shortName}
                        nameShortcut={day.shortName}
                        weather={day.weatherIcon}
                        temperatureMax={day.maxDayTemp}
                        temperatureMin={day.minDayTemp}
                        clicked={() => this.onClickHandler(day.shortName)} 
                />
            });     
        } 
        
        return (
            <div className='weather-que'>
                <Switch>
                    <Route path='/' exact render={() => <>{days}</>} />
                    <Route path='/:nameOfDay' render={(props) => <TimesIntervalsQue {...props} />} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    apiData: state.apiData,
    errorApiData: state.error,
    apiDataAvailable: state.apiDataAvailable,
    forecastContainers: state.forecastContainers
})

const mapDispatchToProps = dispatch => ({
    onFetchApiData: () => dispatch(actionCreators.fetchApiData()),
    onTransformData: (data) => dispatch(actionCreators.fillForecastContainersWithData(data))    
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(WeatherQue));