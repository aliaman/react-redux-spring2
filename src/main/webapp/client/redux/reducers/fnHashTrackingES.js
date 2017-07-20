import actionTypes from './../constans/actionTypes'

let initialState = {
    error: null,

    data: [],
    comments: [],
    uniqueComments: [],

    fetching: false,
    fetchedData: false,
    fetchedComments: false,
    fetchedUniqueComments: false,
};

const hashTrackingESReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.FN_HASHTRACKING_PENDING: {
            return {...state,
                fetching: true,
                fetchedData: false,
            }
        }
        case actionTypes.FN_HASHTRACKING_REJECTED: {
            return {
                ...state,
                fetching: false,
                fetchedData: false,
                error: action.payload,
            }
        }
        case actionTypes.FN_HASHTRACKING_FULFILLED: {
            return {
                ...state,
                fetching: false,
                fetchedData: true,
                error: null,
                data: action.payload.data.hits.hits
            }
        }
        //get comments
        case actionTypes.FN_CYNIC_ES_COMMENTS_PENDING: {
            return {...state, fetching: true}
        }
        case actionTypes.FN_CYNIC_ES_COMMENTS_REJECTED: {
            return {
                ...state,
                fetchedComments: false,
                error: action.payload,
            }
        }
        case actionTypes.FN_CYNIC_ES_COMMENTS_FULFILLED: {
            return {
                ...state,
                fetchedComments: true,
                error: null,
                comments: action.payload
            }
        }
        //Save Comments
        case actionTypes.FN_SAVE_ES_COMMENTS_PENDING: {
            return {...state }
        }
        case actionTypes.FN_SAVE_ES_COMMENTS_REJECTED: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case actionTypes.FN_SAVE_ES_COMMENTS_FULFILLED: {
            return {
                ...state,
                error: null
            }
        }

        //getUniqueComments
        case actionTypes.FN_ES_COMMENTS_UNIQUE_PENDING: {
            return {...state }
        }
        case actionTypes.FN_ES_COMMENTS_UNIQUE_REJECTED: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case actionTypes.FN_ES_COMMENTS_UNIQUE_FULFILLED: {
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