import React,{Component} from 'react'
import {Card} from "antd";
import ReactEcharts from "echarts-for-react";

/*
柱状图路由
* */
export  default class Bar extends Component{
    state={
        users:[1,2,3,66,5,6,7]
    }
    //返回柱状图的配置对象
    getOption=(users)=>{
        return {
            title:{
                text:'用户数量图'
            },
            tooltip:{},
            legend:{
                data:"注册人数"
            },
            xAxis:{
                data:["星期一","星期二","星期三","星期四","星期五","星期六","星期七"]
            },
            yAxis:{},
            series:[{
                name:'用户数',
                type:'line',
                data:users
            }]

        }
    }

    render() {
        const {users}=this.state
        return (
            <div>
                <Card title='折线图'>
                    <ReactEcharts option={this.getOption(users)}/>
                </Card>
            </div>
        )
    }
}