import React from 'react';
import NotAuthorized from './../components/NotAuthorized';

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
            if (allowedRoles.includes(role)) {
                return <WrappedComponent {...this.props} />
            } else {
                return <NotAuthorized />
            }
        }
    }
}
export default Authorization;