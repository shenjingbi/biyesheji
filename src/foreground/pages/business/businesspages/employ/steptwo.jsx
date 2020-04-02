import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Card, Form, Input, Menu, message, Radio, Select, TreeSelect} from "antd";
import {reqAddrecruit, reqUpdaterecruit} from "../../../../api";
import {connect} from "react-redux";
import { setHeadTitle} from "../../../../redux/actions";

const Item=Form.Item
const {Option}=Select
const {SubMenu}=Menu

//商家中心发布信息2
class StepTwo extends Component{
    state={
        enterplace:[], //公司详细地址
        fulladdress:[], //详细地址
    }

    static propTypes={
        setForm:PropTypes.func.isRequired,
    }
    componentWillMount() {
        //将form对象通过setForm（）传给父对象
        this.props.setForm(this.props.form)
    }
    render() {
        //得到form对象
        const {getFieldDecorator}=this.props.form
        const {enterplace,fulladdress}=this.state
        const {recruit}=this.props
        const formItemLayout={
            labelCol:{span:6},
            wrapperCol:{span:13}
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
                <Card title='企业信息' bordered={false}>
                    <Item  label='公司名称：' {...formItemLayout}>
                        {
                            getFieldDecorator('entername',{
                                initialValue:recruit.entername,
                                rules: [
                                    { required: true,whitespace:true, message: '公司名称必须输入' },
                                    { min: 2, message: '公司名称必须是2-10个字' },
                                    { max: 10, message: '公司名称必须是2-10个字' },
                                    { pattern: /[\u4E00-\u9FA5\d\a-\z\A-\Z]/g, message: '公司名称必须是2-10个字' },
                                ],
                            })(
                                <Input placeholder='请输入营业执照上的企业名称'/>
                            )
                        }
                    </Item>

                    <Item label='职业类别：' {...formItemLayout}>
                        {
                            getFieldDecorator('workclassify',{
                                initialValue:recruit.workclassify,
                                rules:[
                                    {required:true,message:'请输入职业类别'}
                                ]
                            })(
                                <TreeSelect
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    treeData={treeData}
                                    treeDefaultExpandAll
                                    onChange={this.onChange}
                                />
                            )
                        }
                    </Item>

                    <Item label='公司简介：' {...formItemLayout}>
                        {
                            getFieldDecorator('enterdetail',{
                                initialValue:recruit.enterdetail===undefined?recruit.enterdetail:"老板使用58招人神器【招才猫直聘APP】发布该职位，公司招人的诚意大到无需描述，赶紧来应聘吧。",
                                rules: [
                                    { required: true,message: '请填写公司简介',},
                                    { min: 30, message: '至少填写30字的介绍' },

                                ],
                            })(
                                <Input.TextArea placeholder="请简单介绍你的公司信息，让求职者了解您的公司，提高效率"/>
                            )
                        }
                    </Item>

                    <Item label='公司地址：' {...formItemLayout}>
                        {
                            getFieldDecorator('enterplace',{
                                initialValue:recruit.enterplace,
                                rules: [
                                    { required: true,message: '请填写公司地址',},
                                ],
                            })(
                                <Input  />

                            )
                        }
                    </Item>


                    <Item label='详细地址：' {...formItemLayout}>
                        {
                            getFieldDecorator('fulladdress',{
                                initialValue:recruit.fulladdress,
                                rules: [
                                    { required: true,whitespace:true, message: '详细地址必须输入' },
                                    { min: 2, message: '详细地址必须是8-30个字' },
                                    { max: 10, message: '详细地址必须是8-30个字' },
                                    { pattern: /[\u4E00-\u9FA5\d\a-\z\A-\Z]/g, message: '详细地址必须是8-30个字' },
                                ],
                            })(
                                <Input  />
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
)(Form.create()(StepTwo))