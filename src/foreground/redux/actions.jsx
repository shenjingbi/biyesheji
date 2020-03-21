
import {SET_HEAD_TITLE, RECEIVE_USER, LOG_OUT} from "./actions-types";
import {reqLogin} from "../api";
import {message} from "antd";
import storageUtils from "../utils/storageUtils";


/*设置头部标题的同步action*/
export const setHeadTitle=(headTitle)=>({type:SET_HEAD_TITLE,data:headTitle})

//接收用户的同步action
export const receiveUser=(user1)=>({type:RECEIVE_USER,data:user1})

//登录的异步action：返回的是函数
export const login=(username,password,remember)=>{
    return async dispatch=>{
        //1.执行异步（定时器，ajax请求，promise）
        const result=await reqLogin(username,password,remember)
        //2.成功，分发成功的同步action
        if(result.status===0){
            const user1=result.data[0]
            //保存local中
            storageUtils.saveUser(user1)
            //分发接收用户的同步action
            dispatch(receiveUser(user1))
        }else {
            //失败，分发失败的同步action
            message.error('登录失败，账号密码不正确')
        }
    }
}

//退出登录的同步action
export const logout=()=>{
    //删除local中的user
    storageUtils.deleteUser()
    //返回action对象
    return {type:LOG_OUT}
}

