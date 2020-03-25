import React,{Component} from 'react'
import {Redirect,Switch,Route} from 'react-router-dom'
import {Layout} from "antd";
import {connect} from 'react-redux'

import Header from "../../component/header/header";

import Home from "../home/home";
import Recruit from "../recruit/recruit";
import Business from "../business/business";

import NotFound from "../not-found/not-found";



const {Footer,Sider,Content}=Layout
/*
后台管理的路由组件
* */
class Admin extends Component{

    render() {
        const user=this.props.user
        //如果内存中没有存储user==>当前没有登录
        if(!user||!user.userId){
            console.log(123)
            //自动跳转到登录（在render()中）
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{minHeight:'100%'}}>
                <Layout style={{backgroundColor:"white"}}>
                    <Header/>
                    <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                        <Switch>
                            <Redirect exact={true} from='/' to='/recruit'/>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/recruit' component={Recruit}></Route>
                            <Route path='/business' component={Business}></Route>
                            <Route component={NotFound}/>
                        </Switch>
                    </Content>

                </Layout>
                <Footer style={{textAlign:'center',color:"green",marginTop:20}}>推荐使用谷歌浏览器，可以获得更加的页面操作体检</Footer>
            </Layout>

        )
    }
}

export default connect(
    state=>({user:state.user}),
    {}
)(Admin)