import React from 'react';
import ls from 'localstorage-ttl';
import * as ReactBootstrap from 'react-bootstrap'
import { Link } from 'react-router'

export default class LogOut extends React.Component {
    componentWillMount(){
        ls.set("auth", null);
    }
    render() {
        return(
        <ReactBootstrap.Row className="paddedRow">
            <ReactBootstrap.Col lg={6} lgOffset={3}>
                <h3>You are logged out. <Link to="/login">Click here</Link> to login.</h3>
            </ReactBootstrap.Col>
        </ReactBootstrap.Row>
        );
    }
}
