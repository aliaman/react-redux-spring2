import React from 'react'
import Authorization from './../utils/Authorization'
import { connect } from 'react-redux'
import { fetchHashTracking } from './../redux/actions/hashTrackingES'
import ReactTable from 'react-table'
import ReactSpinner from 'reactjs-spinner'


@connect((store) => {
    return {
        data: store.hashTracking.data
    }
})
class Dashboard2 extends React.Component {
    componentWillMount(){
        this.props.dispatch(fetchHashTracking("FP"));
    }
    render() {
        const style = {
            marginTop: '140px',
        };
        const columns = [{
            Header: 'Id',
            accessor: '_id' // String-based value accessors!
        },{
            Header: 'Index',
            accessor: '_index' // String-based value accessors!
        },{
            Header: 'Score',
            accessor: '_score' // String-based value accessors!
        },{
            Header: 'Customer',
            accessor: '_source.customer' // String-based value accessors!
        },{
            Header: 'Disposition',
            accessor: '_source.merlin.disposition_type' // String-based value accessors!
        },{
            Header: 'Type',
            accessor: '_type',
        },{
            Header: 'Hash',
            accessor: '_source.sha256',
        },{
            Header: 'Mime',
            accessor: '_source.mime_type',
        },{
            Header: 'Task Id',
            accessor: '_source.task_id',
        },{
            Header: 'Timestamp',
            accessor: '_source.timestamp',
        },{
            Header: 'Site',
            accessor: '_source.site',
        },{
            Header: 'Reputation',
            accessor: '_source.retrospective.reputation',
        }];
        if(this.props.data!=null){
            return (
                <div>
                    <h3>False Positives</h3>
                    <h4 className="compactHeading">Sample Hash Tracking</h4>
                    <ReactTable
                        data={this.props.data}
                        columns={columns}
                        defaultPageSize={10}
                    />
                </div>
            );
        }else{
            return (<div style={style}>
                <ReactSpinner size={50} borderColor={"#f3f3f3"} borderTopColor={"#3498db"} />
            </div>);
        }
    }
}
export default Authorization(Dashboard2, ['ADMINISTRATOR'])