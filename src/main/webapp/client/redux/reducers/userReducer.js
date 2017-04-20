const initialState = {
    fetching: false,
    fetched: false,
    users: [],
    error: null,
};

const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case "FETCH_USERS_PENDING": {
            console.log(action.type);
            return {...state, fetching: true}
            break;
        }
        case "FETCH_USERS_REJECTED": {
            console.log(action.type);

            alert(action.payload.toString());
            return {...state, fetching: false, error: action.payload}
            break;
        }
        case "FETCH_USERS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                users: action.payload,
            }
            break;
        }
    }
    return state
}

export default userReducer;