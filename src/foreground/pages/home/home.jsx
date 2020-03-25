import React,{Component} from 'react'
import './home.less'
import {Redirect, Switch, Route, withRouter} from 'react-router-dom'
import {Layout} from "antd";

import LeftNav from "./left_nav/left-nav";
import User from "./user/user";
import Favorite from './favorite'
import Resume from './resume/resume'
import AddResume from './resume/addupdresume'
import ShowFind from './resume/findandstore'
import Deliver from './deliver'
import NotFound from "../not-found/not-found"
import {connect} from "react-redux";
import {setHeadTitle2} from "../../redux/actions";

const {Footer,Sider,Content,Header}=Layout
/*
首页路由
* */
class Home extends Component{

    constructor(props) {
        super(props)
        this.state = {
            user:[0,0,0,0,0,0,0], //
            users:[], //后台用户总人数
            newuse:[0,0],//注册人数
            date:[]
        }
        this.echartsReact = React.createRef()
    }

    componentDidMount() {
        this.props.setHeadTitle2('个人中心')
    }

    render() {
        const {user,users,newuse}=this.state
        const title=this.props.headTitle
        //console.log(moment(users).format('d'))
        return (

                    <Layout className="home" >
                        <Sider className="left-nav" >
                            <LeftNav/>
                        </Sider>
                        <Content className='content1'>
                            <Header className='header1'>
                                <div>{title}</div>
                            </Header>
                            <Switch>
                                <Redirect exact={true} from='/home' to='/home/user'/>
                                <Route path='/home/user' component={User}></Route>
                                <Route path='/home/deliver' component={Deliver}></Route>
                                <Route path='/home/favorite' component={Favorite}></Route>
                                <Route path='/home/resume' component={Resume}></Route>
                                <Route path='/home/addupdresume' component={AddResume}></Route>
                                <Route path='/home/showresume' component={ShowFind}></Route>
                                <Route component={NotFound}/>
                            </Switch>
                        </Content>
                    </Layout>


        )
    }
}
export  default connect(
    state=>({headTitle:state.headTitle,user:state.user,headTitle2:state.headTitle2}),
    {setHeadTitle2}
)(withRouter(Home))