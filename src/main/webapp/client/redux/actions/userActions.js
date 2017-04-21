import axios from 'axios';
import rest from './../../utils/restconfig';

export function fetchUsers() {
    return function(dispatch) {
        axios.get(rest.GET_ALL_USERS)
            .then((response) => {
                dispatch({type: 'FETCH_USERS_FULFILLED', payload: response.data.users})
            })
            .catch((err) => {
                dispatch({type: 'FETCH_USERS_REJECTED', payload: err});
            })
    }
}
export function setUserName(name) {
    return {
        type: 'SET_USER_NAME',
        payload: name
    }
}export function setUserAge(age) {
    return {
        type: 'SET_USER_NAME',
        payload: age
    }
}