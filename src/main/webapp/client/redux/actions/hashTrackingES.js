import elasticsearch from 'elasticsearch'
import axios from 'axios'
import rest from './../../utils/restconfig'
import querystring from 'querystring'

export function fetchHashTracking(type="FP") {

    let client = new elasticsearch.Client({
        host: rest.ES_BASE,
        log: 'trace'
    });

    return function(dispatch) {
        client.search({
            // ping usually has a 3000ms timeout
            q: (type=="FP"
                ?'NOT merlin.applicable_rules:SHAMPLE_0 AND customer:M4570886751 AND NOT sha256:86263727095009b136c832b851b3d9b329352d60a1ecc251d4a309d44a407c3b AND NOT context.filename:shample.exe AND NOT sha256:7e3b87f678c94d9fb1eb3149ec8295b41c1731d1cc5d5787dcce0cddc05e6f44 AND NOT context.filename:ApiCoverageTest.exe AND conviction:malware AND retrospective.reputation:>100'
                :'NOT merlin.applicable_rules:SHAMPLE_0 AND customer:M4570886751 AND NOT sha256:86263727095009b136c832b851b3d9b329352d60a1ecc251d4a309d44a407c3b AND NOT context.filename:shample.exe AND NOT sha256:7e3b87f678c94d9fb1eb3149ec8295b41c1731d1cc5d5787dcce0cddc05e6f44 AND NOT context.filename:ApiCoverageTest.exe AND conviction:clean AND retrospective.reputation:<-100')
        }).then(function (body) {
            dispatch({type: 'HASHTRACKING_FULFILLED', payload: {success: true, data: body }});
        }, function (error) {
            dispatch({type: 'HASHTRACKING_REJECTED',  payload: error.message})
        });
    }
}

export function fetchCommentsForEfficacyMetrics() {
    return function(dispatch) {
        axios.get(rest.GET_COMMENTS_FOR_EFFICACY_METRICS)
            .then((response) => {
                if(response.data.success) {
                    dispatch({type: 'CYNIC_ES_COMMENTS_FULFILLED', payload: response.data.payload})
                }else{
                    dispatch({type: 'CYNIC_ES_COMMENTS_REJECTED', payload: response.data.payload});
                }
            })
            .catch((err) => {
                dispatch({type: 'CYNIC_ES_COMMENTS_REJECTED', payload: err});
            })
    }
}

export function fetchUniqueComments(){
    return function(dispatch) {
        axios.get(rest.GET_UNIQUE_COMMENTS_FOR_EFFICACY_METRICS)
            .then((response) => {
                if(response.data.success) {
                    dispatch({type: 'ES_COMMENTS_UNIQUE_FULFILLED', payload: response.data.payload})
                }else{
                    dispatch({type: 'ES_COMMENTS_UNIQUE_REJECTED', payload: response.data.payload});
                }
            })
            .catch((err) => {
                dispatch({type: 'ES_COMMENTS_UNIQUE_REJECTED', payload: err});
            })
    }
}

export function saveCommentsForEfficacyMetrics(id, values, user_id) {
    return function(dispatch) {
        axios.post(rest.SAVE_COMMENTS_FOR_EFFICACY_METRICS, querystring.stringify({'user_id': user_id, 'id': id, 'comment': values.get('comment'), 'reason': values.get('reason'), 'mitigation': values.get('mitigation')}))
            .then((response) => {
                if(response.data.success) {
                    dispatch({type: 'SAVE_ES_COMMENTS_FULFILLED', payload: response.data.payload})
                }else{
                    dispatch({type: 'SAVE_ES_COMMENTS_REJECTED', payload: response.data.payload});
                }
            })
            .catch((err) => {
                dispatch({type: 'SAVE_ES_COMMENTS_REJECTED', payload: err});
            })
    }
}