import React from 'react'
import DashboardHashTracking from './DashboardHashTracking'

export default class DashboardFalsePositives extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <DashboardHashTracking type="FP"/>
        )
    }
}