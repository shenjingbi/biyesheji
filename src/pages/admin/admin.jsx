import React,{Component} from 'react'
import {Redirect,Switch,Route} from 'react-router-dom'
import {Layout} from "antd";

//import memoryUtils from "../../utils/memoryUtils";
import LeftNav from "../../component/left_nav/left-nav";
import Header from "../../component/header/header";
import Home from "../home/home";
import Category from "../category/category";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie"

const {Footer,Sider,Content}=Layout
/*
后台管理的路由组件
* */
export  default class Admin extends Component{

    render() {
        /*const user=memoryUtils.user
        //如果内存中没有存储user==>当前没有登录
        if(!user||!user._id){
            //自动跳转到登录（在render()中）
            return <Redirect to='/'/>
        }*/
        return (
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{backgroundColor:'#fff',margin:20}}>
                        <Switch>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/category' component={Category}></Route>
                            <Route path='/role' component={Role}></Route>
                            <Route path='/user' component={User}></Route>
                            <Route path='/bar' component={Bar}></Route>
                            <Route path='/line' component={Line}></Route>
                            <Route path='/pie' component={Pie}></Route>
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:"green"}}>推荐使用谷歌浏览器，可以获得更加的页面操作体检</Footer>
                </Layout>
            </Layout>
        )
    }
}