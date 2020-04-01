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
 class Business extends Component{
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

     //保存第一步中填写的内容
     preserveStepone=async ()=>{
         //表单验证，通过才处理
         this.form1.validateFields(async (err,values)=>{
             if(!err){
                 //收集数据数据
                 const current = this.state.current + 1;
                 const recruit=values
                 this.setState({recruit,current})
             }
         })
     }

     //提交招聘信息
     addEmploymessage=async ()=>{
         //表单验证，通过才处理
         this.form2.validateFields(async (err,values)=>{
             if(!err){
                 //收集数据数据
                 const userId=this.props.user.userId
                 const current = this.state.current + 1;
                 this.setState({current})
                 const {recruit}=this.state
                 const result=await reqAddEmpoly(recruit,values,userId)
                 if(result.status===0){
                     message.success('添加信息成功')
                 }
             }
         })
     }

     prev() {
         const current = this.state.current - 1;
         this.setState({ current});
     }

     componentDidMount() {
         this.props.setHeadTitle('创建招聘信息')
     }

     render() {
         const { current,steps,recruit} = this.state;
         //const  recruit=this.recruit
         return (
             <div className='step'>
                 <Steps current={current}>
                     {steps.map(item => (
                         <Step key={item.title} title={item.title} />
                     ))}
                 </Steps>
                 <div className="steps-content">
                 {
                    current===0?<StepOne recruit={recruit} setForm={(form)=>{this.form1=form}}/>:(current===1?<StepTwo recruit={recruit} setForm={(form)=>this.form2=form}/>:<StepThree recruit={recruit} />)
                 }
                 </div>
                 <div className="steps-action">
                     {current < steps.length - 1 && (
                         current===0?
                         (<Button type="primary" onClick={() => this.preserveStepone()}>
                             下一步
                         </Button>):
                         (<Button type="primary" onClick={() => {this.addEmploymessage()}}>
                                 创建信息并发布
                         </Button>)

                     )}
                     {current < steps.length - 1&&current > 0 && (
                         <Button style={{ margin: 8 }} onClick={() => this.prev()}>
                             上一步
                         </Button>
                     )}
                 </div>
             </div>
         );
     }
}
export default connect(
    state=>({user:state.user}),
    {setHeadTitle}
)(Business)