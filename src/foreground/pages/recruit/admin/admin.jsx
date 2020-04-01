import React,{Component} from 'react'
import {Redirect,Switch,Route} from 'react-router-dom'
import {Layout} from "antd";
import {connect} from 'react-redux'

import Header from "../../../component/header/header";
import Recruit from "../recruit";
import RecruitDetail from "../detail";
import NotFound from "../../not-found/not-found";

const {Footer,Sider,Content}=Layout
/*
后台管理的路由组件
* */
class Admin extends Component{

    render() {
        return (
                <Switch>
                    <Redirect exact={true} from='/recruit' to='/recruit/home'/>
                    <Route path='/recruit/home' component={Recruit}></Route>
                    <Route path='/recruit/detail' component={RecruitDetail}></Route>
                    <Route component={NotFound}/>
                </Switch>
        )
    }
}

export default connect(
    state=>({user:state.user}),
    {}
)(Admin)