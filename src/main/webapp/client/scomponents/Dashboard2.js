import React from 'react'
import Authorization from './../utils/Authorization'
import { connect } from 'react-redux'
import { fetchHashTracking } from './../redux/actions/hashTrackingES'
import ReactTable from 'react-table'
import ReactSpinner from 'reactjs-spinner'
import Suggestion from './autosuggest/Suggestion'
import * as RB from 'react-bootstrap'
import update from 'react-addons-update'

@connect((store) => {
    return {
        data: store.hashTracking.data
    }
})
class Dashboard2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            formatteddata:{
                list: []
            },
            autosuggest:{
                reason: [{
                            name: "Reason1",
                            value: "Reason1"
                        },{
                            name: "Reason2",
                            value: "Reason2"
                        },{
                            name: "Reason3",
                            value: "Reason3"
                        },{
                            name: "Reason4",
                            value: "Reason4"
                        },{
                            name: "Reason5",
                            value: "Reason5"
                        },{
                            name: "Reason6",
                            value: "Reason6"
                        },
                    ],
                comment:[{
                            name: "Comment1",
                            value: "Comment1"
                        },{
                            name: "Comment2",
                            value: "Comment2"
                        },{
                            name: "Comment3",
                            value: "Comment3"
                        },{
                            name: "Comment4",
                            value: "Comment4"
                        },{
                            name: "Comment5",
                            value: "Comment5"
                        },{
                            name: "Comment6",
                            value: "Comment6"
                        },
                    ],
                mitigation:[{
                            name: "Mitigation1",
                            value: "Mitigation1"
                        },{
                            name: "Mitigation2",
                            value: "Mitigation2"
                        },{
                            name: "Mitigation3",
                            value: "Mitigation3"
                        },{
                            name: "Mitigation4",
                            value: "Mitigation4"
                        },{
                            name: "Mitigation5",
                            value: "Mitigation5"
                        },{
                            name: "Mitigation6",
                            value: "Mitigation6"
                        },
                    ]
                },
            selectedHash: {
                "_index": "",
                "_type": "",
                "_id": "",
                "_score": 0,
                "_source": {
                    "conviction_time": "",
                    "merlin": {
                        "disposition_type": "",
                        "versions": {
                            "merlin": "",
                            "merlin_rules": ""
                        },
                        "is_targeted": 0,
                        "score": 0,
                        "applicable_rules": ""
                    },
                    "customer": "",
                    "sha256": "",
                    "broken": 0,
                    "mime_type": "",
                    "conviction": "",
                    "task_id": "",
                    "timestamp": "",
                    "site": "",
                    "retrospective": {
                        "reputation": 0
                    }
                }
            }
        }
    }
    componentWillMount(){
        this.props.dispatch(fetchHashTracking("FN"));
        this.setState({showModal: false});
    }
    componentWillReceiveProps(nextProps){
        let formatteddata = update(this.state.formatteddata,
            {
                $merge: {
                    list: nextProps.data
                }
            }
        );
        formatteddata = this.addSupplementInfo(formatteddata);
        console.log(formatteddata);
        this.setState({
            formatteddata: formatteddata
        });
    }
    handleClick(id, event){
        this.setState({
            selectedHash: this.props.data.filter(hash => hash._id == id)[0]
        });
        this.open();
    }
    close(){
        this.setState({ showModal: false });
    }
    open(){
        this.setState({ showModal: true });
    }
    getPropForKey(id, key){
        let obj = this.state.formatteddata.list.filter((record)=>record._id == id)[0];
        return (obj[key]==undefined?'':obj[key]);
    }
    autoSuggestChanged(id, value){
        //TODO: persist
        console.log(`Autosuggest changed ${id} and ${value}...`)
    }
    addSupplementInfo(data){
        const mockComments = [{
            id: 'AVpsJE09t84KCCnldNvB',
            reason: 'Reason reason reason',
            comment: 'RandomComment'
        },{
            id: 'AVpr8JKVq-zzx-zFhWpZ',
            reason: 'Reason2 reason reason'
        }];

        mockComments.forEach((mockComment)=>{
            let id = mockComment.id;
            let reason = mockComment.reason;
            let comment = mockComment.comment;
            for(let k in data.list){
                if(data.list[k]._id == id){
                    data.list[k]['reason'] = reason;
                    data.list[k]['comment'] = comment;
                }
            }
        });
        return data;
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
            show: false,
            accessor: '_id' // String-based value accessors!
        },{
            Header: 'Timestamp',
            accessor: '_source.timestamp',
        },{
            Header: 'Hash',
            accessor: '_source.sha256',
        },{
            Header: 'Task Id',
            accessor: '_source.task_id',
        },{
            Header: 'Mime',
            accessor: '_source.mime_type',
        },{
            Header: 'Site',
            accessor: '_source.site',
        },{
            Header: 'Reputation',
            accessor: '_source.retrospective.reputation',
        },{
            Header: 'Reason',
            accessor: '_id',
            Cell: props =>
                <div>
                    <Suggestion
                        id={props.value}
                        reportChange={this.autoSuggestChanged.bind(this)}
                        value={this.getPropForKey(props.value, "reason")}
                        suggestions={this.state.autosuggest.reason} />
                </div>
        },{
            Header: 'Comment',
            accessor: '_id',
            Cell: props =>
                <div>
                    <Suggestion
                        id={props.value}
                        reportChange={this.autoSuggestChanged.bind(this)}
                        value={this.getPropForKey(props.value, "comment")}
                        suggestions={this.state.autosuggest.comment} />
                </div>

        },{
            Header: 'Mitigation',
            accessor: '_id',
            Cell: props =>
                <div>
                    <Suggestion
                        id={props.value}
                        reportChange={this.autoSuggestChanged.bind(this)}
                        value={this.getPropForKey(props.value, "mitigation")}
                        suggestions={this.state.autosuggest.mitigation} />
                </div>
        },{
            Header: '',
            accessor: '_id',
            Cell: props =>
                <span className='center-block'>
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
                        data={this.state.formatteddata.list}
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
            </div>);
        }
    }
}
export default Authorization(Dashboard2, ['ADMINISTRATOR'])