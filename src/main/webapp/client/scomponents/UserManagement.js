import React from 'react'
import Authorization from './../utils/Authorization'

class UserManagement extends React.Component {
   render(){
       return (
           <div>
               <h3>User Management</h3>
           </div>
       )
   }
}
export default Authorization(UserManagement, ['ADMINISTRATOR'])