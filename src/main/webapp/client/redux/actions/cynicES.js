import axios from 'axios';
import rest from './../../utils/restconfig';
import querystring from 'querystring';


export function fetchEfficacyMetrics(start, end) {
    start = parseInt(start);
    //end = parseInt(end);
    let request = JSON.stringify({"size":0,"query":{"filtered":{"query":{"query_string":{"analyze_wildcard":true,"query":"NOT merlin.applicable_rules:SHAMPLE_0 AND customer:M4570886751 AND NOT sha256:86263727095009b136c832b851b3d9b329352d60a1ecc251d4a309d44a407c3b AND NOT context.filename:shample.exe AND NOT sha256:7e3b87f678c94d9fb1eb3149ec8295b41c1731d1cc5d5787dcce0cddc05e6f44 AND NOT context.filename:ApiCoverageTest.exe"}},"filter":{"bool":{"must":[{"range":{"timestamp":{"gte":start,"lte":end,"format":"epoch_millis"}}}],"must_not":[]}}}},"aggs":{"2":{"date_histogram":{"field":"timestamp","interval":"1d","time_zone":"-07:00","min_doc_count":1,"extended_bounds":{"min":start,"max":end}},"aggs":{"3":{"filters":{"filters":{"FN":{"query":{"query_string":{"analyze_wildcard":true,"query":"conviction:clean AND retrospective.reputation:<-100"}}},"FP":{"query":{"query_string":{"analyze_wildcard":true,"query":"conviction:malware AND retrospective.reputation:>100"}}},"Accuracy":{"query":{"query_string":{"analyze_wildcard":true,"query":"NOT (conviction:clean AND retrospective.reputation:<-100) AND NOT (conviction:malware AND retrospective.reputation:>100)"}}}}}}}}}});
    return function(dispatch) {
        axios.post(
            rest.GET_EFFICACY_METRICS,
            request
        ).then((response) => {
                dispatch({type: 'CYNIC_ES_ACCURACY_FULFILLED', payload: response.data})
            }).catch((err) => {
                console.log(err);
                dispatch({type: 'CYNIC_ES_ACCURACY_REJECTED',  payload: err})
        });
    }
}