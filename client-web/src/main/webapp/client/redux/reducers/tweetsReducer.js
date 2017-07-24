const tweetsReducer = (state=[], action) => {
    switch(action.type) {
        case "ADD_TWEET": {
            return state.concat({
                id: Date.now(), //fake an ID by using a timestamp
                text: action.payload,
            });
            break;
        }
    }
    return state;
}
export default tweetsReducer;