import React  from "react";
import ReactDOM from 'react-dom'


import {HashRouter,Route,Switch} from 'react-router-dom'
import {Provider} from "react-redux";

import store from "../src/redux/store";
import App from './containers/app/app'
import Login from './containers/login/login'
import Register from './containers/register/registers'

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}/>{/*默认路由 path="/login"*/}
                <Route path="/app" component={App}/>
                <Route  component={Register}/>{/*path="/register"*/}
            </Switch>

        </HashRouter>
    </Provider>
    )
,document.getElementById('root'))