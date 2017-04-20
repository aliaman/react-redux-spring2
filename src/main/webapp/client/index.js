import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'


import reducers from './redux/reducers/reducer'
import middleware from './redux/middleware/middleware';

import App from './components/App';
import Login from './components/Login';
import LeftMenu from './components/LeftMenu';
import SplashScreen from './components/SplashScreen';

import Dashboard from './components/Dashboard';
import Dashboard1 from './scomponents/Dashboard1';
import Dashboard2 from './scomponents/Dashboard2';


import { Router, IndexRoute, Route, hashHistory } from 'react-router';

require('./styles/styles.scss');


let store = createStore(reducers, {}, middleware);
if(__DEVELOPMENT__){
    console.log(`***************************************`);
    console.log(`**************DEVELOPMENT**************`);
    console.log(`***************************************`);
}
render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={SplashScreen}/>
                <Route path="dash" component={Dashboard}>
                    <Route path="1" component={Dashboard1} />
                    <Route path="2" component={Dashboard2} />
                </Route>
            </Route>
            <Route path="login" component={Login} />
            <Route path="leftmenu" component={LeftMenu} />
        </Router>
    </Provider>,
    document.getElementById('root')
)