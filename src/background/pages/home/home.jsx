import React,{Component} from 'react'
import './home.less'
import {Card, message} from "antd";
import ReactEcharts from "echarts-for-react";
import {reqUsers} from "../../api";
import moment from "moment";
import {formateDate2} from "../../utils/dateUtils";
/*
首页路由
* */
export  default class Home extends Component{

    constructor(props) {
        super(props)
        this.state = {
            user:[0,0,0,0,0,0,0], //
            users:[], //后台用户总人数
            newuse:[0,0],//注册人数
            date:[]
        }
        this.echartsReact = React.createRef()
    }


    //返回柱状图的配置对象
    getOption=()=>{
        return {
            title:{
                text:'近气七天用户注册数量图',
                left: "center"
            },
            tooltip:{},
            legend:{
                data:['用户','企业'],
                y:'bottom'
            },
            xAxis:{
                data:this.state.date

            },
            yAxis:{},
            series:[
                {
                    name:'用户',
                    type:'bar',
                    data:this.state.user
                },
                {
                    name:'企业',
                    type:'bar',
                    data:this.state.user
                }
            ],

        }
    }

    //获取用户并更新图表
    getUsers=async ()=>{
        const result=await reqUsers()
        if(result.status===0){
                const users=result.data
                const {user,newuse,date}=this.state
                let i,t=0
                for(i=-6;i<=0;i++)
                {
                    date[t++]=moment().add(i,"day").format('YYYY.MM.DD')
                }
                users.map((use)=>{
                    const date1=moment(use.create_time);
                    const date2=moment(Date.now());
                    console.log(date2.diff(date1,"day"))
                    if(date2.diff(date1,"day")<7){
                        const date=date2.diff(date1,"day")
                        user[6-date]++
                        newuse[0]++
                    }
                })
            this.setState({users,user,date})
            this.echartsReact.getEchartsInstance().setOption(this.echartsReact.props.option)
        }
        else{
            message.error(result.msg)
        }
    }

    componentDidMount() {
        this.getUsers()
    }

    render() {
        const {user,users,newuse}=this.state
        console.log(users,newuse)
        //console.log(moment(users).format('d'))
        return (
            <div className='home'>
                <div className='home-left' >
                    <Card title="注册人数"  >
                        <p>总用户人数：{users.length}</p>
                        <p>近7天增加用户：{newuse[0]}</p>
                    </Card>
                </div>

                <Card className='home-right'>
                    <ReactEcharts option={this.getOption()} ref={(e)=>this.echartsReact=e} />
                </Card>
            </div>
        )
    }
}