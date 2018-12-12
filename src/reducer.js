import * as actionTypes from './actions';

const intialState = {
    isPending: false,
    error: null,
    apiDataAvailable: false,
    apiData: {

    },
    forecastContainers: [{},{},{},{},{}]
}

const reducer = (state = intialState, action) => {
    switch (action.type) {    
        case (actionTypes.FETCH_APIDATA_PENDING):
            return {
                ...state, 
                isPending: true,
                error: null
            };
        case (actionTypes.FETCH_APIDATA_SUCCESS):
            return {
                ...state,
                isPending: false,
                apiDataAvailable: true,
                error: null,
                apiData: action.payload
            };
        case (actionTypes.FETCH_APIDATA_FAILD):
            return {
                ...state,
                isPending: false,
                error: action.payload
            };
        case (actionTypes.TRANSFORM_DATA):
            return {
                ...state,
                forecastContainers: action.payload,
                apiDataAvailable: false
            }
        default:
            return state;
    }
}

export default reducer;