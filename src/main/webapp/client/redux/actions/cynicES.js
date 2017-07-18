import axios from 'axios';
import rest from './../../utils/restconfig';
import querystring from 'querystring';


export function fetchEfficacyMetrics(start, end) {
    start = parseInt(start);
    //end = parseInt(end);
    let request = JSON.stringify({"query":{"bool":{"must":[{"query_string":{"query":"NOT merlin.applicable_rules:SHAMPLE_0 AND customer:M4570886751 AND NOT sha256:86263727095009b136c832b851b3d9b329352d60a1ecc251d4a309d44a407c3b AND NOT context.filename:shample.exe AND NOT sha256:7e3b87f678c94d9fb1eb3149ec8295b41c1731d1cc5d5787dcce0cddc05e6f44 AND NOT context.filename:ApiCoverageTest.exe","analyze_wildcard":true}},{"range":{"timestamp":{"gte":start,"lte":end,"format":"epoch_millis"}}}],"must_not":[]}},"size":0,"_source":{"excludes":[]},"aggs":{"2":{"date_histogram":{"field":"timestamp","interval":"1d","time_zone":"Europe/London","min_doc_count":1},"aggs":{"3":{"filters":{"filters":{"FN":{"query_string":{"query":"conviction:clean AND retrospective.reputation:<-100","analyze_wildcard":true}},"FP":{"query_string":{"query":"conviction:malware AND retrospective.reputation:>100","analyze_wildcard":true}},"Accuracy":{"query_string":{"query":"NOT (conviction:clean AND retrospective.reputation:<-100) AND NOT (conviction:malware AND retrospective.reputation:>100)","analyze_wildcard":true}}}}}}}}});
    return function(dispatch) {
        document.body.style.cursor = 'wait';
        axios.post(
            rest.GET_EFFICACY_METRICS,
            request
        ).then((response) => {
                document.body.style.cursor = 'default';
                dispatch({type: 'CYNIC_ES_ACCURACY_FULFILLED', payload: response.data})
            }).catch((err) => {
                console.log(err);
                document.body.style.cursor = 'default';
                dispatch({type: 'CYNIC_ES_ACCURACY_REJECTED',  payload: err})
        });
    }
}