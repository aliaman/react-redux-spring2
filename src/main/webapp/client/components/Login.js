import React, { Component, PropTypes } from 'react';
import LoginForm from './../scomponents/forms/LoginForm';
import SimpleValidationForm from './../scomponents/forms/SimpleValidationForm';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            // <SimpleValidationForm onSubmit={this.handleSubmit} />
            <LoginForm/>
        );

    }
}