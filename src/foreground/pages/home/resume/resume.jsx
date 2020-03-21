import React,{Component} from 'react'
import {Switch,Route} from "react-router-dom";
import {Card, Button, Table, Modal, message, Avatar, Upload, Form, Input} from 'antd'

import {
    reqAddManagers,
    reqAddResume,
    reqAddUsers,
    reqDeleteUsers,
    reqUpdatePhotos,
    reqUpdateUsers,
    reqUsers
} from "../../../api";
import {connect} from "react-redux";
import {login} from "../../../redux/actions";
import LinkButton from "../../../component/link-button/button";
import ResumeAdd from "./addresume";

const Item=Form.Item
/*
个人信息
* */
 class Resume extends Component{
    state={
        resume:[], //简历信息
        showUploadList:false,
        previewVisible: false,
        previewImage: '',
        fileList: [],
        showStatus:false //是否显示确认框
    }
    //添加或更新用户
     addResume=()=>{
        console.log('1')

         this.form.validateFields(async (err,values)=>{
             if(!err){
                 //2.提交添加请求
                 const userId=this.props.user.managerId
                 console.log(userId)
                 const result=await reqAddResume(values,userId)
                 //清空输入框
                 this.form.resetFields()
                 //3.更新列表显示
                 if(result.status===0){
                     message.success('添加用户成功')
                 }
             }


         })
     }
     handleCancel = () => this.setState({ previewVisible: false });
     handlePreview = async file => {
         if (!file.url && !file.preview) {
             file.preview = await reqUpdatePhotos(file.originFileObj);
         }

         this.setState({
             previewImage: file.url || file.preview,
             previewVisible: true,
         });
     };

     handleChange = ({ fileList }) => this.setState({ fileList });


     //显示更新界面
    showUpdate=(user)=>{
        this.user=user
        this.setState({showStatus:true})
    }

     showUpdatePhoto=()=> {
         this.setState({showStatus: true})
     }



    render() {
        const { resume,previewVisible, previewImage, fileList } = this.state;
        const formItemLayout={
            labelCol:{span:4},
            wrapperCol:{span:15}
        }
        const title=<div>
                        <Avatar size='large' icon='user' />
                    </div>
        return (
            <div>
                <ResumeAdd setForm={(form)=>this.form=form}/>
                <Button type='primary' style={{marginLeft:350}} onClick={()=>this.addResume()}>保存简历</Button>
            </div>


        )
    }
}
export default connect(
    state=>({user:state.user}),
    {login}
)(Resume)