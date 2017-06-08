
class RestConfig {
    constructor(base){
        this.base = base;
    }
    dev() {
        return {
            'GET_ALL_USERS': this.base + 'users',
            'LOGIN': this.base + 'login',
            'GET_EFFICACY_METRICS': 'https://search-cynic-analytics-o66747gccvno7p2p5ur3atabdq.us-east-1.es.amazonaws.com/task-*/task/_search',
            'ES_BASE': 'https://search-cynic-analytics-o66747gccvno7p2p5ur3atabdq.us-east-1.es.amazonaws.com',
            'GET_COMMENTS_FOR_EFFICACY_METRICS': this.base + 'comments',
            'GET_UNIQUE_COMMENTS_FOR_EFFICACY_METRICS': this.base + 'getUniqueComments',
            'SAVE_COMMENTS_FOR_EFFICACY_METRICS': this.base + 'comments',
            'POST_USER_FIELD': this.base + 'savefield',
        }
    }
    prod() {
        return {
            'GET_ALL_USERS': this.base + 'users/getAllUsers',
            'LOGIN': this.base + 'auth/login',
            'GET_EFFICACY_METRICS': 'https://search-cynic-analytics-o66747gccvno7p2p5ur3atabdq.us-east-1.es.amazonaws.com/task-*/task/_search',
            'ES_BASE': 'https://search-cynic-analytics-o66747gccvno7p2p5ur3atabdq.us-east-1.es.amazonaws.com',
            'GET_COMMENTS_FOR_EFFICACY_METRICS': this.base + 'esdata/comments',
            'GET_UNIQUE_COMMENTS_FOR_EFFICACY_METRICS': this.base + 'esdata/getUniqueComments',
            'SAVE_COMMENTS_FOR_EFFICACY_METRICS': this.base + 'esdata/comment',
            'POST_USER_FIELD': this.base + 'users/savefield',
        }
    }
}
let rest = {};
if(__DEVELOPMENT__){
    rest = new RestConfig('http://localhost:3000/').dev();
}else{
    rest = new RestConfig('/rest/').prod();
}
export default rest;