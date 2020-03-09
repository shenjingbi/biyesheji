import React,{Component} from 'react'
import {Switch,Route} from "react-router-dom";
import {Card, Button, Table, Modal, message} from 'antd'

import UserAddUpdate from "./add-update";
import LinkButton from "../../component/link-button/button";
import {reqAddManagers, reqAddUsers, reqDeleteUsers, reqUpdateUsers, reqUsers} from "../../api";
import {formateDate} from "../../utils/dateUtils";
/*
个人信息
* */
export  default class User extends Component{
    state={
        users:[], //所有的用户列表
        user:[],
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
                title:'创建时间',
                dataIndex:'create_time',
                render:formateDate
            },
            {
                title:'操作',
                render:(user)=>(//更新时显示的user都是此处返回的
                    <span>
                        <LinkButton onClick={()=>{this.showUpdate(user)}}>修改</LinkButton>
                        <LinkButton onClick={()=>{this.deleteUser(user)}}>删除</LinkButton>
                    </span>
                )
            },
        ]
    }

    //添加或更新用户
    addOrUpUser=()=>{
        this.form.validateFields(async (err,values)=>{
            //1.收集输入数据
            if(!err){
                this.setState({showStatus:false})
            }
            //清空输入框
            this.form.resetFields()

            //如果是更新，需要给user指定id属性
            //2.提交添加请求
            if(this.user){
                values.userId=this.user.userId
                const result=await reqUpdateUsers(values)
                if(result.status==0){
                    message.success('更新用户成功')
                    this.getUsers()
                }
            }else {
                const result=await reqAddUsers(values)
                //3.更新列表显示
                if(result.status===0){
                    message.success('添加用户成功')
                    this.getUsers()
                }
            }

        })
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
            title:`确认删除用户${user.username}吗？`,
            onOk:async ()=>{
                const result =await reqDeleteUsers(user.userId)
                if(result.status===0){
                    message.success('删除用户成功')
                    this.getUsers()
                }else {message.error('删除失败')}
            }
        })
    }

    //显示添加界面
    showAdd=(user)=>{
        this.user=null
        this.setState({showStatus:true})
    }

    //显示更新界面
    showUpdate=(user)=>{
        this.user=user
        this.setState({showStatus:true})
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getUsers()
    }

    render() {
        const {users,showStatus}=this.state
        const user=this.user||{}
        const title=<Button type='primary' onClick={()=>{this.showAdd(user)}}>创建用户</Button>
        return (
            <Card title={title}>
                <Table dataSource={users}
                       columns={this.columns} bordered={true} rowKey='userId'
                       pagination={{defaultPageSize:5,showQuickJumper:true}}
                       loading={false}>
                </Table>
                <Modal title="添加用户" visible={showStatus} onOk={this.addOrUpUser} onCancel={()=>this.setState({showStatus: false})}>
                    <UserAddUpdate user={user} setForm={(form)=>this.form=form} />
                </Modal>
            </Card>

        )
    }
}