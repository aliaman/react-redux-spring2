import React from 'react'
import { connect } from 'react-redux'
import ReactHighcharts from 'react-highcharts'
import * as RB from 'react-bootstrap'
import update from 'react-addons-update'

import Authorization from '../../../../utils/Authorization'
import { fetchEfficacyMetrics } from '../../../../redux/actions/cynicES'
import DateRangePicker from '../../../../scomponents/daterange/DateRangePicker'
import moment from 'moment'
import ReactSpinner from 'reactjs-spinner'


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
            refresh: true,
            dp: {
                maxDate: moment(),
                startDate: moment().startOf('day').add(-97, 'days').utc(),
                endDate: moment().endOf('day').add(-90, "days").utc(),
            },
            charts:{
                volume:{
                    /* HighchartsConfig */
                    chart: {
                        type: 'column',
                        height: 350
                    },
                    title:{
                        text: ''
                    },
                    yAxis: {
                        title: {
                            text: 'Count'
                        }
                    },
                    tooltip: {
                        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                        shared: true
                    },
                    plotOptions: {
                        column: {
                            stacking: 'normal'
                        },
                        series: {
                            dataLabels: {
                                enabled: true,
                                borderRadius: 2,
                                y: -10,
                                shape: 'callout'
                            }
                        }
                    },
                    legend: {
                        enabled: false
                    },
                },
                percentage:{
                    chart: {
                        type: 'column',
                        height: 200
                    },
                    title: {
                        text: ' '
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Percentage'
                        }
                    },
                    tooltip: {
                        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                        shared: true
                    },
                    plotOptions: {
                        column: {
                            stacking: 'percent'
                        },
                        series: {
                            dataLabels: {
                                enabled: true,
                                borderRadius: 2,
                                y: -10,
                                shape: 'callout',
                                formatter: function () {
                                    return (Math.round(this.percentage)+ "%");
                                }
                            }
                        }
                    },
                }
            }

        };
    }
    _fetchMetrics(){
        let end = this.state.dp.endDate.clone().add(0, "days").utc().valueOf();
        let start = this.state.dp.startDate.clone().add(0, "days").utc().valueOf();
        this.props.dispatch(fetchEfficacyMetrics(start, end));
    }
    componentWillMount(){
        //adding an extra day and then deleting it in the end to be consistent in results
        this._fetchMetrics();
    }
    fetchMetrics(){
        this._fetchMetrics();
    }
    componentWillReceiveProps(nextProps){
        this.setState(nextProps);
        const data = nextProps.data;
        if (data) {
            let b1 = new Array();
            let b2 = new Array();
            let b3 = new Array();
            data.aggregations["2"].buckets.shift();//we dont want the first and last indicies
            data.aggregations["2"].buckets.pop();
            for (let k in data.aggregations["2"].buckets) {
                b1.push(data.aggregations["2"].buckets[k]["3"].buckets.FN.doc_count);
                b2.push(data.aggregations["2"].buckets[k]["3"].buckets.FP.doc_count);
                b3.push(data.aggregations["2"].buckets[k]["3"].buckets.Accuracy.doc_count);
            }

            let categories = new Array();
            let categoriescount = data.aggregations["2"].buckets.length;
            do {
                let t = this.state.dp.endDate.clone().add("0", "days");
                let q = t.subtract(categoriescount--, 'days').format('YYYY-MM-DD');
                categories.push(q);
            } while (categoriescount > 0);

            let volumeChart = update(this.state.charts.volume,
                {
                    $merge: {
                        xAxis: {
                            categories: categories,
                            labels: {
                                enabled: false
                            }
                        },
                        series: [{
                            name: "FN",
                            data: b1
                        }, {
                            name: 'FP',
                            data: b2
                        }, {
                            name: 'Accuracy',
                            data: b3
                        }]
                    }
                });
            let percentageChart = update(this.state.charts.percentage,
                {
                    $merge: {
                        xAxis: {
                            categories: categories
                        },
                        series: [{
                            name: "FN",
                            data: b1
                        }, {
                            name: 'FP',
                            data: b2
                        }, {
                            name: 'Accuracy',
                            data: b3
                        }],
                    }
                });
            this.setState({
                charts: Object.assign({}, this.state.charts, {
                    volume: volumeChart,
                    percentage: percentageChart
                })
            });
        }
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
    _renderChart(){
        return (
            <div>
                <h3>Efficacy Metrics</h3>
                <RB.Row>
                    <RB.Col md={4} mdOffset={0}>
                        <div className="dpdiv">
                            <DateRangePicker {...this.state.dp} clickHandler={this.handleApply} />
                        </div>
                        <RB.Button
                            className="goBtn"
                            bsStyle="primary"
                            onClick={this.fetchMetrics.bind(this)}>
                            Go
                        </RB.Button>
                    </RB.Col>
                </RB.Row>
                <RB.Row>
                    <ReactHighcharts config={this.state.charts.volume} ref="chart">a</ReactHighcharts>
                </RB.Row>
                <RB.Row>
                    <ReactHighcharts config={this.state.charts.percentage} ref="chart2">b</ReactHighcharts>
                </RB.Row>
            </div>
        )
    }
    render() {
        const style = {
            marginTop: '140px',
        };
        if(this.props.data!=null){
            return this._renderChart();
        }else{
            return (<div style={style}>
                        <ReactSpinner size={50} borderColor={"#f3f3f3"} borderTopColor={"#3498db"} />
                    </div>);
        }

    }
}

export default Authorization(Dashboard1, ['ADMINISTRATOR', 'ANALYST', 'REPORTING'])