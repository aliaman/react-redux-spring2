import React from 'react'
import ReactDOM from 'react-dom'
import Authorization from './../utils/Authorization'
import { connect } from 'react-redux'
import { fetchUsers, saveUserField, saveUser, deleteUser } from './../redux/actions/userActions'
import * as RB from 'react-bootstrap'
import UsersTable, {Selected} from './tables/UsersTable'
import Constants from './../utils/Constants'
import Select from 'react-select'
import update from 'react-addons-update'

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
            newUserSubmitted: false,
            newUserValid: true,
            newUser: {
                selectedRole: 0,
                name: '',
                email: ''

            },
            selectedUsers: []
        }
    }

    componentWillReceiveProps(nextProps){
    }
    componentWillMount() {
        this.props.dispatch(fetchUsers());
    }
    getValidationState(name){
        let newUserValid = true;
        if(this.state.newUserSubmitted) {
            switch (name) {
                case "name":
                    if (this.state.newUser[name] == "") {
                        newUserValid = false;
                        return "error"
                    }
                    break;
               case "email":
                   let re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
                   if (this.state.newUser[name] == "") {
                       newUserValid = false;
                       return "error";
                   }else if(!re.test(this.state.newUser[name])){
                       newUserValid = false;
                       return "error";
                   }
                   break;
               case "selectedRole":
                   if (this.state.newUser[name] == 0) {
                       newUserValid = false;
                       return "error";
                   }
                   break;
                default:
                   break;
            }
            return null;
        }
        return null;
    }
    getValidationStateForm(){
        let valid = true;
        if (this.state.newUser.name == "") {
            valid = false;
        }else if (this.state.newUser.email == "") {
            valid = false;
        }else if (this.state.newUser.selectedRole == 0) {
            valid = false;
        }
        return valid;
    }
    submitNewUser(event){
        event.preventDefault();
        let newUser = update(this.state.newUser,
            {
                $merge: {
                    name: ReactDOM.findDOMNode(this.userName).value,
                    email: ReactDOM.findDOMNode(this.userEmail).value,
                }
            });
        let isFormValid = this.getValidationStateForm();
        this.setState({
                newUserSubmitted: true,
                newUser: newUser,
                showNewUserModal: (!isFormValid),
            }, function(){
                if(isFormValid) {
                    this.props.dispatch(saveUser(this.state.newUser));
                }
        });
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
    onRowSelect(s){
        let selectedUsers = this.state.selectedUsers;
        if(s.selected) {
            for (let k in s.rows) {
                let id = s.rows[k].id;
                if(selectedUsers.find(user => user.id == id ) == undefined){
                    selectedUsers.push(s.rows[k]);
                }
            }
        }
        if(! s.selected){
            for (let k in s.rows) {
                let id = s.rows[k].id;
                let index = selectedUsers.findIndex(user => user.id == id);
                selectedUsers.splice(index, 1);
            }
        }
        this.setState({selectedUsers: selectedUsers});
    }
    newUser(){
        this.setState({showNewUserModal: true});
    }
    close(){
        let newUser = update(this.state.newUser,
            {
                $merge: {
                    selectedRole: 0
                }
            });
        this.setState({
            showNewUserModal: false,
            newUserSubmitted: false,
            newUser: newUser,
        });
    }
    logChange(val){
        if(val==null) {
            this.setState({newUser: { value: 0, label: ""}});
        }else{
            let newUser = update(this.state.newUser,
                {
                    $merge: {
                        selectedRole: val.value
                    }
                });
            this.setState({newUser: newUser});
        }
    }
    deleteUser(){
        let ids = this.state.selectedUsers.map(function(a) {return a.id;});
        this.props.dispatch(deleteUser(ids));
    }
    handleChange(event){
        let fieldName = event.target.name;
        let fleldVal = event.target.value;
        let obj = {};
        obj[fieldName] = fleldVal;
        let newUser = update(this.state.newUser,
            {
                $merge: obj
            });
        this.setState({newUser: newUser});
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
            { value: 1, label: 'Administrator' },
            { value: 2, label: 'Analyst' },
            { value: 3, label: 'Reporting' }
        ];
        const dialogStyle = function() {
            return {
                padding: 20
            };
        };
        const rowmargin = {
            paddingBottom: 10
        };
        const applyMargin = {
            marginRight: 5
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
                       <div className="right">
                           <RB.Button
                               className="actionBtn"
                               style={ applyMargin }
                               bsStyle="primary"
                               onClick={this.deleteUser.bind(this)}
                               disabled = {this.state.selectedUsers.length == 0}>
                               Delete User
                           </RB.Button>
                           <RB.Button
                               className="actionBtn"
                               bsStyle="primary"
                               onClick={this.newUser.bind(this)}>
                               New User
                           </RB.Button>
                       </div>
                   </RB.Col>
               </RB.Row>
               <RB.Row>
                   <RB.Col md={12}>
                       <UsersTable
                           data={ this.props.users }
                           editUser={ this.editUser.bind(this) }
                           onRowSelect={ this.onRowSelect.bind(this)}
                       />

                   </RB.Col>
               </RB.Row>

               <RB.Modal
                   aria-labelledby='modal-label'
                   style={modalStyle}
                   backdropStyle={backdropStyle}
                   show={this.state.showNewUserModal}
                   onHide={this.close.bind(this)}
               >

                   <div style={dialogStyle()}>
                       <div className="right">
                            <span onClick={this.close.bind(this)} className="Select-clear-zone">
                                <span className="Select-clear">x</span>
                            </span>
                       </div>
                       <h3 className="clear">Add User</h3>
                       <p>&nbsp;</p>
                       <RB.Form onSubmit={this.submitNewUser.bind(this)} horizontal className="formh">
                           <RB.FormGroup
                               name="name"
                               validationState={this.getValidationState("name")}
                               controlId="formHorizontalName" >
                               <RB.Col sm={2}>
                                   <span className="hformspan lh">Name</span>
                               </RB.Col>
                               <RB.Col sm={10}>
                                   <RB.FormControl
                                       required
                                       name="name"
                                       onChange={this.handleChange.bind(this)}
                                       type="text"
                                       placeholder="Name"
                                       ref={ref => this.userName = ref}  />
                               </RB.Col>
                           </RB.FormGroup>
                           <RB.FormGroup
                               validationState={this.getValidationState("email")}
                               controlId="formHorizontalEmail" >
                               <RB.Col sm={2}>
                                   <span className="hformspan lh">Email</span>
                               </RB.Col>
                               <RB.Col sm={10}>
                                   <RB.FormControl
                                       required
                                       name="email"
                                       onChange={this.handleChange.bind(this)}
                                       type="email"
                                       placeholder="Email"
                                       ref={ref => this.userEmail = ref} />
                               </RB.Col>
                           </RB.FormGroup>
                           <RB.FormGroup
                               validationState={this.getValidationState("selectedRole")}
                               controlId="formHorizontalRole">
                               <RB.Col sm={2}>
                                   <span className="hformspan lh">Role</span>
                               </RB.Col>
                               <RB.Col sm={10}>
                                   <Select
                                       name="selectedRole"
                                       value={this.state.newUser.selectedRole}
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