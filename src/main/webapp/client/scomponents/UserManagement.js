import React from 'react'
import Authorization from './../utils/Authorization'
import { connect } from 'react-redux'
import { fetchUsers } from './../redux/actions/userActions'
import BootstrapTable from 'react-bootstrap-table'
import UsersTable from './tables/UsersTable'


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
    render(){
       return (
           <div>
               <h3>User Management</h3>
               <UsersTable data={ this.props.users } />
           </div>
       )
   }
}
export default Authorization(UserManagement, ['ADMINISTRATOR'])