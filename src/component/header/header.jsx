import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'

import './header.less'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from "../../utils/memoryUtils";
import {reqWeather} from "../../api";
import menuList from "../../config/menuConfig";
import {Modal} from "antd";
import storageUtils from "../../utils/storageUtils";
import LinkButton from "../link-button/button";
/*
左侧导航的组件
* */
 class Header extends Component{
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

    getTitle=()=>{
        const path= this.props.location.pathname
        let title
            menuList.forEach(item=>{
                if(item.key===path){//如果当前item对象的key与path一样，item的title就是需要显示的title
                    title=item.title
                }else if(item.children){
                    //在所有子item中查找匹配的
                    const cItem=item.children.find(cItem=>cItem.key===path)
                    //如果有值才说明有值
                    if(cItem){
                        //取出title
                        title=cItem.title
                    }
                }

            })
        return title
    }

    logout=()=>{
        //显示确认框
        Modal.confirm({
            content:'确认退出吗？',
            onOk:()=>{
                //console.log('OK');
                //删除保存的user数据
                storageUtils.deleteUser()
                memoryUtils.user={}
                //跳转到login界面
                this.props.history.replace('/login')
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
        const {username}=memoryUtils.user
        //得到当前需要显示的title
        const title=this.getTitle()

        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，{username}</span>
                    <LinkButton  onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt='weather'/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export  default withRouter(Header)