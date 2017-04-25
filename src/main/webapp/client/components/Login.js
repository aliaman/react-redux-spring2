import React, { Component, PropTypes } from 'react';
import LoginForm from './../scomponents/forms/LoginForm';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <LoginForm />
        )
    }
}