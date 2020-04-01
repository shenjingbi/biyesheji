import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Form, Input, message} from "antd";

import {reqUpdateUsers} from "../../../../api";

const Item=Form.Item

//添加分类的Form组件
class UserAddUpdate extends Component{
    static  propTypes={
        setForm:PropTypes.func.isRequired,
        user:PropTypes.object.isRequired,
    }
    state={
        showborder:'none', //显示边框
        showshadow:'none', //显示边框阴影
        showname:'修改信息',//修改按钮名称
        showread:true,     //文本框是否只读
        time:true          //判断当前是修改还是保存
    }

    //修改用户名
    updateUsers=(time)=>{
        if(time===true){
            this.setState({showborder: '',showshadow:'' ,showname: '确定提交',time:false,showread:false})
        }
        else{
            //表单验证，通过才处理
            this.props.form.validateFields(async (err,values)=>{
                if(!err){
                    values.userId=this.props.user.userId
                    const result=await reqUpdateUsers(values)
                    if(result.status===0) {
                        message.success('修改成功')
                        this.setState({showborder: 'none',showshadow:'none' ,showname: '修改信息',time:true,showread:true})
                    }else {message.error(result.msg)}
                }
            })
        }
    }

    componentWillMount() {
        //将form对象通过setForm（）传给父对象
        this.props.setForm(this.props.form)
    }
    render() {
        const {user}=this.props
        const {showborder,showshadow,showname,showread,time}=this.state

        //得到form对象
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:2},
            wrapperCol:{span:5}
        }
        return (
            <Form>
                <Item  label='用户名:' {...formItemLayout}  >
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

                        <Input style={{border:showborder,boxShadow:showshadow}} readOnly={showread}  placeholder='请输入用户名称'/>
                    )
                }

            </Item>

            <Item label='手机号:' {...formItemLayout} >
                {
                    getFieldDecorator('telephone',{
                        initialValue:user.telephone,
                        rules:[
                            {required:true,message:'手机号必须输入'}
                        ]
                    })(
                        <Input style={{border:showborder,boxShadow:showshadow}} readOnly={showread} placeholder='请输入手机号'/>
                    )
                }
            </Item>

            <Item label='邮箱:' {...formItemLayout} >
                {
                    getFieldDecorator('email',{
                        initialValue:user.email,
                        rules:[
                            { type: 'email',message: '请输入正确的邮箱格式!', },
                            { required: true,message: '请输入你的邮箱',},
                        ]
                    })(
                        <Input style={{border:showborder,boxShadow:showshadow}} readOnly={showread} placeholder='请输入邮箱'/>
                    )
                }
            </Item>

            <Button style={{marginLeft:100}}  onClick={()=>this.updateUsers(time)}> {showname}</Button>
        </Form>

        )
    }
}
export default Form.create()(UserAddUpdate)