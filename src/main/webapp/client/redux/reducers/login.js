import ls from 'localstorage-ttl'
import Constants from './../../utils/Constants'

const initialState = {
    fetching: false,
    fetched: false,
    userObj: {
        "id": 1,
        "email": "",
        "name": "",
        "password": "",
        "lastUpdated": 1,
        "role": {
            "id": 1,
            "name": "",
            "display": "",
            "lastUpdated": 1
        }
    },
    authenticated: false,
    error: null
};

const loginReducer = (state=initialState, action) => {
    switch (action.type) {
        case "LOGIN_PENDING": {
            return {...state, fetching: true}
        }
        case "LOGIN_REJECTED": {
            return {
                ...state,
                fetching: false,
                error: action.payload,
                authenticated: false
            }
        }
        case "LOGIN_FULFILLED": {
            //establish session for 3 hours
            ls.set("auth", JSON.stringify(action.payload), Constants.MILLISECONDS_IN_HOUR * 3);
            return {
                ...state,
                fetching: false,
                fetched: true,
                authenticated: true,
                error: null,
                userObj: action.payload
            }
        }
    }
    return state
}

export default loginReducer;