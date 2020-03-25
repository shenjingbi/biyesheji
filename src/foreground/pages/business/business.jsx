import React,{Component} from 'react'
import {Switch,Route} from "react-router-dom";
import { Button, message, Steps} from 'antd'


import { reqUpdatePhotos} from "../../api";
import {connect} from "react-redux";
import { setHeadTitle2} from "../../redux/actions";
import LinkButton from "../../component/link-button/button";
import StepOne from "./stepone"
import StepTwo from "./steptwo"
import StepThree from "./stepthree"
import "./business.less"

const {Step}=Steps
/*
个人信息
* */
 class Business extends Component{
    state={
        current:0,   //当前所选的步骤
        resuem:[],
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

     componentDidMount() {
         this.props.setHeadTitle2('商家中心')
     }
     const


     next() {
         const current = this.state.current + 1;
         this.setState({ current });
     }

     prev() {
         const current = this.state.current - 1;
         this.setState({ current });
     }

     render() {
         const { current,steps ,resuem} = this.state;
         return (
             <div className='step'>
                 <Steps current={current}>
                     {steps.map(item => (
                         <Step key={item.title} title={item.title} />
                     ))}
                 </Steps>
                 <div className="steps-content">
                 {
                    current===0?<StepOne resume={resuem}/>:(current===1?"<StepTwo resume={resuem}/>":"<StepThree resume={resuem}/>")
                 }
                 </div>
                 <div className="steps-action">
                     {current < steps.length - 1 && (
                         <Button type="primary" onClick={() => this.next()}>
                             Next
                         </Button>
                     )}
                     {current === steps.length - 1 && (
                         <Button type="primary" onClick={() => message.success('Processing complete!')}>
                             Done
                         </Button>
                     )}
                     {current > 0 && (
                         <Button style={{ margin: 8 }} onClick={() => this.prev()}>
                             Previous
                         </Button>
                     )}
                 </div>
             </div>
         );
     }
}
export default connect(
    state=>({user:state.user}),
    {setHeadTitle2}
)(Business)