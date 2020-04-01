import React,{Component} from 'react'
import {Switch,Route} from "react-router-dom";
import {Card, Button, Table, Modal, message, Avatar, Upload, Menu} from 'antd'


import {
    reqEnterpriseDetail,
    reqFavorite, reqSetFavorite, reqWhetherFavorite,
} from "../../api";
import {connect} from "react-redux";
import {login} from "../../redux/actions";
import LinkButton from "../../component/link-button/button";
import {MailOutlined} from "@ant-design/icons";
import {formateDate, formateDate2} from "../../utils/dateUtils";
import HeartOutlined from "@ant-design/icons/lib/icons/HeartOutlined";
import HeartFilled from "@ant-design/icons/lib/icons/HeartFilled";
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
             console.log(111,result.data)
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

     componentWillMount() {
         //取出携带的state
         const recruit=this.props.location.state
         //保存是否是更新标识
         this.isUpdate=!!recruit
         this.recruit1=recruit||{}
     }
     componentDidMount() {
         this.getUsersFavorite()
         this.getEnterpriseDetail()
     }


     render() {
        const {recruit1,isUpdate}=this
        const {color,icon,enterprise}=this.state
        const recruit=recruit1.recruit||{}
        return (
            <div>
                <LinkButton onClick={()=>{this.props.history.go(-1)}}>fanhui</LinkButton>
                <div key={recruit.employid}>
                    <div >
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
                        <div>
                            <span className='span1'>{recruit.category}</span>
                            <span className='span1'>{recruit.salarymin}-{recruit.salarymax}元/月</span>
                            <span className='span1'>{recruit.emname}</span>
                            <span className='span1'>{recruit.welfare}</span>
                            <hr/>
                            <p><span className='span1'>{recruit.category}|{recruit.education}|{recruit.worktime}</span></p>
                            <p><span className='span1'>{recruit.fulladdress}</span></p>
                            <Button  className='span1'>申请职位</Button>
                        </div>
                        <div>
                            <Card title='职位描述'>
                                <pre  className='span1'>{recruit.workdetail}</pre>
                            </Card>
                        </div>
                        <div>
                            <Card title='公司介绍'>
                                <pre  className='span1'>{recruit.enterdetail}</pre>
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