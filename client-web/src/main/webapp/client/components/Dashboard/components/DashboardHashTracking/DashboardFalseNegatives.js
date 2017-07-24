import React from 'react'
import DashboardHashTracking from './DashboardHashTracking'
import * as RB from 'react-bootstrap'

export default class DashboardFalseNegatives extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <RB.Row>
                    <RB.Col md={12}>
                        <h3>False Negatives Hash Tracking</h3>
                    </RB.Col>
                </RB.Row>
                <DashboardHashTracking type="FN"/>
            </div>
        )
    }
}