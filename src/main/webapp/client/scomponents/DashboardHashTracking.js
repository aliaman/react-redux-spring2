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
class DashboardHashTracking extends React.Component {
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
            formatteddata:{
                list: []
            },
            showModal: false,
            autosuggest:{},
            selectedHash: []
        }
    }
    componentWillMount(){
        this.props.dispatch(fetchHashTracking(this.props.type));
        this.props.dispatch(fetchCommentsForEfficacyMetrics(this.props.type));
        this.props.dispatch(fetchUniqueComments(this.props.type));
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
    formatComment(arr){
        let a = [];
        for(let k in arr){
            a.push({"name": arr[k], "value": arr[k]});
        }
        return a;
    }
    autoSuggestChanged(idd, value, type){
        let id = this.state.selectedHash[0]._id;
        this.props.dispatch(saveCommentsForEfficacyMetrics(this.props.type, id, values, userObj.id));
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
        this.setState({selectedHash: s._rows});
    }
    deleteUser(){

    }
    newUser(){

    }
    edit(){
        this.open();
    }
    submitedit(event){
        event.preventDefault();
        console.log(this.state.selectedHash[0].comment);
        console.log(this.state.selectedHash[0].reason);
        console.log(this.state.selectedHash[0].mitigation);
    }
    handleChange(){

    }
    render() {
        const rowStyles = {
            paddingTop: '100px'
        };
        const style = {
            marginTop: '140px',
        };
        const rowmargin = {
            paddingBottom: 10
        };
        if(this.props.fetchedComments && this.props.fetchedData){
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
                                disabled = {this.state.selectedHash.length == 0}
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
                    {this.renderOverlay()}
                </div>
            );
        }else{
            return (<div style={style}>
                <ReactSpinner size={50} borderColor={"#f3f3f3"} borderTopColor={"#3498db"} />
            </div>);
        }
    }
    getSuggestionValue(value){
        return value
    }
    renderOverlay(){
        const dialogStyle = function() {
            return {
                padding: 20
            };
        };
        const backdropStyle = {
            ...modalStyle,
            zIndex: 'auto',
            backgroundColor: '#000',
            opacity: 0.5
        };
        const modalStyle = {
            position: 'fixed',
            zIndex: 1040,
            top: 0, bottom: 0, left: 0, right: 0
        };
        if(this.state.selectedHash.length==1 && this.props.fetchedUniqueComments===true){
            return(
                <RB.Modal
                    aria-labelledby='modal-label'
                    style={modalStyle}
                    backdropStyle={backdropStyle}
                    show={this.state.showModal}
                    onHide={this.close.bind(this)}
                >

                    <div style={dialogStyle()} >
                        <div className="right" onClick={this.close.bind(this)}>
                            <span className="glyphicon glyphicon-eject"></span>
                        </div>
                        <RB.Row>
                            <RB.Col lg={12} lgOffset={0}>
                                <h3 className="symheading">Edit Remarks</h3>
                                <div className="error">{this.state.error}</div>
                                <RB.Form horizontal onSubmit={this.submitedit.bind(this)}>
                                    <RB.FormGroup>
                                        <RB.Col sm={2}>
                                            <span className="hformspan">ID</span>
                                        </RB.Col>
                                        <RB.Col sm={10}>
                                            <span className="hformanswer">{this.state.selectedHash[0]._id}</span>
                                        </RB.Col>
                                    </RB.FormGroup>
                                    <RB.FormGroup controlId="comment">
                                        <RB.Col sm={2}>
                                            <span className="hformspan lh">Comment</span>
                                        </RB.Col>
                                        <RB.Col sm={10}>
                                            <Suggestion
                                                id="comment"
                                                type="comment"
                                                reportChange={this.autoSuggestChanged.bind(this)}
                                                value={this.state.selectedHash[0].comment}
                                                suggestions={this.formatComment(this.state.autosuggest.comment)}
                                                />
                                        </RB.Col>
                                    </RB.FormGroup>
                                    <RB.FormGroup controlId="reason">
                                        <RB.Col sm={2}>
                                            <span className="hformspan lh">Reason</span>
                                        </RB.Col>
                                        <RB.Col sm={10}>
                                            <Suggestion
                                                id="reasaon"
                                                type="reason"
                                                reportChange={this.autoSuggestChanged.bind(this)}
                                                value={this.state.selectedHash[0].reason}
                                                suggestions={this.formatComment(this.state.autosuggest.reason)}
                                            />
                                        </RB.Col>
                                    </RB.FormGroup>
                                    <RB.FormGroup controlId="mitigation">
                                        <RB.Col sm={2}>
                                            <span className="hformspan lh">Mitigation</span>
                                        </RB.Col>
                                        <RB.Col sm={10}>
                                            <Suggestion
                                                id="mitigation"
                                                type="mitigation"
                                                reportChange={this.autoSuggestChanged.bind(this)}
                                                value={this.state.selectedHash[0].mitigation}
                                                suggestions={this.formatComment(this.state.autosuggest.mitigation)}
                                            />
                                        </RB.Col>
                                    </RB.FormGroup>
                                    <div className="right">
                                        <RB.Button type="submit"
                                                   bsStyle="primary">
                                            Save Remarks
                                        </RB.Button>
                                    </div>
                                </RB.Form>
                            </RB.Col>
                        </RB.Row>
                    </div>
                </RB.Modal>
            )
        }
    }

}
export default Authorization(DashboardHashTracking, ['ADMINISTRATOR', 'ANALYST'])