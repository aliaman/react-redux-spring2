import React from 'react'
import Authorization from './../utils/Authorization'
import Highcharts from 'highcharts'
import { connect } from 'react-redux'
import { fetchEfficacyMetrics } from './../redux/actions/cynicES'

@connect((store) => {
    return {
        data: store.cynic.data
    }
})
class Dashboard1 extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this.props.dispatch(fetchEfficacyMetrics());
    }
    componentWillReceiveProps(nextProps){
        this.setState(nextProps);
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