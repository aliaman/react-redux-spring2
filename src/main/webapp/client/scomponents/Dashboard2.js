import React from 'react'
import Authorization from './../utils/Authorization'
import { connect } from 'react-redux'
import { fetchHashTracking } from './../redux/actions/hashTrackingES'
import ReactTable from 'react-table'
import ReactSpinner from 'reactjs-spinner'
import * as RB from 'react-bootstrap'

@connect((store) => {
    return {
        data: store.hashTracking.data,
        selectedHash: store.hashTracking.selectedHash
    }
})
class Dashboard2 extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.dispatch(fetchHashTracking("FN"));
        this.setState({showModal: false});
    }
    componentWillReceiveProps(nextProps){
        this.setState(nextProps);
    }
    handleClick(id, event){
        this.setState({
            selectedHash: this.props.data.filter(hash => hash._id == id)[0]
        })
        this.open();
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
            return {
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
                    <RB.Modal
                        aria-labelledby='modal-label'
                        style={modalStyle}
                        backdropStyle={backdropStyle}
                        show={this.state.showModal}
                        onHide={this.close.bind(this)}
                    >
                        <div style={dialogStyle()} >
                            <span onClick={this.close.bind(this)}>
                                <span className="glyphicon glyphicon-eject"></span>
                            </span>
                            <h4>Hash Details</h4>
                            <p/>
                            <div>Id: {this.state.selectedHash._id}</div>
                            <div>Index: {this.state.selectedHash._index}</div>
                            <div>Score: {this.state.selectedHash._score}</div>
                            <div>Customer: {this.state.selectedHash._source.customer}</div>
                            <div>Disposition: {this.state.selectedHash._source.merlin.disposition_type}</div>
                            <div>Type: {this.state.selectedHash._type}</div>
                            <div>SHA256: {this.state.selectedHash._source.sha256}</div>
                            <div>Mime Type: {this.state.selectedHash._source.mime_type}</div>
                            <div>Task Id: {this.state.selectedHash._source.task_id}</div>
                            <div>Timestamp: {this.state.selectedHash._source.timestamp}</div>
                            <div>Site: {this.state.selectedHash._source.site}</div>
                            <div>Reputation: {this.state.selectedHash._source.retrospective.reputation}</div>
                        </div>
                    </RB.Modal>
                </div>
            );
        }else{
            return (<div style={style}>
                <ReactSpinner size={50} borderColor={"#f3f3f3"} borderTopColor={"#3498db"} />
            }</div>);
        }
    }
}
export default Authorization(Dashboard2, ['ADMINISTRATOR'])