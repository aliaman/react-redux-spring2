import { combineReducers } from "redux";
import userReducer from './userReducer';
import tweetsReducer from './tweetsReducer'
import loginReducer from './login'

const reducers = combineReducers({
    user: userReducer,
    tweets: tweetsReducer,
    login: loginReducer,
})

export default reducers;
