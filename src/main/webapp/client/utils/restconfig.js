
class RestConfig {
    constructor(base){
        this.base = base;
    }
    dev() {
        return {
            'GET_ALL_USERS': this.base + 'db'
        }
    }
    prod() {
        return {
            'GET_ALL_USERS': this.base + 'users/getAll'
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