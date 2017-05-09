import React from 'react'
import { connect } from 'react-redux'
import ReactHighcharts from 'react-highcharts'
import * as RB from 'react-bootstrap'

import Authorization from './../utils/Authorization'
import { fetchEfficacyMetrics } from './../redux/actions/cynicES'
import DateRangePicker from './component/DateRangePicker'
import moment from 'moment';


@connect((store) => {
    return {
        data: store.cynic.data
    }
})
class Dashboard1 extends React.Component {
    constructor(props) {
        super(props);
        this.handleApply = this.handleApply.bind(this);
        this.state = {
            dp: {
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                startDate: moment().subtract(8, 'days'),
                endDate: moment().subtract(0, 'days'),
            },
            config:{
                /* HighchartsConfig */
                title:{
                    text: ''
                },
                yAxis: {
                    title: {
                        text: 'count'
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
                chart: {
                    type: 'column'
                },
                xAxis: {
                    categories: [
                        moment().subtract(6, 'days').format('dddd'),
                        moment().subtract(5, 'days').format('dddd'),
                        moment().subtract(4, 'days').format('dddd'),
                        moment().subtract(3, 'days').format('dddd'),
                        moment().subtract(2, 'days').format('dddd'),
                        moment().subtract(1, 'days').format('dddd'),
                        moment().subtract(0, 'days').format('dddd')]
                },
                series: [{
                    data: [0]
                },{
                    data: [0]
                },{
                    data: [0]
                }]
            },
        };
        console.log(JSON.stringify(this.state));
    }
    componentWillMount(){
        this.props.dispatch(fetchEfficacyMetrics(this.state.dp.startDate.valueOf(), this.state.dp.endDate.valueOf()));
    }
    componentWillReceiveProps(nextProps){
        this.setState(nextProps);
        const data = nextProps.data;

        let b1 = new Array();
        let b2 = new Array();
        let b3 = new Array();
        for(let k in data.aggregations["2"].buckets){
            b1.push(data.aggregations["2"].buckets[k]["3"].buckets.FN.doc_count);
            b2.push(data.aggregations["2"].buckets[k]["3"].buckets.FP.doc_count);
            b3.push(data.aggregations["2"].buckets[k]["3"].buckets.Accuracy.doc_count);
        }

        let categories = new Array();
        let categoriescount = data.aggregations["2"].buckets.length;
        do{
            let t = this.state.dp.endDate.clone().add("1", "days");
            let q = t.subtract(categoriescount--, 'days').format('MM/DD/YY');
            categories.push(q);
        }while(categoriescount>0);

        this.setState({
            config: Object.assign({}, this.state.config, {
                xAxis: {
                    categories: categories
                },
                series: [{
                    name: "FN",
                    data: b1
                },{
                    name: 'FP',
                    data: b2
                },{
                    name: 'FP',
                    data: b3
                }]
            })
        });
    }
    //should there be any fields there is only 1 common handleChange event which matches event.id to state.<property>
    handleChange (event){
        let key = event.target.id;
        let value = event.target.value;
        this.setState({
            key: value
        });
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
    fetchMetrics(){
        console.log(this.state.dp.startDate + '-' + this.state.dp.endDate);
        this.props.dispatch(fetchEfficacyMetrics(this.state.dp.startDate.valueOf(), this.state.dp.endDate.valueOf()));
    }
    _renderChart(){
        return (
            <div>
                <h3>Cynic Efficacy Metrics</h3>
                <ReactHighcharts config={this.state.config} ref="chart">a</ReactHighcharts>
                <RB.Row>
                    <RB.Col md={3} mdOffset={7}>
                        <DateRangePicker {...this.state.dp} clickHandler={this.handleApply} />
                    </RB.Col>
                    <RB.Col md={2}>
                        <RB.Button
                            className="fetchMetrics"
                            bsStyle="primary"
                            onClick={this.fetchMetrics.bind(this)}>
                            Fetch Metrics
                        </RB.Button>
                    </RB.Col>
                </RB.Row>
            </div>
        )
    }
    render() {
        if(this.props.data!=null){
            return this._renderChart();
        }else{
            return (<div>Nothing</div>);
        }

    }
}

export default Authorization(Dashboard1, ['ADMINISTRATOR'])