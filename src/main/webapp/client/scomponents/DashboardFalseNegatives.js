import React from 'react'
import DashboardHashTracking from './DashboardHashTracking'

class DashboardFalseNegatives extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <DashboardHashTracking type="FN"/>
        )
    }
}