import React,{PureComponent} from 'react'
import {Switch,Route} from "react-router-dom";
import {Card, Button, Table, Modal, message} from 'antd'

import LinkButton from "../../component/link-button/button";
import {reqAddManagers, reqDeleteManagers, reqManagers, reqUpdateManagers} from "../../api";
import ManagerAddUpdate from "./add-update";
/*
个人信息
* */
export  default class Manager extends PureComponent{
    state={
        managers:[], //所有的用户列表
        roles:[],  //所有角色列表
        showStatus:false //是否显示确认框
    }

    initColumns=()=>{
        this.columns=[
            {
                title:'用户名',
                dataIndex:'username'
            },

            {
                title:'邮箱',
                dataIndex:'email'
            },
            {
                title:'电话',
                dataIndex:'telephone'
            },
            {
                title:'所属角色',
                dataIndex:'role_name'
            },
            {
                title:'操作',
                render:(manager)=>(
                    <span>
                        <LinkButton onClick={()=>{this.showUpdate(manager)}}>修改</LinkButton>
                        <LinkButton onClick={()=>{this.deleteUser(manager)}}>删除</LinkButton>
                    </span>
                )
            },
        ]
    }

    //添加或更新用户
    addOrUpManager= ()=>{
        //1.收集输入数据
        this.form.validateFields(async (err,values)=>{
            if(!err){
                this.setState({
                    showStatus:false
                })
            this.form.resetFields()

            //如果是更新，需要给manager指定name属性

            //2.提交添加请求
            if(this.manager){
                values.managerId=this.manager.managerId
                const result=await reqUpdateManagers(values)
                //3.更新列表显示
                if(result.status===0){
                    message.success('更新用户成功')
                    this.getManagers()
                }
            }else {
                const result=await reqAddManagers(values)
                //3.更新列表显示
                if(result.status===0){
                    message.success('修改用户成功')
                    this.getManagers()
                }
            }

        }
    })
    }

    //显示添加界面
    showAdd=()=>{
        this.manager=null
        this.setState({showStatus:true})
    }

    //显示修改界面
    showUpdate=(manager)=>{
        this.manager=manager //保存manager信息
        this.setState({showStatus:true})
        //this.form.resetFields()
    }

    //获得用户列表
    getManagers=async ()=>{
        const result=await reqManagers()
        if(result.status===0){
            const managers=result.data[0]
            this.state.roles=result.data[1]
            this.setState({managers})
        }
    }

    //删除指定用户
    deleteUser=(manager)=>{
        Modal.confirm({
            title:`确认删除${manager.username}吗？`,
            onOk:async ()=>{
                const result =await reqDeleteManagers(manager.username)
                if(result.status===0){
                    message.success('删除用户成功')
                    this.getUsers()
                }else {message.error('删除失败')}
            }
        })
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getManagers()
    }

    render() {
        const {managers,showStatus,roles}=this.state
        const manager=this.manager||{}
        const title=<Button type='primary' onClick={this.showAdd}>创建用户</Button>
        return (
            <Card title={title}>
                <Table dataSource={managers}
                       columns={this.columns} bordered={true} rowKey='role_name'
                       pagination={{defaultPageSize:5,showQuickJumper:true}}
                       loading={false}>
                </Table>
                <Modal title={manager.username?"修改用户":"添加用户"} visible={showStatus} onOk={this.addOrUpManager}
                       onCancel={()=>{
                           this.setState({showStatus: false});
                           this.form.resetFields()
                       }}>
                    <ManagerAddUpdate roles={roles} manager={manager} setForm={(form)=>this.form=form}>添加/更新界面</ManagerAddUpdate>
                </Modal>
            </Card>

        )
    }
}