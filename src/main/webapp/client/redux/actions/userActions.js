import axios from 'axios';
import rest from './../../utils/restconfig';
import querystring from 'querystring';

export function fetchUsers() {
    return function(dispatch) {
        axios.get(rest.GET_ALL_USERS)
            .then((response) => {
                if(response.data.success) {
                    dispatch({type: 'FETCH_USERS_FULFILLED', payload: response.data.payload})
                }else{
                    dispatch({type: 'FETCH_USERS_REJECTED', payload: response.data.payload});
                }
            })
            .catch((err) => {
                dispatch({type: 'FETCH_USERS_REJECTED', payload: err});
            })
    }
}
export function saveUserField(id, field, value){
    return function(dispatch) {
        axios.post(rest.POST_USER_FIELD, querystring.stringify(
            {
                'id': id,
                'field': field,
                'value': value
            }
        )).then((response) => {
                if(response.data.success===true){
                    dispatch({type: 'POST_USER_FIELD_FULFILLED', payload: response.data.payload})
                }else{
                    dispatch({type: 'POST_USER_FIELD_REJECTED',  payload: response.data.payload})
                }
            }).catch((err) => {
            dispatch({type: 'POST_USER_FIELD_REJECTED',  payload: err})
        });
    }
}
export function saveUser(user){
    return function(dispatch) {
        axios.post(rest.POST_NEW_USER, querystring.stringify(
            {
                'email': user.email,
                'name': user.name,
                'role': user.selectedRole
            }
        ))
            .then((response) => {
                if(response.data.success===true){
                    dispatch(fetchUsers());
                    dispatch({type: 'POST_NEW_USER_FULFILLED', payload: response.data.payload})
                }else{
                    dispatch({type: 'POST_NEW_USER_REJECTED',  payload: response.data.payload})
                }
            }).catch((err) => {
            dispatch({type: 'POST_NEW_USER_REJECTED',  payload: err})
        });
    }
}

export function deleteUser(ids){
    return function(dispatch) {
        axios.post(rest.DELETE_USER, querystring.stringify(
            {
                'ids': ids
            }
        ))
            .then((response) => {
                if(response.data.success===true){
                    dispatch(fetchUsers());
                    dispatch({type: 'DELETE_USER_FULFILLED', payload: response.data.payload})
                }else{
                    dispatch({type: 'DELETE_USER_REJECTED',  payload: response.data.payload})
                }
            }).catch((err) => {
            dispatch({type: 'DELETE_USER_REJECTED',  payload: err})
        });
    }
}