import React from 'react';
import ReactSpinner from 'reactjs-spinner'

export default class SpinnerMain extends React.Component{
    render() {
        const style = {
            marginTop: '140px',
        };
        return (
            <div style={style}>
                <ReactSpinner size={50} borderColor={"#f3f3f3"} borderTopColor={"#3498db"} />
            </div>
        );
    }
}

