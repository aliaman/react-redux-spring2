import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import LoginForm from './../scomponents/forms/LoginForm';

export default class Login extends React.Component {
    render(){
        return(
            <div className="container">
                <Row style={rowStyles}>
                    <Col lg={6} lgOffset={3}>
                        <h1 className="ssv-big-bold-label">Login</h1>
                        <LoginForm/>
                    </Col>
                </Row>
            </div>
        )
    }
}
const rowStyles = {
    paddingTop: '100px'
};