import React,{Component} from 'react'
import {Switch,Route} from "react-router-dom";
import { Table, Modal, message, Upload, Menu} from 'antd'

import {
    reqBeFavorite,
    reqDeliver,
    reqFavorite,
} from "../../api";
import {connect} from "react-redux";
import {login} from "../../redux/actions";
import LinkButton from "../../component/link-button/button";
import {MailOutlined} from "@ant-design/icons";
/*
个人信息
* */
 class Deliver extends Component{
     state = {
         deliver:[],  //我的投递
     };
     //初始化table的所有列数组
     initColumns=()=>{
         this.columns=[
             {
                 title: '职位名称',
                 dataIndex: 'emname',
                 key: 'emname',
             },
             {
                 title: '职位分类',
                 dataIndex: 'category',
                 key: 'category',
             },
             {
                 title: '投递时间',
                 dataIndex: 'detime',
                 key: 'detime',
             },
             {
                 title: '状态',
                 dataIndex: 'state',
                 key: 'state',
             },
             {
                 title: '操作',
                 render:(deliver)=>(//每一行代表一个分类对象，render都需要渲染该行，故取出该行
                     <span>
                        <LinkButton onClick={()=>this.showDelete(deliver)}>删除</LinkButton>
                    </span>
                 )
             }
         ];
     }

     //异步获取投递信息
     getDeliver=async ()=>{
         const username=this.props.user.username
         const result=await reqDeliver(username)
         if(result.status===0){
             const deliver=result.data
             this.setState({deliver})
         }else{
             message.error(result.msg)
         }
     }

     //为第一次render()准备数据
     componentWillMount() {
         this.initColumns()
     }

     //发异步ajax请求
     componentDidMount() {
         this.getDeliver()
     }


     render() {
         const {current,deliver}=this.state
         return (
             <div>
                 <Table dataSource={deliver}
                        columns={this.columns} bordered={true} rowKey={"deliverid"}
                        pagination={{defaultPageSize: 5, showQuickJumper: true}}
                        loading={false} style={{marginLeft:50}}>
                 </Table>
             </div>
         )
     }
}
export default connect(
    state=>({user:state.user}),
    {login}
)(Deliver)