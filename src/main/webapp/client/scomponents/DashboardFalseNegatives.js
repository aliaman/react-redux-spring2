import React from 'react'
import DashboardHashTracking from './DashboardHashTracking'

export default class DashboardFalseNegatives extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <DashboardHashTracking type="FN"/>
        )
    }
}