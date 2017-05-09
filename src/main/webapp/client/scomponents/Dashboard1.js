import React from 'react'
import { connect } from 'react-redux'
import Highcharts from 'highcharts'
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
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            startDate: moment().subtract(6, 'days'),
            endDate: moment().subtract(0, 'days')
        }
    }
    componentWillMount(){
        this.props.dispatch(fetchEfficacyMetrics());
    }
    componentWillReceiveProps(nextProps){
        this.setState(nextProps);
    }
    handleChange (event){
        let key = event.target.id;
        let value = evemt.target.value;
        this.setState({
            key: value
        });
        console.log(JSON.stringify(this.state));
    }
    handleApply(event, picker) {
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate,
        });
    }
    fetchMetrics(){
        this.props.dispatch(fetchEfficacyMetrics());
    }
    _renderChart(){
        const data = this.props.data;

        let b1 = new Array();
        let b2 = new Array();
        let b3 = new Array();
        for(let k in data.aggregations["2"].buckets){
            b1.push(data.aggregations["2"].buckets[k]["3"].buckets.FN.doc_count);
            b2.push(data.aggregations["2"].buckets[k]["3"].buckets.FP.doc_count);
            b3.push(data.aggregations["2"].buckets[k]["3"].buckets.Accuracy.doc_count);
        }
        const options = {
            title: {
                text: ' '
            },
            xAxis: {
                categories: ['Jan 10','Jan 11','Jan 12','Jan 13','Jan 14','Jan 15','Jan 16','Jan 17','Jan 18','Jan 19','Jan 20','Jan 21' ]
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
            series: [{
                name: 'FN',
                data: b1
            }, {
                name: 'FP',
                data: b2
            }, {
                name: 'Accuracy (!FP AND !FN)',
                data: b3
            }]
        };
        return (
            <div>
                <h3>Cynic Efficacy Metrics</h3>
                <Chart container={'chart'} options={options} />
                <RB.Row>
                    <RB.Col md={3} mdOffset={7}>
                        <DateRangePicker {...this.state} clickHandler={this.handleApply} />
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

class Chart extends React.Component {
    componentDidMount() {
        this.chart = new Highcharts[this.props.type || "Chart"](
            this.refs.chart,
            this.props.options
        );
    }

    componentWillUnmount() {
        this.chart.destroy();
    }

    render() {
        return (
            <div ref="chart"></div>
        )
    }
}

export default Authorization(Dashboard1, ['ADMINISTRATOR'])