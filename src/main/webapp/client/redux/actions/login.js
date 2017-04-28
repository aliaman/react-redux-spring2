import axios from 'axios';
import rest from './../../utils/restconfig';
import querystring from 'querystring';


export function doLogin(userblob) {
    console.log(JSON.stringify(userblob));
    return function(dispatch) {
        axios.post(rest.LOGIN, querystring.stringify({'email': 'ali_jalbani@symantec.com'}))
            .then((response) => {
                dispatch({type: 'LOGIN_FULFILLED', payload: response.payload})
            }).catch((response) => {
                dispatch({type: 'LOGIN_REJECTED',  payload: response.payload})
        });
    }
}