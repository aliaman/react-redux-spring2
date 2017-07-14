import React from 'react'
import * as RB from 'react-bootstrap'
import DateRangePicker from './component/DateRangePicker'

export default class DateRangeAndGoBtn{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div>
                <div className="dpdiv">
                    <DateRangePicker
                        {...this.state.dp}
                        clickHandler={this.props.handleApply} />
                </div>
                <RB.Button
                    className="goBtn"
                    bsStyle="primary"
                    onClick={this.props.fetchData.bind(this)}>
                    Go
                </RB.Button>
            </div>
        )
    }
}