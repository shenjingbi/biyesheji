import React,{Component} from 'react'
import {Switch,Route} from "react-router-dom";
import {Card, Button, Table, Modal, message, Avatar, Upload, Menu, Tag} from 'antd'


import {
    reqApplyPosition,
    reqEnterpriseDetail, reqGetPosition, reqSetFavorite, reqWhetherFavorite,
} from "../../api";
import {connect} from "react-redux";
import LinkButton from "../../component/link-button/button";
import { formateDate2} from "../../utils/dateUtils";
import {HeartOutlined,HeartFilled,RollbackOutlined,EnvironmentFilled} from "@ant-design/icons";
import './detail.less'

/*
我的收藏
* */
 class RecruitDetail extends Component{
     state = {
         current: 'collect',
         favorite:[],  //我的收藏和被收藏
         color:'', //修改收藏颜色
         icon:'', //修改收藏图标
         enterprise:[], //公司信息
         button:false ,//按钮的颜色
     };

     //查看该信息是否收藏
     getUsersFavorite=async ()=>{
         const employid=this.recruit1.recruit.employid
         const userId=this.props.user.userId
         const result=await reqWhetherFavorite(employid,userId)
         if(result.status===0){
             if(result.data.length===0){
                 this.setState({icon:false})
             }else{
                 this.setState({icon:true})
             }
         }
     }

     //获取该信息的公司简介
     getEnterpriseDetail=async ()=>{
         const enterId=this.recruit1.recruit.enterId
         console.log(this.recruit1)
         const result=await reqEnterpriseDetail(enterId)
         if(result.status===0){
             const {enterprise}=result.data
             this.setState({enterprise})
         }
     }

     //收藏和取消收藏
     setFavorite=async ()=>{
         const {employid,emname}=this.recruit1.recruit
         const userId=this.props.user.userId
         const {icon}=this.state
         const result=await reqSetFavorite(employid,emname,userId,icon)
         if(result.status===0){
             if(result.data===true){
                 this.setState({icon:true})
             }else {
                 this.setState({icon:false})
             }
         }
     }

     //申请职位
     applyPosition=async ()=>{
         const {employid,emname}=this.recruit1.recruit
         const userId=this.props.user.userId
         const result=await reqApplyPosition(employid,emname,userId)
         if(result.status===0){
             this.setState({button:true})
             message.success("简历投递成功")
         }
     }

     //查看是否已经投递
     getPosition=async ()=>{
         const {employid}=this.recruit1.recruit
         const userId=this.props.user.userId
         const result=await reqGetPosition(employid,userId)
         if(result.status===0){
             if(result.data.length===1)
             this.setState({button:true})
         }
     }

     componentWillMount() {
         //取出携带的state
         const recruit=this.props.location.state
         //保存是否是更新标识
         this.isUpdate=!!recruit
         this.recruit1=recruit||{}
         this.getUsersFavorite()
         this.getEnterpriseDetail()
         this.getPosition()
     }
     componentDidMount() {

     }


     render() {
        const {recruit1,isUpdate}=this
        const {color,icon,enterprise,button}=this.state
        const recruit=recruit1.recruit||{}
        const welfare=recruit.welfare===undefined?{}:recruit.welfare.split(",")
         return (
            <div>
                <LinkButton onClick={()=>{this.props.history.go(-1)}} style={{marginLeft:200}}><RollbackOutlined />返回</LinkButton>
                <div>
                    <div className='content1'>
                        <span>更新:{formateDate2(recruit.create_time)}</span>
                        <span style={{marginLeft:25}}>浏览:{recruit.scan}人</span>
                        <span style={{marginLeft:25}}>申请:{recruit.apply}人</span>
                        <span style={{marginLeft:25}}>
                            <LinkButton style={{color:color}}
                                        onMouseEnter={()=>this.setState({color: "orange"})}
                                        onMouseLeave={()=>this.setState({color: ""})}
                                        onClick={this.setFavorite}>
                                {icon===true?<HeartFilled />:<HeartOutlined />}收藏
                            </LinkButton>
                        </span>
                        <div className='content2'>
                            <div>
                                <span className='span1'>{recruit.category}</span>
                                <span className='span2'>{recruit.salarymin}-{recruit.salarymax}元/月</span>
                            </div>
                            <div>
                                <span className='span3'>{recruit.emname}</span>
                            </div>
                            <div className='span4'>
                                {
                                    welfare.map(welfare=><Tag color="cyan" style={{fontSize:15}} key={welfare}>{welfare}</Tag>)
                                }
                            </div>

                            <hr/>
                            <p><span className='span5'>{recruit.category}&nbsp;&nbsp;|&nbsp;&nbsp;{recruit.education}&nbsp;&nbsp;</span></p>
                            <p><span className='span6'><EnvironmentFilled />{recruit.fulladdress}</span></p>
                            {
                                button===true?<Button type='danger'  color='grey'  className='span7' style={{backgroundColor:"gray" ,borderColor:"gray"}}>已申请</Button>:
                                    <Button type='danger' className='span7' onClick={this.applyPosition}>申请职位</Button>
                            }
                        </div>
                        <div>
                            <Card title='职位描述' bordered={false}>
                                <pre  className='span8'>{recruit.workdetail}</pre>
                            </Card>
                        </div>
                        <div>
                            <Card title='公司介绍' bordered={false}>
                                <pre  className='span9'>{recruit.enterdetail}</pre>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {}
)(RecruitDetail)