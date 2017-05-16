let initialState = {
    fetching: false,
    fetched: false,
    error: null,
    data: null,
    selectedHash: {
        "_index": "",
        "_type": "",
        "_id": "",
        "_score": 0,
        "_source": {
            "conviction_time": "",
            "merlin": {
                "disposition_type": "",
                "versions": {
                    "merlin": "",
                    "merlin_rules": ""
                },
                "is_targeted": 0,
                "score": 0,
                "applicable_rules": ""
            },
            "customer": "",
            "sha256": "",
            "broken": 0,
            "mime_type": "",
            "conviction": "",
            "task_id": "",
            "timestamp": "",
            "site": "",
            "retrospective": {
                "reputation": 0
            }
        }
    }
};

const hashTrackingESReducer = (state=initialState, action) => {
    switch (action.type) {
        case "HASHTRACKING_PENDING": {
            return {...state, fetching: true}
        }
        case "HASHTRACKING_REJECTED": {
            return {
                ...state,
                fetching: false,
                error: action.payload,
            }
        }
        case "HASHTRACKING_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: null,
                data: action.payload.data.hits.hits
            }
        }
    }
    return state
};
export default hashTrackingESReducer;