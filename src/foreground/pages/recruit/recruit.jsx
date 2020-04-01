import React,{Component} from 'react'
import './recruit.less'
import { withRouter} from 'react-router-dom'
import {Breadcrumb, Button, Input, Menu, Select} from "antd";


import {connect} from "react-redux";
import {reqOccupation, reqRecruits, reqResume, reqResumes} from "../../api";
import LinkButton from "../../component/link-button/button";
import {HomeOutlined} from "@ant-design/icons";
import placeList from '../../config/place'
import {formateDate2} from "../../utils/dateUtils";

const {Item}=Breadcrumb
const {Option}=Select
const {districtData,concrete}=placeList
/*
首页路由
* */
class Recruit extends Component{
    state = {
        recruits:[], //简历列表
        places:concrete[districtData[0]],
        secondplace:concrete[districtData[0]][0],
        occupation:[], //职业列表
        welfare:['五险一金','包住','包吃','年底双薪','周末双休','交通补助','加班补助','饭补','话补','房补'], //福利列表
        salarys:['面议','1000元以下','1000-2000元','2000-3000元','3000-5000元','5000-8000元','8000-12000元','12000-20000元','20000-25000元','25000元以上'], //工资选项
        worktimes:['无经验','应届生','一年以下','1-3年','3-5年','5-10年','10年以上'], //工作年限
        educations:['高中以下','高中','中专/技校','大专','本科','硕士','博士','MBA/EMBA',] ,//学历分类
        create_time:['一天以内','三天以内','七天以内','十五天以内','一个月以内']  //招聘信息发布时间要求
    }

    //级联显示地点
    handleProvinceChange = value => {
        this.setState({
            places: concrete[value],
            secondplace: concrete[value][0],
        });
    };

    onSecondCityChange = value => {
        this.setState({
            secondplace: value,
        });
    };

    //获取职位列表
    getOccupation=async ()=>{
        const result=await reqOccupation()
        if(result.status===0){
            const occupation=result.data
            this.setState({occupation})
        }
    }

    //获得简历信息
    getRecruit=async ()=>{
        const result=await reqRecruits()
        if(result.status===0){
            const recruits=result.data
            this.setState({recruits})
        }
    }

    //获取要求学历的信息
    getEducation=(education)=>{
        /*const result=await reqOccupation()
        console.log(result)
        if(result.status===0){
            const occupation=result.data
            console.log(occupation)
            this.setState({occupation})
        }*/
        console.log(education)
    }

    //获取要求薪资的信息
    getSalary=(salary)=>{
        /*const result=await reqOccupation()
        console.log(result)
        if(result.status===0){
            const occupation=result.data
            console.log(occupation)
            this.setState({occupation})
        }*/
        console.log(salary)
    }

    //获取要求工作经验的信息
    getSalary=(salary)=>{
        /*const result=await reqOccupation()
        console.log(result)
        if(result.status===0){
            const occupation=result.data
            console.log(occupation)
            this.setState({occupation})
        }*/
        console.log(salary)
    }

    componentWillMount() {
        this.getOccupation()
        this.getRecruit()
    }

    render() {
        const {occupation,places,welfare,educations,salarys,worktimes,create_time,recruits}=this.state
        const title=this.props.headTitle
        console.log(recruits)
        //console.log(moment(users).format('d'))
        return (
            <div>
                <div className='search-content'>
                    <Input.Search
                        placeholder="请输入职位名称"
                        enterButton="搜索职位"
                        size="large"
                        className='search'
                        onSearch={value => console.log(value)}
                    />
                </div>
                <div className='breadcrumb-content'>
                    <Breadcrumb separator="   " >
                        <Item >职位:</Item>
                        <Item href="">全部</Item>
                        {
                            occupation.map(occup=><Item href="" key={occup.occuptype}>{occup.occuptype}</Item>)
                        }
                    </Breadcrumb>
                    <br/>

                    <Breadcrumb separator="   " >
                        <Item >地点:</Item>
                        <Item>
                            <Select
                                defaultValue={districtData[0]}
                                style={{ width: 180 ,marginRight:20}}
                                onChange={this.handleProvinceChange}
                            >
                                {districtData.map(districtData => (
                                    <Option key={districtData}>{districtData}</Option>
                                ))}
                            </Select>
                            <Select
                                style={{ width: 180 }}
                                value={this.state.secondplace}
                                onChange={this.onSecondCityChange}
                            >
                                {places.map(city => (
                                    <Option key={city}>{city}</Option>
                                ))}
                            </Select>
                        </Item>
                    </Breadcrumb>

                    <Breadcrumb separator="   " >
                        <Item >福利:</Item>
                        <Item href="">不限</Item>
                        {
                            welfare.map(welfare=><Item href="" key={welfare}>{welfare}</Item>)
                        }
                    </Breadcrumb>
                    <br/>
                    <Breadcrumb separator="   " >
                        <Item >其他:</Item>
                        <Item href="" >
                            <Select allowClear style={{width:140}} placeholder="发布时间" >
                                {
                                    create_time.map(create_time=><Option  key={create_time} onClick={(create_time)=>{this.getEducation(create_time)}}>{create_time}</Option>)
                                }
                            </Select>
                        </Item>
                        <Item href="" >
                            <Select allowClear style={{width:140}} placeholder="薪资要求" >
                                {
                                    salarys.map(salary=><Option  key={salary} onClick={(salary)=>{this.getEducation(salary)}}>{salary}</Option>)
                                }
                            </Select>
                        </Item>
                        <Item href="" >
                            <Select allowClear style={{width:140}} placeholder="学历要求" >
                                {
                                    educations.map(education=><Option  key={education} onClick={(education)=>{this.getEducation(education)}}>{education}</Option>)
                                }
                            </Select>
                        </Item>
                        <Item href="" >
                            <Select allowClear style={{width:140}} placeholder="工作经验" >
                                {
                                    worktimes.map(worktime=><Option  key={worktime} onClick={(worktime)=>{this.getEducation(worktime)}}>{worktime}</Option>)
                                }
                            </Select>
                        </Item>
                    </Breadcrumb>
                    <br/>
                </div>
                <div className='occup'>
                    <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" className='menu' >
                        <Menu.Item key="occup" style={{backgroundColor:"orangered"}}>
                            <span style={{color:"white"}}>职位</span>
                        </Menu.Item>
                    </Menu>
                    <div>

                    </div>
                    {
                        recruits.map(recruit=>
                            <div key={recruit.employid}>
                                <div className='detail'>
                                    <div className='detail-left'>
                                        <div className='detail-left-top'>
                                            <LinkButton style={{color:'black'}} onClick={()=>{this.props.history.push('/recruit/detail', {recruit})}}><p><span>{recruit.emname}</span></p></LinkButton>
                                        </div>
                                        <div className='detail-left-middle'>
                                            <p><span>{recruit.salarymin}-{recruit.salarymax}</span><span style={{fontSize:12}}>元/月</span></p>
                                        </div>
                                        <div className='detail-left-bottom'>
                                            <p><span>{recruit.welfare}</span></p>
                                        </div>

                                    </div>
                                    <div className='detail-middle'>
                                        <div className='detail-middle-top'>
                                            <p><span>{recruit.entername}</span></p>
                                        </div>

                                        <div className='detail-middle-bottom'>
                                            <p><span>{recruit.category}|{recruit.education}|{recruit.worktime}</span></p>
                                        </div>

                                    </div>
                                    <div className='detail-right'>
                                        <div className='detail-right-left'>
                                            <Button type='danger' onClick={()=>{this.props.history.push('/recruit/detail', {recruit})}}><span>申请</span></Button>
                                        </div>
                                        <div className='detail-right-right'>
                                            <p><span>{formateDate2(recruit.create_time)}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    }
                </div>

            </div>

        )
    }
}
export  default connect(
    state=>({headTitle:state.headTitle,user:state.user}),
)(withRouter(Recruit))