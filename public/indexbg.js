import React  from "react";
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import {BrowserRouter,Route,Switch,HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import Login from './pages/login/login'
import Register from './background/pages/register/registers'
import Admin from './background/pages/admin/admin'

import store from "./background/redux/store";



ReactDOM.render((
        <Provider store={store}>
            <HashRouter>
                <Switch>
                    {/*默认路由 path="/login"*/}
                    <Route path="/register" component={Register}/>{/*path="/register"*/}
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Admin}/>{/*path="/admin"*/}
                </Switch>
            </HashRouter>
        </Provider>


    )
,document.getElementById('root'))