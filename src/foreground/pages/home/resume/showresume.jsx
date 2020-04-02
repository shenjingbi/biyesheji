import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Card, message,Modal, Table} from "antd";
import LinkButton from "../../../component/link-button/button";
import {reqDeleteResume, reqResume} from "../../../api";
import {connect} from "react-redux";
import {setHeadTitle} from "../../../redux/actions";
import {withRouter} from "react-router-dom";
import {Resume} from "./resume"
import {formateDate} from "../../../../background/utils/dateUtils";

//展示我的简历
class ShowResume extends Component{
    state={
        resume:[],//我的简历
    }
    //初始化table的所有列数组
    initColumns=()=>{
        this.columns=[
            {
                title: '简历名称',
                dataIndex: 'workclassify',
                key: 'workclassify',
            },
            {
                title: '下载',
                dataIndex: 'loadtime',
                key: 'loadtime',
            },
            {
                title: '浏览',
                dataIndex: 'scantime',
                key: 'scantime',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render:formateDate

            },
            {
                title: '操作',
                render:(resume)=>(//每一行代表一个分类对象，render都需要渲染该行，故取出该行
                    <span>{/*()=>this.showUpdate(resume)*/}
                        <LinkButton onClick={()=>this.props.history.push('/home/addupdresume', {resume})}>修改</LinkButton>
                        {/*如何向事件回调函数传递参数：先定义一个匿名函数，在函数调用处理的函数并传入数据*/}
                        <LinkButton onClick={()=>this.props.history.push('/home/showresume', {resume})}>查看</LinkButton>
                        <LinkButton onClick={()=>this.showDelete(resume)}>删除</LinkButton>
                    </span>
                )
            }
        ];
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
                this.setState({resume})
        }else{
            message.error(result.msg)
        }
    }

    //删除角色
    showDelete=async (resume)=>{
        Modal.confirm({
            title:`确定删除吗？`,
            onOk:async ()=>{
                console.log(resume)
                const result=await reqDeleteResume(resume.resumeid)
                if(result.status===0){
                    message.success('删除简历成功')
                    this.setState({resume:[]})
                    this.getResume()
                    this.props.history.replace('/home/resume')
                }
            }
        })
    }

    showUpdate=(resume)=>{
        this.resume=resume
        console.log(this.resume)
    }


    //为第一次render()准备数据
    componentWillMount() {
        this.initColumns()
    }

    //发异步ajax请求
    componentDidMount() {
        this.getResume ()
    }


    render() {
        const {resume}=this.state

        const formItemLayout={
            labelCol:{span:4},
            wrapperCol:{span:10}
        }
        const extra=<Button type='primary' onClick={()=>{this.props.history.push('/home/addupdresume')}}>创建新的简历</Button>
        return (
            <div>
                {
                    resume.length===0?
                        (<div style={{marginLeft:50}} >
                        <span style={{fontSize:15}}>简历是求职的利器，填写简历才能更快找到好工作！</span><br/>
                        <span style={{fontSize:15}}>去填写一份优质的简历吧，认真的人，才能让认真的企业找上你！</span><br/>
                        <Button type='danger' style={{marginLeft:50}} onClick={()=>this.props.history.push('/home/addupdresume')}>去创建一份简历吧</Button>
                        </div>):
                        <Card extra={extra}>
                            <Table dataSource={resume}
                                   columns={this.columns} bordered={true} rowKey='resumeid'
                                   pagination={{defaultPageSize: 5, showQuickJumper: true}}
                                   loading={false}>
                            </Table>
                        </Card>
                }
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {setHeadTitle}
)(withRouter(ShowResume))