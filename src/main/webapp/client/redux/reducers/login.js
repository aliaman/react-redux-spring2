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
            console.log(action.type);
            return {...state, fetching: true}
            break;
        }
        case "LOGIN_REJECTED": {
            console.log(action.type);

            alert(action.payload.toString());
            return {...state, fetching: false, error: action.payload}
            break;
        }
        case "LOGIN_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                user: 'admin',
                password: 'admin'
            }
            break;
        }
    }
    return state
}

export default loginReducer;