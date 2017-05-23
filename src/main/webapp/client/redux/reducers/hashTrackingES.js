let initialState = {
    error: null,

    data: [],
    comments: [],
    uniqueComments: [],

    fetchedData: false,
    fetchedComments: false,
    fetchedUniqueComments: false,
};

const hashTrackingESReducer = (state=initialState, action) => {
    switch (action.type) {
        case "HASHTRACKING_PENDING": {
            return {...state, fetching: true}
        }
        case "HASHTRACKING_REJECTED": {
            return {
                ...state,
                fetchedData: false,
                error: action.payload,
            }
        }
        case "HASHTRACKING_FULFILLED": {
            return {
                ...state,
                fetchedData: true,
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
                fetchedComments: false,
                error: action.payload,
            }
        }
        case "CYNIC_ES_COMMENTS_FULFILLED": {
            return {
                ...state,
                fetchedComments: true,
                error: null,
                comments: action.payload
            }
        }
        //Save Comments
        case "SAVE_ES_COMMENTS_PENDING": {
            return {...state }
        }
        case "SAVE_ES_COMMENTS_REJECTED": {
            return {
                ...state,
                error: action.payload,
            }
        }
        case "SAVE_ES_COMMENTS_FULFILLED": {
            return {
                ...state,
                error: null
            }
        }

        //getUniqueComments
        case "ES_COMMENTS_UNIQUE_PENDING": {
            return {...state }
        }
        case "S_COMMENTS_UNIQUE_REJECTED": {
            return {
                ...state,
                error: action.payload,
            }
        }
        case "ES_COMMENTS_UNIQUE_FULFILLED": {
            return {
                ...state,
                uniqueComments: action.payload,
                fetchedUniqueComments: true,
                error: null
            }
        }
    }
    return state
};
export default hashTrackingESReducer;