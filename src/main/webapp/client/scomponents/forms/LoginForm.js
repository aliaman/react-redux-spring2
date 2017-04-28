import React from 'react';
import { Row, Col, FormGroup, Form, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { doLogin } from './../../redux/actions/login'

@connect((store) => {
    return {
        username: store.login.username,
        password: store.login.password
    }
})
export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }
    login(event){
        event.preventDefault();
        this.props.dispatch(doLogin());
    }
    componentWillMount() {

    }
    handleChange (event){
        this.setState({ [event.target.id]: event.target.value });
    }
    render() {
        return (
        <div className="container">
            <Row style={rowStyles}>
                <Col lg={6} lgOffset={3}>
                    <h1 className="symheading">Login</h1>
                    <form onSubmit={this.login}>
                        <FormGroup controlId="username">
                            <ControlLabel>Email address</ControlLabel>
                            <FormControl id="username"
                                         type="text"
                                         placeholder="Enter email"
                                         value={this.state.username}
                                         onChange={this.handleChange.bind(this)}/>
                            <HelpBlock>Help here</HelpBlock>
                        </FormGroup>
                        <FormGroup controlId="password">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl id="password"
                                         type="password"
                                         value={this.state.password}
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