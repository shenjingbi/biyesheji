import React,{Component} from 'react'
import {Switch,Route} from "react-router-dom";
import {Card, Button, Table, Modal, message, Select} from 'antd'

import EnterpriseAddUpdate from "./add-update";
import {reqEnterprise} from  '../../../../api'
import LinkButton from "../../../../component/link-button/button";
import {connect} from "react-redux";
import {login} from "../../../../redux/actions";

/*
企业资料
* */
class Enterprise extends Component{
    state={
        enterprises:[], //公司信息列表
        enterprise:[],
        showStatus:false //是否显示确认框
    }

    /*//添加或更新用户
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
    }*/

    //获得企业信息
    getEnterprises=async ()=>{
        const userId=this.props.user.userId
        const result=await reqEnterprise(userId)
        if(result.status===0){
            const enterprises=result.data[0]
            this.setState({enterprises})
        }
    }

    componentWillMount() {
        this.getEnterprises()
    }

    render() {
        const {enterprises,showStatus}=this.state

        return (
            <div style={{marginLeft:20,width:1000}}>
                <EnterpriseAddUpdate enterprises={enterprises} setForm={(form)=>this.form=form}/>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
)(Enterprise)