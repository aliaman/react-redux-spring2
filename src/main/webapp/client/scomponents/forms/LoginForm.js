import React from 'react';
import { Row, Col, FormGroup, Form, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { doLogin } from './../../redux/actions/login'
import { hashHistory } from 'react-router';

@connect((store) => {
    return {
        userObj: store.login.userObj,
        authenticated: store.login.authenticated,
        error: store.login.error
    }
})
export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps){
        this.setState(
            {
                userObj: nextProps.userObj,
                error: nextProps.error,
                authenticated: nextProps.authenticated
            },
            () => {
                if(this.state.authenticated){
                    //TODO: Fwd to roles homepage instead of hardcoded link
                    hashHistory.push('/dash');
                }
            }
        );
    }
    login(event){
        this.props.dispatch(doLogin(this.state.userObj.email, this.state.userObj.password));
        event.preventDefault();
    }
    componentWillMount() {
        this.setState({
            userObj: this.props.userObj,
            error: this.props.error,
            authenticated: this.props.authenticated
        });
    }
    handleChange (event){
        let varVal = this.state.userObj;
        varVal[event.target.id] = event.target.value;
        this.setState({
            userObj: varVal
        });
    }
    render() {
        return (
        <div className="container">
            <Row style={rowStyles}>
                <Col lg={6} lgOffset={3}>
                    <h1 className="symheading">Login</h1>
                    <div className="error">{this.state.error}</div>
                    <form onSubmit={this.login.bind(this)}>
                        <FormGroup>
                            <ControlLabel>Email address</ControlLabel>
                            <FormControl id="email"
                                         type="text"
                                         placeholder="Enter email"
                                         value={this.state.userObj.email}
                                         onChange={this.handleChange.bind(this)}/>
                        </FormGroup>
                        <FormGroup controlId="password">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl id="password"
                                         type="password"
                                         value={this.state.userObj.password}
                                         onChange={this.handleChange.bind(this)}/>
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