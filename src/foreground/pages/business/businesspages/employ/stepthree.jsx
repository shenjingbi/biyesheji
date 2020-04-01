import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Card, Dropdown, Form, Input, Menu, message, Radio, Select, TextArea, TreeSelect} from "antd";
import {} from "../../../../api";
import {connect} from "react-redux";
import {login, setHeadTitle} from "../../../../redux/actions";
import {withRouter} from "react-router-dom";

const Item=Form.Item
const {Option}=Select
const {SubMenu}=Menu

//添加和修改
class StepThree extends Component{
    state={
        salarys:['面议','1000元以下','1000-2000元','2000-3000元','3000-5000元','5000-8000元','8000-12000元','12000-20000元','20000-25000元','25000元以上'], //工资选项
        worktimes:['无经验','应届生','一年以下','1-3年','3-5年','5-10年','10年以上'], //工作年限
        educations:['高中以下','高中','中专/技校','大专','本科','硕士','博士','MBA/EMBA',] ,//学历分类
    }

    render() {
        //得到form对象
        const {getFieldDecorator}=this.props.form
        const {salarys,worktimes,educations}=this.state
        const {recruit}=this.props
        const formItemLayout={
            labelCol:{span:4},
            wrapperCol:{span:10}
        }

        return (
            <div style={{textAlign: 'center'}}>
                <p style={{textAlign: 'center',fontSize:40,marginTop:50}}>创建招聘信息并发布成功</p>
                <Button type='danger' onClick={()=>this.props.history.push('/business')}>返回商家中心</Button>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {setHeadTitle}
)(Form.create()(withRouter(StepThree)))