const initialState = {
    fetching: false,
    fetched: false,
    users: [],
    error: null,
    userObj: {}
};

const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case "FETCH_USERS_PENDING": {
            return {...state, fetching: true}
        }
        case "FETCH_USERS_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_USERS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                users: action.payload,
            }
        }


        //saving user fields (edit)
        case "POST_USER_FIELD_PENDING": {
            return {...state, fetching: true}
        }
        case "POST_USER_FIELD_REJECTED": {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        }
        case "POST_USER_FIELD_FULFILLED": {
            //establish session for 3 hours
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: null,
                userObj: action.payload
            }
        }

        //save new user
        case "POST_NEW_USER_PENDING": {

            return {...state, fetching: true}
        }
        case "POST_NEW_USER_REJECTED": {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        }
        case "POST_NEW_USER_FULFILLED": {
            //establish session for 3 hours
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: null,
                userObj: action.payload
            }
        }
    }
    return state;
}

export default userReducer;