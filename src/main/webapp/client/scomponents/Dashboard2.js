import React from 'react'
import Authorization from './../utils/Authorization'
import { connect } from 'react-redux'
import { fetchHashTracking, fetchCommentsForEfficacyMetrics, saveCommentsForEfficacyMetrics, fetchUniqueComments } from './../redux/actions/hashTrackingES'
import ReactTable from 'react-table'
import ReactSpinner from 'reactjs-spinner'
import Suggestion from './autosuggest/Suggestion'
import * as RB from 'react-bootstrap'
import update from 'react-addons-update'
import ls from 'localstorage-ttl'
import DateRangePicker from './component/DateRangePicker'
import moment from 'moment'
import HashTracking from '../scomponents/tables/HashTracking'

@connect((store) => {
    return {
        fetchedData: store.fnHashTracking.fetchedData,
        fetchedComments: store.fnHashTracking.fetchedComments,
        fetchedUniqueComments: store.fnHashTracking.fetchedUniqueComments,

        data: store.fnHashTracking.data,
        comments: store.fnHashTracking.comments,
        uniqueComments: store.fnHashTracking.uniqueComments,
    }
})
class Dashboard2 extends React.Component {
    constructor(props){
        super(props);
        this.handleApply = this.handleApply.bind(this);
        this.state = {
            selectedRows:[],
            dp: {
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                width: 200,
                maxDate: moment(),
                startDate: moment().startOf('day').subtract(96, 'days'),
                endDate: moment().endOf('day').subtract(90, 'days'),
            },
            type: "FN",
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
        this.props.dispatch(fetchHashTracking(this.state.type));
        this.props.dispatch(fetchCommentsForEfficacyMetrics(this.state.type));
        this.props.dispatch(fetchUniqueComments(this.state.type));
        if(this.props.fetchedComments && this.props.fetchedData){
            this.setState({showModal: false});
        }
    }
    flatten(data){
        for(let l in data){
            for(let k in data[l]._source){
                if(! (data[l]._source[k] instanceof Object)) {
                    data[l][k] = data[l]._source[k];
                }
            }
        }
        return data;
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.fetchedComments && nextProps.fetchedData && nextProps.fetchedUniqueComments) {
            let formatteddata = this.flatten(nextProps.data);
            formatteddata = update(formatteddata,
                {
                    $merge: {
                        list: nextProps.data
                    }
                }
            );
            formatteddata = this.addSupplementInfo(formatteddata, nextProps.comments);
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
        let obj = {};
        try{
            obj = this.state.formatteddata.list.filter((record)=>record._id == id)[0];
        }catch(err){
            console.log(err);
        }finally{
            return (obj[key]==undefined?'':obj[key]);
        }
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
        let userObj = ls.get("auth");
        userObj = JSON.parse(userObj);
        this.props.dispatch(saveCommentsForEfficacyMetrics(this.state.type, id, values, userObj.id));
    }
    addSupplementInfo(data, mockComments){
        let supplementalids = ["c_id", "m_id", "l_id", "r_id", "a_id"];
        for(let k in data.list) {
            for (let l in supplementalids) {
                data.list[k][supplementalids[l]] = data.list[k]._id;
            }
        }
        mockComments.forEach((mockComment)=>{
            let id = mockComment.id;
            let reason = mockComment.reason;
            let comment = mockComment.comment;
            let mitigation = mockComment.mitigation;
            for(let m in data.list){
                if(data.list[m]._id == id){
                    data.list[m]['reason'] = reason;
                    data.list[m]['comment'] = comment;
                    data.list[m]['mitigation'] = mitigation;
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
    //this function is a handler for the datetime range picker
    handleApply(event, picker) {
        this.setState({
            dp: Object.assign({}, this.state.dp, {
                startDate: picker.startDate,
                endDate: picker.endDate
            })
        });
    }
    onRowSelect(s){
        let selectedRows = this.state.selectedRows;
        if(s.selected) {
            for (let k in s.rows) {
                let id = s.rows[k]._id;
                if(selectedRows.find(user => user._id == id ) == undefined){
                    selectedRows.push(s.rows[k]);
                }
            }
        }
        if(! s.selected){
            for (let k in s.rows) {
                let id = s.rows[k]._id;
                let index = selectedRows.findIndex(user => user._id == id);
                selectedRows.splice(index, 1);
            }
        }
        this.setState({selectedRows: selectedRows});
    }
    deleteUser(){

    }
    newUser(){

    }
    edit(){

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
        const rowmargin = {
            paddingBottom: 10
        };
        const applyMargin = {
            marginRight: 5
        };
        if(this.props.fetchedComments && this.props.fetchedData && this.props.fetchedUniqueComments){
            return (
                <div>
                    <RB.Row>
                        <RB.Col md={4}>
                            <h3>False Negatives</h3>
                        </RB.Col>
                    </RB.Row>
                    <RB.Row style={rowmargin}>
                        <RB.Col md={4} mdOffset={0}>
                            <div className="dpdiv">
                                <DateRangePicker
                                    {...this.state.dp}
                                    clickHandler={this.handleApply} />
                            </div>
                            <RB.Button
                                className="goBtn"
                                bsStyle="primary"
                                onClick={this.edit.bind(this)}>
                                Go
                            </RB.Button>
                        </RB.Col>
                        <RB.Col md={2} mdOffset={6}>
                            <RB.Button
                                className="actionBtn"
                                bsStyle="primary"
                                disabled = {this.state.selectedRows.length == 0}
                                onClick={this.edit.bind(this)}>
                                Edit Remarks
                            </RB.Button>
                        </RB.Col>
                    </RB.Row>
                    <RB.Row>
                        <RB.Col md={12}>
                            <HashTracking
                                data={ this.state.formatteddata.list }
                                onRowSelect={ this.onRowSelect.bind(this)}
                            />
                        </RB.Col>
                    </RB.Row>
                </div>
            );
        }else{
            return (<div style={style}>
                <ReactSpinner size={50} borderColor={"#f3f3f3"} borderTopColor={"#3498db"} />
            </div>);
        }
    }
}
export default Authorization(Dashboard2, ['ADMINISTRATOR', 'ANALYST'])