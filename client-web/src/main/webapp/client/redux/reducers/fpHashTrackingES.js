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
        case actionTypes.FP_HASHTRACKING_PENDING: {
            return {...state,
                fetching: true,
                fetchedData: false,
            }
        }
        case actionTypes.FP_HASHTRACKING_REJECTED: {
            return {
                ...state,
                fetchedData: false,
                fetching: false,
                error: action.payload,
            }
        }
        case actionTypes.FP_HASHTRACKING_FULFILLED: {
            return {
                ...state,
                fetchedData: true,
                fetching: false,
                error: null,
                data: action.payload.data.hits.hits
            }
        }
        //get comments
        case actionTypes.FP_CYNIC_ES_COMMENTS_PENDING: {
            return {...state, fetching: true}
        }
        case actionTypes.FP_CYNIC_ES_COMMENTS_REJECTED: {
            return {
                ...state,
                fetchedComments: false,
                error: action.payload,
            }
        }
        case actionTypes.FP_CYNIC_ES_COMMENTS_FULFILLED: {
            return {
                ...state,
                fetchedComments: true,
                error: null,
                comments: action.payload
            }
        }
        //Save Comments
        case actionTypes.FP_SAVE_ES_COMMENTS_PENDING: {
            return {...state }
        }
        case actionTypes.FP_SAVE_ES_COMMENTS_REJECTED: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case actionTypes.FP_SAVE_ES_COMMENTS_FULFILLED: {
            return {
                ...state,
                error: null
            }
        }

        //getUniqueComments
        case actionTypes.FP_ES_COMMENTS_UNIQUE_PENDING: {
            return {...state }
        }
        case actionTypes.FP_ES_COMMENTS_UNIQUE_REJECTED: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case actionTypes.FP_ES_COMMENTS_UNIQUE_FULFILLED: {
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