import actionTypes from './../constans/actionTypes'

let initialState = {
    fetching: false,
    fetched: false,
    error: null,
    data: null
};
const cynicESReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.CYNIC_ES_ACCURACY_PENDING: {
            return {
                ...state,
                fetching: true,
                fetched: false,
            }
        }
        case actionTypes.CYNIC_ES_ACCURACY_REJECTED: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.payload.message,
            }
        }
        case actionTypes.CYNIC_ES_ACCURACY_FULFILLED: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload
            }
        }
        default: {
            return state;
        }
    }
};
export default cynicESReducer;