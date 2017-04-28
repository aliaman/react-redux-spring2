import React from 'react';
import { Row, Col, FormGroup, Form, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { doLogin } from './../../redux/actions/login'

@connect((store) => {
    return {
        userObj: store.login.userObj
    }
})
export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userObj: this.props.userObj
        }
        console.log(JSON.stringify(this.state.userObj));
    }
    componentWillReceiveProps(nextProps){
        this.setState({ userObj: nextProps.userObj });
    }
    login(event){
        this.props.dispatch(doLogin(this.props.userObj.email));
        event.preventDefault();
    }
    componentWillMount() {

    }
    handleChange (event){
        let varVal = this.state.userObj;
        varVal[event.target.id] = event.target.value;
        console.log(JSON.stringify(varVal));
        this.setState({ userObj: varVal });
    }
    render() {
        return (
        <div className="container">
            <Row style={rowStyles}>
                <Col lg={6} lgOffset={3}>
                    <h1 className="symheading">Login</h1>
                    <form onSubmit={this.login.bind(this)}>
                        <FormGroup>
                            <ControlLabel>Email address</ControlLabel>
                            <FormControl id="email"
                                         type="text"
                                         placeholder="Enter email"
                                         value={this.state.userObj.email}
                                         onChange={this.handleChange.bind(this)}/>
                            <HelpBlock>Help here</HelpBlock>
                        </FormGroup>
                        <FormGroup controlId="password">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl id="password"
                                         type="password"
                                         value={this.state.userObj.password}
                                         onChange={this.handleChange.bind(this)}/>
                             <HelpBlock>Help here</HelpBlock>
                        </FormGroup>
                        <Button type="submit" >
                            Submit
                        </Button>
                    </form>
                </Col>
            </Row>
        </div>

        );
    }
    _handleValidSubmit(values) {
        // Values is an object containing all values
        // from the inputs
    }

    _handleInvalidSubmit(errors, values) {
        // Errors is an array containing input names
        // that failed to validate
    }
}

const rowStyles = {
    paddingTop: '100px'
};