/*
reducer函数模块：根据当前state和指定action返回一个新的state
* */
import {combineReducers} from 'redux'
import {SET_HEAD_TITLE,RECEIVE_USER,LOG_OUT,SET_HEAD_TITLE2} from "./actions-types";
//import {ADD_COMMENT, DELETE_COMMENT} from "./actions-types";
import storageUtils from "../utils/storageUtils";

//用于管理当前选择的模块名称的函数
const initHeadTitle=''
function headTitle(state=initHeadTitle,action) {
    switch (action.type) {
        case SET_HEAD_TITLE:
            return  action.data
        default:
            return state
    }
}

const initHeadTitle2=''
function headTitle2(state=initHeadTitle2,action) {
    switch (action.type) {
        case SET_HEAD_TITLE2:
            return  action.data
        default:
            return state
    }
}

//用于管理当前登录用户的reducer函数
const initUser=storageUtils.getUser()
function user(state=initUser,action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.data
        case LOG_OUT:
            return {}
        default:
            return state
    }
}

//combineReducers函数，接收包含所有reducer函数的对象，返回一个新的reducer函数（总reducer）
//总的reducer函数管理的state的结构 {headTitle:'首页',user:{}}
export default combineReducers({
    headTitle,
    headTitle2,
    user
})
