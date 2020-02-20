import React  from "react";
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'

import {BrowserRouter,Route,Switch} from 'react-router-dom'


import Login from './pages/login/login'
import Register from './pages/register/registers'
import Admin from './pages/admin/admin'
import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";

//一上来就读取local中保存的user，保存到内存中
const user=storageUtils.getUser()
memoryUtils.user=user

ReactDOM.render((

        <BrowserRouter>
            <Switch>
               {/*默认路由 path="/login"*/}

                <Route path="/register" component={Register}/>{/*path="/register"*/}
                <Route path="/login" component={Login}/>
                <Route path="/" component={Admin}/>{/*path="/admin"*/}

            </Switch>

        </BrowserRouter>

    )
,document.getElementById('root'))