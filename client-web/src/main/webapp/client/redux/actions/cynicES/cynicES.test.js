import request from './../../reducers/cynicES'
import actionTypes from './../../constans/actionTypes'
import Mock from './../../../utils/Mock'

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
        payload: Mock.users()
    })).toEqual({
        fetching: false,
        fetched: true,
        error: null,
        data: Mock.users()
    });
});