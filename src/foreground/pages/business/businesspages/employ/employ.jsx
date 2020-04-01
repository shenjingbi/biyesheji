import React,{Component} from 'react'
import {Switch,Route} from "react-router-dom";
import {Table, message, Button, Card,Modal} from 'antd'

import {reqDeleteEmploy, reqRecruit} from "../../../../api";
import {connect} from "react-redux";
import LinkButton from "../../../../component/link-button/button";
import {formateDate} from "../../../../utils/dateUtils";
/*
个人信息
* */
 class Employ extends Component{
     state = {
         recruit:[],  //招聘信息列表
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
                 title: '创建时间',
                 dataIndex: 'create_time',
                 key: 'create_time',
                 render:formateDate
             },

             {
                 title: '操作',
                 render:(recruit)=>(//每一行代表一个分类对象，render都需要渲染该行，故取出该行
                     <span>
                        <LinkButton onClick={()=>{this.props.history.push('/business/updateemploy', {recruit})}}>修改</LinkButton>
                        <LinkButton onClick={()=>this.showDelete(recruit)}>删除</LinkButton>
                    </span>
                 )
             }
         ];
     }

     //异步获取招聘信息
     getRecruit=async ()=>{
         const userId=this.props.user.userId
         const result=await reqRecruit(userId)
         if(result.status===0){
             const recruit=result.data
             this.setState({recruit})
         }else{
             message.error(result.msg)
         }
     }

     //删除招聘信息
     showDelete=async (recruit)=>{
         Modal.confirm({
             title:`确定删除吗？`,
             onOk:async ()=>{
                 const result=await reqDeleteEmploy(recruit.employid)
                 if(result.status===0){
                     message.success('删除简历成功')
                     this.setState({resume:[]})
                     this.getRecruit()
                     this.props.history.replace('/business/employ')
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
         this.getRecruit()
     }

     render() {
         const {recruit}=this.state
         return (
             <div style={{textAlign:"right"}}>
                 <Table dataSource={recruit}
                        columns={this.columns} bordered={true} rowKey={"employid"}
                        pagination={{defaultPageSize: 5, showQuickJumper: true}}
                        loading={false} style={{marginLeft:50}} >
                 </Table>
                 <Button type='primary'  onClick={()=>{this.props.history.push('/business/addemploy')}}>发布招聘</Button>
             </div>
         )
     }
}
export default connect(
    state=>({user:state.user}),
    {}
)(Employ)