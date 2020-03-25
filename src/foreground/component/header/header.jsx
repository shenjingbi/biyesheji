import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import './header.less'
import {formateDate} from '../../utils/dateUtils'
import {reqWeather} from "../../api";

import { Modal} from "antd";
import {
    HomeOutlined
} from '@ant-design/icons';
import {logout, setHeadTitle2} from '../../redux/actions'
import LinkButton from "../link-button/button";
/*
左侧导航的组件
* */
 class Header1 extends Component{
    state={
        currentTime:formateDate(Date.now()),//当前时间字符串
        dayPictureUrl:'',
        weather:''
    }

    getTime=()=>{
        //每隔1s获取当前时间，并更新状态数据currentTime
        this.intervalId = setInterval(()=>{
            const currentTime=formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }
    getWeather=async ()=>{
        //调用接口请求函数
        const {dayPictureUrl,weather}=await reqWeather('南通')
        this.setState({dayPictureUrl,weather})
    }

    logout=()=>{
        //显示确认框
        Modal.confirm({
            content:'确认退出吗？',
            onOk:()=>{
                this.props.logout()
            },
            onCancel(){
                console.log('Cancel')
            }
        })
    }


    /*
    当前组件卸载之前调用
    * */
    componentWillUnmount() {
        //清楚定时器
        clearInterval(this.intervalId)
    }

     /*第一次render()之后执行
       一般在此执行异步操作：发ajax请求/启动定时器
     * */
    componentDidMount() {
        //获取当前时间
        this.getTime()
        //获取当前天气
        this.getWeather()
    }

    render() {
        const {currentTime,dayPictureUrl,weather}=this.state
        const username=this.props.user.username
        //得到当前需要显示的title
        //const title=this.getTitle()
        const title=this.props.headTitle2
        return (
            <div className='header'>
                <div className='header-top'>
                    <div className='header-top-left'>
                        <LinkButton onClick={()=>{this.props.history.push('/recruit');this.props.setHeadTitle2('')}}><HomeOutlined/>高校招聘</LinkButton>
                        <span style={{marginLeft:20}}>{currentTime}</span>
                        <img src={dayPictureUrl} style={{marginLeft:30}} alt='weather'/>
                        <span style={{marginLeft:50}}>{weather}</span>
                    </div>

                    <div className='header-top-right'>
                        <span>欢迎，{username}</span>
                        <LinkButton  onClick={this.logout}>退出</LinkButton>
                        <LinkButton onClick={()=>this.props.history.push('/home')}>个人中心</LinkButton>
                        <LinkButton onClick={()=>this.props.history.push('/business')}>商家中心</LinkButton>
                    </div>
                </div>
                <div className='header-bottom'>

                    <div className='header-bottom-left'>
                        高校招聘{title===''?null:'·'}{title}
                    </div>
                </div>
            </div>
        )
    }
}

export  default connect(
    state=>({headTitle2:state.headTitle2,user:state.user}),
    {setHeadTitle2}
)(withRouter(Header1))
//withRouter(Header)将该组件变成路由组件，connect将该组件变称容器组件