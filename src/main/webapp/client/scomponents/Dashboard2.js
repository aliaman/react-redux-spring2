import React from 'react'
import Authorization from './../utils/Authorization'
import { connect } from 'react-redux'
import { fetchHashTracking } from './../redux/actions/hashTrackingES'
import ReactTable from 'react-table'
import ReactSpinner from 'reactjs-spinner'
import * as RB from 'react-bootstrap'

@connect((store) => {
    return {
        data: store.hashTracking.data
    }
})
class Dashboard2 extends React.Component {
    Dashboard2(){
        this.setState({showModal: false})
    }
    componentWillMount(){
        this.props.dispatch(fetchHashTracking("FN"));
    }
    handleClick(event, id){
        console.log(event);
    }
    close(){
        this.setState({ showModal: false });
    }
    open(){
        this.setState({ showModal: true });
    }
    render() {
        const style = {
            marginTop: '140px',
        };
        const modalStyle = {
            position: 'fixed',
            zIndex: 1040,
            top: 0, bottom: 0, left: 0, right: 0
        };

        const backdropStyle = {
            ...modalStyle,
            zIndex: 'auto',
            backgroundColor: '#000',
            opacity: 0.5
        };

        const dialogStyle = function() {
            // we use some psuedo random coords so nested modals
            // don't sit right on top of each other.
            let top = 50 + rand();
            let left = 50 + rand();

            return {
                position: 'absolute',
                width: 400,
                top: top + '%', left: left + '%',
                transform: `translate(-${top}%, -${left}%)`,
                border: '1px solid #e5e5e5',
                backgroundColor: 'white',
                boxShadow: '0 5px 15px rgba(0,0,0,.5)',
                padding: 20
            };
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
        },{
            Header: '',
            accessor: '_id',
            Cell: props => <span className='center-block'>
                <RB.Button className="inline__edit" onClick={this.handleClick.bind(this, props.value)}>
                    <span className="glyphicon glyphicon-edit"></span>
                </RB.Button>
            </span>
        }];
        if(this.props.data!=null){
            return (
                <div>
                    <h3>False Negatives</h3>
                    <h4 className="compactHeading">Sample Hash Tracking</h4>
                    <ReactTable
                        className="-striped -highlight"
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