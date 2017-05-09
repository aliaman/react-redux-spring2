import { combineReducers } from "redux";
import userReducer from './userReducer';
import tweetsReducer from './tweetsReducer'
import loginReducer from './login'
import cynicEfficacyReducer from './cynicES'

const reducers = combineReducers({
    user: userReducer,
    tweets: tweetsReducer,
    login: loginReducer,
    cynic: cynicEfficacyReducer
})

export default reducers;
