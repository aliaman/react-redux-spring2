import axios from 'axios'
import rest from '../../../utils/restconfig'
import querystring from 'querystring'
import ls from 'localstorage-ttl'
import Constants from '../../../utils/Constants'


export function doLogin(email, password) {
    return function(dispatch) {
        dispatch({type: 'LOGIN_PENDING'});
        //TODO pass encrypted password to rest param
        axios.post(rest.LOGIN, querystring.stringify({'email': email}))
            .then((response) => {
                if(response.data.success===true){
                    ls.set("auth", JSON.stringify(response.data.payload), Constants.MILLISECONDS_IN_HOUR * 3);
                    dispatch({type: 'LOGIN_FULFILLED', payload: response.data.payload});
                }else{
                    dispatch({type: 'LOGIN_REJECTED',  payload: response.data.payload})
                }
            }).catch((err) => {
                dispatch({type: 'LOGIN_REJECTED',  payload: err})
            });
    }
}