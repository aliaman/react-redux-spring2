import axios from 'axios';
import rest from './../../utils/restconfig';
import querystring from 'querystring';


export function doLogin(email) {
    console.log(JSON.stringify(email));
    return function(dispatch) {
        axios.post(rest.LOGIN, querystring.stringify({'email': email}))
            .then((response) => {
            if(response.data.success===true){
                dispatch({type: 'LOGIN_FULFILLED', payload: response.data.payload})
            }else{
                dispatch({type: 'LOGIN_REJECTED',  payload: response.data.payload})
            }
            }).catch((response) => {
                dispatch({type: 'LOGIN_REJECTED',  payload: response.data.payload})
        });
    }
}