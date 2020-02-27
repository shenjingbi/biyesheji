import React,{Component} from 'react'
import {Switch,Route} from "react-router-dom";
import {Card, Button, Table, Modal, message} from 'antd'

import UserAddUpdate from "./add-update";

import LinkButton from "../../component/link-button/button";
import {reqDeleteUsers, reqUsers} from "../../api";
/*
个人信息
* */
export  default class User extends Component{
    state={
        users:[], //所有的用户列表
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
                dataIndex:'e-mail'
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
                render:(user)=>(
                    <span>
                        <LinkButton>修改</LinkButton>
                        <LinkButton onClick={()=>{this.deleteUser(user)}}>删除</LinkButton>
                    </span>
                )
            },
        ]
    }

    //添加或更新用户
    addOrUpUser=()=>{

    }

    //获得用户列表
    getUsers=async ()=>{
        const result=await reqUsers()
        if(result.status===0){
            const users=result.data

            this.setState({users})
        }
    }

    //删除指定用户
    deleteUser=(user)=>{
        Modal.confirm({
            title:`确认删除${user.username}吗？`,
            onOk:async ()=>{
                const result =await reqDeleteUsers(user.username)
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
        this.getUsers()
    }

    render() {
        const {users,showStatus}=this.state
        const title=<Button type='primary' onClick={()=>{this.setState({showStatus:true})}}>创建用户</Button>
        return (
            <Card title={title}>
                <Table dataSource={users}
                       columns={this.columns} bordered={true} rowKey='role_name'
                       pagination={{defaultPageSize:5,showQuickJumper:true}}
                       loading={false}>
                </Table>
                <Modal title="添加用户" visible={showStatus} onOk={this.addOrUpUser} onCancel={()=>this.setState({showStatus: false})}>
                    <div>添加/更新界面</div>
                </Modal>
            </Card>

        )
    }
}