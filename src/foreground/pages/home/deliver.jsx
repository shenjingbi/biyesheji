import React,{Component} from 'react'
import {Switch,Route} from "react-router-dom";
import { Table, Modal, message, Upload, Menu} from 'antd'

import {
    getRecruitDetail, getResumeDetail,
    reqAddScan,
    reqBeFavorite,
    reqDeliver,
    reqFavorite,
} from "../../api";
import {connect} from "react-redux";
import {login} from "../../redux/actions";
import LinkButton from "../../component/link-button/button";
import {formateDate} from "../../utils/dateUtils";
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
                 title: '招聘信息',
                 key: 'emname',
                 render:(deliver)=>(
                     <LinkButton  onClick={()=>this.showRecruit(deliver)}>{deliver.emname}</LinkButton>
                 )
             },
             {
                 title: '简历信息',
                 dataIndex: 'rename',
                 key: 'rename',
             },

             {
                 title: '投递时间',
                 dataIndex: 'create_time',
                 key: 'create_time',
                 render:formateDate
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
         const userId=this.props.user.userId
         const result=await reqDeliver(userId)
         if(result.status===0){
             const deliver=result.data
             this.setState({deliver})
         }else{
             message.error(result.msg)
         }
     }

     //查看招聘信息
     showRecruit=async (deliver)=>{
         const employid=deliver.employid
         const userId=this.props.user.userId
         await reqAddScan(employid)
         const result=await getRecruitDetail(employid,userId)
         if(result.status===0){
             const recruits=result.data
             const recruit=recruits[0]
             this.props.history.push('/recruit/detail',{recruit})
         }
     }

     //查看招聘信息
     showRecruit=async (deliver)=>{
         const employid=deliver.employid
         const userId=this.props.user.userId
         const result=await getResumeDetail(employid,userId)
         if(result.status===0){
             const recruits=result.data
             const recruit=recruits[0]
             this.props.history.push('/recruit/detail',{recruit})
         }
     }

     //删除投递信息
     showDelete=(deliver)=>{
         console.log(2,deliver)
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
                        loading={false} >
                 </Table>
             </div>
         )
     }
}
export default connect(
    state=>({user:state.user}),
    {login}
)(Deliver)