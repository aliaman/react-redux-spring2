import React from 'react'

export default class SplashScreen extends React.Component {
    render() {
        return (
            <div className="section-body">
                <img className="is--inline is--front-image" src="/client/public/images/symantec-logo.png" alt="" width="142"/>
                <h1 className="is--inline">Cynic</h1>
                <small style={smallStyle}>Cynic Copyright Symantec All Rights Reserved</small>
            </div>
        )
    }
}
const smallStyle = {
    display: 'block',
    paddingTop: '25px'
}