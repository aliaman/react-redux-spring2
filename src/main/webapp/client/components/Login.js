import React from 'react';
import { Row, Col } from 'react-bootstrap';
import LoginForm from './../scomponents/forms/LoginForm';

export default class Login extends React.Component {
    render(){
        return(
            <div className="container">
                <Row>
                    <Col lg={6} lgOffset={3}>
                        <h1 className="ssv-big-bold-label">Login</h1>
                        <LoginForm/>
                    </Col>
                </Row>
            </div>
        )
    }
}