import React,{Component} from 'react'
import {Switch,Route} from "react-router-dom";
import { Button, message, Steps} from 'antd'


import {connect} from "react-redux";
import {setHeadTitle, setHeadTitle2} from "../../../../redux/actions";
import StepOne from "./stepone"
import StepTwo from "./steptwo"
import StepThree from "./stepthree"
import "./business.less"
import PropTypes from "prop-types";
import {reqAddEmpoly, reqUpdateEmpoly} from "../../../../api";

const {Step}=Steps
/*
个人信息
* */
 class UpdateEmploy extends Component{
    state={
        current:0,   //当前所选的步骤
        recruit:0,  //简历信息
        steps:[
            {
                title: '职位信息填写',
            },
            {
                title: '企业信息填写',
            },
            {
                title: '职位发布完成',
            },
        ]
    }

     //修改招聘信息
     updateEmploymessage=async ()=>{
         //表单验证，通过才处理
         this.form.validateFields(async (err,values)=>{
             if(!err){
                 //收集数据数据
                 const {recruit1}=this
                 const employid=recruit1.recruit.employid
                 const result=await reqUpdateEmpoly(employid,values)
                 if(result.status===0){
                     message.success('修改信息成功')
                 }
                 this.props.history.push('/business/employ')
             }
         })
     }

     componentWillMount() {
         //取出携带的state
         const recruit=this.props.location.state
         //保存是否是更新标识
         this.isUpdate=!!recruit
         this.recruit1=recruit||{}
     }

     componentDidMount() {
         this.props.setHeadTitle('修改招聘信息')
     }

     render() {
         const { current,steps} = this.state;
         const {recruit1,isUpdate}=this
         const recruit=recruit1.recruit||{}
         //const  recruit=this.recruit
         return (
             <div className='step'>
                 <StepOne recruit={recruit} isUpdate={isUpdate} setForm={(form)=>{this.form=form}}/>
                 <Button type="primary" onClick={() => {this.updateEmploymessage()}}>
                     修改信息并发布
                 </Button>
             </div>
         );
     }
}
export default connect(
    state=>({user:state.user}),
    {setHeadTitle}
)(UpdateEmploy)