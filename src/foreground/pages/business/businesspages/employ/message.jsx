import React,{Component} from 'react'
import {Switch,Route} from "react-router-dom";
import {Card, Button, Table, Modal, message, Avatar, Upload, Menu} from 'antd'


import {reqBeFavorite, reqDeleteFavorite, reqFavorite} from "../../../../api";
import {connect} from "react-redux";
import LinkButton from "../../../../component/link-button/button";
import {MailOutlined} from "@ant-design/icons";
import {formateDate} from "../../../../utils/dateUtils";
/*
我的收藏
* */
 class Message extends Component{
     state = {
         current: 'collect',
         favorite:[],  //我的收藏和被收藏
     };
     //初始化table的所有列数组
     initColumns=()=>{
         this.columns=[
             {
                 title: '简历信息',
                 dataIndex: 'resumename',
                 key: 'resumename',
             },
             {
                 title: '投递时间',
                 dataIndex: 'create_time',
                 key: 'create_time',
                 render:formateDate
             },
             {
                 title: '操作',
                 render:(resume)=>(//每一行代表一个分类对象，render都需要渲染该行，故取出该行
                     <span>
                        <LinkButton onClick={()=>this.showDelete(resume)}>查看</LinkButton>
                        <LinkButton onClick={()=>this.showDelete(resume)}>删除</LinkButton>
                    </span>
                 )
             }
         ];
     }

     //初始化table的所有列数组
     secondColumns=()=>{
         this.columns=[
             {
                 title: '收藏者',
                 dataIndex: 'username',
                 key: 'username',
             },
             {
                 title: '收藏的信息',
                 dataIndex: 'rname',
                 key: 'rname',
             },
             {
                 title: '收藏时间',
                 dataIndex: 'create_time',
                 key: 'create_time',
             },
             {
                 title: '操作',
                 render:(favorite)=>(//每一行代表一个分类对象，render都需要渲染该行，故取出该行
                     <span>
                        <LinkButton onClick={()=>this.showDelete(favorite)}>删除</LinkButton>
                    </span>
                 )
             }
         ];
     }

     handleClick = async (e) => {
         console.log('click ', e.key);
         if(e.key==="collect"){
             this.initColumns()
             const username=this.props.user.username
             const result=await reqFavorite(username)
             const favorite=result.data
             this.setState({favorite,current: e.key,})
         }else{
             this.secondColumns()
             const result =await reqBeFavorite()
             const favorite=result.data
             this.setState({favorite,current: e.key,})
         }

     };

     //异步获取简历信息
     getFavorite=async ()=>{
         const username=this.props.user.username
         const result=await reqFavorite(username)
         if(result.status===0){
             const favorite=result.data
             this.setState({favorite})
         }else{
             message.error(result.msg)
         }
     }

     //删除收藏
     showDelete=async (favorite)=>{
         Modal.confirm({
             title:`确定删除吗？`,
             onOk:async ()=>{
                 console.log(favorite)
                 const result=await reqDeleteFavorite(favorite.favoriteid)
                 if(result.status===0){
                     message.success('删除简历成功')
                     this.setState({resume:[]})
                     this.getResume()
                     this.props.history.replace('/home/resume')
                 }
             }
         })

     }

     //为第一次render()准备数据
     componentWillMount() {
         this.initColumns()
     }

     //发异步ajax请求
     componentDidMount() {
         this.getFavorite()
     }


    render() {
        const {current,favorite}=this.state
        return (
            <div>
                <Menu onClick={this.handleClick}
                      selectedKeys={[current]}
                      mode="horizontal"
                      style={{marginLeft:50}}
                >
                    <Menu.Item key="collect" >
                        <MailOutlined />
                        投递的简历
                    </Menu.Item>
                    <Menu.Item key="becollect">
                        <MailOutlined />
                        我的邀请
                    </Menu.Item>
                </Menu>
                <Table dataSource={favorite}
                       columns={this.columns} bordered={true} rowKey={current==="collect"?"favoriteid":"befavoriteid"}
                       pagination={{defaultPageSize: 5, showQuickJumper: true}}
                       loading={false} style={{marginLeft:50}}>
                </Table>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {}
)(Message)