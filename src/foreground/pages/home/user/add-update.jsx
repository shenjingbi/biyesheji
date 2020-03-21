import React,{Component} from 'react'
import PropTypes from 'prop-types'
import{Form,Input} from "antd";
//import category from "./category";

const Item=Form.Item

//添加分类的Form组件
class UserAddUpdate extends Component{
    static  propTypes={
        setForm:PropTypes.func.isRequired,
        user:PropTypes.object.isRequired
    }
    componentWillMount() {
        //将form对象通过setForm（）传给父对象
        this.props.setForm(this.props.form)
    }
    render() {
        const {user}=this.props
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
                            initialValue:user.username,
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
                    user.username?null:(
                        <Item label='密码：' {...formItemLayout}>
                            {
                                getFieldDecorator('password',{
                                    initialValue:user.password,
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
                <Item label='手机号：' {...formItemLayout}>
                    {
                        getFieldDecorator('telephone',{
                            initialValue:user.telephone,
                            rules:[
                                {required:true,message:'手机号必须输入'}
                            ]
                        })(
                            <Input placeholder='请输入手机号'/>
                        )
                    }
                </Item>
                <Item label='邮箱：' {...formItemLayout}>
                    {
                        getFieldDecorator('email',{
                            initialValue:user.email,
                            rules: [
                                { type: 'email',message: 'The input is not valid E-mail!', },
                                { required: true,message: '请输入你的邮箱',},
                            ],
                        })(
                            <Input placeholder='请输入邮箱'/>
                        )
                    }
                </Item>
            </Form>

        )
    }
}
export default Form.create()(UserAddUpdate)