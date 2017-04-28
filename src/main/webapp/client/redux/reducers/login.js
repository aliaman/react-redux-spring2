const initialState = {
    fetching: false,
    fetched: false,
    username: '',
    password: '',
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
            return {
                ...state,
                fetching: false,
                fetched: true,
                username: 'admin211',
                password: 'a'
            }
        }
    }
    return state
}

export default loginReducer;