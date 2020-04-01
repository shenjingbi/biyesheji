import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Form, Input, DatePicker, Card, message, Button, Select} from "antd";
import moment from "moment";
import LinkButton from "../../../../component/link-button/button";
import {reqUpdateEnterprise} from "../../../../api";
import {connect} from "react-redux";
import enterprise from "./enterprise";
//import category from "./category";

const Item=Form.Item

//添加分类的Form组件
class EnterpriseAddUpdate extends Component{
    static  propTypes={
        setForm:PropTypes.func.isRequired,
    }
    state={
        showborder:'none', //显示边框
        showother:false,
        open:'none',
        showread:true,     //文本框是否只读
        time:true,          //判断当前是修改还是保存
        welfare:['五险一金','包住','包吃','年底双薪','周末双休','交通补助','加班补助','饭补','话补','房补'], //福利列表
        properties:['私营','国有','股份制','外商独资','中外合资','上市公司','事业单位','政府机关'],  //公司性质列表
        enterscale:['集团公司','中小型公司','初创公司','连锁店','旗舰店','夫妻店','个体经营','个体工作室','独立经纪人','其他'],  //公司规模列表
        perscale:['1-9人','10-49人','50-99人','100-499人','500-999人','1000人以上'],  //员工规模列表
    }

    //修改基本信息
    updateBase=(time)=>{
        if(time===true){
            this.setState({showborder: '',time:false,showread:false,showother:true})
        }
        else{
            //表单验证，通过才处理
            this.props.form.validateFields(async (err,values)=>{
                if(!err){
                    values.enterId=this.props.enterprises.enterId
                    const result=await reqUpdateEnterprise(values)
                    if(result.status===0) {
                        message.success('修改成功')
                        this.setState({showborder: 'none' ,time:true,showread:true,showother:false})
                    }else {message.error(result.msg)}
                }
            })
        }
    }

    //取消修改
    updateCancel=(time)=>{
        this.props.form.resetFields()
        this.setState({showborder: 'none',time:true,showread:true,showother:false})
    }

    componentWillMount() {
        //将form对象通过setForm（）传给父对象
        this.props.setForm(this.props.form)
    }
    render() {
        const {enterprises}=this.props
        const {showborder,showread,showother,time,welfare,properties,enterscale,perscale,open}=this.state
        //得到form对象
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:3},
            wrapperCol:{span:8}
        }
        return (
            <Form >
                <Card title='基本信息' bordered={false} >
                    <div style={{marginLeft:100}}>
                        <Item  label='公司名称：' {...formItemLayout} >
                            {
                                getFieldDecorator('enterName',{
                                    initialValue:enterprises.enterName,
                                    rules: [
                                        { required: true,whitespace:true, message: '公司名称必须输入' },
                                        { min: 4, message: '公司名称至少4位' },
                                        { max: 12, message: '公司名称最多12位' },
                                        { pattern: /[\u4E00-\u9FA5\d\a-\z\A-\Z]/g, message: '公司名称必须是2-12个字' },
                                    ],
                                })(
                                    <Input style={{border:showborder,boxShadow:showborder}} readOnly={showread} placeholder='请输入公司名称'/>
                                )
                            }
                        </Item>
                        <Item  label='所属行业：' {...formItemLayout} >
                            {
                                getFieldDecorator('industry',{
                                    initialValue:enterprises.industry,
                                    rules: [
                                        { required: true,whitespace:true, message: '行业类别不能为空' },
                                    ],
                                })(
                                    <Input style={{border:showborder,boxShadow:showborder}} readOnly={showread} placeholder='请输入行业'/>
                                )
                            }
                        </Item>

                        <Item label='公司性质：' {...formItemLayout}>
                            {
                                getFieldDecorator('properties',{
                                    initialValue:enterprises.password,
                                    rules: [
                                        { required: true,whitespace:true, message: '公司性质不能为空' },

                                    ],
                                })(
                                    <Input style={{border:showborder,boxShadow:showborder}} readOnly={showread} placeholder='请输入密码'/>
                                )
                            }
                        </Item>

                        <Item label='公司规模：' {...formItemLayout}>
                            {
                                getFieldDecorator('enterscale',{
                                    initialValue:enterprises.enterscale,
                                    rules:[
                                        {required:true,message:'公司规模不能为空'}
                                    ]
                                })(
                                    time===true?<p>{enterprises.personscale===null?"请选择公司规模":enterprises.personscale}</p>:
                                        <Select allowClear  style={{width:250}} placeholder="发布时间" >
                                            {
                                                enterscale.map(enterscale=><Select.Option  key={enterscale} value={enterscale} >{enterscale}</Select.Option>)
                                            }
                                        </Select>
                                )
                            }
                        </Item>

                        <Item label="员工规模" {...formItemLayout}>
                            {
                                getFieldDecorator('personscale',{
                                    initialValue:enterprises.personscale,
                                    rules:[
                                        {required:true,message:'员工规模不能为空'}
                                    ]
                                })(
                                    time===true?<p>{enterprises.personscale===null?"请选择员工规模":enterprises.personscale}</p>:
                                        <Select allowClear  style={{width:250}} placeholder="发布时间" >
                                            {
                                                perscale.map(perscale=><Select.Option  key={perscale} value={perscale} >{perscale}</Select.Option>)
                                            }
                                        </Select>
                                )
                            }
                        </Item>

                        <Item label='公司简介：' {...formItemLayout}>
                            {
                                getFieldDecorator('enterDetail',{
                                    initialValue:enterprises.enterDetail,
                                    rules:[
                                    ]
                                })(
                                    <Input.TextArea style={{border:showborder,boxShadow:showborder ,marginTop:5,resize:showborder}}  readOnly={showread} placeholder='请输入企业详情'/>
                                )
                            }
                        </Item>
                        <Item label='公司地址：' {...formItemLayout}>
                            {
                                getFieldDecorator('address',{
                                    initialValue:enterprises.address,
                                    rules:[
                                    ]
                                })(
                                    <Input.TextArea style={{border:showborder,boxShadow:showborder ,marginTop:5,resize:showborder}}  readOnly={showread} placeholder='请输入公司地址'/>
                                )
                            }
                        </Item>
                    </div>
                </Card>

                <Card title='公司福利' bordered={false}>
                    <Item >
                        {
                            getFieldDecorator('welfare',{
                                initialValue:enterprises.welfare,
                            })(
                                <Select allowClear style={{width:140}} placeholder="公司福利" >
                                    {
                                        welfare.map(welfare=><Select.Option  key={welfare} >{welfare}</Select.Option>)
                                    }
                                </Select>
                            )
                        }
                    </Item>
                </Card>

                <Card title='公司特色' bordered={false} >
                    <Item  {...formItemLayout} style={{marginLeft:100}}>
                        {
                            getFieldDecorator('feature',{
                                initialValue:enterprises.feature,
                            })(
                                <Input style={{border:showborder,boxShadow:showborder}} readOnly={showread} placeholder='请输入企业特色'/>
                            )
                        }
                    </Item>
                </Card>

                <Card title='联系方式' bordered={false} >
                    <Item label='联系人：' {...formItemLayout} style={{marginLeft:100}}>
                        {
                            getFieldDecorator('contactper',{
                                initialValue:enterprises.contactper,
                                rules: [
                                    { required: true,whitespace:true, message: '请输入2-6个字的联系人姓名' },
                                    { min: 2, message: '请输入2-6个字的联系人姓名' },
                                    { max: 6, message: '请输入2-6个字的联系人姓名' },
                                    { pattern: /[\u4E00-\u9FA5]/g, message: '请输入2-6个字的联系人姓名' },
                                ],
                            })(
                                <Input style={{border:showborder,boxShadow:showborder}} readOnly={showread} placeholder='您还没有添加联系人'/>
                            )
                        }
                    </Item>

                    <Item label='联系电话：' {...formItemLayout} style={{marginLeft:100}}>
                        {
                            getFieldDecorator('telephone',{
                                initialValue:enterprises.telephone,
                                rules: [
                                    { required: true,whitespace:true, message: '请输入正确的电话号码' },
                                    { min: 11, message: '请输入正确的电话号码' },
                                    { max: 11, message: '请输入正确的电话号码' },
                                ],
                            })(
                                <Input style={{border:showborder,boxShadow:showborder}} readOnly={showread} placeholder='您还没有添加联系电话'/>
                            )
                        }
                    </Item>

                    <Item label='联系邮箱：' {...formItemLayout} style={{marginLeft:100}}>
                        {
                            getFieldDecorator('email',{
                                initialValue:enterprises.email,
                                rules:[
                                    { type: 'email',message: '请输入正确的邮箱格式!', },
                                ]
                            })(
                                <Input style={{border:showborder,boxShadow:showborder}} readOnly={showread} placeholder='您还没有添加邮箱'/>
                            )
                        }
                    </Item>

                </Card>
                {
                    time===true?(<Button type='primary' onClick={()=>this.updateBase(time)} style={{marginLeft:160}}>修改</Button>):
                        (   <div>
                                <Button type='primary' onClick={()=>this.updateBase(time)} style={{marginLeft:160}}>保存</Button>
                                <Button type='primary' onClick={()=>this.updateCancel(time)} style={{marginLeft:60}}>取消</Button>
                            </div>
                        )
                }
            </Form>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {}
)(Form.create()(EnterpriseAddUpdate))