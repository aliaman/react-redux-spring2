let initialState = {
    fetching: false,
    fetched: false,
    error: null,
    data: null
};

const hashTrackingESReducer = (state=initialState, action) => {
    switch (action.type) {
        case "HASHTRACKING_PENDING": {
            return {...state, fetching: true}
        }
        case "HASHTRACKING_REJECTED": {
            return {
                ...state,
                fetching: false,
                error: action.payload,
            }
        }
        case "HASHTRACKING_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: null,
                data: action.payload.data.hits.hits
            }
        }
    }
    return state
};
export default hashTrackingESReducer;