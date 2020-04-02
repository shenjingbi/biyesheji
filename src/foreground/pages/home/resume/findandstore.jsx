import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Card, Form, Icon, Input, Select, Table} from "antd";
import {connect} from "react-redux";
import {setHeadTitle} from "../../../redux/actions";
import LinkButton from "../../../../background/component/link-button/button";

const Item=Form.Item


//查看简历详情
 class ShowFind extends Component{

     componentWillMount() {
         //取出携带的state
         const resume=this.props.location.state
         this.resume=resume||{}
     }
     componentDidMount() {
         this.props.setHeadTitle('简历详情')
     }
     render() {
         const {resume}=this
         const resume1=resume.resume
         console.log(resume1)
         const title=resume1.rname
         return (
             <Card title={title}
                   headStyle={{backgroundColor:"lightgrey",fontSize:30}}
                   className='resume'
                   bordered={false}
             >
                 <p><span>基本情况：</span> {resume1.sex} | {resume1.birth}岁 | {resume1.education} </p>
                 <p><span>求职意向：</span> 求职{resume1.workclassify} | 想在{resume1.place}工作 | 期望薪资{resume1.salary}</p>
                 <p><span>联系方式：</span> {resume1.telephone} </p>
                 <p><span>自我介绍：</span>{resume1.introduce}</p>
             </Card>
         )
    }
}
export default connect(
    state=>({user:state.user}),
    {setHeadTitle}
)(Form.create()(ShowFind))