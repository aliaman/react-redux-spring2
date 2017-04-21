
export function doLogin() {
    return function(dispatch) {
        dispatch({type: 'LOGIN_FULFILLED'});
    }
}