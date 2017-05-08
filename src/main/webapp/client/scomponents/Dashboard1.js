import React from 'react'
import Authorization from './../utils/Authorization'
import Highcharts from 'highcharts'

class Dashboard1 extends React.Component {

    render() {
        const data =
            {
                "took": 273,
                "timed_out": false,
                "_shards": {
                    "total": 595,
                    "successful": 595,
                    "failed": 0
                },
                "hits": {
                    "total": 23530,
                    "max_score": 0,
                    "hits": []
                },
                "aggregations": {
                    "2": {
                        "buckets": [
                            {
                                "3": {
                                    "buckets": {
                                        "FN": {
                                            "doc_count": 12
                                        },
                                        "FP": {
                                            "doc_count": 0
                                        },
                                        "Accuracy (!FP AND !FN)": {
                                            "doc_count": 151
                                        }
                                    }
                                },
                                "key_as_string": "2016-12-31T00:00:00.000-07:00",
                                "key": 1483167600000,
                                "doc_count": 163
                            },
                            {
                                "3": {
                                    "buckets": {
                                        "FN": {
                                            "doc_count": 36
                                        },
                                        "FP": {
                                            "doc_count": 0
                                        },
                                        "Accuracy (!FP AND !FN)": {
                                            "doc_count": 410
                                        }
                                    }
                                },
                                "key_as_string": "2017-01-01T00:00:00.000-07:00",
                                "key": 1483254000000,
                                "doc_count": 446
                            },
                            {
                                "3": {
                                    "buckets": {
                                        "FN": {
                                            "doc_count": 76
                                        },
                                        "FP": {
                                            "doc_count": 0
                                        },
                                        "Accuracy (!FP AND !FN)": {
                                            "doc_count": 693
                                        }
                                    }
                                },
                                "key_as_string": "2017-01-02T00:00:00.000-07:00",
                                "key": 1483340400000,
                                "doc_count": 769
                            },
                            {
                                "3": {
                                    "buckets": {
                                        "FN": {
                                            "doc_count": 146
                                        },
                                        "FP": {
                                            "doc_count": 1
                                        },
                                        "Accuracy (!FP AND !FN)": {
                                            "doc_count": 2849
                                        }
                                    }
                                },
                                "key_as_string": "2017-01-03T00:00:00.000-07:00",
                                "key": 1483426800000,
                                "doc_count": 2996
                            },
                            {
                                "3": {
                                    "buckets": {
                                        "FN": {
                                            "doc_count": 145
                                        },
                                        "FP": {
                                            "doc_count": 3
                                        },
                                        "Accuracy (!FP AND !FN)": {
                                            "doc_count": 2818
                                        }
                                    }
                                },
                                "key_as_string": "2017-01-04T00:00:00.000-07:00",
                                "key": 1483513200000,
                                "doc_count": 2966
                            },
                            {
                                "3": {
                                    "buckets": {
                                        "FN": {
                                            "doc_count": 119
                                        },
                                        "FP": {
                                            "doc_count": 0
                                        },
                                        "Accuracy (!FP AND !FN)": {
                                            "doc_count": 2965
                                        }
                                    }
                                },
                                "key_as_string": "2017-01-05T00:00:00.000-07:00",
                                "key": 1483599600000,
                                "doc_count": 3084
                            },
                            {
                                "3": {
                                    "buckets": {
                                        "FN": {
                                            "doc_count": 111
                                        },
                                        "FP": {
                                            "doc_count": 2
                                        },
                                        "Accuracy (!FP AND !FN)": {
                                            "doc_count": 2606
                                        }
                                    }
                                },
                                "key_as_string": "2017-01-06T00:00:00.000-07:00",
                                "key": 1483686000000,
                                "doc_count": 2719
                            },
                            {
                                "3": {
                                    "buckets": {
                                        "FN": {
                                            "doc_count": 150
                                        },
                                        "FP": {
                                            "doc_count": 0
                                        },
                                        "Accuracy (!FP AND !FN)": {
                                            "doc_count": 1368
                                        }
                                    }
                                },
                                "key_as_string": "2017-01-07T00:00:00.000-07:00",
                                "key": 1483772400000,
                                "doc_count": 1518
                            },
                            {
                                "3": {
                                    "buckets": {
                                        "FN": {
                                            "doc_count": 84
                                        },
                                        "FP": {
                                            "doc_count": 0
                                        },
                                        "Accuracy (!FP AND !FN)": {
                                            "doc_count": 1509
                                        }
                                    }
                                },
                                "key_as_string": "2017-01-08T00:00:00.000-07:00",
                                "key": 1483858800000,
                                "doc_count": 1593
                            },
                            {
                                "3": {
                                    "buckets": {
                                        "FN": {
                                            "doc_count": 95
                                        },
                                        "FP": {
                                            "doc_count": 1
                                        },
                                        "Accuracy (!FP AND !FN)": {
                                            "doc_count": 1553
                                        }
                                    }
                                },
                                "key_as_string": "2017-01-09T00:00:00.000-07:00",
                                "key": 1483945200000,
                                "doc_count": 1649
                            },
                            {
                                "3": {
                                    "buckets": {
                                        "FN": {
                                            "doc_count": 179
                                        },
                                        "FP": {
                                            "doc_count": 0
                                        },
                                        "Accuracy (!FP AND !FN)": {
                                            "doc_count": 3176
                                        }
                                    }
                                },
                                "key_as_string": "2017-01-10T00:00:00.000-07:00",
                                "key": 1484031600000,
                                "doc_count": 3355
                            },
                            {
                                "3": {
                                    "buckets": {
                                        "FN": {
                                            "doc_count": 132
                                        },
                                        "FP": {
                                            "doc_count": 3
                                        },
                                        "Accuracy (!FP AND !FN)": {
                                            "doc_count": 2137
                                        }
                                    }
                                },
                                "key_as_string": "2017-01-11T00:00:00.000-07:00",
                                "key": 1484118000000,
                                "doc_count": 2272
                            }
                        ]
                    }
                }
            };
        let b1 = new Array();
        let b2 = new Array();
        let b3 = new Array();
        for(let k in data.aggregations["2"].buckets){
            b1.push(data.aggregations["2"].buckets[k]["3"].buckets.FN.doc_count);
            b2.push(data.aggregations["2"].buckets[k]["3"].buckets.FP.doc_count);
            b3.push(data.aggregations["2"].buckets[k]["3"].buckets['Accuracy (!FP AND !FN)'].doc_count);
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