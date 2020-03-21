import React,{Component} from 'react'
import {Redirect,Switch,Route} from 'react-router-dom'
import {Layout} from "antd";
import {connect} from 'react-redux'

import LeftNav from "../../component/left_nav/left-nav";
import Header from "../../component/header/header";
import Home from "../home/home";
import Category from "../category/category";
import Role from "../role/role";
import User from "../user/user";
import Manager from "../managers/manager";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie"
import Enterprise from "../enterprise/enterprise"
import NotFound from "../not-found/not-found"


const {Footer,Sider,Content}=Layout
/*
后台管理的路由组件
* */
class Admin extends Component{

    render() {
        const user=this.props.user
        //如果内存中没有存储user==>当前没有登录
        if(!user||!user.managerId){
            //自动跳转到登录（在render()中）
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{height:'100%'}}>
                <Layout>
                    <Header>Header</Header>
                    <LeftNav/>
                    <Content style={{backgroundColor:'white',margin:20}}>
                        <Switch>
                            <Redirect exact={true} from='/' to='/home'/>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/category' component={Category}></Route>
                            <Route path='/role' component={Role}></Route>
                            <Route path='/user' component={User}></Route>
                            <Route path='/manager' component={Manager}></Route>
                            <Route path='/bar' component={Bar}></Route>
                            <Route path='/line' component={Line}></Route>
                            <Route path='/pie' component={Pie}></Route>
                            <Route path='/enterprise' component={Enterprise}></Route>
                            <Route component={NotFound}/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:"green"}}>推荐使用谷歌浏览器，可以获得更加的页面操作体检</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    state=>({user:state.user}),
    {}
)(Admin)