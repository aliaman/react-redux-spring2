import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class error extends React.Component{
    constructor(props){
        super(props);
        this.state = {...this.props};
    }
    removeError(){
        this.setState({
            error: '',
            showError: false,
        });
    }
    render(){
        return(
            <ReactCSSTransitionGroup
                transitionName="errorz"
                transitionAppear={true}
                transitionLeave={true}
                transitionEnterTimeout={300}
                transitionAppearTimeout={300}
                transitionLeaveTimeout={300}
            >
                { this.state.showError ? <div onClick={this.removeError.bind(this)} className="Select-clear-zone left"><span className="Select-clear">x</span></div> : null }
                <div className="errorz left">{this.state.error}</div>
            </ReactCSSTransitionGroup>
        )
    }
}