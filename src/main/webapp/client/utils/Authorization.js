import React from 'react';
import NotAuthorized from '../components/NotAuthorized/NotAuthorized';
import Login from './../components/Login/Login';
import ls from 'localstorage-ttl';

const Authorization = function(WrappedComponent, allowedRoles)
{
    return class WithAuthorization extends React.Component {
        constructor(props) {
            super(props)
        }

        render() {
            let userObj = ls.get("auth");
            userObj = JSON.parse(userObj);
            if(userObj==null){
                return <Login {...this.props} />
            }
            let role = userObj.role.name;
            if(allowedRoles==undefined){
                  return <WrappedComponent {...this.props} />
            }else if (allowedRoles.includes(userObj.role.name)) {
                return <WrappedComponent {...this.props} />
            } else {
                return <NotAuthorized />
            }
        }
    }
}
export default Authorization;