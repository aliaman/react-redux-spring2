import React from 'react';
import { Row, Col, FormGroup, Form, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { doLogin } from './../../redux/actions/login'

function FieldGroup({ id, label, help, value, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} value={value} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}
const rowStyles = {
    paddingTop: '100px'
};



@connect((store) => {
    return {
        username: store.login.username,
        password: store.login.password
    }
})
export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }
    login(event){
        event.preventDefault();
        this.props.dispatch(doLogin());
    }
    componentWillMount() {
        console.log(JSON.stringify(this.props));
        this.props.dispatch(doLogin());
    }
    render() {
        return (
        <div className="container">
            <Row style={rowStyles}>
                <Col lg={6} lgOffset={3}>
                    <h1 className="symheading">Login</h1>
                    <form onSubmit={this.login}>
                        <FieldGroup
                            id="formControlsEmail"
                            type="email"
                            label="Email address"
                            value={this.props.username}
                            placeholder="Enter email"
                        />
                        <FieldGroup
                            id="formControlsPassword"
                            label="Password"
                            type="password"
                        />
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