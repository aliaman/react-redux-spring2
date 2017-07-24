import React, { Component, PropTypes } from 'react';
import LoginForm from './LoginForm';
import { Row, Col, FormGroup, Form, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const rowStyles = {
            paddingTop: '100px'
        };
        return (
            <div className="container">
                <Row style={rowStyles}>
                    <Col lg={6} lgOffset={3}>
                        <h1 className="symheading">Login</h1>
                        <LoginForm/>
                    </Col>
                </Row>
            </div>
        );

    }
}