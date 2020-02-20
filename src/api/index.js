/*
能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每一个函数的返回值都是promise
* */

import ajax from "./ajax";//此处的ajax是由ajax.js封装的axios
import jsonp from 'jsonp'
import {message} from "antd";

//const BASE='http://localhost:5000'
const BASE=''
//登录
/*export function reqLogin(username ,password) {
    return ajax('/login',{username ,password},'POST')
}*/
export const reqLogin=(username ,password)=>ajax(BASE+'/login',{username ,password},'POST')

//添加用户
export const reqRegister=(user)=>ajax(BASE+'/register',user,'POST')

//jsonp请求的接口请求函数
export const reqWeather=(city)=>{
    //需要返回一个promise函数
    return new Promise((resolve,reject)=>{
        const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&ou tput=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(err,data)=>{
            console.log("jsonp()",err,data)
            //成功
            if(!err&&data.status==='success'){
                const {dayPictureUrl,weather}= data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather})
            }else{
                //失败
                message.error("获取天气信息失败")
            }
        })
    })
}
//reqWeather("北京")

//获取一级/二级分类的列表
export const reqCategory=(parentId)=>ajax(BASE+'/category/list',{parentId})
//添加分类
export const reqAddCategory=(categoryName,parentId,parentContent)=>ajax(BASE+'/manage/category/add',{categoryName,parentId,parentContent},'POST')
//修改分类
export const reqUpdateCategory=({categoryName,categoryId,categoryContent})=>ajax(BASE+'/category/update',{categoryName,categoryId,categoryContent},'POST')