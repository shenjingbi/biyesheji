import React,{Component} from 'react'
import PropTypes from 'prop-types'
import{Form,Input,DatePicker} from "antd";
import moment from "moment";
//import category from "./category";

const Item=Form.Item

//添加分类的Form组件
class EnterpriseAddUpdate extends Component{
    static  propTypes={
        setForm:PropTypes.func.isRequired,
        enterprise:PropTypes.object.isRequired
    }
    componentWillMount() {
        //将form对象通过setForm（）传给父对象
        this.props.setForm(this.props.form)
    }
    render() {
        const {enterprise}=this.props
        //得到form对象
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:4},
            wrapperCol:{span:15}
        }
        return (
            <Form>
                <Item  label='用户名：' {...formItemLayout}>
                    {
                        getFieldDecorator('username',{
                            initialValue:enterprise.username,
                            rules: [
                                { required: true,whitespace:true, message: '用户名必须输入' },
                                { min: 4, message: '用户名至少4位' },
                                { max: 12, message: '用户名最多12位' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                            ],
                        })(
                            <Input placeholder='请输入用户名称'/>
                        )
                    }
                </Item>
                <Item  label='企业名：' {...formItemLayout}>
                    {
                        getFieldDecorator('enterName',{
                            initialValue:enterprise.enterName,
                            rules: [
                                { required: true,whitespace:true, message: '用户名必须输入' },
                                { min: 4, message: '用户名至少4位' },
                                { max: 12, message: '用户名最多12位' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                            ],
                        })(
                            <Input placeholder='请输入用户名称'/>
                        )
                    }
                </Item>
                {
                    enterprise.enterId?null:(
                        <Item label='密码：' {...formItemLayout}>
                            {
                                getFieldDecorator('password',{
                                    initialValue:enterprise.password,
                                    rules: [
                                        { required: true,whitespace:true, message: '密码必须输入' },
                                        { min: 4, message: '密码至少4位' },
                                        { max: 12, message: '密码最多12位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成' },
                                    ],
                                })(
                                    <Input type='password' placeholder='请输入密码'/>
                                )
                            }
                        </Item>
                    )
                }
                <Item label='创办者：' {...formItemLayout}>
                    {
                        getFieldDecorator('founder',{
                            initialValue:enterprise.founder,
                            rules:[
                                {required:true,message:'创办人必须输入'}
                            ]
                        })(
                            <Input placeholder='请输入创办人姓名'/>
                        )
                    }
                </Item>
                <Item label="创办日期" {...formItemLayout}>
                    {
                        getFieldDecorator('enterCreTime',{
                            initialValue:moment(enterprise.enterCreTime),
                            rules:[
                                {required:true,message:'创办日期必须输入'}
                            ]
                        })(
                            <DatePicker placeholder='请输入创办日期'/>
                        )
                    }


                </Item>
                <Item label='联系电话：' {...formItemLayout}>
                    {
                        getFieldDecorator('telephone',{
                            initialValue:enterprise.telephone,
                            rules:[
                                {required:true,message:'联系电话必须输入'}
                            ]
                        })(
                            <Input placeholder='请输入联系电话'/>
                        )
                    }
                </Item>
                <Item label='企业证书：' {...formItemLayout}>
                    {
                        getFieldDecorator('enterCreti',{
                            initialValue:enterprise.enterCreti,
                            rules: [
                                { required: true,message: '请输入你的企业证书',},
                            ],
                        })(
                            <Input placeholder='请输入企业证书'/>
                        )
                    }
                </Item>
                <Item label='企业详情：' {...formItemLayout}>
                    {
                        getFieldDecorator('enterDetail',{
                            initialValue:enterprise.enterDetail,
                            rules:[
                            ]
                        })(
                            <Input placeholder='请输入企业详情'/>
                        )
                    }
                </Item>

            </Form>

        )
    }
}
export default Form.create()(EnterpriseAddUpdate)