import React from 'react'
import Authorization from './../utils/Authorization'
import { connect } from 'react-redux'
import { fetchUsers, saveUserField } from './../redux/actions/userActions'
import * as RB from 'react-bootstrap'
import UsersTable from './tables/UsersTable'
import Constants from './../utils/Constants'
import Select from 'react-select'

@connect((store) => {
    return {
        users: store.user.users
    }
})
class UserManagement extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showNewUserModal: false,
            selectedRole: 0
        }
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
    newUser(){
        this.setState({showNewUserModal: true});
    }
    close(){
        this.setState({showNewUserModal: false});
    }
    logChange(val){
        console.log("Selected: " + val);
        this.setState({selectedRole: val});
    }
    render(){
        const style = {
            marginTop: '140px',
        };
        const modalStyle = {
            position: 'fixed',
            zIndex: 1040,
            top: 0, bottom: 0, left: 0, right: 0
        };

        const backdropStyle = {
            ...modalStyle,
            zIndex: 'auto',
            backgroundColor: '#000',
            opacity: 0.5
        };
        const options = [
            { value: '1', label: 'Administrator' },
            { value: '2', label: 'Analyst' },
            { value: '3', label: 'Reporting' }
        ];
        const dialogStyle = function() {
            return {
                padding: 20
            };
        };
        const rowmargin = {
            paddingBottom: 10
        };
       return (
           <div>
               <RB.Row>
                   <RB.Col md={4}>
                       <h3>User Management</h3>
                   </RB.Col>
               </RB.Row>
               <RB.Row style={rowmargin}>
                   <RB.Col md={4} mdOffset={8}>
                       <RB.Button
                           className="rightAlignedBtn"
                           bsStyle="primary"
                           onClick={this.newUser.bind(this)}>
                           New User
                       </RB.Button>
                   </RB.Col>
               </RB.Row>
               <RB.Row>
                   <RB.Col md={12}>
                       <UsersTable data={ this.props.users } editUser={ this.editUser.bind(this) } />
                   </RB.Col>
               </RB.Row>

               <RB.Modal
                   aria-labelledby='modal-label'
                   style={modalStyle}
                   backdropStyle={backdropStyle}
                   show={this.state.showNewUserModal}
                   onHide={this.close.bind(this)}
               >

                   <div style={dialogStyle()} >
                       <div className="right">
                            <span onClick={this.close.bind(this)}>
                                <span className="glyphicon glyphicon-eject"></span>
                            </span>
                       </div>
                       <h3 className="h3">Add User</h3>
                       <p/>
                       <RB.Form horizontal>
                           <RB.FormGroup controlId="formHorizontalEmail">
                               <RB.Col componentClass={RB.ControlLabel} sm={2}>
                                   Name
                               </RB.Col>
                               <RB.Col sm={10}>
                                   <RB.FormControl type="text" placeholder="Name" />
                               </RB.Col>
                           </RB.FormGroup>
                           <RB.FormGroup controlId="formHorizontalEmail">
                               <RB.Col componentClass={RB.ControlLabel} sm={2}>
                                   Email
                               </RB.Col>
                               <RB.Col sm={10}>
                                   <RB.FormControl type="email" placeholder="Email" />
                               </RB.Col>
                           </RB.FormGroup>
                           <RB.FormGroup controlId="formHorizontalEmail">
                               <RB.Col componentClass={RB.ControlLabel} sm={2}>
                                   Role
                               </RB.Col>
                               <RB.Col sm={10}>
                                   <Select
                                       name="form-field-name"
                                       value={this.state.selectedRole}
                                       onChange={this.logChange.bind(this)}
                                       options={options}
                                   />
                               </RB.Col>
                           </RB.FormGroup>
                               <RB.Row>
                                   <RB.Col sm={2} smOffset={10}>
                                       <RB.Button
                                           bsStyle="primary"
                                           type="submit">
                                           Submit
                                       </RB.Button>
                                   </RB.Col>
                               </RB.Row>
                       </RB.Form>
                   </div>
               </RB.Modal>
           </div>
       )
   }
}
export default Authorization(UserManagement, ['ADMINISTRATOR'])