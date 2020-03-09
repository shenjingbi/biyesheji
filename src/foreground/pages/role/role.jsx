import React,{Component} from 'react'
import {Card, Button, Table, Modal, message} from "antd";
import {reqAddRole, reqDeleteRole, reqRole, reqUpdateRole} from "../../api";
import {connect} from 'react-redux'

import AddForm from "../role/add-form";
import AuthForm from "./auth-form";
import {formateDate} from "../../utils/dateUtils";
import {logout} from "../../redux/actions";

/*
角色分类
* */
class Role extends Component{
    state={
        roles:[], //所有角色的列表
        role:{} ,  //选中的role
        showStatus: false, //是否显示添加界面
        showAuth: false,  //是否显示设置角色权限界面
        showDelete:false  //是否显示删除用户界面
    }
    constructor(props){
        super(props)
        this.auth=React.createRef()
    }

    //初始化table中所有列数组
    initColumn=()=>{
        this.columns=[
            {
                title:'角色名称',
                dataIndex:'role_name'
            },
            {
                title:'创建时间',
                dataIndex:'create_time',
                render:formateDate
            },
            {
                title:'授权时间',
                dataIndex:'auth_time',
                render:formateDate
            },
            {
                title:'授权人',
                dataIndex:'auth_name'
            },
        ]
    }

    //获取角色列表
    getRole=async ()=>{
        const result=await reqRole()
        if(result.status===0){
            const roles=result.data
            this.setState({roles})
        }
    }

    //选中某行时的回调函数，用于选中radio
    onRow=(role)=>{
        return{
            onClick:event=>{
                //console.log(role)
                this.setState({role})
            }
        }
    }

    //添加角色
    addRole=()=>{
        //进行表单验证
        this.form.validateFields(async (err,values)=>{
            if(!err){
                //收集输入数据
                this.setState({showStatus:false})
                const {roleName}=values
                this.form.resetFields()
                //请求添加
                const result= await reqAddRole(roleName)
                if(result.status===0){
                    //根据列表显示
                    message.success(result.msg)
                    this.getRole()
                    /*const role=result.data
                    this.setState(state=>({
                        roles:[...state.roles,role]
                    }))*/

                }else {
                    message.error(result.msg)
                }
            }
        })
    }

    //更新角色权限
    updateRole=async ()=>{
        this.setState({showAuth:false})
        //获得当前选择的role
        const role=this.state.role
        //得到最新的menus
        const menus=this.auth.current.getMenus()
        role.menus=menus
        role.auth_name=this.props.user.username
        role.auth_time=Date.now()
        const result=await reqUpdateRole(role)
        if(result.status===0){
            //如果更新的是自己角色的权限，强制退出，memoryUtils.user.role_Id为当前登录的用户的角色Id
            if(role.role_name===this.props.user.role_name){
               this.props.logout()
                message.success('当前角色权限修改，请重新登录')
            }else {
                message.success('设置角色权限成功')
                this.getRole()
            }
        }
    }

    //删除角色
    showDelete=async (role)=>{
        Modal.confirm({
            title:`确定删除${role.role_name}吗？`,
            onOk:async ()=>{
                const result=await reqDeleteRole(role.role_name)
                if(result.status===0){
                    message.success('删除角色成功')
                    this.getRole()
                }else{
                    message.error('删除失败，该角色拥有用户，请删除该用户再次尝试')
                }
            }
        })

    }

    //隐藏确认框
    handleCancel=()=>{
        this.setState({
            showStatus:false,
            showAuth:false,
            showDelete:false
        })
    }

    componentWillMount() {
        this.initColumn()
    }
    componentDidMount() {
        this.getRole()
    }


    render() {
        const {roles,role,showStatus,showAuth,showDelete}=this.state
        //console.log(role)
        const title=(
            <span>
                <Button type='primary' style={{marginRight:20}} onClick={()=>this.setState({showStatus:true})}>角色创建</Button>
                <Button type='primary' style={{marginRight:20}} disabled={!role.role_name} onClick={()=>this.setState({showAuth:true})}>设置角色权限</Button>
                <Button type='primary' disabled={!role.role_name} onClick={()=>this.showDelete(role)}>删除角色</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table dataSource={roles}
                       columns={this.columns} bordered={true} rowKey='role_name'
                       pagination={{defaultPageSize:5,showQuickJumper:true}}
                       rowSelection={{
                           type:'radio',
                           selectedRowKeys:[role.role_name],
                           onSelect:(role)=>{  //选中某个radio时回调
                               this.setState({role})
                           }
                       }}
                       onRow={this.onRow}
                       loading={false}>
                </Table>
                <Modal title="添加角色" visible={showStatus} onOk={this.addRole} onCancel={this.handleCancel}>
                    <AddForm setForm={(form)=>{this.form=form}}/>
                </Modal>
                <Modal title="设置角色权限" visible={showAuth} onOk={this.updateRole} onCancel={this.handleCancel}>
                    <AuthForm role={role} ref={this.auth}/>
                    {/*此处不用form来返回子组件中的值是因为Tree不是form来收集数据，setForm={(form)=>{this.form=form}}*/}
                </Modal>
            </Card>
        )
    }
}

/*
只有setState是异步时生效
setState()中传入的值为对象模式即{}时，此时取得的值一直没有更新，还是原来的值，如：原来的值1，若执行两次后，值变成2，而不是3
setState()中传入的值为函数模式时，此时取得的值一直更新过，变成最新的值，如：原来的值1，若执行两次后，值变成3，而不是2

* */
export default connect(
    state=>({user:state.user}),
    {logout}
)(Role)