import React,{Component} from 'react'
import {Redirect,Switch,Route} from 'react-router-dom'
import {Layout} from "antd";
import {connect} from 'react-redux'

import Header from "../../component/header/header";

import Home from "../home/home";
import NotFound from "../not-found/not-found";



const {Footer,Sider,Content}=Layout
/*
后台管理的路由组件
* */
class Admin extends Component{

    render() {
        const user=this.props.user
        //如果内存中没有存储user==>当前没有登录
        if(!user||!user.managerId){
            console.log(1)
            //自动跳转到登录（在render()中）
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{height:'100%'}}>
                <Layout style={{backgroundColor:"white"}}>
                    <Header/>
                    <Content style={{marginLeft:50}}>
                        <Switch>
                            <Redirect exact={true} from='/' to='/home'/>
                            <Route path='/home' component={Home}></Route>
                            <Route component={NotFound}/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:"green",flex:'absolute'}}>推荐使用谷歌浏览器，可以获得更加的页面操作体检</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    state=>({user:state.user}),
    {}
)(Admin)