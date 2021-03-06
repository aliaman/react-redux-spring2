import React from 'react'
import Authorization from '../../../../utils/Authorization'
import { connect } from 'react-redux'
import { fetchHashTracking, fetchCommentsForEfficacyMetrics, saveCommentsForEfficacyMetrics, fetchUniqueComments } from '../../../../redux/actions/hashTrackingES/hashTrackingES'
import ReactSpinner from 'reactjs-spinner'
import Suggestion from '../../../../scomponents/autosuggest/Suggestion'
import * as RB from 'react-bootstrap'
import ls from 'localstorage-ttl'
import DateRangePicker from '../../../../scomponents/daterange/DateRangePicker'
import moment from 'moment'
import HashTracking from './HashTracking'
import Error from '../../../../scomponents/notifications/Error'


@connect((store) => {
    return {
        FN: {
            fetching: store.fnHashTracking.fetching,
            fetchedData: store.fnHashTracking.fetchedData,
            fetchedComments: store.fnHashTracking.fetchedComments,
            fetchedUniqueComments: store.fnHashTracking.fetchedUniqueComments,

            error: store.fnHashTracking.error,
            data: store.fnHashTracking.data,
            comments: store.fnHashTracking.comments,
            uniqueComments: store.fnHashTracking.uniqueComments,
        },
        FP: {
            fetching: store.fnHashTracking.fetching,
            fetchedData: store.fpHashTracking.fetchedData,
            fetchedComments: store.fpHashTracking.fetchedComments,
            fetchedUniqueComments: store.fpHashTracking.fetchedUniqueComments,

            error: store.fpHashTracking.error,
            data: store.fpHashTracking.data,
            comments: store.fpHashTracking.comments,
            uniqueComments: store.fpHashTracking.uniqueComments,
        }

    }
})
class DashboardHashTracking extends React.Component {
    constructor(props){
        super(props);
        this.handleApply = this.handleApply.bind(this);
        this.state = {
            selectedRows: [],
            fetching: false,
            dp: {
                width: 200,
                maxDate: moment(),
                startDate: moment().startOf('day').add(-96, 'days').utc(),
                endDate: moment().endOf('day').add(-90, "days").utc(),
            },
            formatteddata: [],
            showModal: false,
            autosuggest: {},
            selectedHash: []
        }

    }
    componentWillMount(){
        this.setState({
           fetching: this.props[this.props.type].fetching
        });
        if (this.props[this.props.type].fetchedComments && this.props[this.props.type].fetchedData) {
            this.setState({
                showModal: false,
                dp: Object.assign({}, this.state.dp, {
                    startDate: moment().startOf('day').subtract(96, 'days'),
                    endDate: moment().endOf('day').subtract(90, 'days')
                })
            });
        }
        //if(this.props[this.props.type].fetchedData==false) {
            this._fetchData();
            this.props.dispatch(fetchCommentsForEfficacyMetrics(this.props.type));
            this.props.dispatch(fetchUniqueComments(this.props.type));
        // }else{
        //     this.setDataState(this.props);
        // }
    }
    handleApply(event, picker) {
        this.setState({
            dp: Object.assign({}, this.state.dp, {
                startDate: picker.startDate,
                endDate: picker.endDate
            })
        });
    }
    _fetchData(){
        let end = this.state.dp.endDate.clone().add(0, "days").utc().valueOf();
        let start = this.state.dp.startDate.clone().add(0, "days").utc().valueOf();
        this.props.dispatch(fetchHashTracking(this.props.type, start, end));
    }
    fetchData(){
        this._fetchData()
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
        this.setDataState(nextProps);
    }
    setDataState(props){
        if (props[props.type].fetchedComments && props[props.type].fetchedData) {
            let formatteddata = this.flatten(props[this.props.type].data);
            formatteddata = this.addSupplementInfo(formatteddata, props[this.props.type].comments);
            this.setState({
                error: props[this.props.type].error,
                formatteddata: formatteddata,
                autosuggest: props[this.props.type].uniqueComments
            });
        }
    }
    close(){
        this.setState({ showModal: false });
    }
    open(){
        this.setState({ showModal: true });
    }
    formatComment(arr){
        let a = [];
        for(let k in arr){
            a.push({"name": arr[k], "value": arr[k]});
        }
        return a;
    }
    autoSuggestChanged(idd, value, type){
        let selectedHash = this.state.selectedHash;
        let formatteddata = this.state.formatteddata;
        formatteddata.find(data => data._id == selectedHash[0]._id)[type] = value;
        selectedHash[0][type] = value;
        this.setState({ selectedHash, formatteddata },
        function(){
            console.log(selectedHash);
        });
    }
    addSupplementInfo(data, mockComments){
        for(let m in data) {
            data[m]['reason'] = '';
            data[m]['comment'] = '';
            data[m]['mitigation'] = '';
        }
        mockComments.forEach((mockComment)=>{
            let id = mockComment.id;
            let reason = mockComment.reason;
            let comment = mockComment.comment;
            let mitigation = mockComment.mitigation;
            for(let m in data){
                if(data[m]._id == id){
                    data[m]['reason'] = reason;
                    data[m]['comment'] = comment;
                    data[m]['mitigation'] = mitigation;
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
    onRowSelect(s){
        this.setState(
            {selectedHash: s._rows},
            function () {
                console.log(this.state.selectedHash[0]);
            }
        );
    }
    edit(){
        this.open();
    }
    submitedit(event){
        let userObj = ls.get("auth");
        userObj = JSON.parse(userObj);
        let values = {
            'comment': this.state.selectedHash[0].comment,
            'reason': this.state.selectedHash[0].reason,
            'mitigation': this.state.selectedHash[0].mitigation,
        };
        let id = this.state.selectedHash[0]._id;
        this.props.dispatch(saveCommentsForEfficacyMetrics(this.props.type, id, values, userObj.id));
        this.close();
        event.preventDefault();
    }
    render() {
        const rowStyles = {
            paddingTop: '100px'
        };
        const style = {
            marginTop: '140px',
        };
        const rowmargin = {
            paddingBottom: 4
        };
        if(this.props[this.props.type].fetchedComments && this.props[this.props.type].fetchedData){
            return (
                <div>
                    <Error error={this.state.error} showError={ true } />
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
                                disabled={this.state.fetching}
                                onClick={this.fetchData.bind(this)}>
                                Go
                            </RB.Button>
                        </RB.Col>
                        <RB.Col md={2} mdOffset={6}>
                            <RB.Button
                                className="actionBtn right"
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
                                data={ this.state.formatteddata }
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
        if(this.state.selectedHash.length==1 && this.props[this.props.type].fetchedUniqueComments===true){
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