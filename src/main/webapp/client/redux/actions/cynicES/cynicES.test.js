import request from './../../reducers/cynicES'
import actionTypes from './../../constans/actionTypes'

test('Cynic Elastic Search async actions Efficacy Metrics Fetch Request', () => {
    expect(request(undefined, {type: 'unexpected'})).toEqual({
        data: null,
        error: null,
        fetched: false,
        fetching: false
    });
    expect(request(undefined, {
        type: actionTypes.CYNIC_ES_ACCURACY_PENDING,
        payload: {}
    })).toEqual({
        data: null,
        error: null,
        fetched: false,
        fetching: true
    });
});

test('Cynic Elastic Search async actions Efficacy Metrics Fetch Fulfill Request', () => {
    expect(request(undefined, {
        type: actionTypes.CYNIC_ES_ACCURACY_FULFILLED,
        payload: users
    })).toEqual({
        fetching: false,
        fetched: true,
        error: null,
        data: users
    });
});


let users = [
    {
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },
    {
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Ali Jalbani",
        "id": 1,
        "email": "ali_jalbani@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 2,
        "email": "usman@symantec.com"
    },{
        "lastUpdated": "Apr 25, 2017 2:35:45 PM",
        "password": "",
        "role": {
            "lastUpdated": "Apr 25, 2017 2:35:44 PM",
            "display": "Administrator",
            "name": "ADMINISTRATOR",
            "id": 1
        },
        "name": "Usman Jalbani",
        "id": 3,
        "email": "usman@symantec.com"
    }
];