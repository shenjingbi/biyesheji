import React,{Component} from 'react'
import PropTypes from 'prop-types'
import{Form,Input} from "antd";
//import category from "./category";

const Item=Form.Item

//添加分类的Form组件
class ResumeAdd extends Component{
    static  propTypes={
        setForm:PropTypes.func.isRequired,
    }
    componentWillMount() {
        //将form对象通过setForm（）传给父对象
        this.props.setForm(this.props.form)
    }
    render() {
        //得到form对象
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:4},
            wrapperCol:{span:10}
        }
        return (
            <Form>
                <Item  label='姓名：' {...formItemLayout}>
                    {
                        getFieldDecorator('name',{
                            initialValue:'',
                            rules: [
                                { required: true,whitespace:true, message: '姓名必须输入' },
                                { min: 2, message: '姓名必须是2-4个汉字' },
                                { max: 4, message: '姓名必须是2-4个汉字' },
                                { pattern: /[\u4E00-\u9FA5]/g, message: '姓名必须是2-4个个汉字' },
                            ],
                        })(
                            <Input placeholder='请输入用户名称'/>
                        )
                    }
                </Item>

                <Item label='出生年份：' {...formItemLayout}>
                    {
                        getFieldDecorator('birth',{
                            initialValue:'',
                            rules:[
                                {required:true,message:'出生年份必须输入'}
                            ]
                        })(
                            <Input placeholder='请输入密码'/>
                        )
                    }
                </Item>

                <Item label='工作经历：' {...formItemLayout}>
                    {
                        getFieldDecorator('worktime',{
                            initialValue:'',
                            rules: [
                                { required: true,message: '请填写你的工作经历',},
                            ],
                        })(
                            <Input placeholder='请填写你的工作经历'/>
                        )
                    }
                </Item>

                <Item label='学历：' {...formItemLayout}>
                    {
                        getFieldDecorator('education',{
                            initialValue:'',
                            rules: [
                                { required: true,message: '请填写你的学历',},
                            ],
                        })(
                            <Input placeholder='请填写你的学历'/>
                        )
                    }
                </Item>

                <Item label='手机号：' {...formItemLayout}>
                    {
                        getFieldDecorator('telephone',{
                            initialValue:'',
                            rules:[
                                {required:true,message:'手机号必须输入'}
                            ]
                        })(
                            <Input placeholder='请输入手机号'/>
                        )
                    }
                </Item>

                <Item label='自我介绍：' {...formItemLayout}>
                    {
                        getFieldDecorator('introduce',{
                            initialValue:'',
                        })(
                            <Input placeholder=''/>
                        )
                    }
                </Item>

                <Item label='职业类别：' {...formItemLayout}>
                    {
                        getFieldDecorator('workclassify',{
                            initialValue:'',
                            rules:[
                                {required:true,message:'请输入职业类别'}
                            ]
                        })(
                            <Input placeholder='请输入职业类别'/>
                        )
                    }
                </Item>

                <Item label='工作地点：' {...formItemLayout}>
                    {
                        getFieldDecorator('place',{
                            initialValue:'',
                            rules:[
                                {required:true,message:'请输入工作地点'}
                            ]
                        })(
                            <Input placeholder='请输入工作地点'/>
                        )
                    }
                </Item>

                <Item label='期望薪资：' {...formItemLayout}>
                    {
                        getFieldDecorator('salary',{
                            initialValue:'',

                        })(
                            <Input placeholder='请输入期望薪资'/>
                        )
                    }
                </Item>


            </Form>

        )
    }
}
export default Form.create()(ResumeAdd)