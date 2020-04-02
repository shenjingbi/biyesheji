import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {
    Card, Cascader, Checkbox,
    Form,
    Input,
    Menu,
    message,
    Select,
    TreeSelect
} from "antd";
import {} from "../../../../api";
import {connect} from "react-redux";
import {login, setHeadTitle} from "../../../../redux/actions";
import placeList from '../../../../config/place'

const Item=Form.Item
const {Option}=Select
const {SubMenu}=Menu
const {districtData,concrete}=placeList

//商家中心发布信息1
class StepOne extends Component{
    state={
        welfare:['五险一金','包住','包吃','年底双薪','周末双休','交通补助','加班补助','饭补','话补','房补'], //福利列表
        salarys:['面议','1000元以下','1000-2000元','2000-3000元','3000-5000元','5000-8000元','8000-12000元','12000-20000元','20000-25000元','25000元以上'], //工资选项
        educations:['不限','本科','硕士','博士','MBA/EMBA',] ,//学历分类
        place:[], //工作地址
    }
    static propTypes={
        setForm:PropTypes.func.isRequired,
    }

    componentWillMount() {
        //将form对象通过setForm（）传给父对象
        this.props.setForm(this.props.form)
    }

    //获取地址分类
    getOption=()=>{
        let options=[]
        let i=0,j=0
        for(i=0;i<districtData.length;i++){
            options[i]={}
            options[i].value=districtData[i]
            options[i].label=districtData[i]
            options[i].children=[]
            for(j=0;j<concrete[districtData[i]].length;j++){
                options[i].children[j]={}
                options[i].children[j].value=concrete[districtData[i]][j]
                options[i].children[j].label=concrete[districtData[i]][j]
            }
        }
        this.setState({place:options})
    }

    //验证是否在1-999之间
    validateNumber=(rule,value,callback)=>{
        if(value==='0'||value.length<=0||value.length>=4||isNaN(value)){
            callback('请填写1-999之间的整数')
        }else if(value.indexOf('.')>-1){
            callback('请填写1-999之间的整数')
        }else {
            callback()
        }
    }

    //验证大小薪资比较
    compareSalary = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value < form.getFieldValue('salarymin')) {
            callback('请输入正确的最大薪资');
        } else {
            callback();
        }
    };

    componentDidMount() {
        this.getOption()
    }

    render() {
        //得到form对象
        const {getFieldDecorator}=this.props.form
        const {occupation,welfare,educations,salarys,create_time,place}=this.state
        const {recruit,isUpdate}=this.props
        const {districtData,concrete}=placeList
        const workplace=recruit.workplace===undefined?{}:recruit.workplace.split(",")
        const user=this.props.user
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
                <Card title='职位信息' bordered={false}>
                    <Item  label='职位名称：' {...formItemLayout}>
                        {
                            getFieldDecorator('emname',{
                                initialValue:recruit.emname,
                                rules: [
                                    { required: true,whitespace:true, message: '职位名称必须输入' },
                                    { min: 2, message: '职位名称必须是2-10个字' },
                                    { max: 10, message: '职位名称必须是2-10个字' },
                                    { pattern: /[\u4E00-\u9FA5\d\a-\z\A-\Z]/g, message: '职位名称必须是2-10个字' },
                                ],
                            })(
                                <Input />
                            )
                        }
                    </Item>

                    <Item label='职业类别：' {...formItemLayout}>
                        {
                            getFieldDecorator('category',{
                                initialValue:recruit.category,
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

                    <Item label='招聘人数：' {...formItemLayout}>
                        {
                            getFieldDecorator('needamount',{
                                initialValue:recruit.needamount,
                                rules: [
                                    { required: true,whitespace:true, message: '请填写1-999之间的整数' },
                                    { validator:this.validateNumber}
                                ],
                            })(
                                <Input />
                            )
                        }
                    </Item>

                    <Item label='每月薪资：' {...formItemLayout } style={{ marginBottom: 0 }}>
                        <Item style={{ display: 'inline-block', width: 'calc(50% - 5px)', marginRight: 8 }}>
                            {
                                getFieldDecorator('salarymin',{
                                    initialValue:recruit.salarymin,
                                    rules:[
                                        {required:true,message:'薪资必须输入'}
                                    ]
                                })(
                                    <Input placeholder='最低薪资'/>
                                )
                            }
                        </Item>

                        <Item style={{ display: 'inline-block', width: 'calc(50% - 5px)'}}>
                            {
                                getFieldDecorator('salarymax',{
                                    initialValue:recruit.salarymax,
                                    rules:[
                                        {required:true,message:'薪资必须输入'},
                                        {validator:this.compareSalary}
                                    ]
                                })(
                                    <Input placeholder='最高薪资'/>
                                )
                            }
                        </Item>

                    </Item>

                    <Item label='学历：' {...formItemLayout}>
                        {
                            getFieldDecorator('education',{
                                initialValue:recruit.education,
                                rules: [
                                    { required: true,message: '请填写你的学历',},
                                ],
                            })(
                                <Select allowClear style={{width:200}} placeholder="工作经历" >
                                    {
                                        educations.map(education=><Option  key={education}>  {education}  </Option>)
                                    }
                                </Select>

                            )
                        }
                    </Item>

                    <Item label='职位福利：' {...formItemLayout}>
                        {
                            getFieldDecorator('welfare',{
                                initialValue:recruit.welfare,
                            })(
                                <div>
                                    {
                                        welfare.map(welfare=><Checkbox  key={welfare}>  {welfare}  </Checkbox>)
                                    }
                                </div>
                            )
                        }
                    </Item>

                    <Item label='工作地址：' {...formItemLayout}>
                        {
                            getFieldDecorator('workplace',{
                                initialValue:[workplace[0],workplace[1]],
                                rules: [
                                    { required: true,message: '请填写工作地址',},
                                ],
                            })(
                                <Cascader
                                    style={{width:300}}
                                    placeholder=''
                                    options={place}
                                />
                            )
                        }
                    </Item>

                </Card>

                <Card title='职位描述' bordered={false} >
                    <Item label='工作内容：' {...formItemLayout}>
                        {
                            getFieldDecorator('workdetail',{
                                initialValue:recruit.workdetail,
                                rules:[
                                    {required:true,message:'请输入工作内容'}
                                ]
                            })(
                                <Input.TextArea placeholder="工作内容,职位要求,工作时间"/>
                            )
                        }
                    </Item>


                </Card>

                <Card title='联系方式' bordered={false} >
                    <Item label='联系人：' {...formItemLayout}>
                        {
                            getFieldDecorator('contactper',{
                                initialValue:recruit.contactper,
                                rules:[
                                    {required:true,message:'请输入联系人'}
                                ]
                            })(
                                <Input />
                            )
                        }
                    </Item>

                    <Item label='联系电话：' {...formItemLayout}>
                        {
                            getFieldDecorator('telephone',{
                                initialValue:user.telephone,
                                rules:[
                                    {required:true,message:'请输入联系电话'}
                                ]
                            })(
                                <Input />
                            )
                        }
                    </Item>

                    <Item label='邮箱地址：' {...formItemLayout}>
                        {
                            getFieldDecorator('email',{
                                initialValue:(recruit.email==='undefined')?'':recruit.email,

                            })(
                                <Input />
                            )
                        }
                    </Item>
                </Card>

                {
                    isUpdate===undefined?null:(<Card title='企业信息' bordered={false}>
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
                    </Card>)
                }


            </Form>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {setHeadTitle}
)(Form.create()(StepOne))