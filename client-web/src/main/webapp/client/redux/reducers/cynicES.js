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
            return {...state, fetching: true}
        }
        case actionTypes.CYNIC_ES_ACCURACY_REJECTED: {
            return {
                ...state,
                fetching: false,
                error: action.payload,
            }
        }
        case actionTypes.CYNIC_ES_ACCURACY_FULFILLED: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: null,
                data: action.payload
            }
        }
        default: {
            return state;
        }
    }
};
export default cynicESReducer;