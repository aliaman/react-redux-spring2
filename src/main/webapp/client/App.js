import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducers from './redux/reducers/reducer'
import middleware from './redux/middleware/middleware';

import App from './components/App/App';
import Login from './components/Login/Login';
import LogOut from './components/Logout/LogOut';
import LeftMenu from './components/LeftMenu/LeftMenu';
import SplashScreen from './components/SplashScreen/SplashScreen';

import Dashboard from './components/Dashboard/Dashboard';
import Dashboard1 from './scomponents/Dashboard1';
import DashboardFalseNegatives from './scomponents/DashboardFalseNegatives';
import DashboardFalsePositives from './scomponents/DashboardFalsePositives';
import UserManagement from './scomponents/UserManagement';

import { Router, IndexRoute, Route, hashHistory } from 'react-router';



require('./styles/styles.scss');


const store = createStore(reducers, {}, middleware);

if(global.__DEVELOPMENT__){
    console.log(`***************************************`);
    console.log(`**************DEVELOPMENT**************`);
    console.log(`***************************************`);
}
render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={SplashScreen}/>
                <Route path="um" component={UserManagement} />
                <Route path="dash" component={Dashboard}>
                    <Route path="1" component={Dashboard1} />
                    <Route path="2" component={DashboardFalseNegatives} />
                    <Route path="3" component={DashboardFalsePositives} />
                </Route>
            </Route>
            <Route path="login" component={Login} />
            <Route path="logout" component={LogOut} />
            <Route path="leftmenu" component={LeftMenu} />
        </Router>
    </Provider>,
    document.getElementById('root')
)