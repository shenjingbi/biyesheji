import React,{Component} from 'react'
import {Switch,Route} from "react-router-dom";
import {Card, Button, Table, Modal, message} from 'antd'

import EnterpriseAddUpdate from "./add-update";
import LinkButton from "../../component/link-button/button";
import {reqEnterprises,reqUpdateEnterprises, reqAddEnterprises,reqDeleteEnterprises} from "../../api";
import {formateDate, formateDate2} from "../../utils/dateUtils";
import moment from "moment";
/*
个人信息
* */
export  default class Enterprise extends Component{
    state={
        enterprises:[], //所有的用户列表
        enterprise:[],
        showStatus:false //是否显示确认框
    }

    initColumns=()=>{
        this.columns=[
            {
                title:'用户名',
                dataIndex:'username'
            },
            {
                title:'企业名',
                dataIndex:'enterName'
            },

            {
                title:'创建者',
                dataIndex:'founder'
            },
            {
                title:'创办时间',
                dataIndex:'enterCreTime',
                render:formateDate2
            },
            {
                title:'联系电话',
                dataIndex:'telephone'
            },
            {
                title:'企业证书',
                dataIndex:'enterCreti',
            },
            {
                title:'企业详情',
                dataIndex:'enterDetail',
            },
            {
                title:'操作',
                render:(enterprise)=>(//更新时显示的enterprise都是此处返回的
                    <span>
                        <LinkButton onClick={()=>{this.showUpdate(enterprise)}}>修改</LinkButton>
                        <LinkButton onClick={()=>{this.deletEenterprise(enterprise)}}>删除</LinkButton>
                    </span>
                )
            },
        ]
    }

    //添加或更新用户
    addOrUpEnterprise=()=>{
        this.form.validateFields(async (err,values)=>{
            //1.收集输入数据
            if(!err){
                this.setState({showStatus:false})
            }
            //清空输入框
            this.form.resetFields()

            //如果是更新，需要给enterprise指定id属性
            //2.提交添加请求
            if(this.enterprise){
                values.enterId=this.enterprise.enterId
                values.enterCreTime=moment(values.enterCreTime).format('X')*1000
                const result=await reqUpdateEnterprises(values)
                if(result.status==0){
                    message.success('更新用户成功')
                    this.getEnterprises()
                }
            }else {
                values.enterCreTime=moment(values.enterCreTime).format('X')*1000
                console.log(values.enterCreTime)
                const result=await reqAddEnterprises(values)
                //3.更新列表显示
                if(result.status===0){
                    message.success('添加用户成功')
                    this.getEnterprises()
                }
            }

        })
    }

    //获得用户列表
    getEnterprises=async ()=>{
        const result=await reqEnterprises()
        if(result.status===0){
            const enterprises=result.data
            this.setState({enterprises})
        }
    }

    //删除指定用户
    deletEenterprise=(enterprise)=>{
        Modal.confirm({
            title:`确认删除用户${enterprise.enterName}吗？`,
            onOk:async ()=>{
                const result =await reqDeleteEnterprises(enterprise.enterId)
                if(result.status===0){
                    message.success('删除用户成功')
                    this.getEnterprises()
                }else {message.error('删除失败')}
            }
        })
    }

    //显示添加界面
    showAdd=(enterprise)=>{
        this.enterprise=null
        this.enterCreTime=[]
        this.setState({showStatus:true})
    }

    //显示更新界面
    showUpdate=(enterprise)=>{
        this.enterprise=enterprise
        this.setState({showStatus:true})
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getEnterprises()
    }

    render() {
        const {enterprises,showStatus}=this.state
        const enterprise=this.enterprise||{}
        const title=<Button type='primary' onClick={()=>{this.showAdd(enterprise)}}>创建用户</Button>
        return (
            <Card title={title}>
                <Table dataSource={enterprises}
                       columns={this.columns} bordered={true} rowKey='enterId'
                       pagination={{defaultPageSize:5,showQuickJumper:true}}
                       loading={false}>
                </Table>
                <Modal title="添加用户" visible={showStatus} onOk={this.addOrUpEnterprise} onCancel={()=>this.setState({showStatus: false})}>
                    <EnterpriseAddUpdate enterprise={enterprise} setForm={(form)=>this.form=form} />
                </Modal>
            </Card>

        )
    }
}