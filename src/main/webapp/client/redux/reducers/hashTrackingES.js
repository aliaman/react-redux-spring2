let initialState = {
    fetching: false,
    fetched: false,
    error: null,
    data: null,
    comments: []
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
        //get comments
        case "CYNIC_ES_COMMENTS_PENDING": {
            return {...state, fetching: true}
        }
        case "CYNIC_ES_COMMENTS_REJECTED": {
            return {
                ...state,
                fetching: false,
                error: action.payload,
            }
        }
        case "CYNIC_ES_COMMENTS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: null,
                comments: action.payload
            }
        }
        //Save Comments
        case "SAVE_ES_COMMENTS_PENDING": {
            return {...state, fetching: true}
        }
        case "SAVE_ES_COMMENTS_REJECTED": {
            return {
                ...state,
                fetching: false,
                error: action.payload,
            }
        }
        case "SAVE_ES_COMMENTS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: null
            }
        }
    }
    return state
};
export default hashTrackingESReducer;