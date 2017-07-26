import elasticsearch from 'elasticsearch'
import axios from 'axios'
import rest from '../../../utils/restconfig'
import querystring from 'querystring'

export function fetchHashTracking(type="FP", start, end) {

    let client = new elasticsearch.Client({
        host: rest.ES_BASE,
    });

    return function(dispatch) {
        dispatch({type: type + '_HASHTRACKING_PENDING', payload: {}});
        document.body.style.cursor = 'wait';
        client.search({
            // ping usually has a 3000ms timeout
            size: 1,
            q: (type=="FP"
                ?'NOT merlin.applicable_rules:SHAMPLE_0 AND customer:M4570886751 AND NOT sha256:86263727095009b136c832b851b3d9b329352d60a1ecc251d4a309d44a407c3b AND NOT context.filename:shample.exe AND NOT sha256:7e3b87f678c94d9fb1eb3149ec8295b41c1731d1cc5d5787dcce0cddc05e6f44 AND NOT context.filename:ApiCoverageTest.exe AND conviction:malware AND retrospective.reputation:>100 AND timestamp:>='+start+' AND timestamp:<='+end
                :'NOT merlin.applicable_rules:SHAMPLE_0 AND customer:M4570886751 AND NOT sha256:86263727095009b136c832b851b3d9b329352d60a1ecc251d4a309d44a407c3b AND NOT context.filename:shample.exe AND NOT sha256:7e3b87f678c94d9fb1eb3149ec8295b41c1731d1cc5d5787dcce0cddc05e6f44 AND NOT context.filename:ApiCoverageTest.exe AND conviction:clean AND retrospective.reputation:<-100 AND timestamp:>='+start+' AND timestamp:<='+end)
        }).then(function (body) {
            document.body.style.cursor = 'default';
            dispatch({type: type + '_HASHTRACKING_FULFILLED', payload: {success: true, data: body }});
            client.close();
        }, function (error) {
            document.body.style.cursor = 'default';
            dispatch({type: type + '_HASHTRACKING_REJECTED',  payload: error.message})
            client.close();
        });
    }
}

export function fetchCommentsForEfficacyMetrics(type="FP") {
    return function(dispatch) {
        axios.get(rest.GET_COMMENTS_FOR_EFFICACY_METRICS)
            .then((response) => {
                if(response.data.success) {
                    dispatch({type: type + '_CYNIC_ES_COMMENTS_FULFILLED', payload: response.data.payload})
                }else{
                    dispatch({type: type + '_CYNIC_ES_COMMENTS_REJECTED', payload: response.data.payload});
                }
            })
            .catch((err) => {
                dispatch({type: type + '_CYNIC_ES_COMMENTS_REJECTED', payload: err});
            })
    }
}

export function fetchUniqueComments(type="FP"){
    return function(dispatch) {
        axios.get(rest.GET_UNIQUE_COMMENTS_FOR_EFFICACY_METRICS)
            .then((response) => {
                if(response.data.success) {
                    dispatch({type: type + '_ES_COMMENTS_UNIQUE_FULFILLED', payload: response.data.payload})
                }else{
                    dispatch({type: type + '_ES_COMMENTS_UNIQUE_REJECTED', payload: response.data.payload});
                }
            })
            .catch((err) => {
                dispatch({type: type + '_ES_COMMENTS_UNIQUE_REJECTED', payload: err});
            })
    }
}

export function saveCommentsForEfficacyMetrics(type="FP", id, values, user_id) {
    return function(dispatch) {
        axios.post(rest.SAVE_COMMENTS_FOR_EFFICACY_METRICS, querystring.stringify({'user_id': user_id, 'id': id, 'comment': values['comment'], 'reason': values['reason'], 'mitigation': values['mitigation']}))
            .then((response) => {
                if(response.data.success) {
                    dispatch(fetchCommentsForEfficacyMetrics(type));
                    dispatch(fetchUniqueComments(type));
                    dispatch({type: type + '_SAVE_ES_COMMENTS_FULFILLED', payload: response.data.payload})
                }else{
                    dispatch({type: type + '_SAVE_ES_COMMENTS_REJECTED', payload: response.data.payload});
                }
            })
            .catch((err) => {
                dispatch({type: type + '_SAVE_ES_COMMENTS_REJECTED', payload: err});
            })
    }
}