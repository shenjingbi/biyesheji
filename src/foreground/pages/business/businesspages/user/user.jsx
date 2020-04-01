import React,{Component} from 'react'
import {Switch,Route} from "react-router-dom";
import {Card, Button, Table, Modal, message, Avatar, Upload} from 'antd'


import { reqUpdatePhotos} from "../../../../api";
import UserAddUpdate from './add-update'
import {connect} from "react-redux";
import {login} from "../../../../redux/actions";
/*
个人信息
* */
 class User extends Component{
    state={
        showUploadList:false,
        previewVisible: false,
        previewImage: '',
        fileList: [],
        showStatus:false //是否显示确认框
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
        const user=this.props.user
        const { previewVisible, previewImage, fileList } = this.state;
        const title=<div>
                        <Avatar size='large' icon='user' />
                        <span>{user.username}</span>

                    </div>
        return (
            <Card  bordered={false} style={{backgroundColor:"transparent"}}>
                <Upload
                    action="http://localhost:3000/#/home/user"
                    listType="picture-card"
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >更换头像
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                <Card title={title} bordered={false} size='large' style={{backgroundColor:"transparent"}}>
                    {/*<p>用户名：{user.username}</p>
                    <p>手机号：{user.telephone}</p>
                    <p>邮箱：{user.email}</p>*/}
                    <UserAddUpdate setForm={(form)=>{this.form=form}} user={user}/>
                </Card>
            </Card>

        )
    }
}
export default connect(
    state=>({user:state.user}),
    {login}
)(User)