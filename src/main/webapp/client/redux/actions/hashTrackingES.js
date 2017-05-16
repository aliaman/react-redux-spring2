import elasticsearch from 'elasticsearch'
import rest from './../../utils/restconfig'


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