import React  from "react";
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import {BrowserRouter,Route,Switch,HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import Login from './foreground/pages/login/login'
import Register from './foreground/pages/register/registers'
import Admin from './foreground/pages/admin/admin'

import store from "./foreground/redux/store";
import Home from "./foreground/pages/home/home";



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