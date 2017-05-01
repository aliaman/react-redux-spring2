import React from 'react';
import NotAuthorized from './../components/NotAuthorized';
import Login from './../components/Login';
import localStorage from 'localStorage';

const Authorization = function(WrappedComponent, allowedRoles)
{
    return class WithAuthorization extends React.Component {
        constructor(props) {
            super(props)

            // In this case the user is hardcoded, but it could be loaded from anywhere.
            // Redux, MobX, RxJS, Backbone...
            this.state = {
                user: {
                    name: 'vcarl',
                    role: 'admin'
                }
            }
        }

        render() {
            const {role} = this.state.user
            //if Authentatication
            if(allowedRoles==undefined){
                if(localStorage.getItem("auth")==null){
                    return <Login {...this.props} />
                }else{
                    //let userObj = JSON.parse(localStorage.getItem("auth"));
                    return <WrappedComponent {...this.props} />
                }
                alert(localStorage.getItem("auth"));
            }else
                //if Authentication + Authorization
            if (allowedRoles.includes(role)) {
                return <WrappedComponent {...this.props} />
            } else {
                return <NotAuthorized />
            }
        }
    }
}
export default Authorization;