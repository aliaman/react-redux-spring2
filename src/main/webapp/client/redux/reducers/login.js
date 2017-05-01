import localStorage from 'localStorage'

const initialState = {
    fetching: false,
    fetched: false,
    userObj: {
        "id": 1,
        "email": " ",
        "name": " ",
        "password": "",
        "lastUpdated": 1,
        "role": {
            "id": 1,
            "name": " ",
            "display": " ",
            "lastUpdated": 1
        }
    },
    error: null
};

const loginReducer = (state=initialState, action) => {
    switch (action.type) {
        case "LOGIN_PENDING": {
            return {...state, fetching: true}
        }
        case "LOGIN_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "LOGIN_FULFILLED": {
            localStorage.setItem("auth", JSON.stringify(action.payload));
            return {
                ...state,
                fetching: false,
                fetched: true,
                userObj: action.payload
            }
        }
    }
    return state
}

export default loginReducer;