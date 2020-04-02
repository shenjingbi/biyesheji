import React,{Component} from 'react'
import {Redirect,Switch,Route} from 'react-router-dom'
import {Layout} from "antd";
import {connect} from 'react-redux'

import LeftNav from "../left_nav/left-nav";
import Enterprise from "../enterprise/enterprise"
import Business from "../employ/business"
import Employ from "../employ/employ"
import Message from "../message/message"
import UpdateEmploy from "../employ/updateemploy"
import NotFound from "../not-found/not-found"
import User from "../user/user"

import "./admin.less"
import {setHeadTitle2} from "../../../../redux/actions";


const {Footer,Sider,Content,Header}=Layout
/*
后台管理的路由组件
* */
class Admin extends Component{

    componentDidMount() {
        this.props.setHeadTitle2('商家中心')
    }
    render() {
        const title=this.props.headTitle
        return (
            <Layout className="business" >
                <Sider className="left-nav" >
                    <LeftNav/>
                </Sider>
                <Content className='content'>
                    <Header className='header1'>
                        <div>{title}</div>
                    </Header>
                    <Switch>
                        <Redirect exact={true} from='/business' to='/business/user'/>
                        <Route path='/business/user' component={User}></Route>
                        <Route path='/business/detail' component={Enterprise}></Route>
                        <Route path='/business/addemploy' component={Business}></Route>
                        <Route path='/business/employ' component={Employ}></Route>
                        <Route path='/business/updateemploy' component={UpdateEmploy}></Route>
                        <Route path='/business/message' component={Message}></Route>
                        <Route component={NotFound}/>
                    </Switch>
                </Content>
            </Layout>
        )
    }
}

export default connect(
    state=>({user:state.user,headTitle:state.headTitle}),
    {setHeadTitle2}
)(Admin)