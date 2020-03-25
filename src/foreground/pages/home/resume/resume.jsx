import React,{Component} from 'react'
import {Switch, Route, withRouter} from "react-router-dom";
import {Card,Button, message, Avatar, Form} from 'antd'

import {
    reqResume,
    reqUpdatePhotos,
} from "../../../api"
import {connect} from "react-redux"
import {login, setHeadTitle} from "../../../redux/actions"
import './resume.less'
import ShowResume from "./showresume"

/*
我的简历
* */
 class Resume extends Component{
    state={
        resume:[], //简历信息
        showUploadList:false,
        previewVisible: false,
        previewImage: '',
        fileList: [],

    }


     //异步获取简历信息
     getResume=async ()=>{
         //发请求前显示loading
         this.setState({loading:true})
         //发异步ajax请求，获取数据
         const userId=this.props.user.userId
         const result=await reqResume(userId)
         if(result.status===0){
             const resume=result.data
             if(resume.length>=0){
                 this.setState({resume})
             }
         }else{
             message.error(result.msg)
         }
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

     //显示添加的确认框
     showAdd=()=>{
         this.setState({
             showStatus: 'none'

         })
     }

     //显示更新界面
    showUpdate=(user)=>{
        this.user=user
        this.setState({showStatus:true})
    }

     showUpdatePhoto=()=> {
         this.setState({showStatus: true})
     }

     componentWillMount() {
        this.getResume()
     }

     render() {
        const {resume,previewVisible, previewImage, fileList,showStatus} = this.state;
        const title=<div>
                        <Avatar size='large' icon='user' />
                    </div>
        return (
            <div>
                {
                    resume.length===0?
                        (   <div style={{marginLeft:50,display:showStatus}} >
                                <span style={{fontSize:15}}>简历是求职的利器，填写简历才能更快找到好工作！</span><br/>
                                <span style={{fontSize:15}}>去填写一份优质的简历吧，认真的人，才能让认真的企业找上你！</span><br/>
                                <Button type='danger' style={{marginLeft:50}} onClick={()=>{this.props.history.push('/home/addupdresume');}}>去创建一份简历吧</Button>
                            </div>

                        ):(
                            <ShowResume/>
                        )

                }
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {login,setHeadTitle}
)(withRouter(Resume))