import React from 'react'
import Authorization from './../utils/Authorization'
import { connect } from 'react-redux'
import { fetchHashTracking, fetchCommentsForEfficacyMetrics, saveCommentsForEfficacyMetrics, fetchUniqueComments } from './../redux/actions/hashTrackingES'
import ReactTable from 'react-table'
import ReactSpinner from 'reactjs-spinner'
import Suggestion from './autosuggest/Suggestion'
import * as RB from 'react-bootstrap'
import update from 'react-addons-update'

@connect((store) => {
    return {
        fetchedData: store.hashTracking.fetchedData,
        fetchedComments: store.hashTracking.fetchedComments,
        fetchedUniqueComments: store.hashTracking.fetchedUniqueComments,

        data: store.hashTracking.data,
        comments: store.hashTracking.comments,
        uniqueComments: store.hashTracking.uniqueComments,
    }
})
class Dashboard2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            formatteddata:{
                list: []
            },
            autosuggest:{},
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
        this.props.dispatch(fetchCommentsForEfficacyMetrics());
        this.props.dispatch(fetchUniqueComments());
        if(this.props.fetchedComments && this.props.fetchedData){
            this.setState({showModal: false});
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.fetchedComments && nextProps.fetchedData && nextProps.fetchedUniqueComments) {
            console.log(nextProps);
            let formatteddata = update(this.state.formatteddata,
                {
                    $merge: {
                        list: nextProps.data
                    }
                }
            );
            formatteddata = this.addSupplementInfo(formatteddata, nextProps.comments);
            console.log(formatteddata);
            this.setState({
                formatteddata: formatteddata,
                autosuggest: nextProps.uniqueComments
            });
        }
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
    autoSuggestChanged(id, value, type){
        //TODO: persist
        let values = new Map();
        values.set('comment', null);
        values.set('reason', null);
        values.set('mitigation', null);
        let keysToCheck = new Set(["mitigation", "reason", "comment"]);
        let keyJustChanged = new Set([type]);
        let difference = new Set(
            [...keysToCheck].filter(x => !keyJustChanged.has(x)));

        for(let k of difference.keys()){
            let obj = this.state.formatteddata.list.filter(l => l._id == id)[0];
            values.set(k, (obj[k]==undefined?'':obj[k]));
        }
        //modify the state
        this.state.formatteddata.list.filter(l => l._id == id)[0][type] = value;
        //modify the data structure
        values.set(type, value);

        console.log(`Autosuggest changed ${id} and ${values} and ${type}....`);
        this.props.dispatch(saveCommentsForEfficacyMetrics(id, values));
    }
    addSupplementInfo(data, mockComments){
        mockComments.forEach((mockComment)=>{
            let id = mockComment.id;
            let reason = mockComment.reason;
            let comment = mockComment.comment;
            let mitigation = mockComment.mitigation;
            for(let k in data.list){
                if(data.list[k]._id == id){
                    data.list[k]['reason'] = reason;
                    data.list[k]['comment'] = comment;
                    data.list[k]['mitigation'] = mitigation;
                }
            }
        });
        return data;
    }
    getSuggestions(type){
        let suggestions = [];
        for(let k in this.state.autosuggest[type]){
            suggestions.push({name: this.state.autosuggest[type][k],
                value: this.state.autosuggest[type][k]});
        }
        return suggestions;
    }
    getLastUpdatedBy(id){
        let lastUpdatedBy = '';
        try {
            lastUpdatedBy = this.props.comments.filter(comment => comment.id == id)[0].auditList.pop().user.name;
        }catch(err){
            // let lastUpdatedBy = '';
        }finally{
            return lastUpdatedBy;
        }
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
        if(this.props.fetchedComments && this.props.fetchedData && this.props.fetchedUniqueComments){
            const columns = [{
                Header: 'Id',
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
                            type="reason"
                            reportChange={this.autoSuggestChanged.bind(this)}
                            value={this.getPropForKey(props.value, "reason")}
                            suggestions={this.getSuggestions("reason")} />
                    </div>
            },{
                Header: 'Comment',
                accessor: '_id',
                Cell: props =>
                    <div>
                        <Suggestion
                            id={props.value}
                            type="comment"
                            reportChange={this.autoSuggestChanged.bind(this)}
                            value={this.getPropForKey(props.value, "comment")}
                            suggestions={this.getSuggestions("comment")} />
                    </div>

            },{
                Header: 'Mitigation',
                accessor: '_id',
                Cell: props =>
                    <div>
                        <Suggestion
                            id={props.value}
                            type="mitigation"
                            reportChange={this.autoSuggestChanged.bind(this)}
                            value={this.getPropForKey(props.value, "mitigation")}
                            suggestions={this.getSuggestions("mitigation")} />
                    </div>
            },{
                Header: 'Last Changed By',
                accessor: '_id',
                Cell: props =>
                    <span className='center-block'>
                        {this.getLastUpdatedBy(props.value)}
                    </span>
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