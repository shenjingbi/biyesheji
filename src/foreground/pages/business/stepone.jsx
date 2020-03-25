import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Card, Dropdown, Form, Input, Menu, message, Radio, Select, TextArea, TreeSelect} from "antd";
import {reqAddResume, reqUpdateResume} from "../../api";
import {connect} from "react-redux";
import {login, setHeadTitle} from "../../redux/actions";

const Item=Form.Item
const {Option}=Select
const {SubMenu}=Menu

//添加和修改
class StepOne extends Component{
    state={
        salarys:['面议','1000元以下','1000-2000元','2000-3000元','3000-5000元','5000-8000元','8000-12000元','12000-20000元','20000-25000元','25000元以上'], //工资选项
        worktimes:['无经验','应届生','一年以下','1-3年','3-5年','5-10年','10年以上'], //工作年限
        educations:['高中以下','高中','中专/技校','大专','本科','硕士','博士','MBA/EMBA',] ,//学历分类
    }
    static propTypes={
        resume:PropTypes.array.isRequired,
    }
    submit=()=>{
        console.log(1)
        this.props.form.validateFields(async (err,values)=>{
            if(!err){
                //2.提交添加请求
                const userId=this.props.user.userId
                console.log(userId)
                const result=await reqAddResume(values,userId)
                //清空输入框
                this.props.form.resetFields()
                //3.更新列表显示
                if(result.status===0){
                    message.success('添加用户成功')
                    this.props.history.push('/home/resume')
                }
            }
        })
    }

    update=()=>{
        console.log(2)
        //表单验证，通过才处理
        this.props.form.validateFields(async (err,values)=>{
            if(!err){
                //准备数据
                const {isUpdate,resume}=this
                const resumeid=resume.resume.resumeid
                //清除数据
                this.props.form.resetFields()
                //2.发请求更新分类
                const result=await reqUpdateResume(values,resumeid)
                //3.重新分类
                if(result.status===0) {
                    message.success('修改用户成功')
                    this.props.history.push('/home/resume')
                }else {message.error(result.msg)}
            }
        })
    }



    componentDidMount() {
        this.isUpdate?this.props.setHeadTitle('修改简历'):this.props.setHeadTitle('创建简历')
    }

    render() {

        //得到form对象
        const {getFieldDecorator}=this.props.form
        const {salarys,worktimes,educations}=this.state
        const {resume}=this.props
        const formItemLayout={
            labelCol:{span:4},
            wrapperCol:{span:10}
        }
        const treeData = [
            {
                title: 'Node1',
                value: '0-0',
                children: [
                    {
                        title: 'Child Node1',
                        value: '0-0-1',
                    },
                    {
                        title: 'Child Node2',
                        value: '0-0-2',
                    },
                ],
            },
            {
                title: 'Node2',
                value: '0-1',
            },
        ];
        return (
            <Form>
                <Card title='基本信息' bordered={false}>
                    <Item  label='姓名：' {...formItemLayout}>
                        {
                            getFieldDecorator('name',{
                                initialValue:resume.rname,
                                rules: [
                                    { required: true,whitespace:true, message: '姓名必须输入' },
                                    { min: 2, message: '姓名必须是2-4个汉字' },
                                    { max: 4, message: '姓名必须是2-4个汉字' },
                                    { pattern: /[\u4E00-\u9FA5]/g, message: '姓名必须是2-4个个汉字' },
                                ],
                            })(
                                <Input />
                            )
                        }
                    </Item>

                    <Item label='性别：' {...formItemLayout}>
                        {
                            getFieldDecorator('sex',{
                                initialValue:resume.sex,
                                rules:[
                                    {required:true,message:'性别必须填写'}
                                ]
                            })(
                                <Radio.Group name="radiogroup" >
                                    <Radio value='男'>男</Radio>
                                    <Radio value='女'>女</Radio>
                                </Radio.Group>
                            )
                        }
                    </Item>


                    <Item label='年龄：' {...formItemLayout}>
                        {
                            getFieldDecorator('birth',{
                                initialValue:resume.birth,
                                rules:[
                                    {required:true,message:'年龄必须输入'}
                                ]
                            })(
                                <Input/>
                            )
                        }
                    </Item>

                    <Item label='工作经历：' {...formItemLayout}>
                        {
                            getFieldDecorator('worktime',{
                                initialValue:resume.worktime,
                                rules: [
                                    { required: true,message: '请填写你的工作经历',},
                                ],
                            })(
                                <Select
                                    placeholder="Select a option and change input text above"  allowClear
                                >
                                    {
                                        worktimes.map(worktime=><Option key={worktime}>{worktime}</Option>)
                                    }
                                </Select>
                            )
                        }
                    </Item>

                    <Item label='学历：' {...formItemLayout}>
                        {
                            getFieldDecorator('education',{
                                initialValue:resume.education,
                                rules: [
                                    { required: true,message: '请填写你的学历',},
                                ],
                            })(
                                <Select
                                    allowClear
                                >
                                    {
                                        educations.map(education=><Option key={education}>{education}</Option>)
                                    }
                                </Select>
                            )
                        }
                    </Item>

                    <Item label='手机号：' {...formItemLayout}>
                        {
                            getFieldDecorator('telephone',{
                                initialValue:resume.telephone,
                                rules:[
                                    {required:true,message:'手机号必须输入'}
                                ]
                            })(
                                <Input />
                            )
                        }
                    </Item>

                    <Item label='自我介绍：' {...formItemLayout}>
                        {
                            getFieldDecorator('introduce',{
                                initialValue:resume.introduce,
                            })(
                                <Input.TextArea placeholder=''/>
                            )
                        }
                    </Item>
                </Card>

                <Card title='求职信息' bordered={false} >
                    <Item label='职业类别：' {...formItemLayout}>
                        {
                            getFieldDecorator('workclassify',{
                                initialValue:resume.workclassify,
                                rules:[
                                    {required:true,message:'请输入职业类别'}
                                ]
                            })(
                                <TreeSelect
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    treeData={treeData}
                                    placeholder="Please select"
                                    treeDefaultExpandAll
                                    onChange={this.onChange}
                                />
                            )
                        }
                    </Item>

                    <Item label='工作地点：' {...formItemLayout}>
                        {
                            getFieldDecorator('place',{
                                initialValue:resume.place,
                                rules:[
                                    {required:true,message:'请输入工作地点'}
                                ]
                            })(
                                <Input />
                            )
                        }
                    </Item>

                    <Item label='期望薪资：' {...formItemLayout}>
                        {
                            getFieldDecorator('salary',{
                                initialValue:resume.salary,

                            })(
                            <Select
                                allowClear
                                >
                                {
                                    salarys.map(salary=><Option key={salary}>{salary}</Option>)
                                }
                            </Select>
                            )
                        }
                    </Item>
                </Card>
            </Form>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {setHeadTitle}
)(Form.create()(StepOne))