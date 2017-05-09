let initialState = {
    fetching: false,
    fetched: false,
    error: null,
    data: null
};
const cynicESReducer = (state=initialState, action) => {
    switch (action.type) {
        case "CYNIC_ES_ACCURACY_PENDING": {
            return {...state, fetching: true}
        }
        case "CYNIC_ES_ACCURACY_REJECTED": {
            return {
                ...state,
                fetching: false,
                error: action.payload,
            }
        }
        case "CYNIC_ES_ACCURACY_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: null,
                data: action.payload
            }
        }
    }
    return state
};
export default cynicESReducer;