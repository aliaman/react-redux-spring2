import { combineReducers } from "redux";
import userReducer from './userReducer';
import tweetsReducer from './tweetsReducer'
import loginReducer from './login'
import cynicEfficacyReducer from './cynicES'
import fnHashTrackingReducer from './fnHashTrackingES'
import fpHashTrackingReducer from './fpHashTrackingES'

const reducers = combineReducers({
    user: userReducer,
    tweets: tweetsReducer,
    login: loginReducer,
    cynic: cynicEfficacyReducer,
    fnHashTracking: fnHashTrackingReducer,
    fpHashTracking: fpHashTrackingReducer,
});

export default reducers;
