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
export const reqLogin=(username ,password,remember)=>ajax(BASE+'/login',{username ,password,remember},'POST')
//获取checked为1的用户
export const reqManager=()=>ajax(BASE+'/checked')


//注册,当传递的本身是对象时,不需要大括号包裹,传递的是值时，则需要大括号包裹
export const reqRegister=(user)=>ajax(BASE+'/register',user,'POST')

//jsonp请求的接口请求函数
export const reqWeather=(city)=>{
    //需要返回一个promise函数
    return new Promise((resolve,reject)=>{
        const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(err,data)=>{
            //console.log("jsonp()",err,data)
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
export const reqAddCategory=(categoryName,parentId,categoryContent,categoryId)=>ajax(BASE+'category/add',{categoryName,parentId,categoryContent,categoryId},'POST')
//修改分类
export const reqUpdateCategory=({categoryName,categoryId,categoryContent})=>ajax(BASE+'/category/update',{categoryName,categoryId,categoryContent},'POST')
//删除分类
export const reqDeleteCategory=(categoryId)=>ajax(BASE+'/category/delete',{categoryId},'POST')

//获取所有角色的列表role
export const reqRole=()=>ajax(BASE+'/role/list')
//添加角色role
export const reqAddRole=(roleName)=>ajax(BASE+'/role/add',{roleName},'POST')
//更新角色权限
export const reqUpdateRole=(role)=>ajax(BASE+'/role/update',role,'POST')
//删除角色
export const reqDeleteRole=(roleName)=>ajax(BASE+'/role/delete',{roleName},'POST')

//显示用户列表
export const reqUsers=()=>ajax(BASE+'/user/list')
//添加用户
export const reqAddUsers=(user)=>ajax(BASE+'/user/add',user,'POST')
//更新用户
export const reqUpdateUsers=(user)=>ajax(BASE+'/user/update',user,'POST')
//删除用户
export const reqDeleteUsers=(userId)=>ajax(BASE+'/user/delete',{userId},'POST')

//显示用户列表
export const reqEnterprises=()=>ajax(BASE+'/enterprise/list')
//添加用户
export const reqAddEnterprises=(enterprise)=>ajax(BASE+'/enterprise/add',enterprise,'POST')
//更新用户
export const reqUpdateEnterprises=(enterprise)=>ajax(BASE+'/enterprise/update',enterprise,'POST')
//删除用户
export const reqDeleteEnterprises=(enterId)=>ajax(BASE+'/enterprise/delete',{enterId},'POST')


//显示管理员信息
export const reqManagers=()=>ajax(BASE+'/manager/list')
//删除管理员
export const reqDeleteManagers=(ManagerName)=>ajax(BASE+'/manager/list',{ManagerName},'POST')
//添加管理员
export const reqAddManagers=(manager)=>ajax(BASE+'/manager/add',manager,'POST')
//更新管理员
export const reqUpdateManagers=(manager)=>ajax(BASE+'/manager/update',manager,'POST')

//更新图片
export const reqUpdatePhotos=(file)=>ajax(BASE+'/user/photo',file,'POST')

//添加简历
export const reqAddResume=(resume,userId)=>ajax(BASE+'/home/resume/add',{resume,userId},'POST')
