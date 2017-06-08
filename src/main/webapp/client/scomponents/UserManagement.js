import React from 'react'
import Authorization from './../utils/Authorization'
import { connect } from 'react-redux'
import { fetchUsers, saveUserField } from './../redux/actions/userActions'
import BootstrapTable from 'react-bootstrap-table'
import UsersTable from './tables/UsersTable'
import Constants from './../utils/Constants'

@connect((store) => {
    return {
        users: store.user.users
    }
})
class UserManagement extends React.Component {
    constructor(props){
        super(props)
    }

    componentWillReceiveProps(nextProps){
    }
    componentWillMount() {
        this.props.dispatch(fetchUsers());
    }
    editUser(id, field, value){
        // alert(id + " " + field + " " + value);
        let actualvalue = '';
        let actualfield = '';
        switch(field){
            case 'roledisplay':
                actualfield = 'role';
                actualvalue = Constants.ROLES.find(role => role.display == value).id;
                break;
            default:
                actualfield = field;
                actualvalue = value;
        }
        this.props.dispatch(saveUserField(id, actualfield, actualvalue));
    }
    render(){
       return (
           <div>
               <h3>User Management</h3>
               <UsersTable data={ this.props.users } editUser={ this.editUser.bind(this) } />
           </div>
       )
   }
}
export default Authorization(UserManagement, ['ADMINISTRATOR'])