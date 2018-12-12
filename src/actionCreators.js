import *as actionTypes from './actions';
import {deriveTimeIntervals ,calculateWeatherIconByAVGIdsForContainers, createForecastContainers, forecastContainersDataFeeder, calculateMinAndMaxTempsForContainers} from './containers/WeatherQue/DataTransformations';

// Fetching Api data from server -----------------------------------------------------
export const fetchApiData = () => dispatch => {
    dispatch({type: actionTypes.FETCH_APIDATA_PENDING})
    fetch('http://api.openweathermap.org/data/2.5/forecast?id=3067695&APPID=99d08d1253df707d6a39ff943eb1ef7a')
    .then(response => response.json())
    .then(data => dispatch(fetchApiDataSuccess(data)))
    .catch(error => dispatch(fetchApiDataFaild(error)))
};

export const fetchApiDataSuccess = (payload) => ({
    type: actionTypes.FETCH_APIDATA_SUCCESS,
    payload: payload
});

export const fetchApiDataFaild = (error) => ({
    type: actionTypes.FETCH_APIDATA_FAILD,
    payload: error
});

// Transform Api data to containers ---------------------------------------------------
export const fillForecastContainersWithData = (data) => ({
    type: actionTypes.TRANSFORM_DATA,
    payload: calculateWeatherIconByAVGIdsForContainers(
        calculateMinAndMaxTempsForContainers(
        deriveTimeIntervals(
        forecastContainersDataFeeder(
        createForecastContainers(),
        data.list))))
});
